# Unpacking

### Destructure A Variable: Shows variable unpacking with tuples and lists.

- Unpacking with `_` to ignore middle value.
- head gets the first item.
- *tail captures the rest into a list.

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

### Unpacking: Demonstrates unpacking keyword arguments with `**kwargs`.

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
