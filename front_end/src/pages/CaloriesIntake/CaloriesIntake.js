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
import Button from "@mui/material/Button";
import dayjs from 'dayjs';
import DailyLog from "../../service/DailyLogService";
import UserService from "../../service/logRegLogic";



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
  const [quantity, setQuantity] = useState(1); 
  const [grams, setGrams] = useState(0);

  const getData = async (searchTerm) => {
    const foods = await FCD.find(searchTerm);
    const updatedOptions = foods.map((food) => {
      return { name: food.description, fdcId: food.fdcId };
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

  const handleConfirm = async () => {
    const token = localStorage.getItem('token')
    const data = {
        date: dayjs().format('YYYY-MM-DD'),
        products: [{
          "name" : selectedProduct.name,
          "fdcId" : selectedProduct.fdcId,
          "portion": selectedPortion,
          "quantity": quantity,
          "gram": grams,
        }
          
        ],
        activities: []
    };

    const response = DailyLog.addLog(data, token)

    if (response.ok) {
        console.log('Data posted successfully');
    } else {
        console.error('Error posting data:', response.status, response.statusText);
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
          let nutrientsArr;
          if (grams > 0) {
            // If grams is greater than 0, use the calculate_nutrients_gram function
            nutrientsArr = await FCD.calculate_nutrients_gram(
              selectedProduct.fdcId,
              grams // Pass the grams to the calculate_nutrients_gram function
            );
          } else {
            // Otherwise, use the calculate_nutrients function
            nutrientsArr = await FCD.calculate_nutrients(
              selectedProduct.fdcId,
              selectedPortion,
              quantity // Pass the quantity to the calculate_nutrients function
            );
          }
          if (Array.isArray(nutrientsArr)) {
            const nutrients = nutrientsArr.reduce((acc, nutrient) => {
              acc[nutrient.label] = `${nutrient.intake} ${nutrient.unit}`;
              return acc;
            }, {});
            setNutrients(nutrients);
          } else {
            console.error('Error: nutrientsArr is not an array:', nutrientsArr);
          }
          
        }
      };
      fetchPortionsAndNutrients();
    }
  }, [selectedProduct, selectedPortion, quantity, grams]);

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
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Prduct" variant="outlined" />
          )}
        />
      </div>
      <div className="search-box">
        
        {selectedProduct && (
          <div>
          <div>
            <Select
              className="center"
              label="Portion"
              value={selectedPortion}
              sx={{marginTop:3, height:55, marginLeft:2}}
              onChange={(event) => setSelectedPortion(event.target.value)}
            >
              {portions.map((portion) => (
                <MenuItem key={portion} value={portion}>
                  {portion}
                </MenuItem>
              ))}
            </Select>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              sx={{marginLeft:2,marginTop:3, width:110}}
              onChange={(event) => setQuantity(event.target.value)}

            />
            <TextField
              type="number"
              label="Grams"
              value={grams}
              onChange={(event) => setGrams(event.target.value)}
              sx={{marginLeft:2, marginRight:2, marginTop:3}}
            />
            
          </div>
          <div className="">
            <Button variant="contained" onClick={handleConfirm}
             sx={{marginTop:3, marginLeft:2, width: 225}}
             >
              Confirm
            </Button>
          </div>
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
