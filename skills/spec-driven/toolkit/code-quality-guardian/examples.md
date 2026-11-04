# Examples

## Example 1: Correctness Bug

Input context: PR adds new checkout discount logic.

Output:

- **Critical**: Discount is applied before tax in one branch and after tax in another branch, causing inconsistent totals.
  - Fix: centralize final amount calculation in one function used by all branches.
  - Validation: add tests for all discount types with expected totals.

## Example 2: Missing Failure Tests

Input context: PR adds external payment provider integration.

Output:

- **Warning**: No test for provider timeout and retry exhaustion.
  - Fix: add timeout + fallback handling tests.
  - Validation: simulate provider timeout and assert error mapping.

## Example 3: Maintainability Improvement

Input context: PR updates user profile screen.

Output:

- **Suggestion**: Rename `doThing()` to `buildProfileUpdatePayload()` to clarify intent.
  - Validation: run existing profile unit tests to ensure no behavior change.
