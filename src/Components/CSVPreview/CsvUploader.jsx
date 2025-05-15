import React, { useState } from "react";
import Papa from "papaparse";
import CsvPreviewTable from "./CsvPreviewTable";

export default function CsvUploader() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setHeaders(Object.keys(results.data[0]));
        setData(results.data.slice(0, 100)); // Preview first 100 rows
      }
    });
  };

  return (
    <div className="p-4">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && <CsvPreviewTable headers={headers} data={data} />}
    </div>
  );
}
