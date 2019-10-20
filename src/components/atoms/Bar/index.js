import React from 'react';
import './style.css';

const Bar = ({ width, height, val, comparing, compared, sorted }) => {
  let classNames = 'Bar';
  if (comparing) classNames += ' Bar_comparing';
  if (compared) classNames += ' Bar_compared';
  if (sorted) classNames += ' Bar_sorted';
  return (
    <div
      style={{ width: `${width}%`, height: `${height}%` }}
      className={classNames}
    >
      <span className="Bar__Text">{val}</span>
    </div>
  );
};

export default Bar;
