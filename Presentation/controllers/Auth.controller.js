const userAuthService = require("../../Core/Application/Services/Users/UserAuthService");

async function signup (req, res, next){
    const body = req.body;

    const result = await userAuthService.signupService(body);

    // console.log(result)

    return res.send(result);
}

async function login (req, res, next) {
    const body = req.body;

    const result = await userAuthService.loginService(body);

    return res.send({result});
}

// function logout (req, res, next){

// }

module.exports = {
    signup: signup,
    login:  login,
    // logout: logout
}