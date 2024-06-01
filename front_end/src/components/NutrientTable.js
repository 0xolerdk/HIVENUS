import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const nutrientLabels = [
  "Protein",
  "Total lipid (fat)",
  "Carbohydrate, by difference",
  "Energy",
  "Sugars, total including NLEA",
  "Fiber, total dietary",
  "Calcium, Ca",
  "Iron, Fe",
  "Sodium, Na",
  "Vitamin A, IU",
  "Vitamin C, total ascorbic acid",
  "Cholesterol",
];

const nutrientUnits = {
  "Protein": "g",
  "Total lipid (fat)": "g",
  "Carbohydrate, by difference": "g",
  "Energy": "kcal",
  "Sugars, total including NLEA": "g",
  "Fiber, total dietary": "g",
  "Calcium, Ca": "mg",
  "Iron, Fe": "mg",
  "Sodium, Na": "mg",
  "Vitamin A, IU": "IU",
  "Vitamin C, total ascorbic acid": "mg",
  "Cholesterol": "mg",
};

function NutrientTable({ nutrients, totalNutrients, selectedProduct }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nutrient</TableCell>
            <TableCell align="right">Intake</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutrientLabels.map((label) => {
            console.log(nutrients);
            const nutrient = selectedProduct ? nutrients[label] : totalNutrients[label];
            const unit = nutrientUnits[label] || '';
            return nutrient !== undefined ? (
              <TableRow key={label}>
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell align="right">{`${parseFloat(nutrient).toFixed(2)} ${unit}`}</TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NutrientTable;
