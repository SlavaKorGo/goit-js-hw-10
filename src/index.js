import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from  './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearchCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryFoundInfo: document.querySelector('.country-info'),
};

refs.inputSearchCountry.addEventListener(
  'input',
  debounce(handleSearch, DEBOUNCE_DELAY)
);

function handleSearch(e) {
  const inputValue = e.target.value.trim();
  resetHtml();
  if (inputValue === '') {
    return;
  }
  fetchCountries(inputValue).then(createCountriesMarkup).catch(fetchError);
}

function createCountriesMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    refs.countryList.innerHTML = countries
      .map(country => {
        return `<li class="country-list__item">
                <div class="country-list__container">
                    <img class="country-list__img" src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="50">
                    <p class="country-list__text"><b>${country.name.official}</b></p>
                </div>
            </li>`;
      })
      .join('');
  } else if (countries.length == 1) {
    refs.countryFoundInfo.innerHTML = countries
      .map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
      })
      .join('');
  }
}

function resetHtml() {
  refs.countryList.innerHTML = '';
  refs.countryFoundInfo.innerHTML = '';
}

function fetchError() {
  Notify.failure('Oops, there is no country with that name');
}