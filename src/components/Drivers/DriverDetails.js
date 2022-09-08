import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchDriverData } from "../../utils/api";
import ThemeContext from "../../context/ThemeContext";
import YearContext from "../../context/YearContext";

import NotFound from "../NotFound";
import Error from "../Error";

const DriverDetails = () => {
  const [details, setDetails] = useState(null);
  const [races, setRaces] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const theme = useContext(ThemeContext);
  const { year, handleYearChange } = useContext(YearContext);

  const params = useParams();
  const { driverName, id } = params;

  const { givenName, familyName, nationality, dateOfBirth } = details || {};
  const { number, Constructor } = races ? races[0]?.Results[0] : {};

  const getYears = () => {
    const years = [];
    for (let year = 2019; year >= 1950; year--) years.push(year);
    return years;
  };

  const getData = async (id, year, driverName) => {
    const [details, races, image] = await fetchDriverData(id, year, driverName);
    setDetails(
      details.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
    );
    setRaces(races.MRData.RaceTable.Races);
    setImage(image.query.pages[0]);
    setLoading(false);
    setError(false);
  };

  useEffect(() => {
    try {
      getData(id, year, driverName);
    } catch (error) {
      console.warn(error.message);
      setError(`No data for ${year} year.`);
      setLoading(false);
    }
    // fetchDriverData(id, year, driverName)
    //   .then(([details, races, image]) => {
    //     setDetails(details.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver)
    //     setRaces(races.MRData.RaceTable.Races)
    //     setImage(image.query.pages[0])
    //     setLoading(false);
    //     setError(false)
    //   })
    //   .catch((e) => {
    //     console.warn(e.message)
    //     setError(`No data for ${year} year.`)
    //     setLoading(false)
    //   })
  }, [id, year, driverName]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!driverName && !id) {
    return <NotFound />;
  }

  if (error) {
    return (
      <div className="header-container">
        <Error text={error} />

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
    );
  }

  return (
    <Fragment>
      <h2>{`${givenName} ${familyName}`}</h2>

      <div className="header-container">
        <div className="details-container">
          {image.thumbnail && <img src={image.thumbnail.source} alt="Driver" />}

          <div className="details">
            <div>{`Nationality: ${nationality}`}</div>
            <div>{`Team: ${Constructor.name}`}</div>
            <div>{`Birth: ${dateOfBirth}`}</div>
            <div>{`Number: ${number}`}</div>
          </div>
        </div>

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
        <thead>
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Team</th>
            <th>Grid</th>
            <th>Race</th>
          </tr>
        </thead>

        <tbody>
          {races.map((race) => {
            const { round, raceName } = race;
            const { grid, position, Constructor } = race.Results[0];

            return (
              <tr key={round} className={`bg-${theme}`}>
                <td>{round}</td>
                <td>
                  <Link
                    to={__dirname + `races/race/${round}`}
                    className={`link-${theme}`}
                  >
                    {raceName}
                  </Link>
                </td>
                <td>{Constructor.name}</td>
                <td>{grid}</td>
                <td>{position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default DriverDetails;
