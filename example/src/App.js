import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ContinentCountrySelect from 'react-continent-country-select';
import 'react-continent-country-select/dist/index.css';

const App = () => {
  const selectedCountries = { BE: true, NL: true, HR: true };
  const onChange = selected => {
    console.log('selected countries', selected);
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
            selected={selectedCountries}
            onChange={onChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default App;
