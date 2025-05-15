import React from "react";

export default function CsvPreviewTable({ headers, data }) {
  return (
    <div className="overflow-auto max-h-96 mt-4 border rounded">
      <table className="min-w-full text-sm table-auto">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-2 py-1 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-2 py-1 border">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
