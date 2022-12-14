import { Request, Response } from "express";
import Comment from "../models/comment";
import Issue from "../models/issue";

// Create comment

export const createComment = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  const issue = await Issue.findById(issueId);
  const comment = new Comment(req.body);
  issue?.comments.push(comment._id);
  await comment.save();
  await issue?.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created a comment" });
};

// Delete comment

export const deleteComment = async (req: Request, res: Response) => {
  const { issueId, commentId } = req.params;
  await Issue.findByIdAndUpdate(issueId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted a comment" });
};
