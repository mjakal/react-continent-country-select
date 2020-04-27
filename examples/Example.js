import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ContinentCountrySelect from "../src";
import { tasks } from './sampleData';

const Example = () => {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <span className="btn btn-outline-light active btn-no-click">
            <b> React Continent Country Select</b>
          </span>
        </CardHeader>
        <CardBody>
          <ContinentCountrySelect />
        </CardBody>
      </Card>
    </div>
  );
};


export default Example;
