import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Label,
  Collapse
} from 'reactstrap';
import './scss/style.scss';
import continents from './continent_countries.json';

const propTypes = {
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  selected: {}
};

const cursorStyle = { cursor: 'pointer' };

class ContinentCountrySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: {
        AF: false,
        AN: false,
        AS: false,
        OC: false,
        EU: false,
        NA: false,
        SA: false
      },
      query: ''
    };

    this.onContinentChange = this.onContinentChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
  }

  onContinentChange(item) {
    const { activeItems } = this.state;

    activeItems[item] = !activeItems[item];

    this.setState({ activeItems });
  }

  onSearch(event) {
    const { activeItems } = this.state;
    const keys = Object.keys(activeItems);

    const target = event.target;
    const name = target.name;
    const value = target.value;
    const openMenu = value.trim().length >= 3;

    keys.forEach(key => {
      activeItems[key] = openMenu;
    });

    this.setState({ activeItems, [name]: value });
  }

  onClear() {
    const { activeItems } = this.state;
    const keys = Object.keys(activeItems);

    keys.forEach(key => {
      activeItems[key] = false;
    });

    this.setState({ query: '', activeItems });
  }

  onSelect(event) {
    const { selected, onChange } = this.props;

    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    selected[name] = value;

    onChange(selected);
  }

  onSelectAll(item, selectedState) {
    const { selected, onChange } = this.props;
    const continent = continents.find(c => c.code === item);

    continent.countries.forEach(c => {
      selected[c.code] = selectedState;
    });

    onChange(selected);
  }

  render() {
    const { selected } = this.props;
    const { activeItems, query } = this.state;

    // Continents component
    const Continents = () => {
      const userQuery = query.trim().toLowerCase();
      const continentsCount = continents.length - 1;
      const shouldFilter = userQuery.length >= 3 && query.length <= 20;
      let allCountries = 0;

      return continents.map((continent, index) => {
        const filtered = shouldFilter
          ? continent.countries.filter(c => {
            const countryName = c.name.toLowerCase();

            return countryName.indexOf(userQuery) !== -1;
          })
          : continent.countries;
        const filterSelected = filtered.filter(c => selected[c.code] === true);
        const selectedCountries = filterSelected.length;
        const totalCount = filtered.length;
        const selectedState = selectedCountries !== totalCount;

        allCountries = allCountries + totalCount;

        // Return no countries message
        if (index === continentsCount && !allCountries) {
          return (
            <Card className="mb-2">
              <CardHeader className="rccs-component-collapse-header">
                No countries found.
              </CardHeader>
            </Card>
          );
        }

        // Hide continent if there are no countries
        if (!totalCount) return null;

        return (
          <Card key={continent.code} className="mb-2">
            <CardHeader className="rccs-component-collapse-header">
              <div className="title">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  style={cursorStyle}
                  name={continent.code}
                  value={selectedState}
                  onChange={() =>
                    this.onSelectAll(continent.code, selectedState)
                  }
                  checked={!selectedState}
                />
                <Label check className="form-check-label">
                  {`${continent.name} (${selectedCountries}/${totalCount})`}
                </Label>
              </div>
              <div className="actions">
                <Button
                  color="primary"
                  onClick={() => this.onContinentChange(continent.code)}
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
                <div className="rccs-component-countries-container">
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
                          onChange={this.onSelect}
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

                            this.onSelect(event);
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

    return (
      <div>
        <FormGroup>
          <InputGroup>
            <Input
              className="form-control"
              name="query"
              value={query}
              placeholder="Search..."
              onChange={this.onSearch}
            />
            {query && (
              <button
                type="button"
                className="btn"
                style={{ marginLeft: '-40px', zIndex: '100' }}
                onClick={this.onClear}
              >
                &times;
              </button>
            )}
          </InputGroup>
        </FormGroup>
        <Continents />
      </div>
    );
  }
}

ContinentCountrySelect.propTypes = propTypes;
ContinentCountrySelect.defaultProps = defaultProps;
export default ContinentCountrySelect;
