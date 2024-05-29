import React, { useEffect, useState } from "react";
import "./CaloriesIntake.css";
import Donut from "../../components/Donut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FCD from "../../service/FCDLogic";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const data3 = {
  labels: ["Green", "Blue", "Pink", "Yellow", "Grey"],
  datasets: [
    {
      data: [15, 20, 20, 50, 30],
      backgroundColor: ["#4CAF50", "#00BCD4", "#E91E63", "#FFC107", "#9E9E9E"],
    },
  ],
};

const options1 = {
  borderWidth: 1,
  fullSize: true,
  radius: 180,
  cutout: "85%", // This changes the radius of the Doughnut hole.
  rotation: 90, // This rotates the chart by 90 degrees.
  // Add other options here
};

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

function CaloriesIntake() {
  const [options, setOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [nutrients, setNutrients] = useState([]);
  const [portions, setPortions] = useState([]);

  const getData = async (searchTerm) => {
    const foods = await FCD.find(searchTerm);
    const updatedOptions = foods.map((food) => {
      return { title: food.description, fdcId: food.fdcId };
    });
    setOptions(updatedOptions);
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      const fetchPortionsAndNutrients = async () => {
        const portionsObj = await FCD.get_measures(selectedProduct.fdcId);
        console.log(portionsObj);
        const portions = Object.keys(portionsObj);
        setPortions(portions);
        if (selectedPortion) {
          const nutrientsArr = await FCD.calculate_nutrients(
            selectedProduct.fdcId,
            selectedPortion
          );
          const nutrients = nutrientsArr.reduce((acc, nutrient) => {
            acc[nutrient.label] = `${nutrient.intake} ${nutrient.unit}`;
            return acc;
          }, {});
          setNutrients(nutrients);
        }
      };
      fetchPortionsAndNutrients();
    }
  }, [selectedProduct, selectedPortion]);

  return (
    <div>
      <Top_Bar pageValue={1} />
      <div className="donuts">
        <Donut
          data={data3}
          options={options1}
          text={""}
          height={"500px"}
          width={"500px"}
        />
      </div>
      <div className="search-box">
        <Autocomplete
          id="combo-box-demo"
          options={options}
          onInputChange={onInputChange}
          onChange={async (event, value) => {
            setSelectedProduct(value);
          }}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      </div>
      <div className="search-box">
        
        {selectedProduct && (
          <div>
            <Select
              className="center"
              label="Portion"
              value={selectedPortion}
              sx={{height:50}}
              onChange={(event) => setSelectedPortion(event.target.value)}
            >
              {portions.map((portion) => (
                <MenuItem key={portion} value={portion}>
                  {portion}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
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
      </div>
    </div>
  );
}

export default CaloriesIntake;
