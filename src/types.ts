export interface ICountry {
  flags: Flags;
  name: Name;
  cca3: string;
  unMember: boolean;
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
