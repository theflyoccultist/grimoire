# Imports

Imports in Python let you reuse code across multiple files. Instead of writing the same functions everywhere, you can split your project into modules and packages, and import them when needed.

## Import Code

The simplest way: grab a function (or the whole module) from another file.

```python
from imports_mymodule import divide # grab a function 
# import imports_mymodule           # imports the whole module

print(divide(10,2))
```

## Import Module

Here's the module `imports_mymodule.py`:

```python
def divide(divident, divisor):
    return divident/divisor

print("imports_mymodule.py: ", __name__)
```

When you run this file directly:
`python imports_mymodule.py` : `__name__ == "__main__"`

When you import it into another file:
`import imports_mymodule` : `__name__ == "imports_mymodule"`

That's how Python knows if a file is a script or a module.

## The `if __name__ == "__main__":` Trick

This lets a file be both runnable directly and importable as a module without executing test code every time.

```python
def divide(dividend, divisor):
    return dividend / divisor

if __name__ == "__main__":
    # only runs when this file is executed directly
    print(divide(10, 2))
```

## Import Styles

#### Import whole module

```python
import math
print(math.sqrt(16))
```

Safer, explicit, keeps namespace clean.

#### Import specific function / class

```python
from math import sqrt
print(sqrt(16))
```

Shorter, but watch out for name clashes.

#### Import everything (not recommended)

```python
from math import *
```

#### Alias Imports

```python
import numpy as np
import pandas as pd
```

Python dev culture loves short aliases.

## Multi-File Projects (Modules & Packages)

Imagine this structure:

```
my_project/
│
├── main.py
├── utils/
│   ├── __init__.py
│   ├── math_tools.py
│   └── string_tools.py
```

- `__init__.py` turns a folder into a package.
- You can now import across files:

```python
# main.py
from utils.math_tools import divide
from utils import string_tools

print(divide(10, 2))
print(string_tools.shout("hello"))
```

## Relative Imports (inside a package)

From within a package, you can import relative to the current module:

```python

# utils/string_tools.py
from .math_tools import divide   # relative import

def shout(text):
    return text.upper() + "!!!"

```

Best practices:
- Use absolute imports (`from utils.math_tools import divide`) for clarity.
- Only use relative imports (`from .math_tools import divide`) inside packages when refactoring a project.

## What goes in `__init__.py`

In modern Python (3.3+), just having the folder is enough to make it a package, but `__init__.py` still matters for controlling how your package behaves when imported.

#### Empty File

If you don't need anything special, just leave it empty.
This makes Python treat the folder as a package:

```

utils/
 ├── __init__.py   # can be empty
 ├── math_tools.py
 └── string_tools.py

```

You can then do:

```python

from utils import math_tools

```

#### Re-Export Selected Functions (Package API)

You can expose only certain things when someone imports the package:

```python

# utils/__init__.py
from .math_tools import divide
from .string_tools import shout

__all__ = ["divide", "shout"]

```

Now you can do:

```python

from utils import divide, shout

```

#### Initialization Logic (rare, but possible)

You can run code when the package is imported.

```python

# utils/__init__.py
print("Loading utils package...")

```

But to be honest, keep `__init__.py` clean, and use it mostly for defining what's public.
