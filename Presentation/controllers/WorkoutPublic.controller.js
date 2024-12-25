const PublicService = require("../../Core/Application/Services/Workouts/WorkoutsPublicServices");

async function GetAllWorkouts(req, res, next) {
    let userId;
    if(req.user){
        userId = req.user.userId;
    }else{
        userId = null;
    }

    result = await PublicService.GetAllWorkoutsService(userId);

    res.json(result);
}

module.exports = {
    GetAllWorkouts: GetAllWorkouts
};