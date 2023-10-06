import express, { Router } from "express";
const agentRouter = express.Router();
import {getAgent, getAllAgents, createAgent, updateAgent, deleteAgent} from "../controller/agentController";
agentRouter.post("/", createAgent).get("/", getAllAgents);
agentRouter.put("/:agentId", updateAgent);
agentRouter.delete("/:agentId", deleteAgent);
agentRouter.get("/:agentId", getAgent);
export default agentRouter;