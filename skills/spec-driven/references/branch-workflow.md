# Branch Workflow: Isolate, Then Finish

**Trigger:** start of Implement for Medium/Large/Complex features, and when all tasks of a feature are done.

> If the host agent has dedicated skills for worktrees or finishing a branch (e.g. `using-git-worktrees`, `finishing-a-development-branch`), use them instead of this file.

## Start: isolate the work

1. Check the current branch. On the default branch (`main`/`master`)? Do not implement there.
2. Ask once (record the answer in `~/.sdd/LEARNINGS.md` as a preference so you never ask again):
   - **Branch** (default): `git switch -c feat/<feature-slug>`
   - **Worktree** — for parallel work or a dirty tree: `git worktree add ../<repo>-<feature-slug> -b feat/<feature-slug>`
3. Confirm a clean baseline: install deps and run the test suite **before** the first change. Pre-existing failures are recorded in `STATE.md` as blockers, not fixed silently.

## Finish: integrate

When every task is done and [validate.md](validate.md) passes:

1. Run the full test suite and build one last time. Show the output. Do not offer to integrate on red.
2. Present exactly these options:
   1. **Open a PR** (default for teams) — push the branch, create the PR with spec summary, linked ADRs, and verification evidence
   2. **Merge locally** into the default branch
   3. **Keep the branch** as is
   4. **Discard** — only after the user types the branch name to confirm; it deletes work
3. After merge or discard, remove the worktree if one was created (`git worktree remove <path>`).
4. After pushing, watch CI. If it fails, activate `gh-fix-ci`. If a CI/PR-watch tool is available, use it instead of polling.

Never push, merge, force-push, or delete a branch without the user's explicit choice in step 2.
