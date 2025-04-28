import { getCountries, getCountry } from '../services/countriesService.js';
import DefaultCountry from '../constants/defaultCountry.js';

const countryInput = document.querySelector('.statistic-form-input');
const countryImage = countryInput.querySelector('img');
const countrySelectBox = countryInput.querySelector('select');

function createCountryList(countries) {
    const defaultOption = `<option value='${DefaultCountry.value}' selected>${DefaultCountry.name}</option>`;
    countrySelectBox.insertAdjacentHTML('afterbegin', defaultOption);

    countries['data'].forEach((country) => {
        const option = `<option value='${country.iso}'>${country.name}</option>`;
        countrySelectBox.insertAdjacentHTML('beforeend', option);
    });
}

async function updateCountryImage(event) {
    const selectedIndex = countrySelectBox.selectedIndex;
    const selectedOption = countrySelectBox.options[selectedIndex];
    const iso = selectedOption.value;

    if (iso == DefaultCountry.value) {
        countryImage.src = DefaultCountry.flag;
        countryImage.alt = DefaultCountry.alt;
        return;
    }

    try {
        const country = await getCountry(iso, 'flags');

        countryImage.src = country?.flags?.svg || DefaultCountry.flag;
        countryImage.alt = country?.flags?.alt || DefaultCountry.alt;
    } catch (error) {
        if (error.statusCode == 404) {
            countryImage.src = DefaultCountry.flag;
            countryImage.alt = DefaultCountry.alt;
        }

        console.log(error);
    }
}

async function setCountries() {
    try {
        const countries = await getCountries();

        createCountryList(countries);
    } catch (error) {
        console.log(error);
    }
}

countrySelectBox.addEventListener('change', updateCountryImage);

export { setCountries };
