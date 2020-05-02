import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'reactstrap';

const propTypes = {
  styles: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

const NotFound = ({ styles, message }) => (
  <Card className="mb-2">
    <CardHeader className={styles.collapse_header}>{message}</CardHeader>
  </Card>
);

NotFound.propTypes = propTypes;
export default NotFound;
