# Function Decorators

- A decorator is just a function that takes another function as input and returns a new function.
- That new function usually calls the old one, but can add stuff before or after.

## Basic Decorator

```python
user = {"username": "jose", "access_level": "admin"}


def get_admin_password():
    return "1234"


def make_secure(func):
    def secure_function():
        if user["access_level"] == "admin":
            return func()
        else:
            return f"no admin permissions for {user['username']}"
        
    return secure_function


get_admin_password = make_secure(get_admin_password)
print(get_admin_password()) # 1234

```

Note the line `get_admin_password = make_secure(get_admin_password)`. This is how you achieve a basic decorator.

## Using `@` syntax

Python devs got tired of writing `get_admin_password = make_secure(get_admin_password)`, so they invented the `@` decorator syntax. It is literally just shorthand for the same thing:

```python
user = {"username": "jose", "access_level": "admin"}

def make_secure(func):
    def secure_function():
        if user["access_level"] == "admin":
            return func()
        else:
            return f"no admin permissons for {user['username']}"
        
    return secure_function

@make_secure
def get_admin_password():
    return "1234"


print(get_admin_password()) #1234
```

Much cleaner, and it reads like "decorate this function with `make_secure`.

### Decorators With Parameters

Decorators aren't limited to zero-argument functions. With `*args, **kwargs`, you can wrap any function no matter its parameters:

```python
user = {"username": "jose", "access_level": "admin"}

def make_secure(func):
    def secure_function(*args, **kwargs):
        if user["access_level"] == "admin":
            return func(*args, **kwargs)
        else:
            return f"no admin permissons for {user['username']}"
        
    return secure_function

@make_secure
def get_password(panel):
    if panel == "admin":
        return "1234"
    elif panel == "billing":
        return "super_secure_password"


print(get_password("billing"))  # super_secure_password
print(get_password("admin"))    # 1234
```

Now the decorator can protect any function, regardless of how many arguments it takes.
