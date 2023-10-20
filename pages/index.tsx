import React, { useState } from 'react';
import * as XLSX from "xlsx";

interface Product {
  id:string
}


const ImportExcel: React.FC = () => {


  const [excelData, setExcelData] = useState<Product[]>([]);

  const handleFileChange = (e: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);

    reader.onload = (e) => {
      const excelData = e.target?.result;
      const workbook = XLSX.read(excelData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parselData:Product[] = XLSX.utils.sheet_to_json(sheet);

      setExcelData(parselData);

      // console.log(parselData);
    }

  };

  return (
    <div>
      <h1>Import Excel</h1>
      <input type="file" accept='.xlsx, .xls' onChange={handleFileChange} />

      {excelData.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              {Object.keys(excelData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))

            }
          </tbody>
        </table>

      )}
    </div>
  );
};

export default ImportExcel;

