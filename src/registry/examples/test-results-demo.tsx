import {
  Test,
  TestDuration,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestName,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestStatus,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
} from "@/registry/components/test-results"

type TestResultsDemoProps = {
  className?: string
}

export default function TestResultsDemo({ className }: TestResultsDemoProps) {
  return (
    <TestResults className={className}>
      <TestResultsHeader
        title="Test Results"
        description="Vitest summary from the latest CI attempt."
      >
        <TestResultsDuration duration={2200} />
      </TestResultsHeader>

      <TestResultsContent>
        <TestResultsSummary passed={6} failed={1} skipped={2} running={1} />
        <TestResultsProgress completed={9} total={10} />

        <div className="flex flex-col gap-2">
          <TestSuite status="failed" defaultOpen>
            <TestStatus showLabel={false} />
            <TestSuiteName file="tests/auth/login.test.ts">
              Authentication flow
            </TestSuiteName>
            <TestSuiteStats duration={1320} />
            <TestSuiteContent>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>renders the sign in form</TestName>
                <TestDuration duration={148} />
              </Test>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>validates invalid email input</TestName>
                <TestDuration duration={92} />
              </Test>
              <Test status="failed">
                <TestStatus showLabel={false} />
                <TestName>
                  redirects authenticated users to the dashboard
                </TestName>
                <TestDuration duration={320} />
                <TestError>
                  <TestErrorMessage>
                    Expected redirect to /dashboard but received /sign-in.
                  </TestErrorMessage>
                  <TestErrorStack
                    stack={[
                      "AssertionError: expected '/sign-in' to equal '/dashboard'",
                      "  at tests/auth/login.test.ts:42:21",
                      "  at async runTest (node_modules/vitest/dist/runner.js:781:5)",
                      "  at async runSuite (node_modules/vitest/dist/runner.js:912:13)",
                    ].join("\n")}
                  />
                </TestError>
              </Test>
              <Test status="skipped">
                <TestStatus showLabel={false} />
                <TestName>accepts OAuth callback tokens</TestName>
                <TestDuration>not run</TestDuration>
              </Test>
            </TestSuiteContent>
          </TestSuite>

          <TestSuite status="running" defaultOpen>
            <TestStatus showLabel={false} />
            <TestSuiteName file="tests/billing/checkout.test.ts">
              Checkout pipeline
            </TestSuiteName>
            <TestSuiteStats duration={276} />
            <TestSuiteContent>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>creates a hosted checkout session</TestName>
                <TestDuration duration={276} />
              </Test>
              <Test status="running">
                <TestStatus showLabel={false} />
                <TestName description="Waiting on the local webhook relay.">
                  reconciles the payment webhook
                </TestName>
                <TestDuration>running</TestDuration>
              </Test>
              <Test status="skipped">
                <TestStatus showLabel={false} />
                <TestName>applies customer discount codes</TestName>
              </Test>
            </TestSuiteContent>
          </TestSuite>

          <TestSuite status="passed">
            <TestStatus showLabel={false} />
            <TestSuiteName file="tests/components/button.test.tsx">
              Component snapshots
            </TestSuiteName>
            <TestSuiteStats duration={604} />
            <TestSuiteContent>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>matches the default button snapshot</TestName>
                <TestDuration duration={124} />
              </Test>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>keeps loading state accessible</TestName>
                <TestDuration duration={221} />
              </Test>
              <Test status="passed">
                <TestStatus showLabel={false} />
                <TestName>supports keyboard activation</TestName>
                <TestDuration duration={259} />
              </Test>
            </TestSuiteContent>
          </TestSuite>
        </div>
      </TestResultsContent>
    </TestResults>
  )
}
