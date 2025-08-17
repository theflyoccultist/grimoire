# Python Repository Setup

A clean professional setup for Python projects in Public Repositories:

- Typing: add type hints everywhere (inputs/outputs especially).

- Formatter: Black (auto-format, no arguments, saves you brain cells).

- Imports: isort (keeps imports clean, alphabetized).

- Linting: flake8 or ruff (to catch stray sins).
(On a local machine, python-lsp-server already includes flake8.)

- Type checking: mypy.

- Testing: pytest.

- CI/CD: GitHub Actions with those steps baked in.

You can set up all of these elements in a `pyproject.toml` file.
