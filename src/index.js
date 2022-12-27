import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const formEll = document.querySelector(`#search-box`);
const listCountries = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);

formEll.addEventListener(`input`, debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
  let formValue = formEll.value.trim();

  if (formValue === '') {
    onFormClear();
  } else {
    fetchHendler(formValue);
  }
}

function fetchHendler(formValue) {
  fetchCountries(formValue)
    .then(data => {
      if (data.length > 10) {
        onFormClear();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2 && data.length <= 10) {
        onFormClear();
        countryListMarkUp(data);
        return;
      }
      if ((data.length = 1)) {
        onFormClear();
        countryListMarkUp(data);
        countryInfoMarkUp(data);
        return;
      }
    })
    .catch(error => {
      onFormClear();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function countryInfoMarkUp(data) {
  const markUp = data.map(({ capital, population, languages }) => {
    return `<p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(
      languages
    )}</p>`;
  });
  countryInfo.innerHTML = markUp.join('');
}

function countryListMarkUp(data) {
  const markUp = data.map(({ name: { official }, flags: { svg } }) => {
    return `<li></p><img src=${svg} width='60'></img>${official}</li>`;
  });
  listCountries.innerHTML = markUp.join('');
}

function onFormClear() {
  listCountries.innerHTML = '';
  countryInfo.innerHTML = '';
}
