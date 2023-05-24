export default function CapOneExpenses(files) {
  let totalExpenses = 0.0;
  let categoryExpenses = {};
  files.forEach((file) => {
    file.data.forEach((row) => {
      //Charges are Debit
      let expense = Number(row.Debit);
      let refund = Number(row.Credit);
      if (Number(expense)) {
        categoryExpenses[row.Category] =
          (categoryExpenses[row.Category] || 0) + expense;
        totalExpenses += expense;
      } else if (Number(refund)) {
        //WILL NEED TO ADD FILTER TO ONLY CHECK IF ITS REFUND NOT PAYMENT
        totalExpenses -= refund;
      }
    });
  });
  console.log(categoryExpenses);
  console.log(totalExpenses.toFixed(2));
  return { totalExpenses, categoryExpenses };
}
