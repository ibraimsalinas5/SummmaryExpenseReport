import React from "react";
import { useState } from "react";
import Papa from "papaparse";
import CalculateExpenses from "../../calculationFunctions/CalculateExpenses";
import ReadFile from "./ReadFile";

export default function FileImport() {
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      ReadFile(e.dataTransfer.files[0])
        .then((result) => {
          addFiles([...files, result]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let filesData = [];
    Promise.all(
      [...files].map(
        (file) =>
          new Promise((resolve, reject) =>
            Papa.parse(file, {
              header: true,
              skipEmptyLines: true,
              complete: resolve, // Resolve each promise
              error: reject,
            })
          )
      )
    )
      .then((results) => {
        results.forEach((result) => {
          filesData.push(result);
        });
        let data = CalculateExpenses(filesData);
        //setTotalExpenses(data.totalExpenses);
        //setCategories(data.categories);
        //setCategoryExpenses(data.categoryExpenses);
        //setRender(true);
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
            Click To Calculate expense
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
