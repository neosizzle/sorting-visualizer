export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getTraversalAnimations(array, maxValue) {
  const animations = [];
  traversalHelper(array, animations, maxValue)
  return animations

}

export function getBubbleSortAnimations(array) {
  let animations = []
  if (array.length <= 1) return array
  bubbleSortHelper(array, animations);
  return animations
}

export function getReversedBubbleSortAnimations(array) {
  let animations = []
  if (array.length <= 1) return array
  bubbleSortTwoHelper(array, animations);
  return animations
}

export function getSelectionSortAnimations(array) {
  let animations = []
  if (array.length <= 1) return array
  selectionSortHelper(array, animations);
  return animations
}

export function getCompletedAnimations(array) {
  const animations = [];
  completedHelper(array, animations)
  return animations
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function traversalHelper(array, animations, maxValue) {


  for (let i = 0; i < array.length; ++i) {
    //first push
    //i is the index need to be selected
    animations.push([i, i])

    //sec push
    //i is the index which need to be disselected
    animations.push([i, i])

    //third push
    //i is the index of the og array to be compared, 20 is the desired height to change
    animations.push([i, maxValue])
  }

}

function bubbleSortTwoHelper(array, animations) {

  let temp = 0

  for (let i = 0; i < array.length - 1; ++i) {
    for (let j = i + 1; j < array.length; ++j) {

      if (array[j] < array[i]) {
        //first push
        //i and j is the index need to be selected
        animations.push([i, j])

        //sec push
        //i is the index which need to be disselected
        animations.push([i, j])

        temp = array[j];
        array[j] = array[i];
        array[i] = temp;

        //third push 
        //i and j is the index which need to be overrided
        animations.push([i, array[i]])
        animations.push([j, array[j]])
      }
    }
  }

  return animations
}

function bubbleSortHelper(array, animations) {

  let temp = 0

  for (let i = 0; i < array.length - 1; ++i) {
    for (let j = 0; j < array.length - i - 1; ++j) {

      if (array[j] > array[j + 1]) {
        //first push
        //i and j is the index need to be selected
        animations.push([j, j + 1])

        //sec push
        //i is the index which need to be disselected
        animations.push([j, j + 1])

        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        //third push 
        //i and j is the index which need to be overrided
        animations.push([j, array[j]])
        animations.push([j + 1, array[j + 1]])
      }
    }
  }

  console.log(array)
  return animations
}

function selectionSortHelper(array, animations) {
  let min = array[0]
  let minIndex = 0
  let temp = 0;

  for (let i = 0; i < array.length - 1; ++i) {

    //find min and min index
    for (let j = i + 1; j < array.length; ++j) {
      if (array[j] < min) {
        min = array[j];
        minIndex = j;
      }
    }

    //push to animations to select min and index i
    animations.push([i, minIndex])

    //push to animations to dissclect min and index i
    animations.push([i, minIndex])

    //push to animations to overwrite index i
    animations.push([i, min])

    //push to animations to overwrite min index
    animations.push([minIndex, array[i]])

    //swap min with i
    temp = array[i]
    array[i] = min;
    array[minIndex] = temp;
    min = array[i + 1]



  }

  return animations

}

function completedHelper(array, animations) {
  for (let i = 0; i < array.length; i++) {
    //push to animation array once to select index
    animations.push([i])
    //push to animation array once to disselect index
    animations.push([i])
  }

  return animations
}