"use client"

import {
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react"
import * as React from "react"
import StackIcon, { type IconName } from "tech-stack-icons"

import { cn } from "@/lib/utils"

type TechStackIconVariant = "light" | "dark" | "grayscale"

type FileTreeContextValue = {
  level: number
  indent: number
}

const FileTreeContext = React.createContext<FileTreeContextValue>({
  indent: 20,
  level: 0,
})

const extensionIconMap = {
  astro: "astro",
  cjs: "js",
  css: "css3",
  dockerfile: "docker",
  go: "go",
  graphql: "graphql",
  html: "html5",
  java: "java",
  js: "js",
  json: "json",
  jsonc: "json",
  jsx: "react",
  kt: "kotlin",
  less: "less",
  md: "markdown",
  mdx: "markdown",
  mjs: "js",
  php: "php",
  pnpm: "pnpm",
  py: "python",
  rb: "ruby",
  rs: "rust",
  sass: "sass",
  scss: "sass",
  svelte: "sveltejs",
  swift: "swift",
  ts: "typescript",
  tsx: "react",
  vue: "vuejs",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
} satisfies Record<string, IconName>

const filenameIconMap = {
  ".eslintrc": "eslint",
  ".gitignore": "git",
  ".prettierrc": "prettier",
  "bun.lockb": "bun",
  dockerfile: "docker",
  "eslint.config.js": "eslint",
  "eslint.config.mjs": "eslint",
  "eslint.config.ts": "eslint",
  "package.json": "npm",
  "pnpm-lock.yaml": "pnpm",
  "tailwind.config.js": "tailwindcss",
  "tailwind.config.ts": "tailwindcss",
  "vite.config.js": "vite",
  "vite.config.ts": "vite",
} satisfies Record<string, IconName>

export type FileTreeProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Number of pixels added for each nested level.
   * @default 20
   */
  indent?: number
}

export type FileTreeItemProps = React.ComponentPropsWithoutRef<"div"> & {
  icon?: React.ReactNode
}

export type FileTreeFolderProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "onToggle"
> & {
  name: React.ReactNode
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  icon?: React.ReactNode
  openIcon?: React.ReactNode
}

export type FileTreeFileProps = React.ComponentPropsWithoutRef<"div"> & {
  name: string
  extension?: string
  icon?: React.ReactNode
  iconName?: IconName
  iconVariant?: TechStackIconVariant
}

function FileTreeRoot({
  className,
  children,
  indent = 20,
  ...props
}: FileTreeProps) {
  const context = React.useMemo<FileTreeContextValue>(
    () => ({ indent, level: 0 }),
    [indent]
  )

  return (
    <FileTreeContext.Provider value={context}>
      <div
        className={cn(
          "w-full rounded-md border bg-card p-1 text-sm text-card-foreground",
          className
        )}
        data-slot="file-tree"
        role="tree"
        {...props}
      >
        {children}
      </div>
    </FileTreeContext.Provider>
  )
}

function FileTreeFolder({
  className,
  children,
  name,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  icon,
  openIcon,
  ...props
}: FileTreeFolderProps) {
  const context = React.useContext(FileTreeContext)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const toggleOpen = React.useCallback(() => {
    const nextOpen = !open

    if (!isControlled) {
      setUncontrolledOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }, [isControlled, onOpenChange, open])

  return (
    <div
      aria-selected={false}
      className={cn("flex flex-col", className)}
      data-open={open}
      data-slot="file-tree-folder"
      role="treeitem"
      {...props}
    >
      <button
        aria-expanded={open}
        className="flex min-h-8 w-full items-center gap-2 rounded-sm px-2 text-left transition-colors outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
        data-slot="file-tree-folder-trigger"
        onClick={toggleOpen}
        style={{ paddingLeft: context.level * context.indent + 8 }}
        type="button"
      >
        <ChevronRightIcon
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90"
          )}
          aria-hidden="true"
        />
        <span
          className="flex shrink-0 text-muted-foreground"
          data-slot="file-tree-folder-icon"
        >
          {open ? (openIcon ?? <FolderOpenIcon />) : (icon ?? <FolderIcon />)}
        </span>
        <span className="min-w-0 truncate font-medium">{name}</span>
      </button>
      {open ? (
        <FileTreeContext.Provider
          value={{ indent: context.indent, level: context.level + 1 }}
        >
          <div data-slot="file-tree-folder-content" role="group">
            {children}
          </div>
        </FileTreeContext.Provider>
      ) : null}
    </div>
  )
}

function FileTreeFile({
  className,
  name,
  extension,
  icon,
  iconName,
  iconVariant = "light",
  ...props
}: FileTreeFileProps) {
  const resolvedIconName =
    iconName ?? getFileTreeIconName(name, extension ?? getFileExtension(name))

  return (
    <FileTreeItem
      className={className}
      icon={
        icon ?? (
          <FileTreeIcon
            fallback={<FileIcon />}
            name={resolvedIconName}
            variant={iconVariant}
          />
        )
      }
      {...props}
    >
      {name}
    </FileTreeItem>
  )
}

function FileTreeItem({
  className,
  children,
  icon,
  style,
  ...props
}: FileTreeItemProps) {
  const context = React.useContext(FileTreeContext)

  return (
    <div
      aria-selected={false}
      className={cn(
        "flex min-h-8 items-center gap-2 rounded-sm px-2 text-muted-foreground transition-colors hover:bg-muted",
        className
      )}
      data-slot="file-tree-item"
      role="treeitem"
      style={{ paddingLeft: context.level * context.indent + 8, ...style }}
      {...props}
    >
      <span className="flex shrink-0" data-slot="file-tree-item-icon">
        {icon}
      </span>
      <span className="min-w-0 truncate text-foreground">{children}</span>
    </div>
  )
}

function FileTreeIcon({
  fallback,
  name,
  variant,
}: {
  fallback: React.ReactNode
  name?: IconName
  variant: TechStackIconVariant
}) {
  if (!name) {
    return fallback
  }

  return <StackIcon className="size-4" name={name} variant={variant} />
}

export function getFileTreeIconName(
  filename: string,
  extension = getFileExtension(filename)
) {
  const normalizedFilename = filename.toLowerCase()
  const normalizedExtension = extension.toLowerCase()

  return (
    filenameIconMap[normalizedFilename as keyof typeof filenameIconMap] ??
    extensionIconMap[normalizedExtension as keyof typeof extensionIconMap]
  )
}

function getFileExtension(filename: string) {
  const normalizedFilename = filename.toLowerCase()

  if (normalizedFilename === "dockerfile") {
    return "dockerfile"
  }

  const extension = normalizedFilename.split(".").pop()

  if (!extension || extension === normalizedFilename) {
    return ""
  }

  return extension
}

const FileTree = Object.assign(FileTreeRoot, {
  File: FileTreeFile,
  Folder: FileTreeFolder,
  Item: FileTreeItem,
})

FileTreeRoot.displayName = "FileTree"
FileTreeFolder.displayName = "FileTree.Folder"
FileTreeFile.displayName = "FileTree.File"
FileTreeItem.displayName = "FileTree.Item"

export { FileTree, FileTreeFile, FileTreeFolder, FileTreeItem, FileTreeRoot }
