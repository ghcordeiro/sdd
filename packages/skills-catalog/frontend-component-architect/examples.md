# Examples

## Example 1: Overloaded Component

Input context: `CampaignForm` fetches data, validates business rules, and renders full UI.

Output:

- **Boundary problem**: mixed responsibilities (data loading + business rules + rendering).
- **Refactor plan**:
  1. Keep `CampaignFormContainer` for data + orchestration.
  2. Extract `CampaignFormView` as presentational component.
  3. Move validation into `useCampaignValidation`.
- **Validation**: unit tests for hook, component tests for view, integration test for submit flow.

## Example 2: Weak Component API

Input context: component receives `config` object with 20 fields, many optional.

Output:

- **API improvement**: replace generic config with explicit props grouped by behavior.
- **Reason**: improves readability, discoverability, and type safety.
- **Validation**: update stories/tests for each variant contract.

## Example 3: Reuse Opportunity

Input context: three pages duplicate status badges with slight visual differences.

Output:

- **Reuse opportunity**: create shared `StatusBadge` primitive with variant tokens.
- **Constraint**: keep page-specific labels outside primitive to preserve domain clarity.
