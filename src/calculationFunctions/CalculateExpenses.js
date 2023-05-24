
export default function CalculateExpenses(data){ 
    let totalExpenses = 0.00;
    let categories = [...new Set(data.map(item => item.Category))];
    let categoryExpenses = categories.reduce((dict, key) => {
        dict[key] = 0.00;
        return dict;
      }, {});
    data.forEach(row => {
        let expense = Number(row.Debit);
        if(expense > 0){
            categoryExpenses[row.Category] += expense;
            totalExpenses += expense;
        }
    });
    totalExpenses = totalExpenses.toFixed(2);
    return {totalExpenses, categories, categoryExpenses};
}