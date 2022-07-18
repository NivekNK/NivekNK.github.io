import SortingGraph from "../components/SortingGraph"
import CodeDisplay from "../components/CodeDisplay"
import { GetWindowSize } from "../utilities/Utils"

export function SortingVisualizer() {
  let [width, _] = GetWindowSize()
  return (
    <div>
      <div className="h-100 p-3" style={{ float: 'left', width: `${width}px` }}>
        <SortingGraph />
      </div>
      <div className="w-100 h-100 p-3">
        <CodeDisplay />
      </div>
    </div>
  )
}
