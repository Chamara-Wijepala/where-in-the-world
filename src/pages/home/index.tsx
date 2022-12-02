import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";

import { ICountry } from "types";

import CountryCard from "./components/CountryCard";

export default function Home() {
  const [countryList, setCountryList] = useState<ICountry[] | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const countries = useFetchAllCountries();

  // Storing a copy of the API data makes it possible to filter the data while
  // keeping the original intact
  useEffect(() => {
    setCountryList(countries);
  }, [countries]);

  // Filters countries based on user input
  useEffect(() => {
    if (countries) {
      setCountryList(
        countries.filter((country) => {
          return (
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            country.name.official
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim())
          );
        })
      );
    }
  }, [searchValue]);

  return (
    <main className="container">
      <div className="filter-inputs">
        <div className="search-bar">
          <BsSearch />

          <input
            type="text"
            value={searchValue}
            placeholder="Search for a country..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-bar__input"
          />
        </div>
      </div>

      {countryList ? (
        <div className="country-list">
          {countryList.map((country) => (
            <Link key={country.cca3} to={`/${country.cca3}`}>
              <CountryCard data={country} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="homepage-loader">
          <div className="loader-container">
            <TailSpin color="green" ariaLabel="loading" />
          </div>
        </div>
      )}
    </main>
  );
}

function useFetchAllCountries() {
  const [countries, setCountries] = useState<ICountry[] | null>(null);

  const fields = [
    "name",
    "cca3",
    "unMember",
    "capital",
    "region",
    "population",
    "flags",
  ].join(",");

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `https://restcountries.com/v3.1/all?fields=${fields}`
      );
      const response: ICountry[] = await request.json();

      setCountries(response);
    })();
  }, []);

  return countries;
}
