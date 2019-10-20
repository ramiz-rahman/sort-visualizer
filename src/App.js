import React, { Component } from 'react';
import './App.css';

import SortChart from './components/organisms/SortChart/';

class App extends Component {
  state = {
    numbers: [9, 7, 13, 2, 5, 6, 8, 1],
    max_num: 0,
    comparing: [],
    compared: [],
    sorted: [],
    timeoutIds: []
  };

  componentDidMount() {
    this.setState((prevState) => ({
      max_num: Math.max(...prevState.numbers)
    }));
  }

  clearTimeouts = () => {
    this.state.timeoutIds.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
  };

  runVisualizer = (trace) => {
    const timeoutIds = [];

    trace.forEach((item, i) => {
      let timeoutId = setTimeout(
        (item) => {
          this.setState({
            current: [item.j, item.j + 1],
            numbers: item.nums,
            comparing: item.comparing,
            compared: item.compared,
            sorted: item.sorted
          });
        },
        i * 400,
        item
      );

      timeoutIds.push(timeoutId);
    });

    this.setState({ timeoutIds });
  };

  bubbleSort = (nums) => {
    // Set up code for tracing the algorithm
    const addToTrace = (
      i,
      j,
      nums,
      comparing = [],
      compared = [],
      sorted = []
    ) => {
      trace.push({
        i,
        j,
        nums: [...nums],
        comparing: [...comparing],
        compared: [...compared],
        sorted: [...sorted]
      });
    };
    const trace = [
      {
        i: 0,
        j: 0,
        nums: [...nums],
        comparing: [],
        compared: [],
        sorted: []
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
          [...trace[trace.length - 1].sorted]
        );
        if (nums[j] > nums[j + 1]) {
          _swap(nums, j, j + 1);
          addToTrace(
            i,
            j,
            nums,
            [j, j + 1],
            [j, j + 1],
            [...trace[trace.length - 1].sorted]
          );
        }
      }
      addToTrace(
        i,
        nums.length - i - 1,
        nums,
        [],
        [],
        [...trace[trace.length - 1].sorted, nums.length - 1 - i]
      );
    }

    return trace;
  };

  stop = () => {
    this.clearTimeouts();
  };

  run = () => {
    // Stop the running of the existing visualizer
    this.clearTimeouts();

    // Create a copy of the state array
    const numbers = [...this.state.numbers];

    // Run sorting algorithm and build the trace
    const trace = this.bubbleSort(numbers);
    console.log(trace);
    // Run the visualizer
    this.runVisualizer(trace);
  };

  render() {
    return (
      <div className="App">
        <SortChart
          numbers={this.state.numbers}
          maxNum={this.state.max_num}
          comparingIndices={this.state.comparing}
          comparedIndices={this.state.compared}
          sortedIndices={this.state.sorted}
        />
        <button onClick={this.run}>Run</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    );
  }
}

export default App;
