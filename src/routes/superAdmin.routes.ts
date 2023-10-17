import express, { Router } from "express";
const superAdminRouter = express.Router();
import { adminLogin, adminRegister } from "../controller/adminController";
import { getCustomerById, getCustomers, switchApprovalOFCustomer } from "../controller/customerManageController";

superAdminRouter.post("/login", adminLogin);
superAdminRouter.post("/register", adminRegister);
superAdminRouter.get("/customer", getCustomers);
superAdminRouter.put("/customer/:customerId", switchApprovalOFCustomer).get("/customer/:customerId", getCustomerById);

export default superAdminRouter;