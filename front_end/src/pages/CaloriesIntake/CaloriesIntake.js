import React, { useEffect, useState } from "react";
import "./CaloriesIntake.css";
import NutrientDonut from "../../components/NutrientDonut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import FCD from "../../service/FCDLogic";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import DailyLogService from "../../service/DailyLogService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ProductSearch from "../../components/ProductSearch";
import NutrientTable from "../../components/NutrientTable";
import ProductHistory from "../../components/ProductHistory";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";

const options = {
  borderWidth: 1,
  fullSize: true,
  radius: 200,
  cutout: "50%",
  rotation: 90,
};

function CaloriesIntake() {
  const [date, setDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? dayjs(savedDate) : dayjs();
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [totalNutrients, setTotalNutrients] = useState({});
  const [nutrients, setNutrients] = useState({});
  const [portions, setPortions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    const data = {
      date: date.format("YYYY-MM-DD"),
      products: [
        {
          name: selectedProduct.description,
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
      setMessage(
        `Error posting data: ${response.status} ${response.statusText}`
      );
      setSeverity("error");
      setSnackbarOpen(true);
    }
    fetchAllNutrients();

  };

  const handleDelete = async (productId) => {

    const token = localStorage.getItem("token");
    const response = await DailyLogService.deleteLog(
      productId,
      date.format("YYYY-MM-DD"),
      token
    );

    if (response.status === 200) {
      setMessage("Product successfully deleted from history");
      setSeverity("success");
      setSnackbarOpen(true);
      fetchHistory(date);
    } else {
      setMessage(
        `Error deleting data: ${response.status} ${response.statusText}`
      );
      setSeverity("error");
      setSnackbarOpen(true);
    }
    fetchAllNutrients();

  };

  const fetchHistory = async (date) => {
    const token = localStorage.getItem("token");
    const response = await DailyLogService.getLogByDate(
      date.format("YYYY-MM-DD"),
      token
    );
    if (response.status === 200) {
      const data = await response.data;
      setHistory(data);
      fetchNutrientsForProducts(data);
    } else {
      console.error(`Error fetching history: ${response.statusText}`);
    }
  };

  const fetchNutrientsForProducts = async (data) => {
    const nutrientPromises = data.map(async (log) => {
      const productPromises = log.products.map(async (product) => {
        let nutrientsArr;
        if (product.gram > 0) {
          nutrientsArr = await FCD.calculate_nutrients_gram(
            product.fdcId,
            product.gram
          );
        } else if (product.portion) {
          nutrientsArr = await FCD.calculate_nutrients(
            product.fdcId,
            product.portion,
            product.quantity
          );
        } else {
          const servingSize = product.gram || selectedProduct.servingSize;
          nutrientsArr = await FCD.calculate_nutrients_gram(
            product.fdcId,
            servingSize * product.quantity
          );
        }
        return nutrientsArr;
      });
      const productNutrients = await Promise.all(productPromises);
      return productNutrients.flat();
    });

    const allNutrients = await Promise.all(nutrientPromises);
    // Assuming you want to sum all nutrients
    const totalNutrients = allNutrients.flat().reduce((acc, curr) => {
      if (acc[curr.label]) {
        acc[curr.label] += curr.intake;
      } else {
        acc[curr.label] = curr.intake;
      }
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchHistory(date);
    fetchAllNutrients();
  }, [date]);

  const fetchAllNutrients= async () => {
      const token = localStorage.getItem("token");

      try {
        const nutrient = await FCD.calculateDailyNutrients(date.format("YYYY-MM-DD"), token);
        setTotalNutrients(nutrient);
      } catch (error) {
        console.error("Error fetching daily nutrients:", error);
      }
  }; 

  useEffect(() => {
    fetchAllNutrients();

    if (selectedProduct) {
     
      const fetchPortionsAndNutrients = async () => {

        const portionsObj = await FCD.get_measures(selectedProduct.fdcId);
        const portions = Object.keys(portionsObj);
        setPortions(portions);
        if (portions.length === 0) {
          const nutrientsArr = await FCD.calculate_nutrients_gram(
            selectedProduct.fdcId,
            selectedProduct.servingSize
          );
          const nutrients = nutrientsArr.reduce((acc, nutrient) => {
            acc[nutrient.label] = `${nutrient.intake} ${nutrient.unit}`;
            return acc;
          }, {});
          setNutrients(nutrients);
        }
        setGrams(selectedProduct.servingSize);
      };
      fetchPortionsAndNutrients();
      setQuantity(1);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && (selectedPortion || portions.length === 0)) {
      const fetchNutrients = async () => {
        let nutrientsArr;
        if (grams > 0) {
          nutrientsArr = await FCD.calculate_nutrients_gram(
            selectedProduct.fdcId,
            grams
          );
        } else if (portions.length > 0) {
          nutrientsArr = await FCD.calculate_nutrients(
            selectedProduct.fdcId,
            selectedPortion,
            quantity
          );
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
  }, [selectedProduct, selectedPortion, quantity, grams, portions]);

  return (
    <div>
      <Top_Bar pageValue={1} />
      <div className="calendar">
        <Calendar date={date} onDateChange={setDate} />
      </div>
      <div className="donut"><NutrientDonut
        selectedDate={date}
        options={options}
        text={""}
        height={"500px"}
        width={"500px"}
        tooltip={true}
        anim={false}
        totalNutrients={totalNutrients}
      /> </div>
      
      <div className="menu">
        <ProductSearch onProductSelect={setSelectedProduct} />
        <div className="search-box">
          {selectedProduct && (
            <div>
              {portions.length > 0 ? (
                <>
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
                </>
              ) : (
                <div>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    sx={{ marginLeft: 2, marginTop: 3, width: 110 }}
                  />
                  <TextField
                    type="number"
                    label="Grams"
                    value={grams}
                    onChange={(event) => setGrams(event.target.value)}
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 3 }}
                  />
                </div>
              )}
              <div className="center" style={{height:30}}>              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{ flex: "center", marginTop: 3, marginLeft: 2, width: 225 }}
              >
                Confirm
              </Button></div>

            </div>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity={severity} sx={{ width: "100%" }}>
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
          <NutrientTable
            nutrients={nutrients}
            selectedProduct={selectedProduct}
            selectedDate={date}
            totalNutrients={totalNutrients}
          />
        </div>
      </div>
    </div>
  );
}

export default CaloriesIntake;
