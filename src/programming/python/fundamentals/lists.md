# Lists

A `list` is a mutable collection of items in sequence. Like most collections (see the built-ins tuple, dict and set), lists can hold reference to any (or multiple) data type(s) - including other lists. Like any sequence, items can be accessed via 0-based index number from the left and -1-based index from the right. Lists can be copied in whole or in part via slice notation or `<list>.copy()`.

Lists support both common and mutable sequence operations such as `min()`/`max()`, `<list>.index()`, `.append()` and `.reverse()`. List elements can be iterated over using the `for item in <list>` construct. `for index, item in enumerate(<list>)` can be used when both the element index and the element value are needed.

Lists are implemented as dynamic arrays -- similar to Java's `Arraylist` type, and are most often used to store groups of similar data (strings, numbers, sets etc.) of unknown length (the number of entries may arbitrarily expand or shrink).

Accessing elements, checking for membership via `in`, or appending items to the "right-hand" side of a list are all very efficient. Prepending (appending to the "left-hand" side) or inserting into the middle of a list are much less efficient because those operations require shifting elements to keep them in sequence. For a similar data structure that supports memory efficient `appends`/`pops` from both sides, see `collections.deque`, which has approximately the same O(1) performance in either direction.

Because lists are mutable and can contain references to arbitrary Python objects, they also take up more space in memory than an array.array or a tuple (which is immutable) of the same apparent length. Despite this, lists are an extremely flexible and useful data structure and many built-in methods and operations in Python produce lists as their output.

## Construction

A `list` can be declared as a literal with square `[]` brackets and commas between elements:

```python

>>> no_elements = []

>>> no_elements
[]

>>> one_element = ["Guava"]

>>> one_element
['Guava']

>>> elements_separated_with_commas = ["Parrot", "Bird", 334782]

>>> elements_separated_with_commas
['Parrot', 'Bird', 334782]

```

For readability, line breaks can be used when there are many elements or nested data structures within a list.

```python

>>> lots_of_entries = [
      "Rose",
      "Sunflower",
      "Poppy",
      "Pansy",
      "Tulip",
      "Fuchsia",
      "Cyclamen",
      "Lavender"
   ]

>>> lots_of_entries
['Rose', 'Sunflower', 'Poppy', 'Pansy', 'Tulip', 'Fuchsia', 'Cyclamen', 'Lavender']


# Each data structure is on its own line to help clarify what they are.
>>> nested_data_structures = [
      {"fish": "gold", "monkey": "brown", "parrot": "grey"},
      ("fish", "mammal", "bird"),
      ['water', 'jungle', 'sky']
   ]

>>> nested_data_structures
[{'fish': 'gold', 'monkey': 'brown', 'parrot': 'grey'}, ('fish', 'mammal', 'bird'), ['water', 'jungle', 'sky']]

```

The `list()` constructor can be used empty or with an iterable as an argument. Elements in the iterable are cycled through by the constructor and added to the list in order:

```python

>>> no_elements = list()
>>> no_elements
[]

# The tuple is unpacked and each element is added.
>>> multiple_elements_from_tuple = list(("Parrot", "Bird", 334782))

>>> multiple_elements_from_tuple
['Parrot', 'Bird', 334782]

# The set is unpacked and each element is added.
>>> multiple_elements_from_set = list({2, 3, 5, 7, 11})

>>> multiple_elements_from_set
[2, 3, 5, 7, 11]

```

Results when using a list constructor with a string or a dict may be surprising:

```python

# String elements (Unicode code points) are iterated through and added *individually*.
>>> multiple_elements_string = list("Timbuktu")

>>> multiple_elements_string
['T', 'i', 'm', 'b', 'u', 'k', 't', 'u']

# Unicode separators and positioning code points are also added *individually*.
>>> multiple_code_points_string = list('अभ्यास')

>>> multiple_code_points_string
['अ', 'भ', '्', 'य', 'ा', 'स']

# The iteration default for dictionaries is over the keys, so only key data is inserted into the list.
>>> source_data = {"fish": "gold", "monkey": "brown"}
>>> list(source_data)
['fish', 'monkey']

```

Because the `list()` constructor will only take iterables (or nothing) as arguments, objects that are not iterable will raise a `TypeError`. Consequently, it is much easier to create a one-item list via the literal method.

```python

# Numbers are not iterable, and so attempting to create a list with a number passed to the constructor fails.
>>> one_element = list(16)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not iterable

# Tuples *are* iterable, so passing a one-element tuple to the constructor does work, but it's awkward
>>> one_element_from_iterable = list((16,))

>>> one_element_from_iterable
[16]

```

## Accessing elements

Items inside lists (as well as elements in other sequence types such as `str` & `tuple`), can be accessed using bracket notation. Indexes can be from `left --> right` (starting at zero) or `right --> left` (starting at -1).

```python

>>> breakfast_foods = ["Oatmeal", "Fruit Salad", "Eggs", "Toast"]

# Oatmeal is at index 0 or index -4.
>>> breakfast_foods[0]
'Oatmeal'

>>> breakfast_foods[-4]
'Oatmeal'

# Eggs are at index -2 or 2
>>> breakfast_foods[-2]
'Eggs'

>>> breakfast_foods[2]
'Eggs'

# Toast is at -1
>>> breakfast_foods[-1]
'Toast'

```

