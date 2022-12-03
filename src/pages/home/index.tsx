import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";

import { ICountry } from "types";

import RegionSelect, { SelectOption } from "./components/region-select";
import CountryCard from "./components/country-card";

export default function Home() {
  const [countryList, setCountryList] = useState<ICountry[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [regionFilter, setRegionFilter] = useState<SelectOption[]>([]);

  const countries = useFetchAllCountries();

  // Storing a copy of the API data makes it possible to filter the data while
  // keeping the original intact
  useEffect(() => {
    setCountryList(countries);
  }, [countries]);

  // Filters countries based on user input
  useEffect(() => {
    if (countries) {
      // Filters countries when searched by common or official name
      let newList = countries.filter((country) => {
        return (
          country.name.common
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim()) ||
          country.name.official
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim())
        );
      });

      // Filters by selected regions
      if (regionFilter.length > 0) {
        newList = newList.filter((country) => {
          return regionFilter.some((region) => {
            return region.value === country.region;
          });
        });
      }

      setCountryList(newList);
    }
  }, [searchValue, regionFilter]);

  return (
    <main className="container">
      <div className="filter-inputs">
        <div className="search-bar | filter-container box-shadow">
          <BsSearch />

          <input
            type="text"
            value={searchValue}
            placeholder="Search for a country..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-bar__input"
          />
        </div>

        <RegionSelect
          values={regionFilter}
          onChange={(o) => setRegionFilter(o)}
        />
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
