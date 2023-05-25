import CategoryRules from "../CategoryRules/CategoryRules";
import CapitalOneIncome from "./CapitalOneIncome";
import CapitalOneDebitRule from "./CapitalOneDebitRule";

//REDUNDANCY IN COPYING READING LINE FUNCTION
//WILL NEED TO FIND WAY TO MAKE GENERIC FUNCTION FOR ALL BANKS
export default function CapOneAcc(file) {
  let totalWages = 0.0;
  let totalExpenses = 0.0;
  let categoryExpenses = [];
  file.data.forEach((row) => {
    //CHARGES ARE DEBIT, WAGES/REFUNDS CREDIT
    let amount = Math.abs(Number(row["Transaction Amount"]));
    let type = row["Transaction Type"];
    if (type == "Debit") {
      let category = CategoryRules(row["Transaction Description"]);
      categoryExpenses[category] = (categoryExpenses[category] || 0) + amount;
      totalExpenses += CapitalOneDebitRule(
        row["Transaction Description"],
        amount
      );
    } else {
      totalWages += CapitalOneIncome(row["Transaction Description"], amount);
    }
  });
  //BUG, NEED TO FIGURE OUT WHY WHEN ADDING ADDS MORE THAN TWO DECIMAL PLACES
  totalExpenses = Math.abs(totalExpenses.toFixed(2));
  totalWages = totalWages.toFixed(2);
  return { totalExpenses, totalWages, categoryExpenses };
}
