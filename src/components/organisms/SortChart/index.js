import React from 'react';
import './style.css';

import Bar from '../../atoms/Bar';

const SortChart = ({
  numbers,
  maxNum,
  comparingIndices,
  comparedIndices,
  sortedIndices
}) => {
  return (
    <div className="SortChart">
      {getListOfBars(
        numbers,
        maxNum,
        comparingIndices,
        comparedIndices,
        sortedIndices
      )}
    </div>
  );
};

const getListOfBars = (
  numbers,
  maxNum,
  comparingIndices,
  comparedIndices,
  sortedIndices
) => {
  return numbers.map((num, i) => {
    let width = 100 / numbers.length;
    let height = (num / maxNum) * 100;
    let comparing = comparingIndices.includes(i);
    let compared = comparedIndices.includes(i);
    let sorted = sortedIndices.includes(i);

    let margin =
      i === numbers.length ? '0' : width > 3 ? '0.5rem' : '0.125rem';
    return (
      <Bar
        key={`${i}_${num}`}
        width={width}
        height={height}
        val={width > 4 ? num : null}
        comparing={comparing}
        compared={compared}
        sorted={sorted}
        style={{ marginRight: `${margin}` }}
      />
    );
  });
};

export default SortChart;
