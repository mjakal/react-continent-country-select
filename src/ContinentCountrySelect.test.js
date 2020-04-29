import React from 'react';
import { shallow } from 'enzyme';
import ContinentCountrySelect from './index';
import continents from '../dist/continent_countries.json';

describe('ReactAsyncTable', () => {
  it('renders without crashing', () => {
    const selectedCountries = { BE: true, NL: true, HR: true };
    const onChange = selected => {
      return selected;
    };

    const wrapper = shallow(
      <ContinentCountrySelect
        continents={continents}
        selected={selectedCountries}
        onChange={onChange}
      />
    );

    expect(wrapper).toHaveLength(1);
  });
});
