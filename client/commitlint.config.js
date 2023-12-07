module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "build",
          "chore",
          "ci",
          "deps",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
        ],
      ],
    },
  };

// build: Changes that affect the build system or external dependencies.
// chore: Minor changes that affect neither code nor tests, such as a change in .gitignore.
// ci: Changes to continuous integration configuration files and scripts.
// deps: Changes to project dependencies.
// docs: Changes to documentation only.
// feat: A new feature.
// fix: A bug fix.
// perf: Code changes to improve performance.
// refactor: Code refactoring that neither fixes bugs nor adds functionality.
// revert: Undo a previous commit.
// style: Changes that do not affect the meaning of the code (spaces, formatting, etc.).
// test: Add or modify tests.

