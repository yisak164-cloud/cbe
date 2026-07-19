import express from "express"
import DB from "./config/db.config.js"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cors from "cors"
import { Account } from "./models/accountModel.js"
import authMiddleware from "./middlewares/authMiddleware.js"
import { createAccount } from "./controllers/accountController.js"
import { Transaction } from "./models/transactionModel.js"
import PDFDocument from "pdfkit"
import QRCode from "qrcode"

dotenv.config()
const app = express()   //create app
app.use(express.json())  //midlle ware
app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))
DB()


app.get("/api/viewBalance", (req, res) => {
   console.log(req.socket.remoteAddress)
   return res.status(200).send("your balance is 200")
})


app.get("/api/confirmAccount/:account", authMiddleware, async (req, res) => {
   try {
      const accountNumber = req.params.account
      const account = await Account.findOne({ accountNumber: accountNumber })
      if (!account) {
         return res.status(404).send({ error: "account not exist" })
      }
      return res.status(200).json({ accountHolder: account.fullName })
   } catch (error) {
      return res.status(500).send({ error: "someting went wrong" })
   }
})
app.post("/api/transactions", authMiddleware, async (req, res) => {
   try {
      const senderId = req.id
      const { receiverAccount, amount,pin} = req.body
       const senderAccount = await Account.findById(senderId)
       const pinMatched=await  bcrypt.compare(String(pin),senderAccount.pin)
       if(!pinMatched){
         return res.status(401).send({message:"invalidpin"})
       }
     
      return
     const receiverAccountData = await Account.findOne({ accountNumber: receiverAccount })
   .select("fullName balance phoneNumber accountNumber accountStatus")
      if (receiverAccount == null) {
         return res.status(404).send({ message: "account not found" })
      }
      if (receiverAccount.accountStatus != "open") {
         return res.status(400).send({ message: "account is not active" })
      }
      // check if sender account balamce is sufficient
     
      if (senderAccount.balance - amount < 100) {
         return res.status(400).send({ message: "insuficeint balance" })
      }
      receiverAccount.balance = account.balance + Number(amount)
      senderAccount.balance = senderAccount.balance - Number(amount)
      await Promise.all(
         [
            senderAccount.save(),
            receiverAccount.save()
         ])
      const reference = Math.floor(Math.random() * 9000000)
      const transaction = new Transaction({
         referenceNumebr: "AFT" + reference,
         amount: amount,
         reason: "transfer",
         senderId: req.id,
         recevierId: account._id,
         receipt: "image.png"
      })
      transaction.save()
        
      const transactionUrl = "http://localhost:3000/api/transactions/AFT34324234"
      QRCode.toString(transactionUrl, { type: "terminal", small: true }, (err, url) => {
         if (err) console.error(err)
         console.log(url)
      })


      const qrCodeDataUrl = await QRCode.toDataURL("http://localhost:3000/api/transactions/AFT34324234", {
         width: 200,
         margin: 1,
      });
      const qrImageBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");

      // 4. Set response headers so browser treats it as a downloadable PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
         "Content-Disposition",
         `attachment; filename=receipt-${transaction.referenceNumebr}.pdf`
      );

      // 5. Create PDF document and stream it directly to the response
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      doc.pipe(res);

      // ---- Header ----
      doc
         .fontSize(20)
         .font("Helvetica-Bold")
         .text("Transaction Receipt", { align: "center" });
      doc.moveDown(1.5);

      // ---- Transaction details ----
      doc.fontSize(12).font("Helvetica");

      const row = (label, value) => {
         doc.font("Helvetica-Bold").text(label, { continued: true });
         doc.font("Helvetica").text(`  ${value}`);
         doc.moveDown(0.4);
      };

      row("Reference Number:", transaction.referenceNumebr);
      row("Amount:", `${transaction.amount}`);
      row("Reason:", transaction.reason);
      row("Sender:", transaction.senderId?.name || transaction.senderId?.toString());
      row("Receiver:", transaction.recevierId?.name || transaction.recevierId?.toString());
      row("Date:", new Date(transaction.createdAt || Date.now()).toLocaleString());

      doc.moveDown(1);
      doc.strokeColor("#cccccc").moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);

      // ---- QR Code section ----
      doc
         .fontSize(12)
         .font("Helvetica-Bold")
         .text("Scan to view transaction:", { align: "center" });
      doc.moveDown(0.5);

      const qrSize = 150;
      const pageWidth = doc.page.width;
      const qrX = (pageWidth - qrSize) / 2;
      doc.image(qrImageBuffer, qrX, doc.y, { width: qrSize, height: qrSize });
      doc.moveDown(10);

      doc
         .fontSize(9)
         .fillColor("#666666")
         .text(transactionUrl, { align: "center", link: transactionUrl });

      // ---- Footer ----
      doc.moveDown(2);
      doc
         .fontSize(9)
         .fillColor("#999999")
         .text("This is a system-generated receipt.", { align: "center" });

      doc.end();
     
   }
   
   
   catch (error) {
      return res.status(400).send({ message: "something went wrong" })
   }
})

app.post("/api/login", async (req, res) => {
   try {
      const { phone, pin } = req.body
      if (!phone || !pin) {
         return res.status(400).send({ message: "mising required fields" })
      }
      const account = await Account.findOne({ phoneNumber: phone }).select("pin accountStatus accountNumber balance fullName")
      if (!account) {
         return res.status(401).json({ message: "invalid credentials" })
      }
      //   check account status
      if (account.accountStatus != "open") {
         return res.status(401).send({ message: "your account is locked" })
      }

      const isMatch = await bcrypt.compare(pin.toString(), account.pin)
      if (!isMatch) {
         return res.status(401).json({ message: "invalid credentials pin" })
      }
      const token = jwt.sign({ id: account._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
      res.cookie("extension-cookie", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).send({ message: "login success", account: account.accountNumber, balance: account.balance, fullName: account.fullName })
      // compair pin
   }
   catch (error) {
      return res.status(500).send("something went wrong")
   }

})
app.get("/accounts/:id", async (req, res) => {
   const id = req.params.id
   const account = await Account.findById(id)
   return res.status(200).json({ account: account })
})

app.delete("/accounts/:id", async (req, res) => {
   const id = req.params.id
   const account = await Account.findById(id)
   if (!account) {
      return res.status(404).json({ message: "user not found" })
   }
   await Account.findByIdAndDelete(id)
   return res.status(200).json({ message: "account deleted" })
})
// create account

app.post("/createAccount", createAccount)

// app.post("/api/login",async(req,res)=>{
//    try {
//           const {phone,pin}=req.body
//     // find user by phone
//     let user= await Account.findOne({phoneNumber:phone})
//     if(!user){
//        return   res.status(401).send({error:"user not found"})
//     } 
//     if(user.accountStatus!="open"){
//         return res.status(403).send("your account is locked")
//     }
//     if(pin!=user.pin){
//         return res.status(401).send({error:"invalid pin"})
//     }
//     res.cookie("cbe-cookie",user._id,{maxAge:24*60*60*1000,httpOnly:true,secure:true})
//     return res.status(200).send("login success")
//    } catch (error) {
//       return res.status(500).send("something went wrong")
//    } 
// })

const port = process.env.PORT
app.listen(port, "0.0.0.0", () => {
   console.log("app is listening");
})