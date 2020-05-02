import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

const propTypes = {
  styles: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Country = ({ styles, country, isChecked, onSelect }) => (
  <FormGroup check className="checkbox">
    <Input
      type="checkbox"
      className={`${styles.mouse_cursor} form-check-input`}
      name={country.code}
      value={isChecked}
      onChange={onSelect}
      checked={isChecked}
    />
    <Label check className="form-check-label">
      {`${country.name} (+${country.dial_code})`}
    </Label>
  </FormGroup>
);

Country.propTypes = propTypes;
export default Country;
