function b_search(nums: Array<number>, target: number): false | number {
  /*
   *
   *  1. go to middle of array
   *  2. determine if the value found is greater or less
   *  3. search upper or lower depending on the above
   *
   *  Important details:
   *  1. inclusive bottom, exclusive top: [)
   *  2. inplace
   *  3. logn runtime
   *  4. only on sorted arrays
   *
   *  Breakup:
   *
   *
   */
  if (!nums || !nums.length) {
    return false;
  }

  let min = 0;
  let max = nums.length;

  while (max !== min) {
    let pivot = Math.floor((max - min) / 2) + min;
    const val = nums[pivot];

    if (val === target) {
      return target;
    }

    if (val > target) {
      max = pivot;
      continue;
    }

    min = pivot + 1;
  }

  return false;
}

export function test_b_search() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return b_search(arr, 10);
}
