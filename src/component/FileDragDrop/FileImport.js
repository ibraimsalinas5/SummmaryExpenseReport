import React from "react";
import { useState } from "react";
import Papa from "papaparse";
import ReadFile from "./ReadFile";
import CapOne from "../../calculationFunctions/CapitalOne/CapOne";

export default function FileImport({
  addTotalExpenses,
  totalExpenses,
  addIncome,
  income,
  addCategoryExpenses,
  changeRender,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, addFiles] = useState([]);

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
    if (e.dataTransfer.files[0]) {
      ReadFile(e.dataTransfer.files[0])
        .then((result) => {
          addFiles([...files, { content: result[0], bank: result[1] }]);
        })
        .catch((error) => {
          console.error(error);
        });
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
        results.forEach((result) => {
          let data;
          if (files[i].bank.includes("Capital")) {
            data = CapOne(result);
          } else if (files[i].bank.includes("Chase")) {
          }
          addTotalExpenses(data.totalExpenses, totalExpenses);
          addCategoryExpenses(data.categoryExpenses);
          addIncome(data.totalWages);
          i++;
        });
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
      <input type="file" id="input-file-upload" multiple={false} />
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
