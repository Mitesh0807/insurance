import {Customer,Dependent} from '../model/';
import asyncHandler from 'express-async-handler';
import {Response} from 'express';
import Request from "../interface.ts";
import StatusCodes from "http-status-codes";
/*
 * Crud Controller for Customer
 * */

 export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
    const {firstName, lastName, aadharNumber, image, gender, address,dependents} = req.body;\
    const customerIsExist = await Customer.findOne({aadharNumber});
    const dependentsIsExist = await Dependent.find({aadharNumber});
    if(customerIsExist){
      res.status(StatusCodes.BAD_REQUEST).json({message: "Customer already exist with this aadhar number"});
      return;
    }
    if(dependentsIsExist){
      res.status(StatusCodes.BAD_REQUEST).json({message: "Customer already exist with this aadhar number already registered with dependents"});
      return;
    }

    const dependents = dependents.map((dependent: Dependent) => {
        return {
            firstName: dependent.firstName,
            lastName: dependent.lastName,
            aadharNumber: dependent.aadharNumber,
            dateOfBirth: dependent.dateOfBirth,
            image: dependent.image,
            gender: dependent.gender,
            address: dependent.address,
            relation: dependent.relation,
            isActive: dependent.isActive,
            createdAt: dependent.createdAt,
            updatedAt: dependent.updatedAt
        }
    });
    if(dependents && dependents.length >5){
    res.status(StatusCodes.BAD_REQUEST).json({message: "Dependents cannot be more than 5"});
    return;
    } 
    const dependentsAadharNumber = dependents.map((dependent: Dependent) => {
        return dependent.aadharNumber;
    })
    const aadharNumberExist = await Customer.findOne({aadharNumber: {$in: dependentsAadharNumber}});
    const dependentsExist = await Dependent.find({aadharNumber: {$in: dependentsAadharNumber}});
    if(aadharNumberExist){
      res.status(StatusCodes.BAD_REQUEST).json({message: "Customer already exist with this aadhar number"});
      return;
    }
    if(dependentsExist){
      res.status(StatusCodes.BAD_REQUEST).json({message: "Customer already exist with this aadhar number already registered with dependents"});
      return;
    }
    const dependentsArray = await Dependent.insertMany(dependents);
    const dependentsIds = dependentsArray.map((dependent: Dependent) => dependent._id);
    const customer = await Customer.create({firstName, lastName, aadharNumber, image, gender, address,dependents: dependentsIds});
    const data = {
        customer: customer,
        dependents: dependentsArray
    }
    res.status(StatusCodes.CREATED).json(data);
    return;
 }) 
