import React, { Component } from 'react';
import './App.css';

import TopBar from './components/organisms/TopBar';
import SortVisualizer from './components/organisms/SortVisualizer';

class App extends Component {
  state = {
    array: [],
    arraySize: 5,
    trace: [],
    algorithm: null
  };

  _addToTrace = (
    trace,
    i,
    j,
    array,
    comparingIndices = [],
    comparedIndices = [],
    sortedIndices = []
  ) => {
    trace.push({
      i,
      j,
      array: [...array],
      comparingIndices: [...comparingIndices],
      comparedIndices: [...comparedIndices],
      sortedIndices: [...sortedIndices]
    });
  };

  bubbleSort = (nums) => {
    // Set up code for tracing the algorithm
    const addToTrace = (
      i,
      j,
      array,
      comparingIndices = [],
      comparedIndices = [],
      sortedIndices = []
    ) => {
      trace.push({
        i,
        j,
        array: [...array],
        comparingIndices: [...comparingIndices],
        comparedIndices: [...comparedIndices],
        sortedIndices: [...sortedIndices]
      });
    };

    const trace = [
      {
        i: 0,
        j: 0,
        array: [...nums],
        comparingIndices: [],
        comparedIndices: [],
        sortedIndices: []
      }
    ];

    // Helper funciton
    const _swap = (nums, a, b) => {
      const temp = nums[a];
      nums[a] = nums[b];
      nums[b] = temp;
    };

    // Sorting Algorithm with trace capture
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length - i - 1; j++) {
        addToTrace(
          i,
          j,
          nums,
          [j, j + 1],
          [],
          [...trace[trace.length - 1].sortedIndices]
        );
        if (nums[j] > nums[j + 1]) {
          _swap(nums, j, j + 1);
          addToTrace(
            i,
            j,
            nums,
            [j, j + 1],
            [j, j + 1],
            [...trace[trace.length - 1].sortedIndices]
          );
        }
      }
      addToTrace(
        i,
        nums.length - i - 1,
        nums,
        [],
        [],
        [...trace[trace.length - 1].sortedIndices, nums.length - 1 - i]
      );
    }

    return trace;
  };

  selectionSort = (nums) => {
    // Initial State
    const trace = [
      {
        i: 0,
        j: 0,
        array: [...nums],
        comparingIndices: [],
        comparedIndices: [],
        sortedIndices: []
      }
    ];

    // Core Algorithm
    for (let i = 0; i < nums.length - 1; i++) {
      // Internal Loop: Find index of min value
      let minIndex = i;
      for (let j = i + 1; j < nums.length; j++) {
        this._addToTrace(
          trace,
          i,
          j,
          nums,
          [minIndex, j],
          [],
          [...trace[trace.length - 1].sortedIndices]
        );
        if (nums[j] < nums[minIndex]) {
          this._addToTrace(
            trace,
            i,
            j,
            nums,
            [minIndex, j],
            [minIndex, j],
            [...trace[trace.length - 1].sortedIndices]
          );
          minIndex = j;
          this._addToTrace(
            trace,
            i,
            j,
            nums,
            [minIndex, j],
            [],
            [...trace[trace.length - 1].sortedIndices]
          );
        }
      }

      // Swap min value with current value
      this._addToTrace(
        trace,
        i,
        nums.length - 1 - i,
        nums,
        [minIndex],
        [i],
        [...trace[trace.length - 1].sortedIndices]
      );
      let temp = nums[i];
      nums[i] = nums[minIndex];
      nums[minIndex] = temp;
      this._addToTrace(
        trace,
        i,
        nums.length - 1 - i,
        nums,
        [],
        [minIndex],
        [...trace[trace.length - 1].sortedIndices, i]
      );
    }

    // Final item in the array is sorted
    this._addToTrace(
      trace,
      nums.length - 1,
      nums.length - 1,
      nums,
      [],
      [],
      [...trace[trace.length - 1].sortedIndices, nums.length - 1]
    );

    return trace;
  };

  ALGORITHM = {
    'Bubble Sort': this.bubbleSort,
    'Selection Sort': this.selectionSort
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
