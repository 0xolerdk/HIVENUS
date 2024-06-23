import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FCDService from '../../services/FCDService';

const ProductSearch = forwardRef(({ onProductSelect }, ref) => {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useImperativeHandle(ref, () => ({
        clearInput() {
            setInputValue("");
        },
    }));

    const getData = async (searchTerm) => {
        const foods = await FCDService.find(searchTerm);
        const updatedOptions = foods.map((food) => {
            return { description: food.description, fdcId: food.fdcId, servingSize: food.servingSize };
        });
        setOptions(updatedOptions);
    };

    const onInputChange = (event, value) => {
        setInputValue(value);
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
            inputValue={inputValue}
            onInputChange={onInputChange}
            onChange={(event, value) => {
                if (value) {
                    onProductSelect(value);
                }
            }}
            getOptionLabel={(option) =>
                option.servingSize
                    ? `${option.description} (Serving Size: ${option.servingSize}g)`
                    : option.description
            }
            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Search Product" variant="outlined" />}
            renderOption={(props, option) => (
                <li {...props} style={{ whiteSpace: 'normal' }}>
                    {option.servingSize
                        ? `${option.description} (Serving Size: ${option.servingSize}g)`
                        : option.description}
                </li>
            )}
        />
    );
});

export default ProductSearch;