A section of a list can be accessed via slice notation (`<list>[start:stop]`). A slice is defined as an element sequence at position `index`, such that `start <= index < stop`. Slicing returns a copy of the "sliced" items and does not modify the original `list`.

A `step` parameter can also be used in the slice (`<list>[<start>:<stop>:<step>]`) to "skip over" or filter the returned elements (for example, a step of 2 will select every other element in the section):

```python

>>> colors = ["Red", "Purple", "Green", "Yellow", "Orange", "Pink", "Blue", "Grey"]

# If there is no step parameter, the step is assumed to be 1.
>>> middle_colors = colors[2:6]

>>> middle_colors
['Green', 'Yellow', 'Orange', 'Pink']

# If the start or stop parameters are omitted, the slice will
# start at index zero, and will stop at the end of the list.
>>> primary_colors = colors[::3]

>>> primary_colors
['Red', 'Yellow', 'Blue']

```

## Working with lists

Lists supply an iterator, and can be looped through/over in the same manner as other sequence types, using either `for item in <list>` or `for index, item in enumerate(<list>)`:

```python

# Make a list, and then loop through it to print out the elements
>>> colors = ["Orange", "Green", "Grey", "Blue"]
>>> for item in colors:
...     print(item)
...
Orange
Green
Grey
Blue


# Print the same list, but with the indexes of the colors included
>>> colors = ["Orange", "Green", "Grey", "Blue"]
>>> for index, item in enumerate(colors):
...     print(item, ":", index)
...
Orange : 0
Green : 1
Grey : 2
Blue : 3


# Start with a list of numbers and then loop through and print out their cubes.
>>> numbers_to_cube = [5, 13, 12, 16]
>>> for number in numbers_to_cube:
...     print(number**3)
...
125
2197
1728
4096
```

One common way to compose a list of values is to use `<list>.append()` within a loop:

```python
>>> cubes_to_1000 = []
>>> for number in range(11):
...    cubes_to_1000.append(number**3)

>>> cubes_to_1000
[0, 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]

```

Lists can also be combined via various techniques:

```python

# Using the plus + operator unpacks each list and creates a new list, but it is not efficient.
>>> new_via_concatenate = ["George", 5] + ["cat", "Tabby"]

>>> new_via_concatenate
['George', 5, 'cat', 'Tabby']

# Likewise, using the multiplication operator * is the equivalent of using + n times.
>>> first_group = ["cat", "dog", "elephant"]
>>> multiplied_group = first_group * 3

>>> multiplied_group
['cat', 'dog', 'elephant', 'cat', 'dog', 'elephant', 'cat', 'dog', 'elephant']

# Another method for combining 2 lists is to use slice assignment or a loop-append.
# This assigns the second list to index 0 in the first list.
>>> first_one = ["cat", "Tabby"]
>>> second_one = ["George", 5]
>>> first_one[0:0] = second_one

>>> first_one
['George', 5, 'cat', 'Tabby']

# This loops through the first list and appends its items to the end of the second list.
>>> first_one = ["cat", "Tabby"]
>>> second_one = ["George", 5]

>>> for item in first_one:
...      second_one.append(item)

>>> second_one
['George', 5, 'cat', 'Tabby']

```
## Some cautions

Recall that variables in Python are labels that point to underlying objects. `lists` add one more layer as container objects -- they hold object references for their collected items. This can lead to multiple potential issues when working with lists, if not handled properly.

#### Assigning more than one variable name

Assigning a `list` object to a new variable name does not copy the `list` object nor its elements. Any change made to the elements in the list under the new name impact the original.

Making a shallow_copy via `list.copy()` or slice will avoid this first-level referencing complication. A shallow_copy will create a new list object, but will not create new objects for the contained list elements. This type of copy will usually be enough for you to add or remove items from the two list objects independently, and effectively have two "separate" lists.

```python

>>> actual_names = ["Tony", "Natasha", "Thor", "Bruce"]

# Assigning a new variable name does not make a copy of the container or its data.
>>> same_list = actual_names

#  Altering the list via the new name is the same as altering the list via the old name.
>>> same_list.append("Clarke")
["Tony", "Natasha", "Thor", "Bruce", "Clarke"]

>>> actual_names
["Tony", "Natasha", "Thor", "Bruce", "Clarke"]

#  Likewise, altering the data in the list via the original name will also alter the data under the new name.
>>> actual_names[0] = "Wanda"
['Wanda', 'Natasha', 'Thor', 'Bruce', 'Clarke']

# If you copy the list, there will be two separate list objects which can be changed independently.
>>> copied_list = actual_names.copy()
>>> copied_list[0] = "Tony"

>>> actual_names
['Wanda', 'Natasha', 'Thor', 'Bruce', 'Clarke']

>>> copied_list
["Tony", "Natasha", "Thor", "Bruce", "Clarke"]

```

