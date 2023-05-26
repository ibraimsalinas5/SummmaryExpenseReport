import React, { useState } from "react";
import Cards from "./Cards/Cards";
import PieChart from "./PieChart";
import FileImport from "./FileDragDrop/FileImport";
export default function SummaryReport() {
  const [totalExpenses, setTotalExpenses] = useState(0.0);
  const [income, setIncome] = useState(0.0);
  const [categoryExpenses, setCategoryExpenses] = useState();
  const [render, setRender] = useState(false);

  let addExpenses = (expense) => {
    setTotalExpenses(expense);
  };

  let addIncome = (calulatedIncome) => {
    setIncome(calulatedIncome);
  };

  let addCategoryExpenses = (expense) => {
    setCategoryExpenses(expense);
  };

  let changeRender = (flag) => {
    setRender(flag);
  };

  return (
    <div class="card-area">
      {render ? <Cards totalExpenses={totalExpenses} income={income} /> : ""}
      {render ? <PieChart categoryExpenses={categoryExpenses} /> : ""}
      <FileImport
        addTotalExpenses={addExpenses}
        addIncome={addIncome}
        addCategoryExpenses={addCategoryExpenses}
        changeRender={changeRender}
      />
    </div>
  );
}
