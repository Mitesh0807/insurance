import express, { Router } from "express";


const router: Router = express.Router();

import  superAdminRouter  from "./superAdmin.routes";
import agentRouter from "./agent.routes";
// import 


router.use("/admin", superAdminRouter);
router.use("/agent", agentRouter);

export default router;