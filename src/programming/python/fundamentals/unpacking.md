# Unpacking

### Destructure A Variable: Variable unpacking with tuples and lists.

- Unpacking with `_` to ignore middle value.

- head gets the first item.
- *tail (with a * splat operator) captures the rest into a list.

```python
person = ("Bob", 42, "Mechanician")
name, _, profession = person

print(name, profession)
# Bob Mechanician

head, *tail = [1,2,3,4,5]
print(head)
# 1
print(tail)
# [2, 3, 4, 5]
```

### Unpacking keyword arguments with `**kwargs`.

```python
def named(**kwargs):
    print(kwargs)

def print_nicely(**kwargs):
    named(**kwargs)
    for arg, value in kwargs.items():
        print(f"{arg}: {value}")

print_nicely(name= "bob", age= "25")

# {'name': 'bob', 'age': '25'}
# name: bob
# age: 25
```

## A Python calculator accepting operations with more than two numbers.

```python

def multiply(*args):
    total = 1
    for arg in args:
        total = total * arg

    return total


def substract(*args):
    diff = args[0]
    for i in range(1, len(args)):
        diff = diff - args[i]
    return diff


def divide(*args):
    diff = args[0]
    for i in range(1, len(args)):
        if args[i] == 0:
            raise ZeroDivisionError("Divisor cannot be 0.")
        diff = diff / args[i]
    return diff


def apply(*args, operator):
    if operator == "*":
        return multiply(*args)
    elif operator == "/":
        return divide(*args)
    elif operator == "+":
        return sum(args)
    elif operator == "-":
        return substract(*args)
    else:
        return "no valid operator detected."


print(apply(1, 3, 5, 7, operator="*"))
# 105

print(apply(1, 3, 5, 7, operator="+"))
# 16

print(apply(10, 2, 3, 2, operator="-"))
# 3

# print(apply(10, 2, 0, 2, operator="/"))
# ZeroDivisionError

print(apply(12, 2, 2, 3, operator="/"))
# 1.0

```
