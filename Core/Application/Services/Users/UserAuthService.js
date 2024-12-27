const {User} = require("../../../../Infrastructure/database/db");
const JWTService = require("../Authentication/JWTService");
const validator = require("validator");
const hash = require("../../../../Common/hash");

async function signupService(body){
    email = body.email;
    username = body.username;
    password = body.password;
    confirmPassword = body.confirmPassword;

    const existingUser = await User.findOne({where: {email}});
    if (existingUser){
        return {message: "user with this email already exists"};
    }

    const existingUsername = await User.findOne({where: {username}});
    if (existingUsername){
        return {message: "username already exists, please choose another one"};
    }

    if (password !== confirmPassword){
        return {message: "entered and confirm password do not match"};
    }

    try{
        const hashedPassword = hash(password);
        const newUser = await User.create({
            password: hashedPassword.hashed,
            salt: hashedPassword.salt,
            name: body.name,
            email: email,
            username: username,
        });

        const token = JWTService.generateToken(newUser.id);
        return {message: "user created successfully", token: token};
    }catch(e){
        if (e.name === "SequelizeValidationError") {
            return { message: "Validation error", details: e.errors };
        }
        return {message: "user signup failed", error: e};
    }
}

async function loginService(body){
    const username = body.username;
    let user;
    if(validator.isEmail(username)){
        try{
            user = await User.findOne({where: {email: username}});
            console.log(user);
            if (!user){
                return {message: "user with this email does not exist", error: e};
            }
        }catch(e){
            return {message: "failed to get user from email", error: e};
        }
    }else{  
        try{
            user = await User.findOne({where: {username: username}});
            if (!user){
                return {message: "user with this username does not exist", error: e};
            }
        }catch(e){
            return {message: "failed to get user from username", error: e};
        }
    }

    const userJSON = user.toJSON();
    const hashedEnteredPassword = hash(body.password, userJSON.salt);
    if (hashedEnteredPassword.hashed !== userJSON.password){
        return {message: "wrong password"};
    }

    const token = JWTService.generateToken(userJSON.id);
    return {message: "successful login", token: token};
}

// async function logoutService(){

// }

module.exports = {
    signupService: signupService,
    loginService: loginService,
    // logoutService: logoutService
};