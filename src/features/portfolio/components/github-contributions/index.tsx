import { Suspense } from "react"

import {
  GitHubContributions as GitHubContributionsGraph,
  GitHubContributionsFallback,
} from "@/components/github-contributions/github-contributions"
import { GITHUB_USERNAME, UTM_PARAMS } from "@/config/site"
import { getCachedContributions } from "@/lib/get-cached-contributions"
import { addQueryParams } from "@/utils/url"

import { Panel } from "../panel"

export function GitHubContributions() {
  const contributions = getCachedContributions(GITHUB_USERNAME)

  return (
    <Panel>
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionsFallback />}>
        <GitHubContributionsGraph
          contributions={contributions}
          githubProfileUrl={addQueryParams(
            `https://github.com/${GITHUB_USERNAME}`,
            UTM_PARAMS
          )}
        />
      </Suspense>
    </Panel>
  )
}
