import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

function CityDayWise() {
  //   let now = new Date().toLocaleDateString("en-us", {
  //     weekday: "long",
  //     month: "long",
  //     day: "numeric",
  //   });
  //   console.log(now);

  const [city, setCity] = useState("");
  const [day, setDay] = useState("");

  function handleCityChange(e) {
    setCity(e.target.value);
    console.log(e.target.value);
  }

  function handleDayChange(ev) {
    setDay(ev.target.value);
    console.log(ev.target.value);
  }

  function handleSubmit() {}

  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        value={city}
        onChange={handleCityChange}
      />
      <TextField
        id="outlined-basic"
        label="Day"
        variant="outlined"
        value={day}
        onChange={handleDayChange}
      />
      <Button variant="contained" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default CityDayWise;
