import React, { useEffect, useState } from "react";
import "./CaloriesIntake.css";
import Donut from "../../components/Donut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import FCD from "../../service/FCDLogic";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import dayjs from 'dayjs';
import DailyLogService from "../../service/DailyLogService";
import { Alert, AlertTitle } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProductSearch from "../../components/ProductSearch";
import NutrientTable from "../../components/NutrientTable";
import ProductHistory from "../../components/ProductHistory";
import TextField from '@mui/material/TextField';


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
  cutout: "85%",
  rotation: 90,
};

function CaloriesIntake() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [nutrients, setNutrients] = useState([]);
  const [portions, setPortions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    const data = {
      date: date.format("YYYY-MM-DD"),
      products: [
        {
          name: selectedProduct.name,
          fdcId: selectedProduct.fdcId,
          portion: selectedPortion,
          quantity: quantity,
          gram: grams,
        },
      ],
      activities: [],
    };

    const response = await DailyLogService.addLog(data, token);

    if (response.ok) {
      setMessage("Product successfully added to statistics");
      fetchHistory(date);
    } else {
      setMessage(`Error posting data: ${response.status} ${response.statusText}`);
    }
  };

  const fetchHistory = async (date) => {
    const token = localStorage.getItem("token");
    const response = await DailyLogService.getLogByDate(date.format("YYYY-MM-DD"), token);
    if (response.status === 200) {
      const data = await response.data;
      setHistory(data);
    } else {
      console.error(`Error fetching history: ${response.statusText}`);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      const fetchPortionsAndNutrients = async () => {
        const portionsObj = await FCD.get_measures(selectedProduct.fdcId);
        const portions = Object.keys(portionsObj);
        setPortions(portions);
        if (selectedPortion) {
          let nutrientsArr;
          if (grams > 0) {
            nutrientsArr = await FCD.calculate_nutrients_gram(selectedProduct.fdcId, grams);
          } else {
            nutrientsArr = await FCD.calculate_nutrients(selectedProduct.fdcId, selectedPortion, quantity);
          }
          if (Array.isArray(nutrientsArr)) {
            const nutrients = nutrientsArr.reduce((acc, nutrient) => {
              acc[nutrient.label] = `${nutrient.intake} ${nutrient.unit}`;
              return acc;
            }, {});
            setNutrients(nutrients);
          } else {
            console.error("Error: nutrientsArr is not an array:", nutrientsArr);
          }
        }
      };
      fetchPortionsAndNutrients();
    }
  }, [selectedProduct, selectedPortion, quantity, grams]);

  useEffect(() => {
    fetchHistory(date);
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Top_Bar pageValue={1} />
        <div className="donuts">
          <Donut data={data3} options={options1} text={""} height={"500px"} width={"500px"} />
        </div>
        <div className="search-box">
          <ProductSearch onProductSelect={setSelectedProduct} />
        </div>
        <div className="search-box">
          {selectedProduct && (
            <div>
              <div>
                <Select
                  className="center"
                  label="Portion"
                  value={selectedPortion}
                  sx={{ marginTop: 3, height: 55, marginLeft: 2 }}
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
                  sx={{ marginLeft: 2, marginTop: 3, width: 110 }}
                  onChange={(event) => setQuantity(event.target.value)}
                />
                <TextField
                  type="number"
                  label="Grams"
                  value={grams}
                  onChange={(event) => setGrams(event.target.value)}
                  sx={{ marginLeft: 2, marginRight: 2, marginTop: 3 }}
                />
              </div>
              <div className="">
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  sx={{ marginTop: 3, marginLeft: 2, width: 225 }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ marginTop: 3 }} />}
          />
          {message && (
            <Alert severity="success" sx={{ marginTop: 3, width: 300 }}>
              <AlertTitle>Success</AlertTitle>
              {message}
            </Alert>
          )}
          {selectedProduct && selectedPortion && <NutrientTable nutrients={nutrients} />}
          <ProductHistory history={history} onProductSelect={setSelectedProduct} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default CaloriesIntake;
