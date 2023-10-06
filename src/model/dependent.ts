/**
 * Children Form && Parent Form && Spouse Form 
--------------------
firstName (string),
lastName (string),
aadharNumber (number),
Date of Birth (string),
Gender (string),
address (string),
image (string),
relation (string)
 */

import mongoose,{ Schema,Document, Mongoose } from "mongoose";

export interface IDpendent extends Document{
    _id: string;
    firstName: string;
    lastName: string;
    aadharNumber: number;
    dateOfBirth: string;
    image: string;
    gender: "Male" | "Female";
    address: string;
    relation: "Child" | "Parent" | "Spouse";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
/*
 *Dependet Validation
 *Aadhar Number should be 12 digit
 * */
const dependentSchema = new Schema({
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
        unique: true,
        validator: {
            validator: (aadharNumber: number) => {
                return aadharNumber.toString().length === 12;
            },
        }
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
    relation: {
        type: String,
        enum: ["Child", "Parent", "Spouse"],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model<IDependent>("Dependent", dependentSchema);
