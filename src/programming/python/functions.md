### Functions with Arguments: Simple function demonstrating division with error handling.

```python
def divide (dividend, divisor):
    if divisor != 0:
        return dividend/divisor
    else:
        return "you fool!"

divide (6, 0)
```

### Functions with Arguments 2: Shows function parameter unpacking with *args and **kwargs.

```python
def add(x, y):
    return x + y

num = [3, 5]
add(*num)

numz = {"x": 15, "y": 26}
print(add(**numz))

def multiply(*argz):
    total = 1
    for arg in argz:
        total = total * arg

    return total

def apply(*argz, operator):
    if operator == "*":
        return multiply(*argz)
    elif operator == "+":
        return sum(argz)
    else:
        return "no valid operator detected."
    
print(apply(1, 3, 5, 7, operator="+"))
```

### Mutable Parameters: Demonstrates how default mutable arguments can cause issues.

```python
from typing import List, Optional

class Ztudent:
    def __init__(self, name: str, grades: Optional[List[int]] = None):
        self.name = name
        self.grades = grades or []

    def take_exam(self, result: int):
        self.grades.append(result)

bob = Ztudent("Bob")
rolf = Ztudent("Rolf")
bob.take_exam(90)
print(bob.grades)
print(rolf.grades)
```

### Lambda: Demonstrates lambda functions and map.

```python
add = lambda x , y : x + y
print(add(8,5))

def double(x):
    return x*2

sequence = [1, 3, 5, 9] 
doubled = [double(x) for x in sequence]
doubled2 = list(map(double, sequence))

print (doubled2)
```

### Decorators: Demonstrates a basic function decorator for access control.

```python
user = {"username": "jose", "access_level": "admin"}

def get_admin_password():
    return "1234"

def make_secure(func):
    def secure_function():
        if user["access_level"] == "admin":
            return func()
        else:
            return f"no admin permissons for {user['username']}"
        
    return secure_function

get_admin_password = make_secure(get_admin_password)

print(get_admin_password())
```

### Decorators With Parameters: Enhances decorators to accept parameters.

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


print(get_password("billing"))
```

### Decorators @: Uses the @decorator syntax to apply a decorator.

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


print(get_admin_password())
```

