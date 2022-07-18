import React from "react"
import { Card } from 'react-bootstrap'
import '../styles/Graph.css'
import '../styles/Styles.css'
import { InsertionSort } from '../data/insertionSort'

interface IProps { }

interface INumberArray {
  array: number[]
  mobile: boolean
  height: number
}

export default class Graph extends React.Component<IProps, INumberArray> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      array: [],
      mobile: false,
      height: 0
    }
  }

  componentDidMount() {
    this.resetArray()
    window.addEventListener('resize', this.resetArray)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetArray)
  }

  resetArray() {
    const array: number[] = [];

    let width: number = window.innerWidth
    let height: number = window.innerHeight
    let mobile: boolean

    if (width < 1200) {
      width = window.innerWidth - (window.innerWidth * 0.2)
      height = (window.innerHeight - (window.innerHeight * 0.5)) / 4
      mobile = true
    }
    else {
      width = window.innerWidth - (window.innerWidth * 0.6)
      height = (window.innerHeight - (window.innerHeight * 0.2)) / 4
      mobile = false
    }

    for (let i = 0; i < height; i++) {
      array.push(getRandomInt(5, width))
    }

    this.setState({
      array: array,
      mobile: mobile,
      height: height * 4
    })
  }

  render(): React.ReactNode {
    const { array, mobile, height } = this.state
    return (
      <div style={{ display: mobile ? 'flow' : 'flex' }}>
        <div className="array-container">
          {array.map((value: number, index: number) => (
            <div className="array-bar"
              key={index}
              style={{ width: `${value}px` }}
            ></div>
          ))}
        </div>
        <Card bg='dark' className="card" style={{ height: `${height}px` }}>
          <Card.Body>
            <InsertionSort></InsertionSort>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

// function that return a random value between two values
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
