# Python OOP Cheat Sheet 🐍

## 1. Classes & Objects

Python keeps it simple. No header files, no manually managing memory, no need to worry about your constructor causing a nuclear meltdown.

```python
class MyClass:
    def __init__(self, name):
        self.name = name  # `self` is Python's way of saying "this"

    def greet(self):
        return f"Hello, {self.name}!"

obj = MyClass("PwatPwat")
print(obj.greet())  # Output: Hello, PwatPwat!
```

## 2. Encapsulation (a.k.a Hiding Your Shame)

Use underscores to suggest "please don’t touch this" (but Python won't stop you because it believes in free will).

```python
class Secret:
    def __init__(self):
        self._semi_private = "This is a suggestion."
        self.__truly_private = "This is a threat."

    def reveal(self):
        return self.__truly_private

obj = Secret()
print(obj._semi_private)  # Can still access
print(obj.reveal())       # Use methods to access private attributes
```

Note: __truly_private gets name-mangled into _Secret__truly_private, but if you access it directly, Python will just sigh at you.

## 3. Inheritance (Because Writing Code Twice is for Losers)

Python lets you inherit from multiple parents, unlike some other languages that make you jump through hoops.

```python
class Parent:
    def speak(self):
        return "I am the parent."

class Child(Parent):
    def cry(self):
        return "Waaa!"

kid = Child()
print(kid.speak())  # Output: I am the parent.
print(kid.cry())    # Output: Waaa!
```

### Multiple Inheritance:

```python
class Mom:
    def trait(self):
        return "Inherited from Mom."

class Dad:
    def trait(self):
        return "Inherited from Dad."

class Kid(Mom, Dad):  # Mom's trait will be used first
    pass

baby = Kid()
print(baby.trait())  # Output: Inherited from Mom.
```

Python follows the MRO (Method Resolution Order), which basically means it checks from left to right.

## 4. Composition (a.k.a "Instead of Inheriting, Just Contain It")

Instead of making everything an inheritance mess, composition lets you have objects inside other objects.

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

#### When to Use Composition?
- When you need "has-a" relationships (e.g., A Bookshelf has Books).
- When inheritance doesn’t make sense (e.g., A Bookshelf is not a Book).
- When you need modularity and reusability without making a family tree out of your classes.

## 5. Class Methods (`@classmethod`)

A class method receives the class itself (cls) as the first argument instead of an instance. This lets you create alternative constructors.

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

#### Use `@classmethod` when:
- You need alternative constructors (hardcover() and paperback() in this case).
- You want to modify class-level attributes rather than instance attributes.

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

## 6. Using super() (Because You Actually Want Your Parent Class to Do Something)

`super()` lets you call methods from a parent class without hardcoding the class name. This is useful when dealing with multiple levels of inheritance.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some generic animal sound."

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Calls the __init__ from Animal
        self.breed = breed

    def speak(self):
        return "Woof!"  # Overrides the parent class method

dog = Dog("Rex", "Golden Retriever")
print(dog.name)  # Output: Rex
print(dog.speak())  # Output: Woof!
```

## 7. The `__repr__` Method (For When You Actually Care About Debugging)

`__repr__` is like `__str__`, but it's for developers, not users. It’s meant to return a string that recreates the object.

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

#### Use `__repr__` when:
- You want a debugging-friendly representation of an object.
- You want repr(obj) to return something meaningful (instead of <Person object at 0x1234>).
- You’re passing objects around and need better logging.

## 8. Metaclasses & Decorators

Python allows modifying classes at runtime and using decorators to dynamically alter functions.

```python
def add_greeting(cls):
    cls.greet = lambda self: f"Hello from {self.__class__.__name__}!"
    return cls

@add_greeting
class Person:
    pass

p = Person()
print(p.greet())  # Output: Hello from Person!
```

- This injects a method into a class at runtime.
- Python also has metaclasses, which let you dynamically change how classes behave (but it's rarely needed).
