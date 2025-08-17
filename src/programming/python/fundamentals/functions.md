# Functions

### Functions with Arguments: Simple function demonstrating division with error handling.

```python
def divide (dividend, divisor):
    if divisor != 0:
        return dividend/divisor
    else:
        return "you fool!"

divide (6, 0)
# 'you fool!'

divide (6, 2)
# 3.0
```

### Lambda: We are getting functional!

```python
add = lambda x , y : x + y
print(add(8,5))
# 13

def double(x):
    return x*2

sequence = [1, 3, 5, 9] 
doubled = [double(x) for x in sequence]
doubled2 = list(map(double, sequence))

print(doubled)
# [2, 6, 10, 18]
print(doubled2)
# [2, 6, 10, 18]
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
            return f"no admin permissions for {user['username']}"
        
    return secure_function

get_admin_password = make_secure(get_admin_password)

print(get_admin_password())
# 1234

user = {"username": "maniac", "access_level": "hacker"}
# no admin permissions for maniac
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
# super_secure_password

print(get_password("admin"))
# 1234
```
