import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange
} from './helpers';

const ShellSort = (nums) => {
  const trace = newTrace(nums);

  for (
    let gap = Math.floor(nums.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let j = gap; j < nums.length; j++) {
      for (let i = j - gap; i >= 0; i -= gap) {
        addToTrace(trace, nums, [], [i, i + gap]);
        if (nums[i + gap] < nums[i]) {
          addToTrace(trace, nums, [], [], [i, i + gap]);
          swap(nums, i, i + gap);
          addToTrace(trace, nums, [], [], [i, i + gap]);
        } else {
          break;
        }
      }
    }
  }

  addToTrace(trace, nums, createRange(0, nums.length));
  return trace;
};

export default ShellSort;
