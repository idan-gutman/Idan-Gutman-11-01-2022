import React, { useEffect, useRef, useState } from "react";
import { weatherService } from "../services/weatherService";
import { storageService } from "../services/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../store/actions/WeatherActions";
import { debounce } from "lodash";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(null);
  const { isDarkMode } = useSelector((state) => state.weatherModule);


  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    setDisplay(false);
    dispatch(setCurrentLocation(location));
  }, [location]);

  useEffect(() => {
    (async () => {
      const res = await weatherService.getAutocomplete(search);
      setOptions(res);
      storageService.saveToStorage("locationOptions", res);
    })();
  }, [search]);

  const handleChange = ({ target }) => {
    setDisplay(true);
    debounceAutocomplete(target.value);
  };

  const debounceAutocomplete = debounce((val) => {
    setSearch(val);
  }, 300);

  
  return (
    <section className="search-container">
      <Box
        component="form"
        sx={
        {"& > :not(style)": { m: 2, width: "25ch", "& .MuiOutlinedInput-root": {
            "& > fieldset": {borderColor: "#f9a826"}},
        },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search location"
          variant="outlined"
          inputRef={inputRef}
          onChange={handleChange}
          InputLabelProps={{className:`text-field ${isDarkMode ? 'darki':''}`}}
          InputProps={{className:`text-field ${isDarkMode ? 'darki':''}`}}
        />
        {display && (
          <div className="options-container">
            {options &&
              options?.map((option) => {
                return (
                  <div
                    className='option'
                    onClick={() => {
                      inputRef.current.value = option.LocalizedName;
                      setLocation(option);
                    }}
                    key={option.Key}
                  >
                    <span>{option.LocalizedName}</span>
                  </div>
                );
              })}
          </div>
        )}
      </Box>
    </section>
  );
};
