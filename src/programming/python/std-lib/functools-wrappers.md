# Functools: Wrappers

- Exclusively used when working with decorators.
```python

import time


def print_time(f):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = f(*args, **kwargs)
        print(f'function {f.__name__} took {
              time.time() - start_time:.2f} seconds to execute')
        return result
    return wrapper


def perfect_function():
    """This is a perfect docstring"""
    time.sleep(1)
    print("Finished being perfect")

```


Without wraps, this would happen: 

```python
>>> perfect_function = print_time(perfect_function)
>>> perfect_function.__doc__

>>> perfect_function.__name__
'wrapper'
```

It's because the decorator `print_time(f)` is replacing the perfect function with the wrapper.

Here are some simple changes you can make to fix this:

```python

from functools import wraps
import time


def print_time(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = f(*args, **kwargs)
        print(f'function {f.__name__} took {
              time.time() - start_time:.2f} seconds to execute')
        return result
    return wrapper


@print_time
def perfect_function():
    """This is a perfect docstring"""
    time.sleep(1)
    print("Finished being perfect")
```

Under the hood, this automatically does `perfect_function = print_time(perfect_function)`.

And now run:

```python

>>> perfect_function.__doc__
'This is a perfect docstring'
>>> perfect_function.__name__
'perfect_function'
>>> perfect_function()
Finished being perfect
function perfect_function took 1.00 seconds to execute
```

This is useful when writing an API or a library, and someone wants to know what your function does and it's name. Instead of always showing the wrapper's name and docstring, it will point to the accurate one.
