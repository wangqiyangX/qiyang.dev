import { MermaidDiagram } from "@/registry/components/mermaid-diagram"

const chart = `
flowchart LR
  Source["Mermaid source"] --> Parser["Client parser"]
  Parser --> SVG["Rendered SVG"]
  SVG --> Surface["shadcn surface"]
  Surface --> Theme["Light and dark themes"]
`

export default function MermaidDiagramDemo() {
  return (
    <MermaidDiagram
      chart={chart}
      className="w-full max-w-2xl"
      caption="Mermaid renders on the client, then settles into the surrounding shadcn theme."
    />
  )
}
