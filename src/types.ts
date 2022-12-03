export interface ICountry {
  flags: Flags;
  name: Name;
  cca3: string;
  capital: string[];
  // As of December 2022 the API returns the altSpellings field even if it's
  // not requested.
  altSpellings?: string[];
  region: string;
  population: number;
}

interface Flags {
  png: string;
  svg: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}

export interface ICountryDetails extends ICountry {
  tld?: string[];
  subregion?: string;
  currencies?: { [key: string]: Currency };
  coatOfArms?: CoatOfArms;
  languages?: { [key: string]: string };
  borders?: string[];
}

interface Currency {
  name: string;
  symbol: string;
}

interface CoatOfArms {
  png: string;
  svg: string;
}
