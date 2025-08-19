# Using pip and venv

The `venv` module supports creating lightweight “virtual environments”, each with their own independent set of Python packages installed in their site directories. A virtual environment is created on top of an existing Python installation, known as the virtual environment’s “base” Python, and by default is isolated from the packages in the base environment, so that only those explicitly installed in the virtual environment are available.

When used from within a virtual environment, common installation tools such as pip will install Python packages into a virtual environment without needing to be told to do so explicitly.

A virtual environment is (amongst other things):

- Used to contain a specific Python interpreter and software libraries and binaries which are needed to support a project (library or application). These are by default isolated from software in other virtual environments and Python interpreters and libraries installed in the operating system.

- Contained in a directory, conventionally named `.venv` or `venv` in the project directory, or under a container directory for lots of virtual environments, such as `~/.virtualenvs`.

- Not checked into source control systems such as Git.

- Considered as disposable – it should be simple to delete and recreate it from scratch. You don’t place any project code in the environment.

- Not considered as movable or copyable – you just recreate the same environment in the target location.

#### Creating a venv in your project directory

```bash
python -m venv venv
```

#### Activating it

```bash
# Linux
source venv/bin/activate

# Windows
venv\scripts\activate
```

Now your shell will show `(venv)` before the prompt. That means you're inside the virtual prompt.

#### Installing packages

```bash
pip install requests
```

If you are inside venv, this will only install it in your venv, not your system.

#### Freezing dependencies

```bash
pip freeze > requirements.txt
```

Later, recreate environment:

```bash
pip install -r requirements.txt
```

> Never use `sudo pip install`. This has the potential to nuke your Linux distribution.
