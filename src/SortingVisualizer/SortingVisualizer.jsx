import React from 'react';
import { getBubbleSortAnimations, getMergeSortAnimations, getSelectionSortAnimations, getTraversalAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  traversal() {

    const animations = getTraversalAnimations(this.state.array, 600)

    let animationIndex = 0;

    //traverse through animations and display on the screen
    animations.forEach(animation => {
      //get arrays from DOM
      const arrayBars = document.getElementsByClassName('array-bar');

      //if animation index % 3 != 2, which means its a colour change animation
      const isColorChange = animationIndex % 3 !== 2;

      if (isColorChange) {

        //get the index for desired bars
        const [barOneIdx, barTwoIdx] = animations[animationIndex];

        //get styles for said bars
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //set the colour according to the index position (colour it red if its every 3 element and decolour it if its not)
        const color = animationIndex % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        //set colour of bars with an incrementing delay
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, animationIndex * ANIMATION_SPEED_MS);
      } else {

        //switching animatopn with incrementing delay
        setTimeout(() => {

          //get desired index 
          const [barIdx, newBarHeight] = animation;

          //get style from array DOM
          const barOneStyle = arrayBars[barIdx].style;

          //set new height
          barOneStyle.height = `${newBarHeight}px`;

        }, animationIndex * ANIMATION_SPEED_MS);
      }

      //a variable that needs to increment for each settimeout so it can appear with delay every single animation
      animationIndex++
    });
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array)
    const arrayBars = document.getElementsByClassName('array-bar');
    let isColorChange = false


    for (let animationIndex = 0; animationIndex < animations.length; ++animationIndex) {
      isColorChange = animationIndex % 4 <= 1;

      //colour change animation
      if (isColorChange) {
        //get the index for desired bars
        const [barOneIdx, barTwoIdx] = animations[animationIndex];

        //get styles for said bars
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //set the colour according to the index position 
        const color = animationIndex % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;


        //set colour of bars with an incrementing delay
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, animationIndex * ANIMATION_SPEED_MS);
      }
      else {
        //height change animation

        //switching animatopn with incrementing delay
        setTimeout(() => {

          //get desired index 
          const [barIdx, newBarHeight] = animations[animationIndex];

          //get style from array DOM
          const barOneStyle = arrayBars[barIdx].style;

          //set new height
          barOneStyle.height = `${newBarHeight}px`;

        }, animationIndex * ANIMATION_SPEED_MS);



      }

    }

  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array)
    const arrayBars = document.getElementsByClassName('array-bar');
    let isColorChange = false


    for (let animationIndex = 0; animationIndex < animations.length; ++animationIndex) {
      isColorChange = animationIndex % 4 <= 1;

      //colour change animation
      if (isColorChange) {
        //get the index for desired bars
        const [barOneIdx, barTwoIdx] = animations[animationIndex];

        //get styles for said bars
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //set the colour according to the index position 
        const color = animationIndex % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;


        //set colour of bars with an incrementing delay
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, animationIndex * ANIMATION_SPEED_MS);
      }
      else {
        //height change animation

        //switching animatopn with incrementing delay
        setTimeout(() => {

          //get desired index 
          const [barIdx, newBarHeight] = animations[animationIndex];

          //get style from array DOM
          const barOneStyle = arrayBars[barIdx].style;

          //set new height
          barOneStyle.height = `${newBarHeight}px`;

        }, animationIndex * ANIMATION_SPEED_MS);



      }

    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.traversal()}>Traversal</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
