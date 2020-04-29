# react-continent-country-select

![React Continent Country Select Screenshot](https://i.ibb.co/FmKrGMJ/react-continent-country-select.png)

[![NPM](https://img.shields.io/npm/v/react-continent-country-select.svg)](https://www.npmjs.com/package/react-continent-country-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**LIVE DEMO:** [https://mjakal.github.io/react-continent-country-select/](https://mjakal.github.io/react-continent-country-select/)

## Requirements

- bootstrap ">= 4.0.0
- react >= 16.8.0
- react-dom >= 16.8.0
- reactstrap >= 8.0.0

## Install

```bash
npm install --save react-continent-country-select
```

## Usage

```jsx
import React, { useState } from 'react';
import ContinentCountrySelect from 'react-continent-country-select';
import 'react-continent-country-select/dist/index.css';
import continents from 'react-continent-country-select/dist/continent_countries.json';

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState({
    BE: true,
    NL: true,
    HR: true
  });

  const onChange = selected => setSelectedCountries({ ...selected });

  return (
    <ContinentCountrySelect
      continents={continents}
      selected={selectedCountries}
      onChange={onChange}
    />
  );
};

export default App;
```

## License

MIT © [mjakal](https://github.com/mjakal)
