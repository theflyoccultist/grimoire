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
    print("There are no grades yet in your lizt.")
else:
    print(f"THe average grade is {average}.")
finally:
    print("Thank you!")
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
        print(f"you have now read {self.pages_read} pages out of {self.page_count}.")

try:
    pout = Book("pout guide", 70)
    pout.read(80)
except TooManyPagesError as e:
    print(e)
```
