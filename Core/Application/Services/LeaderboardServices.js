const redisClient = require("../../../Infrastructure/redisDB/redisClient");

async function GetTopUsersService(count) {
    const leaderboard = await redisClient.zRange('leaderboard', 0, count - 1, 'REV', 'WITHSCORES');
    console.log("Leaderboard with scores:", leaderboard);


    const result = [];
    for (let i = 0; i < leaderboard.length; i ++) {
        const userId = leaderboard[i];
        const score = await redisClient.zScore('leaderboard', userId);

        const userDetails = await redisClient.hGetAll(`user:${userId}`);
        console.log("Fetched user details for userId:", userId, "Details:", userDetails);
        console.log(`score: ${score}`);

        const parsedDetails = userDetails && userDetails.username ? userDetails : { username: null };

        result.push({ userId, username: parsedDetails.username, score });
    }

    return {message: "leaderboard retrieved successfully", data: result};
}

async function GetUserRankService(userId) {
    const rank = await redisClient.zRevRank('leaderboard', userId);
    const score = await redisClient.zScore('leaderboard', userId);
    const userDetails = await redisClient.hGet('userDetails', userId);
    const parsedDetails = userDetails ? JSON.parse(userDetails) : { username: null };
    if (rank === null) {
        return null;
    }
    const data = { userId, username: parsedDetails.username, rank: rank + 1, score: Number(score) };

    return {message: "user data retrieved successfully", data: data};
}

module.exports = {
    GetTopUsersService,
    GetUserRankService
};