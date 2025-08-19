# Dictionaries

A dictionary (`dict`) in Python is a data structure that associates hashable keys to values and is known in other programming languages as a resizable hash table, hashmap, or associative array. Dictionaries are Python's only built-in mapping type.

- `Keys` must be hashable and unique across the dictionary. Key types can include numbers, str, or tuples (of immutable values). They cannot contain mutable data structures such as lists, dicts, or sets. As of Python 3.7, dict key order is guaranteed to be the order in which entries are inserted.

- `values` can be of any data type or structure. Values can also nest arbitrarily, so they can include lists-of-lists, sub-dictionaries, and other custom or compound data structures.

Given a key, dictionaries can retrieve a value in (on average) constant time (independent of the number of entries). Compared to searching for a value within a list or array (without knowing the index position), a dict uses significantly more memory, but has very rapid retrieval.

Dictionaries are especially useful in scenarios where the collection of items is large and must be accessed and updated frequently.

## Dictionary Construction

Dictionaries can be created in many different ways, including:

- Using the `fromkeys()` classmethod
- Creating dictionary comprehensions
- Merging two dictionaries via unpacking (`**`)
- Merging dictionaries via the `|` (update) operator
- Using a loop to iteratively add entries to a previously created empty dict.

The two most straightforward methods are the dictionary constructor and the dictionary literal.

#### The Dictionary Constructor

`dict()` (the constructor for the dict class) can be used with any iterable of `key`, `value` pairs. It can also be called with a series of `<name>=<value>` arguments:

```python

# Passing a list of key,value tuples.
>>> wombat = dict([('name', 'Wombat'),('speed', 23),
                   ('land_animal', True)])
{'name': 'Wombat', 'speed': 23, 'land_animal': True}


# Using key=value arguments.
>>> bear = dict(name="Black Bear", speed=40, land_animal=True)
{'name': 'Black Bear', 'speed': 40, 'land_animal': True}

```

#### Dictionary Literals

A dictionary can also be directly entered as a dictionary literal, using curly brackets (`{}`) enclosing `key : value` pairs. Entries that are enclosed in the `{}` can also appear on separate lines:

```python

>>> whale = {"name": "Blue Whale", 
             "speed": 35, 
             "land_animal": False}
{'name': 'Blue Whale', 'speed': 35, 'land_animal': False}

>>> wombat = {'name': 'Wombat',
              'speed': 23,
              'land_animal': True,
              'color': 'Brindle'}

>>> wombat
{'name': 'Wombat', 'speed': 23, 'land_animal': True, 'color': 'Brindle'}

```

#### Nested Dictionaries

Dictionaries can be arbitrarily nested:

```python

animals = {
            "Real" : {
                "Winged" : {
                            "Sparrow" : {'name': 'sparrow','speed': 12, 'land_animal': True},
                            "Kestrel" : {'name': 'kestrel', 'speed': 15, 'land_animal': True}
                           },
                "Legged" : {
                            "Wombat" : {'name': 'Wombat', 'speed': 23, 'land_animal': True},
                            "Black Bear": {'name': 'Black Bear', 'speed': 40, 'land_animal': True},
                            "Polecat" : {'name': 'Polecat', 'speed': 15, 'land_animal': True}
                           },
                "Other" :  {
                            "Whale" : {'name': 'Blue Whale', 'speed': 35, 'land_animal': False},
                            "Orca" : {'name': 'Orca', 'speed': 45, 'land_animal': False},
                            "Snake" : {'name': 'Python', 'speed': 25, 'land_animal': True}
                            }
                },
        
        "Imaginary": {
                "Winged" : {
                            "Dragon" : {'name': 'Fire Dragon','speed': 100, 'land_animal': True},
                            "Phoenix" : {'name': 'Phoenix', 'speed': 1500, 'land_animal': True}
                            },
                "Legged" : {
                            "Sphinx" : {'name': 'Sphinx','speed': 10, 'land_animal': True},
                            "Minotaur" : {'name': 'Minotaur', 'speed': 5, 'land_animal': True}
                            },
                "Other" :  {}
                }
       }

```

## Accessing Values in a dict

You can access a value in a dictionary using a key in square brackets. If a key does not exist, a `KeyError` is thrown:

```python

>>> bear["speed"]
40

>>> bear["color"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'color'

```

Accessing an entry via the `get(<key>, <default value>)` method can avoid the `KeyError`:

```python

>>> bear.get("color", 'not found')
'not found'

```
#### Accessing Nested Dictionary Entries

To access entries in nested dictionaries, use successive brackets. If a given key is missing, the usual `KeyError` will be thrown:

```python

# Using the animals nested dictionary.
>>> animals["Real"]["winged"]["Kestrel"]["speed"]
15

>>> animals["Imaginary"]["winged"]["Kestrel"]["speed"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Kestrel'

```


To avoid the `KeyError`, `.get()` can be used, but the calls to `.get()` must be chained:

```python

# Using the animals nested dictionary.
# Note the use of parenthesis to enable placing the 
# .get() calls on separate lines.
>>> (animals.get("Imaginary", {})
            .get("Legged", {})
            .get("Sphinx", {})
            .get("Color", "I have no idea!"))
'I have no idea!'

```
## Changing or Adding Dictionary Values

You can change an entry `value` by assigning to its key:

