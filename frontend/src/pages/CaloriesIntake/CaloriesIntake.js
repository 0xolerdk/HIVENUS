import React, { useEffect, useState, useRef } from "react";
import "./CaloriesIntake.css";
import NutrientDonut from "../../components/CaloriesIntake/NutrientDonut";
import TopBar from "../../components/TopBar/TopBar";
import FCDService from "../../services/FCDService";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import ProductsService from "../../services/ProductsService";
import ProductSearch from "../../components/CaloriesIntake/ProductSearch";
import NutrientTable from "../../components/CaloriesIntake/NutrientTable";
import ProductHistory from "../../components/CaloriesIntake/ProductHistory";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import CustomSnackbar from "../../components/CustomSnackbar";

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
  const [calendarKey, setCalendarKey] = useState(0);
  const productSearchRef = useRef();

  useEffect(() => {
    fetchHistory(date);
    fetchAllNutrients();
  }, [date]);

  useEffect(() => {
    if (selectedProduct) {
      const fetchPortionsAndNutrients = async () => {
        try {
          const portionsObj = await FCDService.get_measures(selectedProduct.fdcId);
          const portions = Object.keys(portionsObj);
          setPortions(portions);
          if (portions.length === 0) {
            await calculateNutrients(selectedProduct, "", grams, quantity);
          } else {
            await calculateNutrients(selectedProduct, selectedPortion, grams, quantity);
          }
        } catch (error) {
          console.error("Error fetching portions and nutrients:", error);
        }
      };
      fetchPortionsAndNutrients();
    }
  }, [selectedProduct, selectedPortion, grams, quantity]);

  const fetchHistory = async (date) => {
    try {
      const response = await ProductsService.getProductsByDate(date.format("YYYY-MM-DD"));
      if (response.status === 200) {
        const data = response.data;
        setHistory(data);
        setTotalNutrients(await FCDService.fetchNutrientsForProducts(data, selectedProduct));
      } else {
        console.error(`Error fetching history: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching history: ${error}`);
    }
  };

  const fetchAllNutrients = async () => {
    try {
      const nutrient = await FCDService.calculateDailyNutrients(date.format("YYYY-MM-DD"));
      setTotalNutrients(nutrient);
    } catch (error) {
      console.error("Error fetching daily nutrients:", error);
    }
  };

  const calculateNutrients = async (product, portion, grams=0, quantity) => {
    try {
      let nutrientsArr;
      if (grams > 0) {
        nutrientsArr = await FCDService.calculate_nutrients_gram(product.fdcId, grams*quantity);
      } else if (portion) {
        nutrientsArr = await FCDService.calculate_nutrients(product.fdcId, portion, quantity);
      } else {
        nutrientsArr = await FCDService.calculate_nutrients_gram(product.fdcId, grams*quantity);
      }

      if (!Array.isArray(nutrientsArr)) {
        throw new Error("Invalid response from FCD service");
      }

      const nutrients = nutrientsArr.reduce((acc, nutrient) => {
        acc[nutrient.nutrient.name] = nutrient.intake;
        return acc;
      }, {});
      setNutrients(nutrients);
    } catch (error) {
      console.error("Error calculating nutrients:", error);
      setNutrients({});
    }
  };

  const handleConfirm = async () => {
    if (isFromHistory) return;

    const data = {
      name: selectedProduct.description,
      fdcId: selectedProduct.fdcId,
      portion: selectedPortion,
      quantity: quantity,
      gram: grams,
    };

    try {
      const response = await ProductsService.addProductByDate(date.format("YYYY-MM-DD"), data);
      if (response.status === 200) {
        setMessage("Product successfully added to statistics");
        setSeverity("success");
        setSnackbarOpen(true);
        await fetchHistory(date);
        setCalendarKey((prevKey) => prevKey + 1);
      } else {
        setMessage(`Error posting data: ${response.status} ${response.statusText}`);
        setSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(`Error posting data: ${error}`);
      setMessage(`Error posting data: ${error.message}`);
      setSeverity("error");
      setSnackbarOpen(true);
    }

    setSelectedProduct(null);
    setSelectedPortion("");
    setQuantity(1);
    setGrams(0);
    productSearchRef.current.clearInput();

    await fetchAllNutrients();
  };

  const handleProductSelect = (productId) => {
    const product = history.find((item) => item.id === productId);
    if (product) {
      setSelectedProduct(product);
      setNutrients({});
      setIsFromHistory(true);
      if (product.portion) {
        setSelectedPortion(product.portion);
      }
      setQuantity(product.quantity);
      setGrams(product.gram);
      calculateNutrients(product, product.portion, product.gram, product.quantity);
    } else {
      setSelectedProduct(null);
      setIsFromHistory(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await ProductsService.deleteProductByDate(productId, date.format("YYYY-MM-DD"));
      if (response.status === 200) {
        setMessage("Product successfully deleted from history");
        setSeverity("success");
        setSnackbarOpen(true);
        await fetchHistory(date);
        setCalendarKey((prevKey) => prevKey + 1);
      } else {
        setMessage(`Error deleting data: ${response.status} ${response.statusText}`);
        setSeverity("error");
        setSnackbarOpen(true);
      }
      await fetchAllNutrients();
    } catch (error) {
      console.error(`Error deleting data: ${error}`);
      setMessage(`Error deleting data: ${error.message}`);
      setSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
      <div>
        <TopBar pageValue={1} />
        <div className="calendar">
          <Calendar key={calendarKey} date={date} onDateChange={setDate} />
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
              ref={productSearchRef}
              onProductSelect={async (product) => {
                setSelectedProduct(product);
                setIsFromHistory(false);
                setSelectedPortion("");
                setQuantity(1);
                setGrams(product.servingSize);
                setNutrients({});
                await calculateNutrients(product, "", product.servingSize, 1); // Trigger nutrient calculation immediately
              }}
          />
          <div className="search-box">
            {selectedProduct && (
                <div>
                  {!isFromHistory && (
                      <>
                        {portions.length > 0 && (
                            <Select
                                className="center"
                                label="Portion"
                                value={selectedPortion}
                                sx={{ marginTop: 3, height: 55, marginLeft: 2 }}
                                onChange={async (event) => {
                                  const newPortion = event.target.value;
                                  setSelectedPortion(newPortion);
                                  await calculateNutrients(selectedProduct, newPortion, grams, quantity);
                                }}
                            >
                              {portions.map((portion) => (
                                  <MenuItem key={portion} value={portion}>
                                    {portion}
                                  </MenuItem>
                              ))}
                            </Select>
                        )}
                        <TextField
                            type="number"
                            label="Quantity"
                            value={quantity}
                            sx={{ marginLeft: 2, marginTop: 3, width: 110 }}
                            onChange={async (event) => {
                              const newQuantity = Number(event.target.value);
                              setQuantity(newQuantity);
                              await calculateNutrients(selectedProduct, selectedPortion, grams, newQuantity);
                            }}
                        />
                        <TextField
                            type="number"
                            label="Grams"
                            value={grams}
                            onChange={async (event) => {
                              const newGrams = Number(event.target.value);
                              setGrams(newGrams);
                              await calculateNutrients(selectedProduct, selectedPortion, newGrams, quantity);
                            }}
                            sx={{ marginLeft: 2, marginRight: 2, marginTop: 3 }}
                        />
                        <div className="container">
                          <Button
                              variant="contained"
                              onClick={handleConfirm}
                              sx={{
                                flex: "center",
                                marginTop: -4,
                                marginBottom: 1,
                                marginLeft: 2,
                                width: 225,
                              }}
                          >
                            Confirm
                          </Button>
                        </div>
                      </>

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
            <NutrientTable nutrients={selectedProduct ? nutrients : totalNutrients} />
          </div>
        </div>
      </div>
  );
}

export default CaloriesIntake;
