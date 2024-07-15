import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

// Create a new comment
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    console.log("Received request to create comment:", { content, postId, userId });
    console.log(content,postId,userId);
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error,'bye');
    next(error);
  }
};

// Get comments for a specific post
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    console.log(comments);
    console.log('fuck you');
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting post comments:", error);
    next(error);
  }
};
