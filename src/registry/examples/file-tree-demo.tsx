"use client"

import { FileTree } from "@/registry/components/file-tree"

export default function FileTreeDemo() {
  return (
    <FileTree className="max-w-md">
      <FileTree.Folder name="app" defaultOpen>
        <FileTree.Folder name="components" defaultOpen>
          <FileTree.File name="file-tree.tsx" />
          <FileTree.File name="button.tsx" />
          <FileTree.File name="theme-switcher.tsx" />
        </FileTree.Folder>
        <FileTree.Folder name="content">
          <FileTree.File name="welcome.mdx" />
          <FileTree.File name="components.json" />
        </FileTree.Folder>
        <FileTree.File name="layout.tsx" />
        <FileTree.File name="page.tsx" />
      </FileTree.Folder>
      <FileTree.Folder name="config" defaultOpen>
        <FileTree.File name="site.ts" />
        <FileTree.File name="registry.ts" />
      </FileTree.Folder>
      <FileTree.File name="package.json" />
      <FileTree.File name="pnpm-lock.yaml" />
      <FileTree.File name="tailwind.config.ts" />
    </FileTree>
  )
}
