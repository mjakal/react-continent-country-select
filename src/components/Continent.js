import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Button,
  Collapse
} from 'reactstrap';

const propTypes = {
  styles: PropTypes.object.isRequired,
  continent: PropTypes.object.isRequired,
  filtering: PropTypes.bool.isRequired,
  selectedState: PropTypes.bool.isRequired,
  selectedCountries: PropTypes.number.isRequired,
  countriesCount: PropTypes.number.isRequired,
  shouldRenderCountry: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  translations: PropTypes.object.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onContinentChange: PropTypes.func.isRequired
};

const Continent = ({
  styles,
  continent,
  filtering,
  selectedState,
  selectedCountries,
  countriesCount,
  shouldRenderCountry,
  countries,
  translations,
  onSelectAll,
  onContinentChange
}) => {
  // Checkbox class
  const inputClass = !filtering ? styles.mouse_cursor : '';
  // Toggle button icon
  const iconClass = shouldRenderCountry
    ? 'fa fa-angle-double-up'
    : 'fa fa-angle-double-down';

  return (
    <Card className="mb-2">
      <CardHeader className={styles.collapse_header}>
        <div className={styles.title}>
          <Input
            type="checkbox"
            className={`${inputClass} form-check-input`}
            name={continent.code}
            value={selectedState}
            onChange={() => onSelectAll(continent.code, selectedState)}
            checked={!selectedState}
            disabled={filtering}
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
            {translations.toggleText}
          </Button>
        </div>
      </CardHeader>
      <Collapse isOpen={shouldRenderCountry}>
        <CardBody>
          <div className={styles.countries_container}>
            <div className={styles.block}>{countries}</div>
          </div>
        </CardBody>
      </Collapse>
    </Card>
  );
};

Continent.propTypes = propTypes;
export default Continent;
