import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewNav from "./components/Navbar";
import CityDayWise from "./pages/CityDayWise";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <NewNav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/:city/:day" element={<CityDayWise />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
