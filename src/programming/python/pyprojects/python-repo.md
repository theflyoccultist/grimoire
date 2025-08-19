# Python Repository Setup

A clean professional setup for Python projects in Public Repositories. This ensures consistency, code quality, and trust when others contribute.

#### 1. Project Structure

```

my_project/
│
├── src/                # main code lives here (best practice)
│   └── my_project/
│       ├── __init__.py
│       └── core.py
│
├── tests/              # pytest discovers tests automatically
│   └── test_core.py
│
├── pyproject.toml      # dependencies & tooling config
├── README.md           # project overview
├── LICENSE             # always add one
└── .gitignore

```

#### 2. Typing: add type hints everywhere. Example:

```python

def divide(dividend: float, divisor: float) -> float:
    return dividend / divisor

```

This makes mypy much more useful.

#### 3. Formatting and imports

  - Black (auto-format, no arguments).
  - Imports: isort (keeps imports clean, alphabetized).

Instead of fighting about tabs vs spaces, let Black be the dictator.

Run manually, or automate via pre commit hooks:

```bash
uv run black --check src tests
uv run isort --check-only src tests
```

#### 4. Linting & static checks

  - ruff: modern, super fast, replaces flake8 + isort + pydocstyle in one tool.
  - mypy: static type checking.

```bash
uv run ruff check .
uv run mypy src
```

#### 5. Testing

Use pytest for simplicity:

```bash
uv run pytest
```

#### 6. Dependencies in `pyproject.toml`

Example config for UV. Except for the `[project]` section, you don't really have to edit it manually as the `uv/poetry add` command edits the dependencies automatically.

```toml
[project]
name = "rss-feed-parser"
version = "0.1.0"
description = "A tiny RSS parser with HTML templates."
authors = ["Your Name <you@example.com>"]

license = {text = "MIT"}
readme = "README.md"
requires-python = ">=3.13"
dependencies = [
    "flask (>=3.1.0,<4.0.0)",
    "jinja2 (>=3.1.6,<4.0.0)",
    "feedparser (>=6.0.11,<7.0.0)",
    "flask-limiter (>=3.12,<4.0)",
    "gunicorn (>=23.0.0,<24.0.0)"
]

[dependency-groups]
dev = [
    "black>=25.1.0",
    "isort>=6.0.1",
    "mypy>=1.17.1",
    "pytest>=8.4.1",
    "ruff>=0.12.9",
]

```

#### 7. GitHub Actions (CI/CD)

Add `.github/workflows/ci.yml`

```yaml

name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.13"

      - name: Install uv
        run: pip install uv

      - name: Sync dependencies
        run: uv sync --all-extras --dev

      - name: Run formatters
        run: uv run black --check src tests && uv run isort --check-only src tests

      - name: Run linter
        run: uv run ruff check .

      - name: Type check
        run: uv run mypy src

      - name: Run tests
        run: uv run python -m pytest

```

With this workflow, you can ensure every pull PR is formatted, linted, type-checked and tested.
