import React from "react";
import { useState } from "react";
import FileImport from "./FileDragDrop/FileImport";
import CalculateExpenses from "../../calculationFunctions/CalculateExpenses";

export default function FileImport() {
  const [dragActive, setDragActive] = useState(false);
  const [files, addFiles] = useState();

  let handleDrag = (e) =>{
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
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      addFiles(e.dataTransfer.files[0]);
      console.log(files);
    }
  };

  let handleSubmit = (files) => {
    let filesData = [];
    Promise.all([...files].map((file) =>
    new Promise((resolve, reject) =>
        parse(file, {
        header: true,
        complete: resolve,  // Resolve each promise
        error: reject,
      }),
    )),
  ).then((results) => {
    results.forEach((result, index) => {
      filesData.push(result)
    })
        doSomething(filesData)
  }).catch((err) => console.log('Something went wrong:', err))
    let data = CalculateExpenses(filesData.data);   
     setTotalExpenses(data.totalExpenses);
     setCategories(data.categories);
     setCategoryExpenses(data.categoryExpenses);
     setRender(true);
  };

    return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input type="file" id="input-file-upload" multiple={true} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <p>Drag and drop your files here</p>
            <button className="upload-button" onSubmit={handleSubmit}>Click To Calculate expense</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}  onDrop={handleDrop}></div> }
      </form>
    );
  };