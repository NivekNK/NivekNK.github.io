import React from "react"
import { GetWindowSize, Timeout } from "../utilities/Utils"
import '../styles/SortingGraph.css'

interface IProps { }

interface INumberArray {
  array: number[],
  i: number,
  j: number
}

export default class SortingGraph extends React.Component<IProps, INumberArray> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      array: [],
      i: -1,
      j: -1
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
    const aux: number[] = [];

    const [width, height] = GetWindowSize()

    for (let i = 0; i < height; i++) {
      aux.push(GetRandomInt(5, width))
    }

    this.setState({
      array: aux,
      i: -1,
      j: -1
    })
  }

  setArrayState(arr: number[], i: number, j: number): void {
    this.setState({
      array: arr,
      i: i,
      j: j
    })
  }

  async insertionSort(arr: number[]): Promise<void> {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      /* Move elements of arr[0..i-1], that are  
      greater than key, to one position ahead  
      of their current position */
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        this.setArrayState(arr, i, j)
        await Timeout(100)
      }
      arr[j + 1] = key;
      this.setArrayState(arr, i, j)
      await Timeout(100)
    }
  }

  async finalSort(arr: number[]): Promise<void> {
    return await this.insertionSort(arr)
  }

  sort(type: string): void {
    let { array } = this.state
    this.finalSort(array)
  }

  getColor(index: number, i: number, j: number): string {
    return index === i || index === j ? 'red' : 'gray'
  }

  render(): React.ReactNode {
    const { array, i, j } = this.state
    return (
      <>
        {array.map((value: number, index: number) => (
          <div className="array-bar"
            key={index}
            style={{ width: `${value}px`, backgroundColor: this.getColor(index, i, j) }}
          ></div>
        ))}
      </>
    )
  }
}

// function that return a random value between two values
function GetRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
