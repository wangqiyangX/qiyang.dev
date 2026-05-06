import { Shimmer } from "@/registry/components/shimmer/shimmer"

export default function ShimmerDemo() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Shimmer
        as="h3"
        className="text-2xl font-semibold tracking-normal"
        duration={2.2}
      >
        Generating your response
      </Shimmer>
      <Shimmer className="text-sm" duration={2.8} spread={3}>
        Reading files, planning edits, and checking the result
      </Shimmer>
    </div>
  )
}
