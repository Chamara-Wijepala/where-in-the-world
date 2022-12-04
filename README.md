# Where in the world?

This project idea came from this [challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). I have done this project before, however, I decided to build it again as I wasn't satisfied with how the first one ended up.

There's not much difference in this one except a few personal tweaks.

[Live Demo](https://whereintheworld.onrender.com/)

## Built with

### Technologies

- React
- TypeScript

### Packages

- [React Router](https://www.npmjs.com/package/react-router-dom)
- [clsx](https://www.npmjs.com/package/clsx)
- [react icons](https://www.npmjs.com/package/react-icons)
- [react loader spinner](https://www.npmjs.com/package/react-loader-spinner)

### APIs

- [rest countries](https://restcountries.com/)

## What I learned

- Separating logic into custom hooks. Before, I used to write all the hooks in the react component which would make it very bloated. Using hooks this way is much neater.

```js
export default function Home() {
// ...

const countries = useFetchAllCountries();

// ...
}

function useFetchAllCountries() {
  const [countries, setCountries] = useState<ICountry[] | null>(null);

  const fields = [
    "name",
    "cca3",
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
```

## Acknowledgments

- This [article](https://w3bits.com/css-masonry/) about how to create a masonry layout with CSS
- This [video](https://www.youtube.com/watch?v=bAJlYgeovlg&t=1830s&ab_channel=WebDevSimplified) about how to build a custom select component with React and TypeScript
- This [video](https://www.youtube.com/watch?v=fyuao3G-2qg&t=1499s&ab_channel=KevinPowell) on creating a color theme switcher
