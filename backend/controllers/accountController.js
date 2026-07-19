import bcrypt from "bcrypt"
import { Account } from "../models/accountModel.js"

export let createAccount = async (req, res) => {
  const data = req.body
  const account = await Account.findOne({
    $or: [
      { phoneNumber: req.body.phoneNumber },
      { accountNumber: req.body.accountNumber }
    ]
  })
  if (account != null) {
    return res.status(400).send("account exists")
  }
  let hashedPassword = await bcrypt.hash(data.pin.toString(), 10)
  let newAccount = await Account.create({ ...data, pin: hashedPassword })
  return res.status(201).send("account created")
}