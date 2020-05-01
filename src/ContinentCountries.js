import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Button,
  Label,
  Collapse
} from 'reactstrap';

const propTypes = {
  styles: PropTypes.object.isRequired,
  continents: PropTypes.array.isRequired,
  selectedCount: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  activeItems: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onContinentChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired
};

const ContinentCountries = ({
  styles,
  continents,
  selectedCount,
  selected,
  query,
  activeItems,
  onSelect,
  onContinentChange,
  onSelectAll
}) => {
  const userQuery = query.trim().toLowerCase();
  const continentsCount = continents.length;
  const shouldFilter = userQuery.length >= 3 && userQuery.length <= 20;

  const renderCountry = (country, shouldRender) => {
    // Check if component should render
    if (!shouldRender) return null;

    const countryCode = country.code;
    const isChecked = !!selected[country.code];
    const label = (
      <span>
        <i
          style={{ width: '30px' }}
          className={`flag-icon flag-icon-${countryCode.toLowerCase()} mr-1`}
        />{' '}
        `${country.name} (+$
        {country.dial_code})`
      </span>
    );

    return (
      <FormGroup check className="checkbox">
        <Input
          type="checkbox"
          className={`${styles.mouse_cursor} form-check-input`}
          name={countryCode}
          value={isChecked}
          onChange={onSelect}
          checked={isChecked}
        />
        <Label check className="form-check-label">
          {label}
        </Label>
      </FormGroup>
    );
  };

  const renderContinentCountries = () => {
    const continentCountries = [];

    // Outer loop to create parent
    for (let index = 0; index < continentsCount; index++) {
      const continent = continents[index];
      const shouldRender = activeItems[continent.code];
      const countries = [];
      const countriesCount = continent.countries.length;
      let selectedCountries = 0;
      let filteredCountries = 0;

      for (
        let countryIndex = 0;
        countryIndex < countriesCount;
        countryIndex++
      ) {
        const country = continent.countries[countryIndex];

        // Count selected countries
        if (selected[country.code]) selectedCountries += 1;

        if (shouldFilter) {
          const countryName = country.name.toLowerCase();

          if (countryName.indexOf(userQuery) !== -1) {
            countries.push(
              <div key={country.code}>
                {renderCountry(country, shouldRender)}
              </div>
            );

            filteredCountries += 1;
          }
        } else {
          countries.push(
            <div key={country.code}>{renderCountry(country, shouldRender)}</div>
          );

          filteredCountries += 1;
        }
      }

      const selectedState = selectedCountries !== countriesCount;

      // Check it there are countries after filtering
      if (filteredCountries) {
        const iconClass = shouldRender
          ? 'fa fa-angle-double-up'
          : 'fa fa-angle-double-down';

        continentCountries.push(
          <Card key={continent.code} className="mb-2">
            <CardHeader className={styles.collapse_header}>
              <div className={styles.title}>
                <Input
                  type="checkbox"
                  className={`${styles.mouse_cursor} form-check-input`}
                  name={continent.code}
                  value={selectedState}
                  onChange={() => onSelectAll(continent.code, selectedState)}
                  checked={!selectedState}
                />
                <Label check className="form-check-label">
                  {`${continent.name} (${selectedCountries}/${countriesCount})`}
                </Label>
              </div>
              <div className={styles.actions}>
                <Button
                  color="primary"
                  onClick={() => onContinentChange(continent.code)}
                >
                  <i className={`${iconClass} mr-1`} />
                  Toggle
                </Button>
              </div>
            </CardHeader>
            <Collapse isOpen={shouldRender}>
              <CardBody>
                <div className={styles.countries_container}>
                  <div className={styles.block}>{countries}</div>
                </div>
              </CardBody>
            </Collapse>
          </Card>
        );
      }
    }

    // Check if there are any continents/countries after filtering
    if (continentCountries.length) return continentCountries;

    return (
      <Card className="mb-2">
        <CardHeader className={styles.collapse_header}>
          No countries found.
        </CardHeader>
      </Card>
    );
  };

  return <div>{renderContinentCountries()}</div>;
};

ContinentCountries.propTypes = propTypes;
export default ContinentCountries;
