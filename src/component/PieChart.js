import React from "react";
import Chart from "chart.js/auto";
import {Pie} from "react-chartjs-2";

export default function PieChart({ categories, categoryExpenses}) {
    let expenseAmounts = Object.values(categoryExpenses);
      const data = {
          labels: categories,
          datasets: [
            {
              data: expenseAmounts
            },
          ],
        };
    return(
        <div class = "bottom main">
            <h1> Spending Summary</h1>
            <Pie data={data} />
        </div>
    );
}