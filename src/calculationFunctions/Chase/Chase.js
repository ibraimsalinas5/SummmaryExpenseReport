export default function Chase(file) {
  let totalExpenses = 0.0;
  let totalWages = 0.0;
  let categoryExpenses = {};
  file.data.forEach((row) => {
    //CHARGES ARE DEBIT, REFUNDS/PAYMENTS ARE CREDIT
    let expense = Number(row.Amount);
    if (expense < 0) {
      expense = Math.abs(expense);
      categoryExpenses[row.Category] =
        (categoryExpenses[row.Category] || 0) + expense;
      totalExpenses += expense;
    }
    //ADD FUNCTIONALITY FOR REFUNDS
  });
  //BUG, NEED TO FIGURE OUT WHY WHEN ADDING ADDS MORE THAN TWO DECIMAL PLACES
  totalExpenses = Number(totalExpenses.toFixed(2));
  return { totalExpenses, totalWages, categoryExpenses };
}
