import { Customer, Dependent } from '../model/';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import StatusCodes from "http-status-codes";
import { IDpendent } from '../model/dependent';
import Request from '../interface';
/*
 * Crud Controller for Customer
 * */

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, aadharNumber, image, gender, dateOfBirth, agentId, address, dependentList } = req.body;
  // const customerIsExist = await Customer.findOne({ aadharNumber });
  // const dependentsIsExist = await Dependent.find({ aadharNumber });
  // if (customerIsExist) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ message: "Customer already exist with this aadhar number" });
  //   return;
  // }
  // if (dependentsIsExist && dependentsIsExist.length > 0) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ message: "Customer already exist with this aadhar number already registered with dependents" });
  //   return;
  // }

  const dependents = dependentList?.map((dependent: IDpendent) => {
    return {
      firstName: dependent?.firstName,
      lastName: dependent?.lastName,
      aadharNumber: dependent?.aadharNumber,
      dateOfBirth: dependent?.dateOfBirth,
      image: dependent?.image,
      gender: dependent?.gender,
      address: dependent?.address,
      relation: dependent?.relation,
      relationShip: dependent?.relationShip,
    }
  });
  if (dependents && dependents.length > 5) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Dependents cannot be more than 5" });
    return;
  }
  // const dependentsAadharNumber = dependents.map((dependent: IDpendent) => {
  //   return dependent.aadharNumber;
  // })
  // const aadharNumberExist = await Customer.findOne({ aadharNumber: { $in: dependentsAadharNumber } });
  // const dependentsExist = await Dependent.find({ aadharNumber: { $in: dependentsAadharNumber } });
  // if (aadharNumberExist) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ message: "Customer already exist with this aadhar number" });
  //   return;
  // }
  // if (dependentsExist && dependentsExist.length > 0) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ message: "Customer already exist with this aadhar number already registered with dependents" });
  //   return;
  // }
  const dependentsArray = dependentList && dependentList.length > 0 ? await Dependent.insertMany(dependents) : [];
  const dependentsIds = dependentList && dependentList.length > 0 ? dependentsArray?.map((dependent) => {
    return dependent?._id;
  }) : []
  const customer = await Customer.create({ firstName, lastName, aadharNumber, image, agentId, dateOfBirth, gender, address, dependents: dependentsIds });
  const data = {
    customer: customer,
    dependents: dependentsArray
  }
  res.status(StatusCodes.CREATED).json(data);
  return;
});

export const getAllCustomers = asyncHandler(async (req: Request, res: Response) => {
  const customers = await Customer.find();
  if (!customers || !customers.length) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Customers not found" });
    return;
  }

  const customerDetailInDetails = await Promise.all(
    customers.map(async (customer) => {
      const dependents = customer.dependents;
      const dependentsDetail = await Dependent.find({ _id: { $in: dependents } });
      return {
        customer: customer,
        dependents: dependentsDetail
      };
    })
  );

  res.status(StatusCodes.OK).json({ count: customers.length, customerDetailInDetails });
});



