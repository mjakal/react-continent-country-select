import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import {
  ContinentCountrySelect,
  deserializeCountries,
  serializeCountries
} from 'react-continent-country-select';
import continents from 'react-continent-country-select/dist/continent_countries.json';
import 'react-continent-country-select/dist/index.css';

// pre-selected values from e.g. API endpoint
const countries = ['be', 'nl', 'hr'];
// Deserialize data: convert ['be', 'nl', 'hr'] to { BE: true, NL: true, HR: true }
const deserializedCountries = deserializeCountries(countries);

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState({
    ...deserializedCountries
  });

  const onChange = selected => setSelectedCountries({ ...selected });

  const onSerializeData = () => {
    // Serialize selected countries
    // The second Boolean param serializes data to (upper/lower case)  depending on your specific needs
    const serializedCountries = serializeCountries(selectedCountries, false);

    alert(`Selected Countries: \n ${JSON.stringify(serializedCountries)}`);
  };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <span className="btn btn-outline-light active btn-no-click">
            <b> React Continent Country Select</b>
          </span>
        </CardHeader>
        <CardBody>
          <ContinentCountrySelect
            continents={continents}
            selected={selectedCountries}
            onChange={onChange}
          />
        </CardBody>
        <CardFooter>
          <Button color="primary" size="lg" block onClick={onSerializeData}>
            Serialize Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
