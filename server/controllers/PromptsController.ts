import { Request, Response } from "express";
import * as PromptsService from "../services/PromptsService";



const createPrompt = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PromptsService.createPrompt(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }


}
const getPrompts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PromptsService.getPrompts();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getPromptsByID = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {

  const result = await PromptsService.getPromptsByID(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
const getPromptsByUserID = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const result = await PromptsService.getPromptsByUserID(req.params.id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export default { createPrompt, getPrompts, getPromptsByID, getPromptsByUserID };