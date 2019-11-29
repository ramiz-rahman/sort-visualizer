import React, { Component } from 'react';
import './App.css';

import TopBar from './components/organisms/TopBar';
import SortVisualizer from './components/organisms/SortVisualizer';

import BubbleSort from './algorithms/BubbleSort';
import SelectionSort from './algorithms/SelectionSort';
import InsertionSort from './algorithms/InsertionSort';
import MergeSort from './algorithms/MergeSort';
import QuickSort from './algorithms/QuickSort';
import QuickSort3 from './algorithms/QuickSort3';

class App extends Component {
  state = {
    array: [],
    arraySize: 5,
    trace: [],
    algorithm: null
  };

  ALGORITHM = {
    'Bubble Sort': BubbleSort,
    'Selection Sort': SelectionSort,
    'Insertion Sort': InsertionSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort,
    'Quick Sort 3': QuickSort3
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray = () => {
    // Generate pseudo-random number between 1 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    // Generate an array of length max
    const array = Array(this.state.arraySize)
      .fill(0)
      .map(() => getRandomInt(this.state.arraySize * 5));

    this.setState(
      {
        array,
        trace: []
      },
      this.createTrace
    );
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ algorithm }, this.generateRandomArray);
  };

  handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 100 ? 100 : size;
    size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray);
  };

  createTrace = () => {
    const numbers = [...this.state.array];
    const sort = this.ALGORITHM[this.state.algorithm];
    if (sort) {
      const trace = sort(numbers);
      this.setState({ trace });
    }
  };

  render() {
    return (
      <div className="App">
        <TopBar
          onGenerateRandomArray={this.generateRandomArray}
          algorithm={this.state.algorithm}
          onAlgorithmChange={this.handleAlgorithmChange}
          arraySize={this.state.arraySize}
          onArraySizeChange={this.handleArraySizeChange}
        />

        <main className="App__Body">
          <SortVisualizer
            array={this.state.array}
            trace={this.state.trace}
          />
        </main>
      </div>
    );
  }
}

export default App;
