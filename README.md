# react-continent-country-select

![React Continent Country Select Screenshot](https://i.ibb.co/FmKrGMJ/react-continent-country-select.png)

[![NPM](https://img.shields.io/npm/v/react-continent-country-select.svg)](https://www.npmjs.com/package/react-continent-country-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**LIVE DEMO:** [https://mjakal.github.io/react-continent-country-select/](https://mjakal.github.io/react-continent-country-select/)

## Requirements

- bootstrap >= 4.0.0
- flag-icon-css >= 3.0.0 - if you want to display country flags (not required)
- font-awesome >= 4.7.0 - used for toggle button icon (not required)
- react >= 16.8.0
- react-dom >= 16.8.0
- reactstrap >= 8.0.0

## Install

```bash
npm install --save react-continent-country-select
```

## Usage

```jsx
import React, { useState, useEffect } from 'react';
import {
  ContinentCountrySelect,
  deserializeCountries,
  serializeCountries
} from 'react-continent-country-select';
import 'react-continent-country-select/dist/index.css';
import continents from 'react-continent-country-select/dist/continent_countries.json';

// pre-selected values from e.g. API endpoint
const countries = ['be', 'nl', 'hr'];

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState({});

  // If you are using class components, put this code inside componentDidMount()
  useEffect(() => {
    // Deserialize data: convert ['be', 'nl', 'hr'] to { BE: true, NL: true, HR: true }
    const deserializedCountries = deserializeCountries(countries);

    setSelectedCountries({ ...deserializedCountries });
  }, []);

  const onChange = selected => setSelectedCountries({ ...selected });

  const onSerializeData = () => {
    // Serialize selected countries
    // The second boolean param is used for serializing data depending on your specific needs (upper/lower case)
    const serializedCountries = serializeCountries(selectedCountries, false);

    alert(`Selected Countries: \n ${JSON.stringify(serializedCountries)}`);
  };

  return (
    <div>
      <ContinentCountrySelect
        continents={continents}
        selected={selectedCountries}
        onChange={onChange}
      />
      <button type="button" onClick={onSerializeData}>
        Serialize Selected Countries
      </button>
    </div>
  );
};

export default App;
```
