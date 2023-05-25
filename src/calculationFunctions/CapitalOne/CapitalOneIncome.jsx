export default function CapitalOneIncome(description, amount) {
  //WE DONT INCLUDE TRANSFERS
  if (!description.includes("Payment")) {
    return amount;
  }
  return 0.0;
}
