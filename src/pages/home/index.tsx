import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ICountry } from "types";

import CountryCard from "./components/CountryCard";

export default function Home() {
  const countries = useFetchAllCountries();

  return (
    <main className="container">
      <div className="country-list">
        {countries?.map((country) => (
          <Link key={country.cca3} to={`/${country.cca3}`}>
            <CountryCard data={country} />
          </Link>
        ))}
      </div>
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
