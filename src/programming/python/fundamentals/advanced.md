# Advanced

### Import Code: Demonstrates module imports and function usage.

```python
from imports_mymodule import divide 
#or import imports_mymodule

print(divide(10,2))
```

### Import Module: Shows how modules define reusable functions.

```python
def divide(divident, divisor):
    return divident/divisor

print("imports_mymodule.py: ", __name__)
# imports_mymodule.py: __main__
```

### Type Hinting: Uses type hints for better function and class documentation.

```python
class Book:
    TYPES = ("hardcover", "paperback")

    def __init__(self, name: str, book_type: str, weight: int):
        self.name = name
        self.book_type = book_type
        self.weight = weight

    def __repr__(self) -> str:
        return f"<Book {self.name}, {self.book_type}, weiging {self.weight}g>"
    
    @classmethod
    def hardcover(cls, name: str, page_weight: int) -> "Book":
        return cls(name, cls.TYPES[0], page_weight + 100)
    
    @classmethod
    def paperback(cls, name: str, page_weight: int) -> "Book":
        return cls(name, cls.TYPES[1], page_weight)
     

book = Book.hardcover("Laurel Hell", 1600)
light = Book.paperback("the bottle", 400)

print(book, light)
```

### First Class Function: Demonstrates passing functions as arguments to other functions.

```python
def divide(dividend, diviser):
    if diviser == 0:
        raise ZeroDivisionError("Divisor cannot be 0.")
    
    return dividend/diviser

def calculate(*values, operator):
    return operator(*values)

result = calculate(20, 4, operator=divide)
print(result)
# <Book Laurel Hell, hardcover, weiging 1700g> <Book the bottle, paperback, weiging 400g>
```

### First Class Function 2: Uses function arguments to search in a list of dictionaries.

```python
def search(sequence, expected, finder):
    for elem in sequence:
        if finder(elem) == expected:
            return elem
    raise RuntimeError(f"Could not find an element with {expected}.")

friends = [
    {"name": "Rolf Lilia", "age": 28},
    {"name": "Odin the Great", "age": 877},
    {"name": "Nyarlathotep", "age": 8888811},
]

def get_friend_name(friend):
    return friend["name"]

print(search(friends, "Nyarlathotep", get_friend_name))
# {'name': 'Nyarlathotep', 'age': 8888811}
```



