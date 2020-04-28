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
  selected: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  activeItems: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onContinentChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired
};

const cursorStyle = { cursor: 'pointer' };

const ContinentCountries = props => {
  const {
    styles,
    continents,
    selected,
    query,
    activeItems,
    onSelect,
    onContinentChange,
    onSelectAll
  } = props;
  const userQuery = query.trim().toLowerCase();
  const continentsCount = continents.length - 1;
  const shouldFilter = userQuery.length >= 3 && query.length <= 20;
  let allCountries = 0;

  return continents.map((continent, index) => {
    let filtered = continent.countries;

    // Filter country names
    if (shouldFilter) {
      filtered = continent.countries.filter(country => {
        return country.name.toLowerCase().indexOf(userQuery) !== -1;
      });
    }

    const filterSelected = filtered.filter(c => selected[c.code] === true);
    const selectedCountries = filterSelected.length;
    const totalCount = filtered.length;
    const selectedState = selectedCountries !== totalCount;

    allCountries = allCountries + totalCount;

    // Return no countries message
    if (index === continentsCount && !allCountries) {
      return (
        <Card className="mb-2">
          <CardHeader className={styles.collapse_header}>
            No countries found.
          </CardHeader>
        </Card>
      );
    }

    // Hide continent if there are no countries
    if (!totalCount) return null;

    return (
      <Card key={continent.code} className="mb-2">
        <CardHeader className={styles.collapse_header}>
          <div className={styles.title}>
            <Input
              type="checkbox"
              className="form-check-input"
              style={cursorStyle}
              name={continent.code}
              value={selectedState}
              onChange={() => onSelectAll(continent.code, selectedState)}
              checked={!selectedState}
            />
            <Label check className="form-check-label">
              {`${continent.name} (${selectedCountries}/${totalCount})`}
            </Label>
          </div>
          <div className={styles.actions}>
            <Button
              color="primary"
              onClick={() => onContinentChange(continent.code)}
            >
              <i
                className={
                  activeItems[continent.code]
                    ? 'fa fa-angle-double-up'
                    : 'fa fa-angle-double-down'
                }
              />{' '}
              Toggle
            </Button>
          </div>
        </CardHeader>
        <Collapse isOpen={activeItems[continent.code]}>
          <CardBody>
            <div className={styles.countries_container}>
              {filtered.map(country => {
                const isChecked = !!selected[country.code];
                const name = country.code;
                const label = `${country.name} (+${country.dial_code})`;
                const flag = country.code.toLowerCase();

                return (
                  <FormGroup key={country.code} check className="checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      style={cursorStyle}
                      name={name}
                      value={isChecked}
                      onChange={onSelect}
                      checked={isChecked}
                    />
                    <Label
                      check
                      className="form-check-label"
                      style={cursorStyle}
                      onClick={() => {
                        const event = {
                          target: {
                            type: 'checkbox',
                            name: name,
                            checked: !isChecked
                          }
                        };

                        onSelect(event);
                      }}
                    >
                      <i
                        style={{ width: '30px' }}
                        className={`flag-icon flag-icon-${flag} mr-1`}
                      />
                      {label}
                    </Label>
                  </FormGroup>
                );
              })}
            </div>
          </CardBody>
        </Collapse>
      </Card>
    );
  });
};

ContinentCountries.propTypes = propTypes;
export default ContinentCountries;
