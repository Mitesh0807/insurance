import mongoose, { Schema, Document } from "mongoose";


export interface IAgent extends Document {
    _id: string;
    name: string;
    email: string;
    agentId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AgentSchema: Schema = new mongoose.Schema<IAgent>({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    agentId: { type: String, required: true },
    isActive: { type: "Boolean", default: true },
    createdAt: { type: "Date", default: Date.now },
    updatedAt: { type: "Date", default: Date.now },
});

// AgentSchema.pre("create", async function (next) {
//     const agent = this;
//     const AgentId=agent
// });

export default mongoose.model<IAgent>("Agent", AgentSchema);