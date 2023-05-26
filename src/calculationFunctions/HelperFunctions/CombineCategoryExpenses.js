export default function CombineCategoryExpense(categoryExpenses) {
  let combineCategoryExpense = [];
  categoryExpenses.forEach((dict) => {
    for (let key in dict) {
      let value =
        (Number(combineCategoryExpense[key]) || 0) + Number(dict[key]);
      combineCategoryExpense[key] = Number(value);
    }
  });
  console.log(combineCategoryExpense);
  return combineCategoryExpense;
}
