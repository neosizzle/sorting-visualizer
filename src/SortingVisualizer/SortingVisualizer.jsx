import React from 'react';
import { useState } from 'react-dom'

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import Slider from 'react-input-slider';
import NumericInput from 'react-numeric-input';


import {
  getBubbleSortAnimations,
  getReversedBubbleSortAnimations,
  getMergeSortAnimations,
  getSelectionSortAnimations,
  getTraversalAnimations,
  getCompletedAnimations
}
  from '../sortingAlgorithms/sortingAlgorithms.js';

import './SortingVisualizer.css';

// // Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 1;


// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const DONE_COLOR = 'blue';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      sliderCoords: { x: 0.3 },
      // Change this value for the number of bars (value) in the array.
      NUMBER_OF_ARRAY_BARS: 50,
      // Change this value for the speed of the animations.
      ANIMATION_SPEED_MS: 5
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    let animationIndexCounter = 0
    for (let i = animationIndexCounter; i < animations.length; animationIndexCounter++, i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.ANIMATION_SPEED_MS);
      }
    }

    this.sortingCompletedAnimation(animationIndexCounter * this.state.ANIMATION_SPEED_MS)


  }

  traversal() {

    const animations = getTraversalAnimations(this.state.array, 500)

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
        }, animationIndex * this.state.ANIMATION_SPEED_MS);
      } else {

        //switching animatopn with incrementing delay
        setTimeout(() => {

          //get desired index 
          const [barIdx, newBarHeight] = animation;

          //get style from array DOM
          const barOneStyle = arrayBars[barIdx].style;

          //set new height
          barOneStyle.height = `${newBarHeight}px`;

        }, animationIndex * this.state.ANIMATION_SPEED_MS);
      }

      //a variable that needs to increment for each settimeout so it can appear with delay every single animation
      animationIndex++
    });

    this.sortingCompletedAnimation(animationIndex * this.state.ANIMATION_SPEED_MS)
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array)
    const arrayBars = document.getElementsByClassName('array-bar');
    let isColorChange = false
    let animationIndexCounter = 0


    for (let animationIndex = animationIndexCounter; animationIndex < animations.length; ++animationIndex, ++animationIndexCounter) {
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
        }, animationIndex * this.state.ANIMATION_SPEED_MS);
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

        }, animationIndex * this.state.ANIMATION_SPEED_MS);



      }

    }

    this.sortingCompletedAnimation(animationIndexCounter * this.state.ANIMATION_SPEED_MS)
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array)
    const arrayBars = document.getElementsByClassName('array-bar');
    let isColorChange = false
    let animationIndexCounter = 0

    for (let animationIndex = animationIndexCounter; animationIndex < animations.length; ++animationIndex, ++animationIndexCounter) {
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
        }, animationIndex * this.state.ANIMATION_SPEED_MS);
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

        }, animationIndex * this.state.ANIMATION_SPEED_MS);



      }

    }

    this.sortingCompletedAnimation(animationIndexCounter * this.state.ANIMATION_SPEED_MS)

  }

  reverseBubbleSort() {
    const animations = getReversedBubbleSortAnimations(this.state.array)
    const arrayBars = document.getElementsByClassName('array-bar');
    let isColorChange = false
    let animationIndexCounter = 0;


    for (let animationIndex = animationIndexCounter; animationIndex < animations.length; ++animationIndex, ++animationIndexCounter) {
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
        }, animationIndex * this.state.ANIMATION_SPEED_MS);
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

        }, animationIndex * this.state.ANIMATION_SPEED_MS);



      }

    }

    this.sortingCompletedAnimation(animationIndexCounter * this.state.ANIMATION_SPEED_MS)
 
  }

  sortingCompletedAnimation(delayedAnimationSpeed) {
    const animations = getCompletedAnimations(this.state.array)

    let animationIndex = 0;

    //traverse through animations and display on the screen
    animations.forEach(animation => {
      setTimeout(() => {
        //get arrays from DOM
        const arrayBars = document.getElementsByClassName('array-bar');

        //if animation index % 3 != 2, which means its a colour change animation
        const isColored = animationIndex % 2 == 0;

        //get the index for desired bar
        const [barOneIdx] = animation;

        //get styles for said bar
        const barOneStyle = arrayBars[barOneIdx].style;

        console.log(animationIndex + " " + delayedAnimationSpeed)



        //set colour of bars with an incrementing delay
        setTimeout(() => {
          if (isColored) {
            barOneStyle.backgroundColor = DONE_COLOR
          } else {
            barOneStyle.backgroundColor = PRIMARY_COLOR
          }
        }, (animationIndex * this.state.ANIMATION_SPEED_MS));

        //a variable that needs to increment for each settimeout so it can appear with delay every single animation
        animationIndex++
      }, delayedAnimationSpeed);
    });
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
      <div className="">

        <div className="d-flex justify-content-center array-container align-items-baseline">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>

        <Container fluid className="controls-container">

          <Row className="justify-content-center">

            <Col lg={2} md="auto" sm={12}>
              <div className="d-flex align-items-center">
                <div>Animation speed(ms): </div>

                <NumericInput style={{
                  input: {
                    width: '50%'
                  }
                }}
                  min={1}
                  max={300}
                  value={this.state.ANIMATION_SPEED_MS}
                  step={10} onChange={(x) => {
                    this.setState({
                      ANIMATION_SPEED_MS: x
                    })

                  }
                  } />


              </div>
            </Col>

            <Col lg={2} md="auto" sm={12}>
              <div className="d-flex align-items-center">
                <div>Array size : </div>
                <Slider
                  axis="x"
                  xstep={10}
                  xmin={10}
                  xmax={300}
                  x={this.state.NUMBER_OF_ARRAY_BARS}
                  onChange={({ x }) => {
                    this.setState({
                      sliderCoords: {
                        x
                      },
                      NUMBER_OF_ARRAY_BARS: x
                    })

                    this.resetArray()
                  }
                  }
                />

              </div>
            </Col>

            <Col lg="auto" md="auto" sm={12}>
              <div className="d-flex justify-content-center">

                <Button className="control-button btn-secondary" onClick={() => this.resetArray()}>Generate New Array</Button>
              </div>

            </Col>


            <Col lg={2} md="auto" sm={12}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sorting Algorithms
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {
                    this.mergeSort()

                  }}>Merge Sort</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.selectionSort()}>Selection Sort</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.bubbleSort()}>Bubble Sort</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.reverseBubbleSort()}>Reserve Bubble Sort</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.traversal()}>BECOME SQUARE</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>



          </Row>


        </Container>


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
