import React from "react"
import { Card } from 'react-bootstrap'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import py from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import { monokaiSublime as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('python', py)

const CODE =
`def insertionSort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and key < arr[j]:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key`;

interface IProps { }

interface INumberArray {
  array: number[]
}

export default class CodeDisplay extends React.Component<IProps, INumberArray> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      array: []
    }
  }

  componentDidMount(): void {
    const array: number[] = [1]
    this.setState({
      array: array
    })
  }

  render(): React.ReactNode {
    const { array } = this.state
    return (
      <Card bg='dark'>
        <Card.Body>
          <SyntaxHighlighter
            language='python'
            style={style}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={lineNumber => {
              let style: any = { display: 'block' };
              if (array.includes(lineNumber)) {
                style.backgroundColor = '#471e36';
              } 
              return { style };
            }}
          >
            {CODE}
          </SyntaxHighlighter>
        </Card.Body>
      </Card>
    )
  }
}
