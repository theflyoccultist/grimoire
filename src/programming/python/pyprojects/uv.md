# Setting up UV

The Rust cult has struck again, this time targeting Python users by offering them a dependency and version manager. UV is fast, and over caffeinated. It does a lot of things at once, such as replacing pyenv, pip, pipx and Poetry. On archlinux, installing python-pipx did not work, so I had to go for this tool instead, compiling from source with cargo. Compiling Rust programs is quite slow and it made me age while I was waiting for it to finish. But fortunately, uv is pretty straightforward to use and there isn't much of a learning curve.

#### Initialize a project with uv:

```bash
uv init my_project
```

#### Add dependencies:

```bash
uv add flask jinja2 feedparser flask-limiter gunicorn
```

#### Add dev dependencies:

```bash
uv add --dev black isort ruff mypy pytest
```

#### Lock dependencies for reproductibility:

```bash
uv lock
```

#### Run a project (the uv run command also activates venv):

```bash
uv run python src/main.py
```


## Some other perks

Python version management:

```bash
uv python install 3.12
uv run --python 3.12 python --version
```

System-wide safe tools (pipx replacement):

```bash
uv tool install black
uv tool install ruff
```

Reproductibility for collaborators:

They would just have to run these commands, and they would be in the same environment as you.

```bash
uv sync
uv run pytest
```
