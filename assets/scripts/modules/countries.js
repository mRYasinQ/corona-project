import handleError from '../exception/handleError.js';
import { getCountries, getCountry } from '../services/countriesService.js';
import DefaultCountry from '../constants/defaultCountry.js';

const countryInput = document.querySelector('.statistic-form-input');
const countryImage = countryInput?.querySelector('img');
const countrySelectBox = countryInput?.querySelector('select');
let getCountryController = null;

async function initCountries() {
    await setCountries();
    countrySelectBox?.addEventListener('change', updateCountryImage);
}

async function updateCountryImage(event) {
    const selectedIndex = countrySelectBox?.selectedIndex;
    const selectedOption = countrySelectBox?.options[selectedIndex];
    const iso = selectedOption?.value;

    if (getCountryController) {
        getCountryController.abort();
    }

    if (iso == DefaultCountry.value) {
        countryImage.src = DefaultCountry.flag;
        countryImage.alt = DefaultCountry.alt;
        return;
    }

    try {
        getCountryController = new AbortController();
        const country = await getCountry(iso, 'flags', getCountryController.signal);

        countryImage.src = country?.flags?.svg || DefaultCountry.flag;
        countryImage.alt = country?.flags?.alt || DefaultCountry.alt;
    } catch (error) {
        handleError(error);
    }
}

async function setCountries() {
    const countries = await getCountries();

    createCountryList(countries);
}

function createCountryList(countries) {
    const defaultOption = `<option value='${DefaultCountry.value}' selected>${DefaultCountry.name}</option>`;
    countrySelectBox?.insertAdjacentHTML('afterbegin', defaultOption);

    countries['data'].forEach((country) => {
        const option = `<option value='${country.iso}'>${country.name}</option>`;
        countrySelectBox?.insertAdjacentHTML('beforeend', option);
    });
}

export { initCountries };
