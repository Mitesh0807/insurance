import { Customer, Dependent } from '../model/';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import Request from '../interface';
import { StatusCodes } from 'http-status-codes';


export const getCustomers = asyncHandler(async (req: Request, res: Response) => {
  const { pageNumber = 1, limit = 10, searchKey } = req.query;
  const totalCount = await Customer.countDocuments({});
  const pageSize = Number(limit);
  const pageNo = Number(pageNumber);
  if (searchKey && !!searchKey) {
    const regex = new RegExp(searchKey.toString(), 'i');
    const cutomersData = await Customer.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { agentId: searchKey }
      ]
    }).skip((pageNo - 1) * pageSize).limit(pageSize).sort({ _id: -1 })
      .populate('dependents');
    res.status(StatusCodes.OK).json({ count: totalCount, customers: cutomersData })
    return;
  }
  const customers = await Customer.find({}).skip((pageNo - 1) * pageSize).limit(pageSize).sort({ _id: -1 }).populate('dependents');
  console.log(customers.length, 'customers');
  res.status(StatusCodes.OK).json({ count: totalCount, customers });
  return;
});


export const switchApprovalOFCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const customer = await Customer.findOne({ _id: customerId });
  if (!customer || !customer._id) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Customer not found" });
    return;
  }
  customer.isActive = !customer.isActive;
  const updatedCustomer = await customer.save();
  res.status(StatusCodes.OK).json({ message: "Customer approved", updatedCustomer });
  return;
})



export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const customer = await Customer.findOne({ _id: customerId }).populate('dependents');
  if (!customer || !customer._id) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Customer not found" });
    return;
  }
  res.status(StatusCodes.OK).json(customer);
  return;
})