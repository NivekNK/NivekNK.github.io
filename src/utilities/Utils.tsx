export function GetWindowSize(): [number, number] {
  let width: number = window.innerWidth
  let height: number = window.innerHeight

  if (width < 1200) {
    width = window.innerWidth - (window.innerWidth * 0.2)
    height = (window.innerHeight - (window.innerHeight * 0.5)) / 4
  }
  else {
    width = window.innerWidth - (window.innerWidth * 0.6)
    height = (window.innerHeight - (window.innerHeight * 0.2)) / 4
  }

  return [width, height]
}
