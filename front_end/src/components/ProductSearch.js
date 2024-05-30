import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FCD from '../service/FCDLogic';

function ProductSearch({ onProductSelect }) {
  const [options, setOptions] = useState([]);

  const getData = async (searchTerm) => {
    const foods = await FCD.find(searchTerm);
    const updatedOptions = foods.map((food) => {
      return { name: food.description, fdcId: food.fdcId };
    });
    setOptions(updatedOptions);
  };

  const onInputChange = (event, value) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      onInputChange={onInputChange}
      onChange={(event, value) => onProductSelect(value)}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Product" variant="outlined" />}
    />
  );
}

export default ProductSearch;
