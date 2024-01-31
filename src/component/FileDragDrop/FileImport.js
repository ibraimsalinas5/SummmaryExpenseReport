import React from "react";
import { useState } from "react";
import Papa from "papaparse";
import ReadFile from "./ReadFile";
import CapOne from "../../calculationFunctions/CapitalOne/CapOne";
import Chase from "../../calculationFunctions/Chase/Chase";
import CombineCategoryExpense from "../../calculationFunctions/HelperFunctions/CombineCategoryExpenses";

export default function FileImport({
  addTotalExpenses,
  addIncome,
  addCategoryExpenses,
  changeRender,
  addCsvData,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, addFiles] = useState([]);
  let data = [];

  let handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  let handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      [...e.dataTransfer.files].map((file) =>
        ReadFile(file)
          .then((result) => {
            addFiles([...files, { content: result[0], bank: result[1] }]);
          })
          .catch((error) => {
            console.error(error);
          })
      );
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    Promise.all(
      [...files].map(
        (file) =>
          new Promise((resolve, reject) =>
            Papa.parse(file.content, {
              header: true,
              skipEmptyLines: true,
              complete: resolve, // Resolve each promise
              error: reject,
            })
          )
      )
    )
      .then((results) => {
        let i = 0;
        let totalExpense = 0.0;
        let totalIncome = 0.0;
        let totalCategories = [];
        let csvData = [];
        results.forEach((result) => {
          console.log(files[i].bank);
          if (files[i].bank.includes("Capital")) {
            data.push(CapOne(result));
          } else if (files[i].bank.includes("Chase")) {
            data.push(Chase(result));
          }
          csvData.push(result.data);
          i++;
        });
        data.forEach((file) => {
          totalExpense += file.totalExpenses;
          totalIncome += file.totalWages;
          totalCategories.push(file.categoryExpenses);
        });
        addTotalExpenses(totalExpense);
        addIncome(totalIncome);
        let combineCategoryExpense = CombineCategoryExpense(totalCategories);
        addCategoryExpenses(combineCategoryExpense);
        addCsvData(csvData);
        changeRender(true);
      })
      .catch((err) => console.log("Something went wrong:", err));
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
    >
      <input type="file" id="input-file-upload" multiple={true} />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your files here</p>
          <button className="upload-button" onSubmit={handleSubmit}>
            Click here to get summary
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
}
