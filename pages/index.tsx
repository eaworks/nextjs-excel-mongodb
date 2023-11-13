"use strict"
import { Product } from '@/lib/models/product.models';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import React, { useState } from 'react';
import * as XLSX from "xlsx";
import { connectToDatabase } from '../lib/mongodb';
import { webpack } from 'next/dist/compiled/webpack/webpack';



const ImportExcel = () => {


  const [excelData, setExcelData] = useState<typeof Product[]>([]);

  async function handleFileChange(e: any) {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    try {
      reader.onload = async (e) => {
        const file = e.target?.result;
    const workbook = XLSX.read(file, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data:typeof Product[] = XLSX.utils.sheet_to_json(sheet);
    const { db } = await connectToDatabase();
    await db.collection('Product').insertMany(data);
        // const excelData = e.target?.result;
        // const workbook = XLSX.read(excelData, { type: "binary" });
        // // let data:any = [];
        // const sheets = workbook.SheetNames;
        // const data = XLSX.utils.sheet_to_json(sheets);


        // const items = data.map((Product) => ({
        //   name: Product.name,
        //   price: Product.price,
        //   category: Product.category,
        // }));

        // await Product.insertMany(items);
          
        // for (let i = 0; i < sheets.length; i++) {
        //   const temp = XLSX.utils.sheet_to_json(
        //     workbook.Sheets[workbook.SheetNames[i]])
        //   temp.forEach((res) => {
        //     data.push(res)
        //   })
          console.log(data);  
        //   return data;
        // }
        // const sheetName = workbook.SheetNames[0];
        // const sheet = workbook.Sheets[sheetName];
        // const parselData:typeof Product[] = XLSX.utils.sheet_to_json(sheet);

        // await Product.insertMany(parselData);

        // setExcelData(parselData); 

        // connectToDB()
        // await collection.insertMany(parselData);


      }
    } catch (error) {
      console.log(error);

    }

    //   const [excelData, setExcelData] = useState<Product[]>([]);

    //   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // Read the Excel file
    //     const excelFile = event.target.files?.[0];
    //     if (!excelFile) {
    //       return;
    //     }
    // console.log(excelFile)
    // const excelData = await XLSX.readFile(excelFile);

    // // Save the Excel data to MongoDB
    // await Product.create(excelData);

    // // Display the Excel data on the page
    // setExcelData(excelData);



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

