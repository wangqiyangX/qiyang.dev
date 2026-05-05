export function QiyangWangMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 640 256"
      aria-hidden
      {...props}
    >
      <path
        d="M64 0h64v64h-64z M128 0h64v64h-64z M320 0h64v64h-64z M576 0h64v64h-64z M0 64h64v64h-64z M192 64h64v64h-64z M320 64h64v64h-64z M448 64h64v64h-64z M576 64h64v64h-64z M0 128h64v64h-64z M128 128h64v64h-64z M192 128h64v64h-64z M320 128h64v64h-64z M384 128h64v64h-64z M448 128h64v64h-64z M512 128h64v64h-64z M576 128h64v64h-64z M64 192h64v64h-64z M128 192h64v64h-64z M192 192h64v64h-64z M384 192h64v64h-64z M512 192h64v64h-64z"
        fill="currentColor"
      />
    </svg>
  )
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 640 256"><path fill="${color}" d="M64 0h64v64h-64z M128 0h64v64h-64z M320 0h64v64h-64z M576 0h64v64h-64z M0 64h64v64h-64z M192 64h64v64h-64z M320 64h64v64h-64z M448 64h64v64h-64z M576 64h64v64h-64z M0 128h64v64h-64z M128 128h64v64h-64z M192 128h64v64h-64z M320 128h64v64h-64z M384 128h64v64h-64z M448 128h64v64h-64z M512 128h64v64h-64z M576 128h64v64h-64z M64 192h64v64h-64z M128 192h64v64h-64z M192 192h64v64h-64z M384 192h64v64h-64z M512 192h64v64h-64z"/></svg>`
}
