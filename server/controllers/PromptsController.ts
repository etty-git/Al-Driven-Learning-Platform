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
const getResponses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await PromptsService.getResponses();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getResponsesByID = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {

  const result = await PromptsService.getResponsesByID(req.params.id);
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
export default { createPrompt, getResponses, getResponsesByID, getPromptsByUserID };