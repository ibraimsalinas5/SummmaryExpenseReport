export default function CalculateExpenses(files) {
  let totalExpenses = 0.0;
  let categoryExpenses = {};
  files.forEach((file) => {
    file.data.forEach((row) => {
      let expense = Number(row.Debit);
      if (Number(expense)) {
        categoryExpenses[row.Category] =
          (categoryExpenses[row.Category] || 0) + expense;
        totalExpenses += expense;
      }
    });
  });
  console.log(categoryExpenses);
  console.log(totalExpenses.toFixed(2));
  return { totalExpenses, categoryExpenses };
}
