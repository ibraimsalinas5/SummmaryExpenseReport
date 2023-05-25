//THIS IS NEEDED TO CREATE/ASSIGN CATEGORIES WITH CSVS WITHOUT CATEGORY
//IE CAPITAL ONE,
//EXPLORE USING AI TO AUTO CATEGORIZE
export default function CategoryRules(TransactionDescription) {
  if (
    TransactionDescription.includes("MCDONALDS") ||
    TransactionDescription.includes("CHICK FIL A") ||
    TransactionDescription.includes("ESPRESSO") ||
    TransactionDescription.includes("STARBUCKS")
  ) {
    return "Food & Drink";
  } else if (
    TransactionDescription.includes("TARGET") ||
    TransactionDescription.includes("CVS PHARMACY")
  ) {
    return "Shopping";
  } else if (TransactionDescription.includes("SPROUTS")) {
    return "Groceries";
  } else if (
    TransactionDescription.includes("KLARNA INC COLUMBUS") ||
    TransactionDescription.includes("STATE FARM")
  ) {
    return "Bills";
  } else if (
    TransactionDescription.includes("HULU") ||
    TransactionDescription.includes("SPOTIFY") ||
    TransactionDescription.includes("AMAZON PRIME") ||
    TransactionDescription.includes("GOOGLE STORAGE")
  ) {
    return "Subscriptions";
  } else {
    return "Uncategorized";
  }
}
