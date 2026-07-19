import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  accountNumber: { type: String, unique: true, required: true },
  balance: { type: Number, min: 100.00, default: 100.00 },
  gender: { type: String, required: true, enum: ["male", "female"] },
  accountStatus: { type: String, enum: ["open", "closed"], default: "open" },
  pin: { type: String, required: true }
}, { timestamps: true })

export const Account = mongoose.model("account", accountSchema)