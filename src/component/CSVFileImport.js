import React, { useState } from "react";
import Papa from "papaparse";
import Cards from "./Cards/Cards";
import PieChart from "./PieChart";
import CalculateExpenses from "../calculationFunctions/CalculateExpenses";
import FileImport from "./FileDragDrop/FileImport";
export default function CSVFileImport(){

const [file, setFile] = useState();
const [totalExpenses, setTotalExpenses] = useState(0.00);
const [categories, setCategories] = useState();
const [categoryExpenses, setCategoryExpenses] = useState();
const [render, setRender] = useState(false);

  const handleOnChange = (e) => {
      console.log(e.target.files[0])
      setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e) => {
      e.preventDefault();
      if (file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              let data = CalculateExpenses(results.data);
              setTotalExpenses(data.totalExpenses);
              setCategories(data.categories);
              setCategoryExpenses(data.categoryExpenses);
              setRender(true)
            },
      });
    }
  };

return(
  <div class ="card-area">
    <form>
          <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
     </form>
     {render ? <Cards totalExpenses = {totalExpenses}/>  : ''} 
     {render ? <PieChart categoryExpenses={categoryExpenses} categories={categories} />: ""}     
     <FileImport />  
  </div>
);

}