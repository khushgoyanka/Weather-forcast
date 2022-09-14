import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

function Home() {
  const [city, setCity] = useState("");

  function handleCityChange(e) {
    setCity(e.target.value);
    console.log(e.target.value);
  }

  function handleClick() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c4b9b06a02afc10e347f9ed3794a2e3f`;

    const result = fetch(`${url}`, { method: "get" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const url2 = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c4b9b06a02afc10e347f9ed3794a2e3f`;

        return fetch(`${url2}`, { method: "get" });
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.error("Request failed", err);
      });
    console.log(result);
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        value={city}
        onChange={handleCityChange}
      />
      <Button variant="contained" type="submit" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default Home;
