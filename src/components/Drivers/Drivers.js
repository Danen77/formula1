import React, { Fragment, useState, useEffect, useContext } from "react";
import { fetchAllDrivers } from "../../utils/api";
import YearContext from "../../context/YearContext";
import Driver from "./Driver";


const Drivers = () => {
  const [drivers, setDrivers] = useState(null);
  const [loading, setLoading] = useState(true);

  const { year, handleYearChange } = useContext(YearContext);

  useEffect(() => {
    fetchAllDrivers(year).then((drivers) => {
      setDrivers(
        drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
      setLoading(false);
    });
  }, [year]);

  const getYears = () => {
    const years = [];
    for (let year = 2022; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  };

  if (loading) return <div>Loading</div>;

  return (
    <Fragment>
      <div className="table-head">
        <h2>{`Championship Standings ${year}`}</h2>
        <div>
          <label>Year</label>
          <select
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <tbody>
            <Driver drivers={drivers} />
        </tbody>
      </table>
    </Fragment>
  );
};
export default Drivers;
