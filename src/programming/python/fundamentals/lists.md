# Lists
(Work in progress)

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

## List Comprehensions

In Python code, you will often see one liner functions called "List comprehensions". These are a concise way to create lists by applying an expression to each item in an iterable, often with optional filtering conditions. It allows for cleaner and more readable code compared to traditional loops.

```python
numbers = [1, 3, 5]
doubled = [x * 2 for x in numbers]
print(doubled)
# [2, 6, 10]

friends = ["samantha", "sylvie", "adam", "rain", "anna", "sultan"]
starts_s = [friend for friend in friends if friend.startswith('s')]

print(starts_s)
# ['samantha', 'sylvie', 'sultan']
```
