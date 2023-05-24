import CapitalOneRefunds from "./CapitalOneRefunds";

export default function CapOneExpenses(files) {
  let totalExpenses = 0.0;
  let categoryExpenses = {};
  files.forEach((file) => {
    file.data.forEach((row) => {
      //CHARGES ARE DEBIT, REFUNDS/PAYMENTS ARE CREDIT
      let expense = Number(row.Debit);
      let refund = Number(row.Credit);
      if (Number(expense)) {
        //WILL NEED TO ADD RULES FOR CUSTOM CATEGORIS IE MCDONALDS, STARBUCKS 
        categoryExpenses[row.Category] =
          (categoryExpenses[row.Category] || 0) + expense;
        totalExpenses += expense;
      } else if (Number(refund)) {
        //FILTER OUT CREDIT CARD PAYMENTS
        totalExpenses -= CapitalOneRefunds(row,refund);
      }
    });
  });
  return { totalExpenses, categoryExpenses };
}
