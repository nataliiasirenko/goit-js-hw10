import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const formEll = document.querySelector(`#search-box`);
const listCountries = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);

formEll.addEventListener(`input`, debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
  const formValue = formEll.value;
  fetchCountries(formValue).then(array => console.log(array));
}
