import CapitalOneRefunds from "./CapitalOneRefunds";
export default function CapOneCC(file) {
  let totalExpenses = 0.0;
  let totalWages = 0.0;
  let categoryExpenses = {};
  file.data.forEach((row) => {
    //CHARGES ARE DEBIT, REFUNDS/PAYMENTS ARE CREDIT
    let expense = Number(row.Debit);
    let refund = Number(row.Credit);
    if (Number(expense)) {
      categoryExpenses[row.Category] =
        (categoryExpenses[row.Category] || 0) + expense;
      totalExpenses += expense;
    } else if (Number(refund)) {
      //CALCULATE REFUNDS BUT EXCLUDE PAYMENTS
      totalExpenses -= CapitalOneRefunds(row, refund);
    }
  });
  //BUG, NEED TO FIGURE OUT WHY WHEN ADDING ADDS MORE THAN TWO DECIMAL PLACES
  totalExpenses = Number(totalExpenses.toFixed(2));
  return { totalExpenses, totalWages, categoryExpenses };
}
