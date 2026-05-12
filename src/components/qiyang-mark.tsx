export function QiyangMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="104 -24 688 368"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M128 64h64v192h-64zm64-64h128v64H192zm0 256h64v-64h64V64h64v256H192zM448 0h64v256h-64zm64 256h64v64h-64zm64-64h64v64h-64zm64 64h64v64h-64zM704 0h64v256h-64z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="104 -24 688 368"><path d="M128 64h64v192h-64zm64-64h128v64H192zm0 256h64v-64h64V64h64v256H192zM448 0h64v256h-64zm64 256h64v64h-64zm64-64h64v64h-64zm64 64h64v64h-64zM704 0h64v256h-64z" fill="currentColor" fill-rule="evenodd"/></svg>`
}
