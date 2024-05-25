import React from "react";
import "./CaloriesIntake.css";
import Donut from "../../components/Donut";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import _ from "lodash";


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

function CaloriesIntake() {
  const [options, setOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const previousController = useRef();

  const getData = _.debounce((searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    fetch(
      "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=FPSzFJBUD8wUKeGA5qaFggDIlu7k4pcN9mP6qdx7&query=" +
        searchTerm,
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log("search term: " + searchTerm + ", results: ", myJson.foods);
        const updatedOptions = myJson.foods.map((food) => {
          return { title: food.description };
        });
        setOptions(updatedOptions);
      });
  }, 200); // Debounce time in milliseconds

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);

        
    } else {
      setOptions([]);
    }
  };


  return (
    <div>
       
      {/* <CssBaseline /> */}

      <Top_Bar pageValue={1} />
      <div className="donuts">
        {" "}
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
          onChange={(event, value) => setSelectedProduct(value)}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      </div>
      <div className="search-box"> {selectedProduct && <div>{selectedProduct.title}</div>}</div>
      <div></div>
    </div>
  );
}

export default CaloriesIntake;
