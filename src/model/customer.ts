/**
 * Insuranse customer model
 * PolicyHolder Form
----------------------
firstName (string),
lastName (string),
aadharNumber (number),
Date of Birth (string),
Gender (string),
address (string),
image (string)

all fields are required
 */

import mongoose,{ Model, ObjectId,Schema,Document, Mongoose } from "mongoose";

export interface ICustomer extends Document{
    _id: string;
    firstName: string;
    agentId: string;
    lastName: string;
    aadharNumber: number;
    dateOfBirth: string;
    image: string;
    dependents: Array<Dependent>;
    gender: "Male" | "Female";
    address: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const customerSchema = new Schema({
    agentId: {
        type:mongoose.Types.ObjectId,
        required: true,
        ref:"Agent",
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dependents: {
        type: Array,
        of: {
            type: Schema.Types.ObjectId,
        },
        default: [],
        required: true,
        ref: "Dependent",
    }
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model<ICustomer>("Customer", customerSchema);
