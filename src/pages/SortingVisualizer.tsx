import { Button, Card } from 'react-bootstrap'
import { useRef } from 'react'
import SortingGraph from "../components/SortingGraph"
import CodeDisplay from "../components/CodeDisplay"
import { GetWindowSize } from "../utilities/Utils"

export function SortingVisualizer() {
  let [width, _] = GetWindowSize()
  const childRef = useRef<SortingGraph>(null)
  return (
    <div>
      <div className="h-100 p-3" style={{ float: 'left', width: `${width}px` }}>
        <SortingGraph ref={childRef} />
      </div>
      <div className="w-100 h-100 p-3">
        <Card bg='dark'>
          <Card.Body>
            <Button variant='outline-danger' style={{ fontSize: 14 }} onClick={() => {
              if (childRef.current)
                childRef.current.resetArray()
            }}>
              Generate New Array
            </Button>
            <CodeDisplay />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
