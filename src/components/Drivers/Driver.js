import { useContext } from "react";
import { Link } from "react-router-dom";
import { FlagIcon } from "react-flag-kit";
import countryCodes from "../../helpers/countryCodes.json";
import ThemeContext from "../../context/ThemeContext";

const Driver = ({drivers}) => {
    const theme = useContext(ThemeContext);
    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;
      };
    return (
        <>
        {drivers.map(({ position, points, Driver, Constructors }) => {
            const { driverId, givenName, familyName, nationality, url } =
              Driver;

            let driverName = url.split("/").pop();

            return (
              <tr key={driverId} className={`bg-${theme.theme}`}>
                <td>{position}</td>
                <td>
                  <div className="align-items">
                    <FlagIcon
                      code={getCode(nationality)}
                      size={20}
                      className="flag"
                    />
                    <Link
                      to={`drivers/driverdetails/${driverName}/${driverId}`}
                      className={`link-${theme.theme}`}
                    >
                      {`${givenName} ${familyName}`}
                    </Link>
                  </div>
                </td>
                <td>{Constructors[0].name}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </>
    );
}

export default Driver;