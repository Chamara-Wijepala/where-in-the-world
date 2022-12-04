import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { RxArrowLeft } from "react-icons/rx";

import { ICountryDetails, IBorderingCountry } from "types";

import InfoSection from "./components/info-section";

import "./style.css";

export default function Details() {
  const { id } = useParams();

  const { countryDetails, borderingCountries } = useFetchCountryDetails(id);

  return (
    <main className="container">
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          type="button"
          className="btn btn-md btn-with-icon clr-secondary bg-primary-100 box-shadow"
        >
          <RxArrowLeft /> Back
        </button>
      </Link>

      {countryDetails ? (
        <div className="details">
          <img
            src={countryDetails.flags.svg}
            alt={`The flag of ${countryDetails.name.common}`}
            className="details__flag"
          />

          {countryDetails.coatOfArms?.svg !== "" && (
            <img
              src={countryDetails.coatOfArms?.svg}
              alt={`The coat of arms of ${countryDetails.name.common}`}
              className="details__coa"
            />
          )}

          <InfoSection
            countryDetails={countryDetails}
            borderingCountries={borderingCountries}
          />
        </div>
      ) : (
        <div className="loader-container">
          <TailSpin color="green" ariaLabel="loading" />
        </div>
      )}
    </main>
  );
}

function useFetchCountryDetails(id: string | undefined) {
  const [countryDetails, setCountryDetails] = useState<ICountryDetails | null>(
    null
  );
  const [borderingCountries, setBorderingCountries] = useState<
    IBorderingCountry[]
  >([]);

  const fields = [
    "name",
    "tld",
    "cca3",
    "capital",
    "region",
    "subregion",
    "population",
    "currencies",
    "languages",
    "borders",
    "flags",
    "coatOfArms",
  ].join(",");

  // Fetches country details
  useEffect(() => {
    if (id) {
      (async () => {
        // This is so the loader animation is rendered while data is fetching
        setCountryDetails(null);

        const request = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}?fields=${fields}`
        );
        const response: ICountryDetails = await request.json();

        setCountryDetails(response);
      })();
    }
  }, [id]);

  // The API only returns the cca3 country codes of the bordering countries
  // The names of these countries must be fetched using the cca3 code
  useEffect(() => {
    if (countryDetails?.borders) {
      Promise.all(
        countryDetails.borders.map(async (code) => {
          const request = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}?fields=name`
          );
          const response = await request.json();

          return {
            code,
            // As of December 2022 the API returns the altSpellings and capital
            // fields without them being requested, so only response.name must
            // be added to this object
            name: response.name,
          };
        })
      ).then(setBorderingCountries);
    }
  }, [countryDetails]);

  return { countryDetails, borderingCountries };
}
