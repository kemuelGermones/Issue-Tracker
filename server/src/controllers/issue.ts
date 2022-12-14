import { Request, Response } from "express";
import Issue from "../models/issue";
import Project from "../models/project";

// Create issue

export const createIssue = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  const issue = new Issue(req.body);
  project?.issues.push(issue._id);
  await issue.save();
  await project?.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully created an issue" });
};

// Edit issue

export const editIssue = async (req: Request, res: Response) => {
  const { issueId } = req.params;
  await Issue.findByIdAndUpdate(issueId, req.body);
  res
    .status(200)
    .json({ status: 200, message: "Successfully edited an issue" });
};

// Delete issue

export const deleteIssue = async (req: Request, res: Response) => {
  const { projectId, issueId } = req.params;
  await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });
  await Issue.findByIdAndDelete(issueId);
  res
    .status(200)
    .json({ status: 200, message: "Successfully deleted an issue" });
};
