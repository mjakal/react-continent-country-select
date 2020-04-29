import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ContinentCountrySelect from 'react-continent-country-select';
import continents from 'react-continent-country-select/dist/continent_countries.json';
import 'react-continent-country-select/dist/index.css';

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState({
    BE: true,
    NL: true,
    HR: true
  });

  const onChange = selected => setSelectedCountries({ ...selected });

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
      </Card>
    </div>
  );
};

export default App;
