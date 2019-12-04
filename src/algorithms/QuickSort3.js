import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey
} from './helpers';

const QuickSort3 = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  function choosePivot(array, start, end) {
    // randomly pick an element between start and end;
    return Math.floor(Math.random() * (end - start)) + start;
  }

  function partition(array, start, end) {
    const pivot = array[start];
    let i = start + 1;
    let j = start + 1;
    let k = start + 1;
    // Between k and end : uncheked
    // Between start and i : equal to pivot
    // Between i and j : less than pivot
    // Between j and k : greater than pivot

    // Visualize: Keep pivot marked
    addToTrace(trace, array, lastSorted(trace), [start]);

    while (k < end) {
      if (array[k] === pivot) {
        // Visualize: Mark item that is equal to pivot
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start, ...createRange(start, i)],
          [k],
          [],
          createRange(i, j)
        );

        swap(array, i, k);

        // Visualize: Mark item that is equal to pivot
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start, ...createRange(start, i)],
          [i],
          [],
          createRange(i, j)
        );

        if (j > i) swap(array, j, k);
        i += 1;
        j += 1;
      } else if (array[k] < pivot) {
        // Visualize: Mark item that is less than pivot
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start, ...createRange(start, i)],
          [k],
          [],
          createRange(i, j)
        );

        swap(array, j, k);

        // Visualize: Move item to lesser list
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start, ...createRange(start, i)],
          [j],
          [],
          createRange(i, j)
        );

        j += 1;
      }
      k += 1;
    }

    const pivot_elements = i - start;
    i -= 1;
    j -= 1;
    while (i >= start) {
      swap(array, i, j);
      i -= 1;
      j -= 1;
    }

    // Visualize: Move pivot_elements to center
    addToTrace(
      trace,
      array,
      lastSorted(trace),
      createRange(j + 1, j + 1 + pivot_elements),
      [],
      [],
      createRange(start, j + 1)
    );
    return [j + 1, j + 1 + pivot_elements];
  }

  function recursiveQuickSort3(array, start, end) {
    if (start >= end - 1) {
      if (start === end - 1) {
        // Visualize: Mark only item as sorted
        addToTrace(trace, array, [...lastSorted(trace), start]);
      }
      return null;
    }

    let pivot = choosePivot(array, start, end);

    // Visualize: Mark chosen pivot
    addToTrace(trace, array, lastSorted(trace), [pivot]);

    swap(array, start, pivot);

    // Visualize: Move chosen pivot to start
    addToTrace(trace, array, lastSorted(trace), [pivot]);

    let [pivotStart, pivotEnd] = partition(array, start, end);

    // Visualize: Mark pivot after partition as sorted
    addToTrace(trace, array, [
      ...lastSorted(trace),
      ...createRange(pivotStart, pivotEnd)
    ]);

    recursiveQuickSort3(array, start, pivotStart);
    recursiveQuickSort3(array, pivotEnd, end);
  }

  recursiveQuickSort3(nums, 0, nums.length);

  return trace;
};

export const QuickSort3Key = createKey(
  'Comparing',
  'Swapping',
  null,
  'Less than pivot'
);

export default QuickSort3;
