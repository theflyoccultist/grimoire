# Setting up Poetry

- If you are just hacking scripts, `pip + venv` is fine.
- But if you're writing a real project, you will need to use Poetry.

Here is why:
- Just like venv, it creates a virtual environment automatically per project.
- It handles dependency resolution more intelligently.
- Uses `pyproject.toml` for project metadata and dependencies:

```toml
[tool.poetry.dependencies]
python = "^3.11"
requests = "^2.31.0"
flask = "^2.3.0"
```

- Generates a `poetry.lock` file to pin exact versions.
- Can also build and publish packages (in case you want to release your own libraries).

>> - Pros: more reproductible environments.
>> - Cons: slower than pip, extra tool to install.

To use it, you will first need to get [pipx](https://github.com/pypa/pipx), which will allow Python scripts to be used as if they were standalone command line tools. Then you can install Poetry with:

```bash
pipx install poetry
```

Workflow:

```bash
poetry init         # create pyproject.toml
poetry add flask    # add dependency
poetry install      # install dependencies
poetry run python   # run inside venv
```

Install some dev tools:

```bash
poetry add --dev black isort ruff mypy pytest
```


