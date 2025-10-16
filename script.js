// Jossen Deer (2001616)
// Web Programming UM2
// Graded Lab #2 - Rent Receipt Page - https://jossendeer.github.io/Graded-Lab-2/

// Import jsPDF from CDN
const { jsPDF } = window.jspdf;

// Elements
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');
const downloadBtn = document.getElementById('downloadBtn');
const receiptDisplay = document.getElementById('receiptDisplay');
const receiptContent = document.getElementById('receiptContent');

// Helper: Generate 5-digit random ID
function generateReceiptID() {
  return Math.floor(10000 + Math.random() * 90000);
}

// Generate Receipt
generateBtn.addEventListener('click', () => {
  const tenantName = document.getElementById('tenantName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const propertyAddress = document.getElementById('propertyAddress').value.trim();
  const rentAmount = document.getElementById('rentAmount').value.trim();
  const rentFrom = document.getElementById('rentFrom').value;
  const rentTo = document.getElementById('rentTo').value;
  const paymentDate = document.getElementById('paymentDate').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const landlordName = document.getElementById('landlordName').value.trim();

  if (!tenantName || !phoneNumber || !propertyAddress || !rentAmount || !rentFrom || !rentTo || !paymentDate || !paymentMethod || !landlordName) {
    alert("Please fill out all fields before generating the receipt.");
    return;
  }

  // Generate receipt ID
  const receiptID = generateReceiptID();

  // Populate receipt
  document.getElementById('rReceiptID').textContent = receiptID;
  document.getElementById('rTenantName').textContent = tenantName;
  document.getElementById('rPhoneNumber').textContent = phoneNumber;
  document.getElementById('rPropertyAddress').textContent = propertyAddress;
  document.getElementById('rRentAmount').textContent = `JMD $${parseFloat(rentAmount).toFixed(2)}`;
  document.getElementById('rRentPeriod').textContent = `${new Date(rentFrom).toLocaleDateString()} to ${new Date(rentTo).toLocaleDateString()}`;
  document.getElementById('rPaymentDate').textContent = new Date(paymentDate).toLocaleDateString();
  document.getElementById('rPaymentMethod').textContent = paymentMethod;
  document.getElementById('rLandlordName').textContent = landlordName;

  // Reveal receipt
  receiptDisplay.classList.remove('hidden');
  receiptDisplay.scrollIntoView({ behavior: "smooth" });
});

// Print Receipt
printBtn.addEventListener('click', () => {
  if (receiptDisplay.classList.contains('hidden')) {
    alert("Please generate a receipt first.");
  } else {
    window.print();
  }
});

// Download Receipt as PDF
downloadBtn.addEventListener('click', async () => {
  if (receiptDisplay.classList.contains('hidden')) {
    alert("Please generate a receipt first.");
    return;
  }

  const canvas = await html2canvas(receiptContent);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("Rent_Receipt.pdf");
});
