export default function CapitalOneDebitRule(description, expense) {
  if (
    !description.includes("CAPITAL ONE") &&
    !description.includes("360 Checking")
  ) {
    return expense;
  }
  console.log(description);
  return 0.0;
}
