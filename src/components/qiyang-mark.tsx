export function QiyangMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="276 36 588 288"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M 300 120 L 360 120 L 360 240 L 300 240 L 300 120 Z M 360 60 L 480 60 L 480 120 L 360 120 L 360 60 Z M 360 240 L 420 240 L 420 180 L 480 180 L 480 120 L 540 120 L 540 300 L 360 300 L 360 240 Z M 600 60 L 660 60 L 660 180 L 780 180 L 780 60 L 840 60 L 840 240 L 780 240 L 780 300 L 660 300 L 660 240 L 600 240 L 600 60 Z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="276 36 588 288"><path d="M 300 120 L 360 120 L 360 240 L 300 240 L 300 120 Z M 360 60 L 480 60 L 480 120 L 360 120 L 360 60 Z M 360 240 L 420 240 L 420 180 L 480 180 L 480 120 L 540 120 L 540 300 L 360 300 L 360 240 Z M 600 60 L 660 60 L 660 180 L 780 180 L 780 60 L 840 60 L 840 240 L 780 240 L 780 300 L 660 300 L 660 240 L 600 240 L 600 60 Z" fill="currentColor" fill-rule="evenodd"/></svg>`
}
