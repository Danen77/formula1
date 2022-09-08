import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import YearContext from "./context/YearContext";
import Nav from "./components/Nav";
import Drivers from "./components/Drivers/Drivers";
import DriverDetails from "./components/Drivers/DriverDetails";
import NotFound from "./components/NotFound";

function App() {
  const [theme, setTheme] = useState("light");
  const [year, setYear] = useState(2022);

  const handleYearChange = (year) => setYear(year);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <div className="light">
        <div className="container">
          <Nav toggleTheme={toggleTheme} />
          <ThemeContext.Provider value={theme}>
            <YearContext.Provider value={{ year, handleYearChange }}>
              <Routes>
                <Route path="/" element={<Drivers />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path='/drivers/driverdetails/:driverName/:id' element={<DriverDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </YearContext.Provider>
          </ThemeContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
