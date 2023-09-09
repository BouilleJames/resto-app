const { PDFDocument, rgb } = require("pdf-lib");

async function generateKitchenTicket(orderItems) {
  try {
    // Créez un nouveau document PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    // Ajoutez le contenu du ticket de cuisine
    page.drawText("Ticket de Cuisine", {
      x: 150,
      y: 500,
      size: 30,
      color: rgb(0, 0, 0),
    });

    let yPosition = 450;

    orderItems.forEach((item) => {
      const itemText = `${item.quantity} x ${item.itemTitle}`;
      page.drawText(itemText, {
        x: 50,
        y: yPosition,
        size: 18,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });

    // Enregistrez le document PDF dans un fichier
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  } catch (error) {
    console.error("Erreur lors de la génération du ticket de cuisine :", error);
    throw error;
  }
}

module.exports = {
  generateKitchenTicket,
};
