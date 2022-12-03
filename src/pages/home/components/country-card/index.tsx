import { ICountry } from "types";

export default function CountryCard({ data }: { data: ICountry }) {
  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <div className="card box-shadow">
      <img src={data.flags.svg} alt={`the flag of ${data.name.common}`} />
      <div className="card__details | clr-secondary">
        <h2 className="fw-bold">{data.name.common}</h2>
        <ul role="list" className="fs-350">
          <li>
            <span className="fw-bold">Population: </span>
            {numberFormat.format(data.population)}
          </li>
          <li>
            <span className="fw-bold">Region: </span>
            {data.region}
          </li>
          <li>
            <span className="fw-bold">Capital: </span>
            {data.capital.join(", ")}
          </li>
        </ul>
      </div>
    </div>
  );
}
