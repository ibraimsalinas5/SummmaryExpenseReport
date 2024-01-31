import { React, useState } from "react";
import "./App.css";
import "./css/DragDropFile.css";
import SummaryReport from "./component/SummaryReport";
import CsvData from "./component/DataDisplay/CsvData";
function App() {
  return (
    <div class="main-area">
      <SummaryReport />
    </div>
  );
}

export default App;
