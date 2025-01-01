const service = require("../../Core/Application/Services/LeaderboardServices");

async function GetTopUsers(req, res, next) {
    const { count } = req.params;

    const result = await service.GetTopUsersService(count);

    res.json(result);
}

async function GetUserRank(req, res, next) { 
    const { id } = req.params;

    const result = await service.GetUserRankService(id);

    res.json(result);
}

async function GetCurrentUserRank(req, res, next) { 
    const id = req.user.userId;

    const result = await service.GetUserRankService(id);

    res.json(result);
}

module.exports = {
    GetTopUsers,
    GetUserRank,
    GetCurrentUserRank
};