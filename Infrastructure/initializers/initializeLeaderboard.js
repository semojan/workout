const { User } = require("../database/db");
const redisClient = require("../redisDB/redisClient");

async function initializeLeaderboard() {
    try {
        const users = await User.findAll();
        const multi = redisClient.multi();
        
        users.forEach(user => {
            console.log(user.exp, typeof(user.exp));
            multi.zAdd('leaderboard', { score: Number(user.exp), value: user.id.toString() });
            multi.hSet(`user:${user.id}`, 'username', user.username, 'exp', user.exp.toString());
        });

        await multi.exec();
        console.log('Leaderboard initialized in Redis');
    } catch (err) {
        console.error('Error initializing leaderboard:', err);
        process.exit(1);
    }
}

initializeLeaderboard();
