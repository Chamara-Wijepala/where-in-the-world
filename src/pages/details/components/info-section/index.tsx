import { Link } from "react-router-dom";

import { ICountryDetails, IBorderingCountry } from "types";

export default function InfoSection({
  countryDetails,
  borderingCountries,
}: {
  countryDetails: ICountryDetails;
  borderingCountries: IBorderingCountry[];
}) {
  // Creates a string of all the native names of the country
  const nativeNames = Object.values(countryDetails.name.nativeName)
    .map((name) => name.common)
    .join(", ");

  // Creates a string of the country's capital or capitals
  const capital = Object.values(countryDetails.capital).join(", ");

  // Creates a string of the country's top level domain or domains
  const tld = countryDetails.tld?.join(", ");

  // Creates a string of the currency or currencies used in the country
  const currencies = Object.values(countryDetails.currencies)
    .map((currency) => `${currency.symbol} ${currency.name}`)
    .join(", ");

  // Creates a string of the country's language or languages
  const languages = Object.values(countryDetails.languages).join(", ");

  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <section className="details__info-section">
      <h2>{countryDetails.name.common}</h2>

      <div className="details__list-section">
        <ul role="list">
          <li>
            <span className="fw-bold">Native Name: </span>
            {nativeNames}
          </li>
          <li>
            <span className="fw-bold">Population: </span>
            {numberFormat.format(countryDetails.population)}
          </li>
          <li>
            <span className="fw-bold">Region: </span>
            {countryDetails.region}
          </li>
          <li>
            <span className="fw-bold">Sub Region: </span>
            {countryDetails.subregion}
          </li>
          <li>
            <span className="fw-bold">Capital: </span>
            {capital}
          </li>
        </ul>

        <ul role="list">
          <li>
            <span className="fw-bold">Top Level Domain: </span>
            {tld}
          </li>
          <li>
            <span className="fw-bold">Currencies: </span>
            {currencies}
          </li>
          <li>
            <span className="fw-bold">Languages: </span>
            {languages}
          </li>
        </ul>
      </div>

      {borderingCountries.length > 0 && (
        <div>
          <h3>Border Countries:</h3>

          <ul role="list">
            {borderingCountries.map((country) => (
              <li key={country.code}>
                <Link to={`/${country.code}`}>{country.name.common}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
