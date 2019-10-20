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
    let width = 100;
    let height = (num / maxNum) * 100;
    let comparing = comparingIndices.includes(i);
    let compared = comparedIndices.includes(i);
    let sorted = sortedIndices.includes(i);

    return (
      <Bar
        key={`${i}_${num}`}
        width={width}
        height={height}
        val={num}
        comparing={comparing}
        compared={compared}
        sorted={sorted}
      />
    );
  });
};

export default SortChart;
