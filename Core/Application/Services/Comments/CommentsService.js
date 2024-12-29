const { Workout, User, Comment } = require("../../../../Infrastructure/database/db");

async function GetCommentsService(workoutId) {
    try {
        const comments = await Comment.findAll({
            where: { workout: workoutId },
            include: [{ 
                model: User, 
                as: 'author', 
                attributes: ['username'] 
            }]
        });        
        
        if (comments.length === 0) {
            const err = new Error("There are currently no comments on this workout");
            err.status = 404;
            return { message: "Comments not found", error: err };
        }
    
        const formattedComments = comments.map(comment => ({
            ...comment.get(), 
            username: comment.author.username 
        }));
    
        return { message: "Comments retrieved successfully", data: formattedComments };
    } catch (e) {
        return { message: e.message, error: e };
    }
}

async function AddCommentService(workoutId, userId, data) {
    try {
        const workout = await Workout.findByPk(workoutId);
        if (!workout) {
            const err = new Error("the workout  does not exist");
            err.status = 404;
            return { message: "workout not found", error: err };
        }

        const comment = await Comment.create({
            title: data.title,
            text: data.text,
            user: userId,
            workout: workoutId
        });

        return { message: "comment added successfully", data: comment };
    } catch (e) {
        return { message: e.message, error: e };
    }
}

async function DeleteCommentService(id, userId) {
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            const err = new Error("comment does not exist");
            err.status = 404;
            return { message: "comment not found", error: err };
        }

        if (comment.user !== userId) {
            const err = new Error("you can only remove your own comment");
            err.status = 403;
            return { message: "permission denied", error: err };
        }

        comment.destroy();

        return { message: "comment removed successfully" };
    } catch (e) {
        return { message: e.message, error: e };
    }
}

module.exports = {
    GetCommentsService: GetCommentsService,
    AddCommentService: AddCommentService,
    DeleteCommentService: DeleteCommentService
};