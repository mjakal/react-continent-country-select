import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Input } from 'reactstrap';
import styles from './styles.module.css';
// import continents from '../public/continent_countries.json';
import ContinentCountries from './ContinentCountries';

const propTypes = {
  continents: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  selected: {}
};

const ContinentCountrySelect = props => {
  const { continents, selected, onChange } = props;
  const [query, setQueryState] = useState('');
  const [activeItems, setActiveItemState] = useState({
    AF: false,
    AN: false,
    AS: false,
    OC: false,
    EU: false,
    NA: false,
    SA: false
  });

  const onContinentChange = item => {
    activeItems[item] = !activeItems[item];

    setActiveItemState({ ...activeItems });
  };

  const onSearch = event => {
    const keys = Object.keys(activeItems);

    const target = event.target;
    const value = target.value;
    const openMenu = value.trim().length >= 3;
    keys.forEach(key => {
      activeItems[key] = openMenu;
    });

    setActiveItemState({ ...activeItems });
    setQueryState(value);
  };

  const onClear = () => {
    const keys = Object.keys(activeItems);

    keys.forEach(key => {
      activeItems[key] = false;
    });

    setActiveItemState({ ...activeItems });
    setQueryState('');
  };

  const onSelect = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    selected[name] = value;

    onChange(selected);
  };

  const onSelectAll = (item, selectedState) => {
    const continent = continents.find(c => c.code === item);

    continent.countries.forEach(c => {
      selected[c.code] = selectedState;
    });

    onChange(selected);
  };

  return (
    <div>
      <FormGroup>
        <InputGroup>
          <Input
            type="text"
            className="form-control"
            name="query"
            value={query}
            placeholder="Search..."
            onChange={onSearch}
          />
          {query && (
            <button
              type="button"
              className="btn"
              style={{ marginLeft: '-40px', zIndex: '100' }}
              onClick={onClear}
            >
              &times;
            </button>
          )}
        </InputGroup>
      </FormGroup>
      <ContinentCountries
        styles={styles}
        continents={continents}
        selected={selected}
        query={query}
        activeItems={activeItems}
        onSelect={onSelect}
        onContinentChange={onContinentChange}
        onSelectAll={onSelectAll}
      />
    </div>
  );
};

ContinentCountrySelect.propTypes = propTypes;
ContinentCountrySelect.defaultProps = defaultProps;
export default ContinentCountrySelect;
