import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../../atoms/Button';
import Menu from '../../molecules/Menu';

const TopBar = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange
}) => {
  return (
    <header className="TopBar">
      <div className="TopBar__Row">
        <section className="TopBar__Section">
          {/* <button>Menu</button> */}
          <span className="TopBar__Title">Sorting Visualizer</span>
        </section>
        <section className="TopBar__Section TopBar__Section_align_end">
          <Menu
            placeholder="Sort Algorithm"
            items={[
              'Bubble Sort',
              'Selection Sort',
              'Insertion Sort',
              'Merge Sort',
              'Quick Sort',
              'Quick Sort 3',
              'Heap Sort',
              'Shell Sort'
            ]}
            selected={algorithm}
            onSelect={onAlgorithmChange}
          />

          <Button onClick={onGenerateRandomArray}>
            Generate New Array
          </Button>

          <Menu
            placeholder="Array Size"
            items={['5', '10', '25', '50', '75', '100']}
            selected={String(arraySize)}
            onSelect={onArraySizeChange}
          />
        </section>
      </div>
    </header>
  );
};

TopBar.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired
};

export default TopBar;
