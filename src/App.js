import React, { Component } from 'react';
import './App.css';
import './AppDark.css';

import TopBar from './components/organisms/TopBar';
import SortVisualizer from './components/organisms/SortVisualizer';

import BubbleSort, {
  BubbleSortKey,
  BubbleSortDesc
} from './algorithms/BubbleSort';
import SelectionSort, {
  SelectionSortKey,
  SelectionSortDesc
} from './algorithms/SelectionSort';
import InsertionSort, {
  InsertionSortKey,
  InsertionSortDesc
} from './algorithms/InsertionSort';
import MergeSort, {
  MergeSortKey,
  MergeSortDesc
} from './algorithms/MergeSort';
import QuickSort, {
  QuickSortKey,
  QuickSortDesc
} from './algorithms/QuickSort';
import QuickSort3, {
  QuickSort3Key,
  QuickSort3Desc
} from './algorithms/QuickSort3';
import HeapSort, {
  HeapSortKey,
  HeapSortDesc
} from './algorithms/HeapSort';
import ShellSort, { ShellSortKey, ShellSortDesc } from './algorithms/ShellSort';

class App extends Component {
  state = {
    darkMode: false,
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
    'Quick Sort 3': QuickSort3,
    'Heap Sort': HeapSort,
    'Shell Sort': ShellSort
  };

  ALGORITHM_KEY = {
    'Bubble Sort': BubbleSortKey,
    'Selection Sort': SelectionSortKey,
    'Insertion Sort': InsertionSortKey,
    'Merge Sort': MergeSortKey,
    'Quick Sort': QuickSortKey,
    'Quick Sort 3': QuickSort3Key,
    'Heap Sort': HeapSortKey,
    'Shell Sort': ShellSortKey
  };

  ALGORITHM_DESC = {
    'Bubble Sort': BubbleSortDesc,
    'Selection Sort': SelectionSortDesc,
    'Insertion Sort': InsertionSortDesc,
    'Merge Sort': MergeSortDesc,
    'Quick Sort': QuickSortDesc,
    'Quick Sort 3': QuickSort3Desc,
    'Heap Sort': HeapSortDesc,
    'Shell Sort': ShellSortDesc
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

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    let theme = `App`;
    if (this.state.darkMode) theme += ` App_dark`;

    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
    const desc = this.ALGORITHM_DESC[this.state.algorithm];

    return (
      <div className={theme}>
        <TopBar
          onGenerateRandomArray={this.generateRandomArray}
          algorithm={this.state.algorithm}
          onAlgorithmChange={this.handleAlgorithmChange}
          arraySize={this.state.arraySize}
          onArraySizeChange={this.handleArraySizeChange}
          onToggleDarkMode={this.toggleDarkMode}
        />

        <main className="App__Body">
          <SortVisualizer
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
            desc={desc}
          />
        </main>
      </div>
    );
  }
}

export default App;
