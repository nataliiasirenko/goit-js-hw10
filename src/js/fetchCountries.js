export const fetchCountries = formValue => {
  return fetch(
    `https://restcountries.com/v3.1/name/${formValue}?fields=name,capital,currencies,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      throw new Error();
    }
    return response.json();
  });
};
//