```python

# Assigning the value "Grizzly Bear" to the name key.
>>> bear["name"] = "Grizzly Bear"
{'name': 'Grizzly Bear', 'speed': 40, 'land_animal': True}

>>> whale["speed"] = 25
{'name': 'Blue Whale', 'speed': 25, 'land_animal': False}

```

New `key : value` pairs can be added in the same fashion:

```python

# Adding an new "color" key with a new "tawney" value.
>>> bear["color"] = 'tawney'
{'name': 'Grizzly Bear', 'speed': 40, 'land_animal': True, 'color': 'tawney'}

>>> whale["blowholes"] = 1
{'name': 'Blue Whale', 'speed': 25, 'land_animal': False, 'blowholes': 1}

```

## Removing (Pop-ing and del) Dictionary Entries

You can use the `.pop(<key>)` method to delete a dictionary entry. `.pop()` removes the (`key`, `value`) pair and returns the value for use. Like `.get()`, `.pop(<key>)` accepts second argument (`dict.pop(<key>, <default value>)`) that will be returned if the key is not found. This prevents a `KeyError` being raised:

```python

# Using .pop() removes both the key and value, returning the value.
>>> bear.pop("name")
'Grizzly Bear'


# The "name" key is now removed from the dictionary.
# Attempting .pop() a second time will throw a KeyError.
>>> bear.pop("name")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'name'


# Using a default argument with .pop() will 
# prevent a KeyError from a missing key.
>>> bear.pop("name", "Unknown")
'Unknown'

```


You can also use the `del` statement to remove a single or multiple entries. A `KeyError` is raised if the entry to be removed is not found in the dictionary:

```python

>>> wombat = {'name': 'Wombat',
              'speed': 23,
              'land_animal': True,
              'color': 'Brindle',
              'talent': 'Singing',
              'size': 'small'}

# Remove a single entry from the dictionary.
>>> del wombat["color"]
>>> wombat
{'name': 'Wombat', 'speed': 23, 'land_animal': True, 'talent': 'Singing', 'size': 'small'}


# Remove multiple entries from the dictionary.
>>> del wombat["talent"], wombat["size"]
>>> wombat
{'name': 'Wombat', 'speed': 23, 'land_animal': True}


# Attempting a deletion of a non-existent key raises a KeyError
>>> del wombat["number_of_legs"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'number_of_legs'

```

## Looping Through/Iterating over a Dictionary

Looping through a dictionary using `for item in dict` or `while item` will iterate over the keys by default. You can access values within the same loop by using square brackets:

```python

>>> for key in bear:
>>>     print((key, bear[key])) #this prints a tuple of (key, value)
('name', 'Black Bear')
('speed', 40)
('land_animal', True)

```

You can also use the `.items()` method, which returns (`key`, `value`) tuples:

```python

# dict.items() forms (key, value tuples) that can be 
# unpacked and iterated over.
>>> for key, value in whale.items():
>>>     print(key, ":", value)
name : Blue Whale
speed : 25
land_animal : False
blowholes : 1

```

Likewise, `.keys()` will return the `keys` and `.values()` will return the `values`.

## Extending Dictionary Functionality: The Collections Module

The `collections` module adds specialized functionality to Python's standard collection-based datatypes (dictionary, set, list, tuple). Three of the most useful dictionary-based classes are:

- `Counter` automatically counts items and returns them in a `dict` with the items as keys and their counts as values.
- `OrderedDict`, has methods specialized for arranging the order of dictionary entries.
- `defaultdict` uses a factory method to set a default value if a `key` is not found when trying to retrieve or assign to a dictionary entry.

#### Code example: Iterates through a dictionary of student attendance and prints results.

```python
student_attendance = {"Rolf": 96, "Bob": 80, "Anna": 100}

for student, attendance in student_attendance.items():
    print(f"{student}: {attendance}")

# Rolf: 96
# Bob: 80
# Anna: 100
```

#### Code example: Implements a simple username-password authentication system.

```python
users = [
    (0, "Bob", "password"),
    (1, "Rolf", "bob123"),
    (2, "Jose", "longpassword"),
    (3, "username", "1234")
]

username_mapping = {user[1]: user for user in users}

username_input = input("Enter your username: ")
password_input = input("Enter your password: ")

_, username, password = username_mapping[username_input]

if password_input == password:
    print("Your details are correct!")
else:
    print("Your details are incorrect.")

# Enter your username: Bob
# Enter your password: password
# Your details are correct!
```

#### Code example: Calculates average grades for an individual student and a class.

- Inside of a dictionary, you can store pair data, but you can also store different data types like tuples.

```python
data = {
    "name" : "Jose",
    "school" : "Computing",
    "grades" : (66, 77, 88)
}

def average_grade(data):
    grades = data["grades"]
    return sum(grades) / len(grades)

print(average_grade(data))
# 77.0


student_list = [
    {
      "name" : "Jose",
      "school" : "Computing",
      "grades" : (66, 77, 88)
    },
    {
      "name" : "PwatPwat",
      "school" : "Art",
      "grades" : (88, 100, 94)
    }
]

def average_grade_all_students(student_list):
    total = 0
    count = 0
    for student in student_list:
        grades = student["grades"]
        total += sum(grades)
        count += len(grades)
    return total / count

print(average_grade_all_students(student_list))
# 85.5
```
