# Examples

## Example 1: Validation Duplication

Input context: two services validate CPF and phone formatting with different helper names.

Output:

- **Finding**: semantic duplication in identity validation rules.
- **Recommended extraction**: `validateIdentityInput(input)` in shared domain validation module.
- **Migration**:
  1. Add shared validator and tests.
  2. Replace first service usage.
  3. Replace second service usage.
  4. Remove duplicated validators.

## Example 2: API Mapping Duplication

Input context: three frontend pages map the same API response into local view model.

Output:

- **Finding**: repeated mapping logic with drift risk.
- **Recommended extraction**: `mapCampaignSummary(apiResponse)` utility.
- **Verification**: snapshot/unit tests for mapping outputs in all pages.

## Example 3: Avoid Over-Abstraction

Input context: two components look similar but one has async permission checks and the other does not.

Output:

- **Decision**: do not merge components yet; business behavior differs.
- **Suggestion**: extract only shared presentational primitives.
