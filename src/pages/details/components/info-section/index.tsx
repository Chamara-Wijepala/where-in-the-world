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
    .map((currency) => `${currency.name} (${currency.symbol})`)
    .join(", ");

  // Creates a string of the country's language or languages
  const languages = Object.values(countryDetails.languages).join(", ");

  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <section className="details__info-section | clr-secondary">
      <h2 className="fs-700 fw-bold">{countryDetails.name.common}</h2>

      <div className="details__list-section | fw-small">
        <ul role="list">
          <li>
            <span className="fw-regular">Official Name: </span>
            {countryDetails.name.official}
          </li>
          <li>
            <span className="fw-regular">Native Name: </span>
            {nativeNames}
          </li>
          <li>
            <span className="fw-regular">Population: </span>
            {numberFormat.format(countryDetails.population)}
          </li>
          <li>
            <span className="fw-regular">Region: </span>
            {countryDetails.region}
          </li>
          <li>
            <span className="fw-regular">Sub Region: </span>
            {countryDetails.subregion}
          </li>
          <li>
            <span className="fw-regular">Capital: </span>
            {capital}
          </li>
        </ul>

        <ul role="list">
          <li>
            <span className="fw-regular">Top Level Domain: </span>
            {tld}
          </li>
          <li>
            <span className="fw-regular">Currencies: </span>
            {currencies}
          </li>
          <li>
            <span className="fw-regular">Languages: </span>
            {languages}
          </li>
        </ul>
      </div>

      {borderingCountries.length > 0 && (
        <div className="details__borders">
          <h3>Border Countries:</h3>

          <ul role="list" className="details__borders-list">
            {borderingCountries.map((country) => (
              <li key={country.code}>
                <Link to={`/${country.code}`}>
                  <button
                    type="button"
                    className="btn btn-sm clr-secondary bg-primary-100 box-shadow"
                  >
                    {country.name.common}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
