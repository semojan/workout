const services = require("../../Core/Application/Services/Comments/CommentsService");

async function GetComments(req, res, next) {
    const { workoutId } = req.params;

    const result = await services.GetCommentsService(workoutId);

    res.json(result);
}

async function AddComment(req, res, next) {
    const { workoutId } = req.params;
    const userId = req.user.userId;
    const data = req.body;

    const result = await services.AddCommentService(workoutId, userId, data);

    res.json(result);
}

async function DeleteComment(req, res, next) {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await services.DeleteCommentService(id, userId);

    res.json(result);
}

module.exports = {
    GetComments: GetComments,
    AddComment: AddComment,
    DeleteComment: DeleteComment
};