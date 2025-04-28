import BaseUrls from '../constants/api.js';
import AppError from '../exception/AppError.js';

const countryCache = new Map();

async function getCountries(order = 'name', sort = 'asc') {
    const response = await fetch(`${BaseUrls.covidApi}/regions?order=${order}&sort=${sort}`);
    if (!response.ok || response.status != 200) {
        throw new AppError('Problem Exist.', response.status);
    }

    const countries = await response.json();

    return countries;
}

async function getCountry(iso, fields = 'name,flags') {
    const countryKey = `${iso}-${fields}`;

    if (countryCache.has(countryKey)) {
        return countryCache.get(countryKey);
    }

    const response = await fetch(`${BaseUrls.countriesApi}/alpha/${iso}?fields=${fields}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new AppError('Country not found.', response.status);
        }

        throw new AppError('Problem Exist.', response.status);
    }

    const country = await response.json();
    countryCache.set(countryKey, country);

    return country;
}

export { getCountries, getCountry };
