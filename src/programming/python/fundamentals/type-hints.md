# Type Hints
(Work in Progress)

## Use type hints for better function and class documentation.

```python
class Book:
    TYPES = ("hardcover", "paperback")

    def __init__(self, name: str, book_type: str, weight: int):
        self.name = name
        self.book_type = book_type
        self.weight = weight

   def __repr__(self) -> str:
        return f"<Book {self.name}, {self.book_type}, weighing {self.weight}g>"
    
    @classmethod
    def hardcover(cls, name: str, page_weight: int) -> "Book":
        return cls(name, cls.TYPES[0], page_weight + 100)
    
    @classmethod
    def paperback(cls, name: str, page_weight: int) -> "Book":
        return cls(name, cls.TYPES[1], page_weight)
     

book = Book.hardcover("Laurel Hell", 1600)
light = Book.paperback("the bottle", 400)

print(book, light)
# <Book Laurel Hell, hardcover, weighing 1700g> <Book the bottle, paperback, weighing 400g>
```

## Initializing a list, and appending elements to it with Python OOP.

```python
from typing import List, Optional

class Student:
    def __init__(self, name: str, grades: Optional[List[int]] = None):
        self.name = name
        self.grades = grades or []

    def take_exam(self, result: int):
        self.grades.append(result)

bob = Student("Bob")
rolf = Student("Rolf")
bob.take_exam(90)
print(bob.grades)
print(rolf.grades)
# [90]
# []
```
```
