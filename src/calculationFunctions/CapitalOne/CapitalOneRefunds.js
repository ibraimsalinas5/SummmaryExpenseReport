export default function CapitalOneRefunds(line, refund) {
  if (!line.Category.includes("Payment")) {
    return refund;
  }
  return 0.0;
}
