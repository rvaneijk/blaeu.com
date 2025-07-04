# Claude Code Instructions

## Development Environment

### Virtual Environment Usage
- **ALWAYS use the existing .venv for all Python-based linting and development tools**
- Before installing any linting tools (ESLint, Prettier, etc.), activate the virtual environment with: `source .venv/bin/activate`
- Install all development dependencies within the .venv to maintain environment isolation
- This applies to tools like pylint, black, flake8, pre-commit, and any other code quality tools

### Testing
- Use `npm run generate` instead of `npm run dev` for testing purposes
- Never run `npm run dev` during development or testing

### Code Quality
- All linting tools and pre-commit hooks should be installed and configured within the .venv
- Maintain consistent code formatting and quality standards across the project