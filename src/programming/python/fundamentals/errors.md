# Error Handling

### Errors: Demonstrates exception handling with try-except-finally.

```python
def divide(dividend, divisor):
    if divisor == 0:
        raise ZeroDivisionError("Divisor cannot be 0.")
    
    return dividend / divisor

grades = []

print("Welcome to the average grade program.")
try:
    average = divide(sum(grades), len(grades))
except ZeroDivisionError:
    print("There are no grades yet in your list.")
else:
    print(f"The average grade is {average}.")
finally:
    print("Thank you!")

# Welcome to the average grade program.
# There are no grades yet in your list.
# Thank you!

grades = [15, 100, 84, 54, 10, 90]

# Welcome to the average grade program.
# The average grade is 58.833333333336.
# Thank you!
```

### Custom Errors: Creates a custom exception class for book page validation.

```python
class TooManyPagesError(ValueError):
    pass

class Book:
    def __init__(self, name: str, page_count: int):
        self.name = name
        self.page_count = page_count
        self.pages_read = 0

    def __repr__(self):
        return (
            f"<Book {self.name}, read {self.pages_read} out of {self.page_count}>"
        )
    
    def read(self, pages: int):
        if self.pages_read + pages > self.page_count:
            raise TooManyPagesError(
                f"You tried to read {self.pages_read + pages} pages, but this book only has {self.page_count} pages."
            )
        self.pages_read += pages
        print(f"You have now read {self.pages_read} pages out of {self.page_count}.")

try:
    pout = Book("pout guide", 70)
    pout.read(80)
except TooManyPagesError as e:
    print(e)

# You tried to read 80 pages, but this book only has 70 pages.

try:
    pout = Book("pout guide", 70)
    pout.read(50)
except TooManyPagesError as e:
    print(e)

# You have now read 50 pages out of 70.
```
