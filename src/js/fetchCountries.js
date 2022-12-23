export const fetchCountries = formValue => {
  return fetch(
    `https://restcountries.com/v3.1/name/${formValue}?fields=name,capital,currencies,population,flags,languages`
  ).then(response => response.json());
};
