import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

function NutrientTable({ nutrients }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nutrient</TableCell>
            <TableCell align="right">Intake</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutrientLabels.map((label) => {
            const nutrient = nutrients[label];
            return nutrient ? (
              <TableRow key={label}>
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell align="right">{nutrient}</TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NutrientTable;
