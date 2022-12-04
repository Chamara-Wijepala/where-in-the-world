import { ICountry } from "types";

export default function CountryCard({ data }: { data: ICountry }) {
  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <div className="card box-shadow">
      <img src={data.flags.svg} alt={`the flag of ${data.name.common}`} />
      <div className="card__details | clr-secondary">
        <h2 className="fs-500 fw-bold">{data.name.common}</h2>
        <ul role="list" className="fs-400 fw-small">
          <li>
            <span className="fw-regular">Population: </span>
            {numberFormat.format(data.population)}
          </li>
          <li>
            <span className="fw-regular">Region: </span>
            {data.region}
          </li>
          <li>
            <span className="fw-regular">Capital: </span>
            {data.capital.join(", ")}
          </li>
        </ul>
      </div>
    </div>
  );
}
