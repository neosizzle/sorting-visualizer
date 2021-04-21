export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getTraversalAnimations(array) {
  const animations = [];
  traversalHelper(array, animations)
  return animations

}

export function getBubbleSortAnimations(array) {
  let animations = []
  if (array.length <= 1) return array
  bubbleSortHelper(array, animations);
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

function traversalHelper(array, animations) {


  for (let i = 0; i < array.length; ++i) {
    //first push
    //i is the index need to be selected
    animations.push([i, i])

    //sec push
    //i is the index which need to be disselected
    animations.push([i, i])

    //third push
    //i is the index of the og array to be compared, 20 is the desired height to change
    animations.push([i, 20])
  }

}

function bubbleSortHelper(array, animations) {

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