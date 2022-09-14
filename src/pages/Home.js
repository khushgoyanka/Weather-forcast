import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Home() {
  const [city, setCity] = useState("");
  const [weatherResp, setWeatherResp] = useState([]);
  const [cityDetail, setCityDetail] = useState("");

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleClick() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c4b9b06a02afc10e347f9ed3794a2e3f`;

    const result = fetch(`${url}`, { method: "get" })
      .then((response) => response.json())
      .then((data) => {
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c4b9b06a02afc10e347f9ed3794a2e3f`;

        return fetch(`${url2}`, { method: "get" });
      })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Request failed", err);
      });
    result.then((r) => {
      let cityD = {
        coord: r["city"]["coord"],
        sunrise: r.city.sunrise,
        sunset: r.city.sunset,
      };
      setWeatherResp(r.list);
      let arr = [];
      for (let i = 0; i < 40; i += 8) {
        arr.push({ date: r.list[i].dt_txt, main: r.list[i].main });
      }
      setWeatherResp(arr);
      setCityDetail(cityD);
    });
    console.log(weatherResp);
    console.log(cityDetail);
  }
  function formatDate(timestamp) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);
  }

  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        value={city}
        onChange={handleCityChange}
      />
      {cityDetail && weatherResp.length > 0 ? (
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={8}>
            {[0, 1, 2, 3, 4].map((value, index) => (
              <Grid key={value} item>
                <Paper>
                  <Typography variant="subtitle1">
                    {" "}
                    Date : {weatherResp[value]?.date}
                  </Typography>
                  <Typography variant="subtitle2">
                    {" "}
                    Latitude : {cityDetail?.coord?.lat}
                  </Typography>
                  <Typography variant="subtitle2">
                    {" "}
                    Longitude : {cityDetail?.coord?.lon}
                  </Typography>
                  <Typography variant="subtitle2">
                    Sunrsie : {formatDate(cityDetail?.sunrise)}
                  </Typography>
                  <Typography variant="subtitle2">
                    Sunset : {formatDate(cityDetail?.sunset)}
                  </Typography>
                  <Typography variant="subtitle2">
                    Humidity : {weatherResp[value]?.main?.humidity}
                  </Typography>
                  <Typography variant="subtitle2">
                    Max Temperature : {weatherResp[value]?.main?.temp_max}
                  </Typography>
                  <Typography variant="subtitle2">
                    Min Temperature : {weatherResp[value]?.main?.temp_min}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      <Button variant="contained" type="submit" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default Home;
