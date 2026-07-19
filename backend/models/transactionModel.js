import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    referenceNumber: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, default: "transfer" },
    fee: { type: Number, default: 0.0 },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("transaction", transactionSchema);
