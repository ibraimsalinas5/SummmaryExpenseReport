import TotalExepenseCard from "./TotalExpenseCard";
import IncomeCard from "./IncomeCard";

export default function Cards({ totalExpenses, income }) {
  console.log(income);
  return (
    <div class="cards">
      <TotalExepenseCard totalExpenses={totalExpenses} />
      <IncomeCard income={income} />
    </div>
  );
}
