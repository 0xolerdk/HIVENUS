import React, { useEffect, useState } from "react";
import "./CaloriesIntake.css";
import NutrientDonut from "../../components/NutrientDonut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import FCD from "../../service/FCDLogic";
import Button from "@mui/material/Button";
import dayjs from 'dayjs';
import DailyLogService from "../../service/DailyLogService";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductSearch from "../../components/ProductSearch";
import NutrientTable from "../../components/NutrientTable";
import ProductHistory from "../../components/ProductHistory";
import DateSelector from "../../components/DateSelector";
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from "@mui/material";

function CaloriesIntake() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState("");
  const [nutrients, setNutrients] = useState({});
  const [totalNutrients, setTotalNutrients] = useState({});
  const [portions, setPortions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [donutData, setDonutData] = useState({ labels: [], datasets: [] });

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

    if (response.status === 200) {
      setMessage("Product successfully added to statistics");
      setSeverity("success");
      setSnackbarOpen(true);
      fetchHistory(date);
    } else {
      setMessage(`Error posting data: ${response.status} ${response.statusText}`);
      setSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    const response = await DailyLogService.deleteLog(productId, date.format("YYYY-MM-DD"), token);

    if (response.status==200) {
      setMessage("Product successfully deleted from history");
      setSeverity("success");
      setSnackbarOpen(true);
      fetchHistory(date);
    } else {
      setMessage(`Error deleting data: ${response.status} ${response.statusText}`);
      setSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchHistory = async (date) => {
    const token = localStorage.getItem("token");
    const response = await DailyLogService.getLogByDate(date.format("YYYY-MM-DD"), token);
    if (response.status === 200) {
      const data = await response.data;
      console.log("Fetched history data:", data); // Debug log
      setHistory(data);
      fetchNutrientsForProducts(data);
    } else {
      console.error(`Error fetching history: ${response.statusText}`);
    }
  };

  const fetchNutrientsForProducts = async (data) => {
    const nutrientPromises = data.map(async (log) => {
      const productPromises = log.products.map(async (product) => {
        console.log(`Fetching nutrients for product: ${product.name}, portion: ${product.portion}, quantity: ${product.quantity}, grams: ${product.gram}`); // Debug log
        let nutrientsArr;
        if (product.gram > 0) {
          nutrientsArr = await FCD.calculate_nutrients_gram(product.fdcId, product.gram);
        } else {
          nutrientsArr = await FCD.calculate_nutrients(product.fdcId, product.portion, product.quantity);
        }
        console.log(`Fetched nutrients for product: ${product.name}`, nutrientsArr); // Debug log
        return nutrientsArr;
      });
      const productNutrients = await Promise.all(productPromises);
      return productNutrients.flat();
    });

    const allNutrients = await Promise.all(nutrientPromises);
    console.log("All nutrients for the day:", allNutrients); // Debug log
    calculateTotalNutrients(allNutrients.flat());
  };

  const calculateTotalNutrients = (nutrients) => {
    const totals = nutrients.reduce((acc, nutrient) => {
      if (!acc[nutrient.label]) {
        acc[nutrient.label] = 0;
      }
      acc[nutrient.label] += parseFloat(nutrient.intake) || 0;
      return acc;
    }, {});

    console.log("Calculated total nutrients:", totals); // Debug log
    setTotalNutrients(totals);
  };

  useEffect(() => {
    fetchHistory(date);
  }, [date]);

  useEffect(() => {
    if (selectedProduct) {
      const fetchPortionsAndNutrients = async () => {
        const portionsObj = await FCD.get_measures(selectedProduct.fdcId);
        const portions = Object.keys(portionsObj);
        setPortions(portions);
      };
      fetchPortionsAndNutrients();
      setQuantity(1);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && selectedPortion) {
      const fetchNutrients = async () => {
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
      };
      fetchNutrients();
    }
  }, [selectedProduct, selectedPortion, quantity, grams]);

  return (
    <div>
      <Top_Bar pageValue={1} />
      <NutrientDonut data={donutData} />
      <div className="menu">
        <ProductSearch onProductSelect={setSelectedProduct} />
        <div className="search-box">
          {selectedProduct && (
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
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{ marginTop: 3, marginLeft: 2, width: 225 }}
              >
                Confirm
              </Button>
              <DateSelector date={date} setDate={setDate} />
            </div>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
      <div className="main-container">
        <div className="left-container">
          <ProductHistory
            history={history}
            onDelete={handleDelete}
            onProductSelect={setSelectedProduct}
            onPortionSelect={setSelectedPortion}
            onQuantitySelect={setQuantity}
            onGramsSelect={setGrams}
            selectedProduct={selectedProduct}
          />
        </div>
        <div className="right-container">
          <NutrientTable nutrients={nutrients} totalNutrients={totalNutrients} selectedProduct={selectedProduct} />
        </div>
      </div>
    </div>
  );
}

export default CaloriesIntake;
