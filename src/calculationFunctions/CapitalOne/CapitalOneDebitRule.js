//LOOK TO COMBINE WITH CapitalOneExpense.js
//SHOULD REALLY SWITCH TO .TS INCLUDE FUNCTION NOT WORKING HOW I WOULD LIKE IT TO
export default function CapitalOneDebitRule(description, expense) {
  if (
    description != "Withdrawal from CAPITAL ONE MOBILE PMT" &&
    !description.includes("360 Checking")
  ) {
    return expense;
  }
  return 0.0;
}
