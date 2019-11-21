import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ProgressBar = ({ width }) => (
  <div
    className="ProgressBar"
    style={{
      width: `${width}%`
    }}
  ></div>
);

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired
};

export default ProgressBar;
