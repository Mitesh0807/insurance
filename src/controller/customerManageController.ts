import { Customer, Dependent } from '../model/';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import Request from '../interface';
import { isValidObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';


export const getCustomers = asyncHandler(async (req: Request, res: Response) => {
  // const { searchKey, pageSize = 10,LastEvaluatedKey } = req.query;
  const {pageNumber=1,limit=10,firstName,lastName,agentCode} = req.query;
  let query={};
  // if(searchKey && !!searchKey){
  //
  //   const searchKeyRegex = new RegExp(searchKey.toString(), 'i');
  //   query={
  //     ...query,
  //     name: { $regex: searchKeyRegex }
  //   }
  // }
  // if(LastEvaluatedKey && LastEvaluatedKey !== "" && !!LastEvaluatedKey && isValidObjectId(LastEvaluatedKey)){
  //  query={
  //    ...query,
  //    _id: { $gt:LastEvaluatedKey }
  //  }
  // }
  // const customers = await Customer.find(query).limit(Number(pageSize)).sort({ _id: -1 }).populate('dependents');
  // const lastCustomer = customers[customers.length - 1];
  // const lastEvaluatedKey = lastCustomer ? lastCustomer._id : null;
  // const hasNextPage = customers.length === Number(pageSize);
  // console.log(lastEvaluatedKey, hasNextPage,customers.length);
  // res.status(StatusCodes.OK).json({hasNextPage,lastEvaluatedKey,customers});
  if(firstName && !!firstName){
    query={
      ...query,
      firstName: { $regex: firstName.toString(), $options: 'i' }
    }
  }
  if(lastName && !!lastName){
    query={
      ...query,
      lastName: { $regex: lastName.toString(), $options: 'i' }
    }
  }
  if(agentCode && !!agentCode){
    query={
      ...query,
      agentCode: { $regex: agentCode.toString(), $options: 'i' }
    }
  }
  // cons
  const totalCount = await Customer.countDocuments({});
  const pageSize = Number(limit);
  const pageNo = Number(pageNumber);
  const customers = await Customer.find(query).skip((pageNo - 1) * pageSize).limit(pageSize).sort({ _id: -1 }).populate('dependents');
  res.status(StatusCodes.OK).json({count:totalCount,customers});
  return;
});


export const switchApprovalOFCustomer = asyncHandler(async (req: Request, res: Response) => {
  const {customerId} = req.params;
  const customer = await Customer.findOne({_id:customerId});
  if (!customer || !customer._id) {
    res.status(StatusCodes.NOT_FOUND).json({message: "Customer not found"});
    return;
  }
  customer.isActive = !customer.isActive;
  const updatedCustomer = await customer.save();
  res.status(StatusCodes.OK).json({message: "Customer approved", updatedCustomer});
  return;
})
