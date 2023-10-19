import express, { Router } from "express";
const superAdminRouter = express.Router();
import { adminLogin, adminRegister } from "../controller/adminController";
import { getCustomerById, getCustomers, switchApprovalOFCustomer } from "../controller/customerManageController";
import authMiddleware from "../middleware/authMiddleware";

superAdminRouter.post("/login", adminLogin);
superAdminRouter.post("/register", adminRegister);
superAdminRouter.get("/customer", authMiddleware,getCustomers);
superAdminRouter.put("/customer/:customerId",authMiddleware, switchApprovalOFCustomer).get("/customer/:customerId", getCustomerById);

export default superAdminRouter;