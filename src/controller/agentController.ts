import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../utils/token";
import Agent from "../model/agent";
import crypto from "crypto";
/**
 * Crud operations for agent
 */

export const createAgent = asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.body;
    if(!name || !email){
        res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are required name, email"});
        return;
    }
    const agent = await Agent.findOne({email});
    if (agent) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Agent already exists"});
        return;
    }
    const agentId = crypto.randomBytes(4).toString("hex");
    const checkAgentCode = await Agent.findOne({agentId});
    if (checkAgentCode) {
     const agentId = crypto.randomBytes(4).toString("hex");
     const newAgent = await Agent.create({name, email, agentId});
     res.status(StatusCodes.CREATED).json({message: "Agent created", newAgent});
     return;
    }
    const isActive = true;
    const newAgent = await Agent.create({name, email, agentId});
    res.status(StatusCodes.CREATED).json({message: "Agent created", newAgent});
});

export const getAgent = asyncHandler(async (req: Request, res: Response) => {
    const {agentId} = req.params;
    const agent = await Agent.findOne({agentId});
    if (!agent || !agent.agentId) {
        res.status(StatusCodes.NOT_FOUND).json({message: "Agent not found"});
        return;
    }
    res.status(StatusCodes.OK).json({message: "Agent found", agent});
});

export const getAllAgents = asyncHandler(async (req: Request, res: Response) => {
    const agents = await Agent.find();
    if (!agents || !agents.length) {
        res.status(StatusCodes.NOT_FOUND).json({message: "Agents not found"});
        return;
    }
    res.status(StatusCodes.OK).json({message: "Agents found", agents});
});

export const updateAgent = asyncHandler(async (req: Request, res: Response) => {
    const {agentId} = req.params;
    const {name, email} = req.body;
    const agent = await Agent.findById(agentId);
    if (!agent || !agent.agentId) {
        res.status(StatusCodes.NOT_FOUND).json({message: "Agent not found"});
        return;
    }
    agent.name = name;
    agent.email = email;
    const updatedAgent = await agent.save();
    res.status(StatusCodes.OK).json({message: "Agent updated", updatedAgent});
});

export const deleteAgent = asyncHandler(async (req: Request, res: Response) => {
    const {agentId} = req.params;
    const agent = await Agent.findOne({agentId});
    if (!agent || !agent.agentId) {
        res.status(StatusCodes.NOT_FOUND).json({message: "Agent not found"});
        return;
    }
    await Agent.deleteOne({agentId});
    res.status(StatusCodes.OK).json({message: "Agent deleted"});
})