import React, { Component } from 'react';
import './App.css';

import SortChart from './components/organisms/SortChart/';

class App extends Component {
  state = {
    array: [],

    arraySize: 10,
    slowDown: 5,

    comparing: [],
    compared: [],
    sorted: [],

    trace: [],
    traceStep: -1,

    timeoutIds: []
  };

  componentDidMount() {
    this.generateRandomArray(this.state.arraySize);
  }

  clearTimeouts = () => {
    this.state.timeoutIds.forEach((timeoutId) =>
      clearTimeout(timeoutId)
    );
  };

  generateRandomArray(max = 10) {
    // Generate pseudo-random number between 1 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    // Generate an array of length max
    const array = Array(max)
      .fill(0)
      .map(() => getRandomInt(max * 5));

    this.clearTimeouts();
    this.setState({ array, trace: [], traceStep: -1 });
  }

  handleArraySizeChange = (e) => {
    e.preventDefault();
    this.clearTimeouts();
    let size = Number(e.target.value);
    size = size > 100 ? 100 : size;
    size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray(size));
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

  _changeVisualState = (visualState) => {
    this.setState({
      current: [visualState.j, visualState.j + 1],
      array: visualState.nums,
      comparing: visualState.comparing,
      compared: visualState.compared,
      sorted: visualState.sorted
    });
  };

  runVisualizer = (trace) => {
    const timeoutIds = [];

    trace.forEach((item, i) => {
      let timeoutId = setTimeout(
        (item) => {
          this.setState(
            (prevState) => ({
              traceStep: prevState.traceStep + 1
            }),
            this._changeVisualState(item)
          );
        },
        i * (this.state.slowDown / this.state.arraySize) * 1000,
        item
      );

      timeoutIds.push(timeoutId);
    });

    this.setState({ timeoutIds });
  };

  stop = () => {
    this.clearTimeouts();
  };

  pause = () => {
    this.clearTimeouts();
  };

  continue = () => {
    const trace = this.state.trace.slice(this.state.traceStep);
    this.runVisualizer(trace);
  };

  stepForward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step < trace.length - 1) {
      const item = trace[step + 1];
      this.setState(
        { traceStep: step + 1 },
        this._changeVisualState(item)
      );
    }

    /*  this.setState((prevState) => {
      const trace = prevState.trace;
      const step = prevState.traceStep;

      if (step < trace.length - 1) {
        const item = trace[step + 1];
        this._changeVisualState(item);
        return {
          // current: [item.j, item.j + 1],
          // array: item.nums,
          // comparing: item.comparing,
          // compared: item.compared,
          // sorted: item.sorted,
          traceStep: step + 1
        };
      }
    }); */
  };

  stepBackward = () => {
    const trace = this.state.trace;
    const step = this.state.traceStep;
    if (step > 0) {
      const item = trace[step - 1];
      this.setState(
        { traceStep: step - 1 },
        this._changeVisualState(item)
      );
    }

    /* this.setState((prevState) => {
      const trace = prevState.trace;
      const step = prevState.traceStep;

      if (step > 0) {
        const item = trace[step - 1];

        return {
          current: [item.j, item.j + 1],
          array: item.nums,
          comparing: item.comparing,
          compared: item.compared,
          sorted: item.sorted,
          traceStep: step - 1
        };
      }
    }); */
  };

  run = () => {
    // Stop the running of the existing visualizer
    this.clearTimeouts();

    // Create a copy of the state array
    const numbers = [...this.state.array];

    // Run sorting algorithm and build the trace
    const trace = this.bubbleSort(numbers);
    console.log(trace);
    this.setState({ trace });
    // Run the visualizer
    this.runVisualizer(trace);
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <header
          style={{
            marginBottom: '20px',
            backgroundColor: 'grey',
            height: '40px'
          }}
        >
          <button
            onClick={this.generateRandomArray.bind(
              this,
              this.state.arraySize
            )}
          >
            Generate New Array
          </button>
          <label>
            Array Size:{' '}
            <input
              type="number"
              max="100"
              onChange={this.handleArraySizeChange}
              value={this.state.arraySize}
            />
          </label>
          <label>
            <input
              type="radio"
              name="speed"
              value="Slow"
              onChange={() => this.setState({ slowDown: 10 })}
            />
            Slow
          </label>
          <label>
            <input
              type="radio"
              name="speed"
              value="Medium"
              checked
              onChange={() => this.setState({ slowDown: 5 })}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="speed"
              value="Fast"
              onChange={() => this.setState({ slowDown: 1 })}
            />
            Fast
          </label>
          {/* Array Speed Selector */}
          {/* Create Slider */}
          {/* Algorithm */}
          <button onClick={this.run}>Run</button>
          <button onClick={this.stop}>Stop</button>
        </header>

        <section>
          <SortChart
            numbers={this.state.array}
            maxNum={Math.max(...this.state.array)}
            comparingIndices={this.state.comparing}
            comparedIndices={this.state.compared}
            sortedIndices={this.state.sorted}
          />

          {/* Controls */}
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.stepForward}>Step Forward</button>
          <button onClick={this.stepBackward}>Step Backward</button>
          <button onClick={this.continue}>Continue</button>
        </section>
      </div>
    );
  }
}

export default App;
