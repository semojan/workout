class Leaderboard {
    constructor() {
        this.entries = [];
    }

    addEntry(userId, score) {
        this.entries.push({ userId, score });
        this.entries.sort((a, b) => b.score - a.score); // Sort by score descending
    }

    getTopEntries(limit) {
        return this.entries.slice(0, limit);
    }

    getUserRank(userId) {
        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].userId === userId) {
                return i + 1;
            }
        }
        return null;
    }
}

module.exports = Leaderboard;
