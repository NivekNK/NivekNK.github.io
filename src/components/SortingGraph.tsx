import React from "react"
import { Sort } from './Sort'
import { GetWindowSize } from "../utilities/Utils"
import '../styles/SortingGraph.css'

interface IProps { }

interface INumberArray {
  array: number[]
}

export default class SortingGraph extends React.Component<IProps, INumberArray> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      array: []
    }
  }

  componentDidMount(): void {
    this.resetArray()
    window.addEventListener('resize', this.resetArray)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.resetArray)
  }

  resetArray(): void {
    const array: number[] = [];

    const [width, height] = GetWindowSize()

    for (let i: number = 0; i < height; i++) {
      array.push(getRandomInt(5, width))
    }

    this.setState({
      array: array
    })
  }

  sort(type: string): void {
    let { array } = this.state
    this.setState({
      array: Sort(array, type)
    })
  }

  render(): React.ReactNode {
    const { array } = this.state
    return (
      <>
        {array.map((value: number, index: number) => (
          <div className="array-bar"
            key={index}
            style={{ width: `${value}px` }}
          ></div>
        ))}
      </>
    )
  }
}

// function that return a random value between two values
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
