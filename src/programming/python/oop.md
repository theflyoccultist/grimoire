### OOP Example: Basic example of a class representing students and computing grades.

```python
class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

    def average_grade(self):
        return sum(self.grades) / len(self.grades)
    
student = Student("Bob", (90, 81, 70, 44, 100))
student2 = Student("Anya", (54, 38, 44, 80, 70))

print(student.average_grade())
print(student2.average_grade())
```

### Classes With Objects: Defines a Store class with items and stock price calculation.

```python
class Store:
    def __init__(self, name):
        self.name = name
        self.items = list()
    
    def add_item(self, name, price):
        itemdict = {
            "name" : name,
            "price" : price
        }
        self.items.append(itemdict)

    def stock_price(self):
        return sum(item["price"] for item in self.items)

# Example usage:
store = Store("My Store")
store.add_item("Apple", 1.0)
store.add_item("Banana", 1.5)
store.add_item("Orange", 2.0)
```

### Classes With Inheritance: Demonstrates inheritance with a Device and Printer class.

```python
class Device:
    def __init__(self, name, connected_by):
        self.name = name
        self.connected_by = connected_by
        self.connected = True

    def __str__(self):
        return f"Device {self.name!r} ({self.connected_by})"
    
    def disconnect(self):
        self.connected = False
        print("Disconnected.")

class Printer(Device):
    def __init__(self, name, connected_by, capacity):
        super().__init__(name, connected_by)
        self.capacity = capacity
        self.remaining_pages = capacity
    
    def __str__(self):
        return f"{super().__str__()} ({self.remaining_pages} pages remaining)"
    
    def print(self, pages):
        if not self.connected:
            print("Your printer is not connected!")
            return
        print(f"Printing {pages} pages.")
        self.remaining_pages -= pages

printer = Printer("Printer", "usb", 500)
printer.print(20)

print(printer)

printer.disconnect()

printer.print(20)
```

### Classes With Composition: Demonstrates composition with a Bookshelf containing Books.

```python
class Bookshelf:
    def __init__(self, *books):
        self.books = books

    def __str__(self):
        return f"Bookshelf with {len(self.books)} Books."
    
class Book:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Book {self.name}"
    
book = Book("The land is inhospitable")
book2 = Book("Charli")
shelf = Bookshelf(book, book2)

print(shelf)
```

### Class Statis Method: Uses class methods to create objects in different ways.

```python
class Book:
    TYPEZ = ("hardcover", "paperback")

    def __init__(self, name, book_type, weight):
        self.name = name
        self.book_type = book_type
        self.weight = weight

    def __repr__(self):
        return f"<Book {self.name}, {self.book_type}, weiging {self.weight}g>"
    
    @classmethod
    def hardcover(cls, name, page_weight):
        return cls(name, cls.TYPEZ[0], page_weight + 100)
    
    @classmethod
    def paperback(cls, name, page_weight):
        return cls(name, cls.TYPEZ[1], page_weight)
     

book = Book.hardcover("Laurel Hell", 1600)
light = Book.paperback("the bottle", 400)

print(book, light)
```

### Class Statis Method 2: Demonstrates class methods and static methods in store management.

```python
class Store:
    def __init__(self, name):
        self.name = name
        self.items = []

    def add_item(self, name, price):
        self.items.append({
            'name': name,
            'price': price
        })

    def stock_price(self):
        total = 0
        for item in self.items:
            total += item['price']
        return total

    @classmethod
    def franchise(cls, store):
        return cls(store.name + " - franchise") 
        # Return another store, with the same name as the argument's name, plus " - franchise"

    @staticmethod
    def store_details(store):
        return f"{store.name}, total stock price: {int(store.stock_price())}"
        # Return a string representing the argument
        # It should be in the format 'NAME, total stock price: TOTAL'


########################################################################################

store = Store("Test")
store2 = Store("Amazon")
store2.add_item("Keyboard", 160)
     
Store.franchise(store)  # returns a Store with name "Test - franchise"
Store.franchise(store2)  # returns a Store with name "Amazon - franchise"
     
Store.store_details(store)  # returns "Test, total stock price: 0"
Store.store_details(store2)  # returns "Amazon, total stock price: 160"
```

### Str Repr: Demonstrates __repr__ for debugging and object representation.

```python
class Person :
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # def __str__(self):
    #     return f"Person {self.name}; {self.age} years old."
    
    def __repr__(self):
        return f"<Person({self.name}, {self.age})>"
    

katheryn = Person("Katheryn", 44)
print(katheryn)
```
