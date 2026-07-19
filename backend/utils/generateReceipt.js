import PDFDocument from "pdfkit";

export function generateReceipt (data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", () => resolve(Buffer.concat(chunks)));

    doc.on("error", reject);
    // header
    doc.fontSize(20).font("Helvetica-Bold").text("BANK RECEIPT", {
      align: "center",
    });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // receipt details
    doc.fontSize(12).font("Helvetica");
    doc.text(`Reference:   ${data.referenceNumber}`);
    doc.moveDown(0.5);
    doc.text(`Date:        ${data.date}`);
    doc.moveDown(0.5);
    doc.text(`Sender:      ${data.senderName}`);
    doc.moveDown(0.5);
    doc.text(`Receiver:    ${data.receiverName}`);
    doc.moveDown(0.5);
    doc.text(`Amount:      $${data.amount}`);
    doc.moveDown(0.5);
    doc.text(`Reason:      ${data.reason}`);
    doc.moveDown(0.5);
    doc.text(`Status:      Successful`);

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    doc.fontSize(10).text("Thank you for banking with us", { align: "center" });

    doc.end();
  });
}
