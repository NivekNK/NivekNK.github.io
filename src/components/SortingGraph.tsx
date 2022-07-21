import React from "react"
import { GetWindowSize, Timeout } from "../utilities/Utils"
import '../styles/SortingGraph.css'

interface IProps { }

interface INumberArray {
  array: number[],
  drawArray: number[],
  j: number,
  i: number
}

export default class SortingGraph extends React.Component<IProps, INumberArray> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      array: [],
      drawArray: [],
      j: -1,
      i: -1
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
      drawArray: aux,
      j: -1,
      i: -1
    })
  }

  setArrayState(arr: number[], drawArray: number[], j: number, i: number): void {
    this.setState({
      array: arr,
      drawArray: drawArray,
      j: j,
      i: i
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
        let drawArray: number[] = [...arr]
        drawArray[j + 1] = key
        this.setArrayState(arr, drawArray, j + 1, i)
        j = j - 1;
        await Timeout(100)
      }
      arr[j + 1] = key;
      this.setArrayState(arr, [...arr], j, i)
      await Timeout(100)
    }

    this.setArrayState(arr, arr, -1, -1)
  }

  async finalSort(arr: number[], type: string): Promise<void> {
    return await this.insertionSort(arr)
  }

  sort(type: string): void {
    let { array } = this.state
    this.finalSort(array, type)
  }

  getColor(index: number, j: number, i: number): string {
    if (i === -1 || j === -1)
      return 'gray'

    if (index === i && index === j)
      return 'green'
    else if (index === j)
      return 'red'
    else
      return 'gray'
  }

  render(): React.ReactNode {
    const { drawArray, j, i } = this.state
    return (
      <>
        {drawArray.map((value: number, index: number) => (
          <div className="array-bar"
            key={index}
            style={{ width: `${value}px`, backgroundColor: this.getColor(index, j, i) }}
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
