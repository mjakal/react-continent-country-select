import ContinentCountrySelect from './ContinentCountrySelect';

/** Convert countries array to object. e.g. [ 'be', 'nl' ] to { BE: true, NL: true }
 * @param {Array} countries - Array of countries
 * @returns {Object} deserializedData - Object containing country code and selected state e.g. { BE: true }
 */
const deserializeCountries = (countries = []) => {
  const deserializedData = {};

  countries.forEach(country => {
    const key = country.toUpperCase();

    deserializedData[key] = true;
  });

  return deserializedData;
};

/** Convert countries object to array depending on upperCase param.
 * E.g. if upperCase set to true, then: { BE: true, NL: false, HR: true } becomes [ 'BE', 'HR' ]
 *
 * @param {Object} countries - Object containing selected countries
 * @param {Boolean} upperCase - Set the array values to upper or lower case
 * @returns {Array} serializedData- Array of selected country codes
 */
const serializeCountries = (countries = {}, upperCase = true) => {
  const keys = Object.keys(countries);
  const serializedData = [];

  keys.forEach(key => {
    // Check if country selected
    if (countries[key]) {
      const countryCode = upperCase
        ? key.toUpperCase()
        : key.toLocaleLowerCase();

      serializedData.push(countryCode);
    }
  });

  return serializedData;
};

export { ContinentCountrySelect, deserializeCountries, serializeCountries };
