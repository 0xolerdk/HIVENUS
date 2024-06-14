import React, { useEffect, useState } from "react";
import "./CaloriesIntake.css";
import NutrientDonut from "../../components/CaloriesIntake/NutrientDonut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import FCD from "../../services/FCDLogic";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import ProductsService from "../../services/ProductsService";
import ProductSearch from "../../components/CaloriesIntake/ProductSearch";
import NutrientTable from "../../components/CaloriesIntake/NutrientTable";
import ProductHistory from "../../components/CaloriesIntake/ProductHistory";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import CustomSnackbar from "../../components/CustomSnackbar"; // Import Custom Snackbar

const options = {
  borderWidth: 1,
  fullSize: true,
  radius: 200,
  cutout: "50%",
  rotation: 0,
};

function CaloriesIntake() {
  const [date, setDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? dayjs(savedDate) : dayjs();
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState("");
  const [totalNutrients, setTotalNutrients] = useState({});
  const [nutrients, setNutrients] = useState({});
  const [portions, setPortions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [isFromHistory, setIsFromHistory] = useState(false);

  const handleConfirm = async () => {
    if (isFromHistory) return;

    const token = localStorage.getItem("token");
    const data = {
      name: selectedProduct.description,
      fdcId: selectedProduct.fdcId,
      portion: selectedPortion,
      quantity: quantity,
      gram: grams,
    };

    const response = await ProductsService.addProductByDate(
      date.format("YYYY-MM-DD"),
      data,
      token
    );

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
    const response = await ProductsService.deleteProductByDate(
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
    const response = await ProductsService.getProductsByDate(
      date.format("YYYY-MM-DD"),
      token
    );
    if (response.status === 200) {
      const data = await response.data;
      setHistory(data);
      setTotalNutrients(FCD.fetchNutrientsForProducts(data, selectedProduct));
    } else {
      console.error(`Error fetching history: ${response.statusText}`);
    }
  };

  useEffect(() => {
    fetchHistory(date);
    fetchAllNutrients();
  }, [date]);

  const fetchAllNutrients = async () => {
    const token = localStorage.getItem("token");

    try {
      const nutrient = await FCD.calculateDailyNutrients(
        date.format("YYYY-MM-DD"),
        token
      );
      setTotalNutrients(nutrient);
    } catch (error) {
      console.error("Error fetching daily nutrients:", error);
    }
  };

  const calculateNutrients = async (product, portion, grams, quantity) => {
    try {
      let nutrientsArr;
      if (grams > 0) {
        nutrientsArr = await FCD.calculate_nutrients_gram(product.fdcId, grams);
      } else if (portion) {
        nutrientsArr = await FCD.calculate_nutrients(
          product.fdcId,
          portion,
          quantity
        );
      } else {
        nutrientsArr = await FCD.calculate_nutrients_gram(product.fdcId, grams);
      }

      if (!Array.isArray(nutrientsArr)) {
        throw new Error("Invalid response from FCD service");
      }

      const nutrients = nutrientsArr.reduce((acc, nutrient) => {
        acc[nutrient.label] = nutrient.intake;
        return acc;
      }, {});
      setNutrients(nutrients);
    } catch (error) {
      console.error("Error calculating nutrients:", error);
      setNutrients({});
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      const fetchPortionsAndNutrients = async () => {
        const portionsObj = await FCD.get_measures(selectedProduct.fdcId);
        const portions = Object.keys(portionsObj);
        setPortions(portions);
        if (portions.length === 0) {
          calculateNutrients(selectedProduct, "", grams, quantity);
        } else {
          calculateNutrients(selectedProduct, selectedPortion, grams, quantity);
        }
      };
      fetchPortionsAndNutrients();
    }
  }, [selectedProduct, selectedPortion, grams, quantity]);

  const handleProductSelect = (productId) => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setIsFromHistory(false);
      setSelectedPortion("");
      setQuantity(1);
      setGrams(0);
    } else {
      const product = history.find((item) => item.id === productId);
      if (product) {
        setSelectedProduct(product);
        setIsFromHistory(true); // Mark as selected from history
        if (product.portion) {
          console.log("Portion selected:", product.portion);
          setSelectedPortion(product.portion);
        }
        setQuantity(product.quantity);
        setGrams(product.gram); // Adjust grams calculation here
      }
    }
  };

  return (
    <div>
      <Top_Bar pageValue={1} />
      <div className="calendar">
        <Calendar date={date} onDateChange={setDate} />
      </div>
      <div className="donut">
        <NutrientDonut
          selectedDate={date}
          options={options}
          text={""}
          height={"500px"}
          width={"500px"}
          tooltip={true}
          anim={false}
          totalNutrients={totalNutrients}
        />
      </div>
      <div className="menu">
        <ProductSearch
          onProductSelect={(product) => {
            setSelectedProduct(product);
            setIsFromHistory(false);
            setSelectedPortion("");
            setQuantity(1);
            setGrams(product.servingSize);
          }}
        />
        <div className="search-box">
          {selectedProduct && (
            <div>
              {!isFromHistory && portions.length > 0 ? (
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
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  />
                  <TextField
                    type="number"
                    label="Grams"
                    value={grams}
                    onChange={(event) => setGrams(Number(event.target.value))}
                    sx={{ marginLeft: 2, marginRight: 2, marginTop: 3 }}
                  />
                  <div className="center" style={{ height: 30 }}>
                    <Button
                      variant="contained"
                      onClick={handleConfirm}
                      sx={{
                        flex: "center",
                        marginTop: 3,
                        marginLeft: 2,
                        width: 225,
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </>
              ) : (
                !isFromHistory && (
                  <div>
                    <TextField
                      type="number"
                      label="Grams"
                      value={grams}
                      onChange={(event) => setGrams(Number(event.target.value))}
                      sx={{ marginLeft: 2, marginRight: 2, marginTop: 3 }}
                    />
                    <div className="center" style={{ height: 30 }}>
                      <Button
                        variant="contained"
                        onClick={handleConfirm}
                        sx={{
                          flex: "center",
                          marginTop: 3,
                          marginLeft: 2,
                          width: 225,
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          <CustomSnackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={message}
            severity={severity}
          />
        </div>
      </div>
      <div className="main-container">
        <div className="left-container">
          <ProductHistory
            history={history}
            onDelete={handleDelete}
            onProductSelect={handleProductSelect}
          />
        </div>
        <div className="right-container">
          <NutrientTable
            nutrients={selectedProduct ? nutrients : totalNutrients}
          />
        </div>
      </div>
    </div>
  );
}

export default CaloriesIntake;
