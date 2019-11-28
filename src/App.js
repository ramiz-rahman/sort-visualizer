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

  insertionSort = (nums) => {
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
    for (let i = 1; i < nums.length; i++) {
      let value = nums[i];
      let hole = i;
      this._addToTrace(
        trace,
        i,
        null,
        nums,
        [i],
        [],
        [...trace[trace.length - 1].sortedIndices]
      );
      this._addToTrace(
        trace,
        i,
        null,
        nums,
        [i],
        [i],
        [...trace[trace.length - 1].sortedIndices]
      );
      while (hole > 0 && nums[hole - 1] > value) {
        this._addToTrace(
          trace,
          i,
          null,
          nums,
          [hole - 1],
          [hole],
          [...trace[trace.length - 1].sortedIndices]
        );
        nums[hole] = nums[hole - 1];
        hole -= 1;
        this._addToTrace(
          trace,
          i,
          null,
          nums,
          [hole],
          [hole + 1],
          [...trace[trace.length - 1].sortedIndices]
        );
      }
      this._addToTrace(
        trace,
        i,
        null,
        nums,
        [],
        [hole],
        [...trace[trace.length - 1].sortedIndices]
      );
      nums[hole] = value;
      this._addToTrace(
        trace,
        i,
        null,
        nums,
        [],
        [hole],
        [...trace[trace.length - 1].sortedIndices, i - 1]
      );
    }
    this._addToTrace(
      trace,
      nums.length - 1,
      null,
      nums,
      [],
      [],
      [...trace[trace.length - 1].sortedIndices, nums.length - 1]
    );
    return trace;
  };

  mergeSort = (nums) => {
    const addToTrace = (
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

    function merge(original, start, mid, end) {
      const left = original.slice(start, mid);
      const right = original.slice(mid, end);
      let i = 0;
      let j = 0;
      let k = 0;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          addToTrace(trace, 0, 0, original, [], [k + start], []);
          original[k + start] = left[i];
          i++;
        } else {
          addToTrace(trace, 0, 0, original, [], [k + start], []);
          original[k + start] = right[j];
          j++;
        }
        k++;
      }
      while (i < left.length) {
        addToTrace(trace, 0, 0, original, [], [k + start], []);
        original[k + start] = left[i];
        i++;
        k++;
      }
      while (j < right.length) {
        addToTrace(trace, 0, 0, original, [], [k + start], []);
        original[k + start] = right[j];
        j++;
        k++;
      }

      left.length = 0;
      right.length = 0;
    }

    function recursiveMergeSort(original, start, end) {
      const length = end - start;
      if (length < 2) {
        if (length < 1) return original;
        else return [original[start]];
      }

      const midPoint = Math.floor((start + end) / 2);
      addToTrace(
        trace,
        0,
        0,
        original,
        [...Array(midPoint - start).keys()].map((i) => i + start),
        [],
        [...trace[trace.length - 1].sortedIndices]
      );
      recursiveMergeSort(original, start, midPoint);

      addToTrace(
        trace,
        0,
        0,
        original,
        [...Array(end - midPoint).keys()].map((i) => i + midPoint),
        [],
        [...trace[trace.length - 1].sortedIndices]
      );
      recursiveMergeSort(original, midPoint, end);

      merge(original, start, midPoint, end);
    }

    recursiveMergeSort(nums, 0, nums.length);

    addToTrace(
      trace,
      0,
      0,
      nums,
      [],
      [],
      [...Array(nums.length).keys()]
    );
    return trace;
  };

  ALGORITHM = {
    'Bubble Sort': this.bubbleSort,
    'Selection Sort': this.selectionSort,
    'Insertion Sort': this.insertionSort,
    'Merge Sort': this.mergeSort
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
