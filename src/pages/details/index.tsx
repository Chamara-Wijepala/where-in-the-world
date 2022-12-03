import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";

import { ICountryDetails } from "types";

import "./style.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const countryDetails = useFetchCountryDetails(id);

  return (
    <main className="container">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn btn-with-icon clr-secondary bg-primary-100 box-shadow"
      >
        <RxArrowLeft /> Back
      </button>
    </main>
  );
}

function useFetchCountryDetails(id: string | undefined) {
  const [country, setCountry] = useState<ICountryDetails | null>(null);

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
    "border",
    "flags",
    "coatOfArms",
  ].join(",");

  useEffect(() => {
    if (id) {
      (async () => {
        const request = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}?fields=${fields}`
        );
        const response: ICountryDetails = await request.json();

        setCountry(response);
      })();
    }
  }, []);

  return country;
}
