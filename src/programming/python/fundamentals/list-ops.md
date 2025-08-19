# List Operations

Python provides many useful methods for working with lists.

Because lists are mutable, list-methods alter the original list object passed into the method. If mutation is undesirable, a shallow copy (at minimum_) of the original list needs to be made via `slice` or `<list>.copy()`.

## Adding Items

Adding items to the end of an existing list can be done via `<list>.append(<item>)`:

```python

>>> numbers = [1, 2, 3]
>>> numbers.append(9)

>>> numbers
[1, 2, 3, 9]

```

Rather than appending, `<list>.insert(<index>, <item>)` adds the item to a specific index within the list. `<index>` is the index of the item before which you want the new item to appear. <item> is the element to be inserted.

Note: If `<index>` is 0, the item will be added to the start of the list. If `<index>` is greater than the final index on the list, the item will be added in the final position -- the equivalent of using `<list>.append(<item>)`.

```python

>>> numbers = [1, 2, 3]
>>> numbers.insert(0, -2)

>>> numbers
[-2, 1, 2, 3]

>>> numbers.insert(1, 0)

>>> numbers
[-2, 0, 1, 2, 3]

```

An iterable can be combined with an existing list (concatenating the two) via `<list>.extend(<iterable>)`. `<list>.extend(<iterable>)` will unpack the supplied iterable, adding its elements in the same order to the end of the target list (using `<list>.append(<item>`) in this circumstance would add the entire iterable as a single item.).

```python

>>> numbers = [1, 2, 3]
>>> other_numbers = [5, 6, 7]

>>> numbers.extend(other_numbers)

>>> numbers
[1, 2, 3, 5, 6, 7]

>>> numbers.extend([8, 9])

>>> numbers
[1, 2, 3, 5, 6, 7, 8, 9]

```

## Removing Items

`<list>.remove(<item>)` can be used to remove an element from the list. `<list>.remove(<item>)` will throw a `ValueError` if the element is not present in the list.

```python

>>> numbers = [1, 2, 3]
>>> numbers.remove(2)

>>> numbers
[1, 3]

# Trying to remove a value that is not in the list throws a ValueError.
>>> numbers.remove(0)
ValueError: list.remove(x): x not in list

```

Alternatively, using `<list>.pop(<index>)` method will both remove and return an element for use.

`<list>.pop(<index>)` takes one optional parameter: the index of the element to remove and return. If the optional `<index>` argument is not specified, the last element of the list will be removed and returned. If `<index>` is a higher number than the final index of the list, an `IndexError` will be thrown.

```python

>>> numbers = [1, 2, 3]
>>> numbers.pop(0)
1

>>> numbers
[2, 3]
>>> numbers.pop()
3

>>> numbers
[2]

# This will throw an error because there is only index 0.
>>> numbers.pop(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: pop index out of range

```

All items can be removed from a list via `<list>.clear()`. It does not take any parameters.

```python

>>> numbers = [1, 2, 3]
>>> numbers.clear()

>>> numbers
[]

```

## Reversing and reordering

The order of list elements can be reversed in place with `<list>.reverse()`. This will mutate the original list.

```python

>>> numbers = [1, 2, 3]
>>> numbers.reverse()

>>> numbers
[3, 2, 1]

```

A list can be re-ordered in place with the help of `<list>.sort()`. Default sort order is ascending from the left. The Python docs offer additional tips and techniques for sorting.

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
