# Tuples

A tuple is an immutable collection of items in sequence.

Like most collections (see the built-ins list, dict and set), tuples can hold any (or multiple) data type(s) -- including other tuples. The elements of a tuple can be iterated over using the `for item in <tuple>` construct. If both element index and value are needed, `for index, item in enumerate(<tuple>)` can be used.

Like any sequence, elements within tuples can be accessed via bracket notation using a 0-based index number from the left or a -1-based index number from the right. Tuples can be copied in whole or in part via slice notation or `<tuple>.copy()`, and support all common sequence operations. Being immutable, tuples do not support mutable sequence operations.

Tuples take up very little memory space compared to other collection types and have constant (O(1)) access time when using an index. However, they cannot be resized, sorted, or altered once created, so are less flexible when frequent changes or updates to data are needed. If frequent updates or expansions are required, a `list`, `collections.deque`, or `array.array` might be a better data structure.

## Tuple Construction

Tuples can be formed in multiple ways, using either the `tuple` class constructor or the `(<element_1>, <element_2>)` (`tuple` literal) declaration.

#### Using the tuple() constructor empty or with an iterable:

```python

>>> no_elements = tuple()
()

# The constructor *requires* an iterable, so single elements must be passed in a list or another tuple.
>>> one_element = tuple([16])
(16,)

```

Strings are iterable, so using a single `str` as an argument to the `tuple()` constructor can have surprising results:

```python

# String elements (characters) are iterated through and added to the tuple
>>> multiple_elements_string = tuple("Timbuktu")
('T', 'i', 'm', 'b', 'u', 'k', 't', 'u')

```

Other iterables also have their elements added one by one:

```python

>>> multiple_elements_list = tuple(["Parrot", "Bird", 334782])
("Parrot", "Bird", 334782)

>>> multiple_elements_set = tuple({2, 3, 5, 7, 11})
(2,3,5,7,11)

```

The iteration default for `dict` is over the keys. To include both keys and values in a tuple made from a dictionary, use `<dict>.items()`, which will return an iterator of (key, value) tuples.

```python

source_data = {"fish": "gold", 
               "monkey": "brown"}

>>> multiple_elements_dict_1 = tuple(source_data)
('fish', 'monkey')

>>> multiple_elements_dict_2 = tuple(source_data.items())
(('fish', 'gold'), ('monkey', 'brown'))

```

#### Declaring a tuple as a literal :

Because the `tuple()` constructor only takes iterables (or nothing) as arguments, it is much easier to create a one-tuple via the literal method.

```python

>>> no_elements = ()
()

>>> one_element = ("Guava",)
("Guava",)

```

Note that generally parentheses are not required to create a tuple literal - only commas. However, using `(<element)1>, <element_2>)` is considered more readable in most circumstances. Parentheses are also required in cases of ambiguity, such as an empty or one-item tuple or where a function takes a tuple as an argument.

```python

>>> elements_separated_with_commas = "Parrot", "Bird", 334782
("Parrot", "Bird", 334782)

>>> elements_with_commas_and_parentheses = ("Triangle", 60, 60, 60)
("Triangle", 60, 60, 60)

```

Other data structures can be included as tuple elements, including other tuples.

```python

>>> nested_data_structures = ({"fish": "gold", "monkey": "brown", "parrot" : "grey"}, ("fish", "mammal", "bird"))
({"fish": "gold", "monkey": "brown", "parrot" : "grey"}, ("fish", "mammal", "bird"))

>>> nested_data_structures_1 = (["fish", "gold", "monkey", "brown", "parrot", "grey"], ("fish", "mammal", "bird"))
(["fish", "gold", "monkey", "brown", "parrot", "grey"], ("fish", "mammal", "bird"))

```

Tuples can be concatenated using plus `+` operator, which unpacks each tuple creating a new, combined tuple.

```python

>>> new_via_concatenate = ("George", 5) + ("cat", "Tabby")
("George", 5, "cat", "Tabby")

#likewise, using the multiplication operator * is the equivalent of using + n times
>>> first_group = ("cat", "dog", "elephant")

>>> multiplied_group = first_group * 3
('cat', 'dog', 'elephant', 'cat', 'dog', 'elephant', 'cat', 'dog', 'elephant')

```

## Accessing Data

Elements inside tuples (like the other sequence types `str` and `list`), can be accessed via bracket notation. Indexes can be from `left --> right` (starting at zero) or `right --> left` (starting at -1). Tuples can also be copied in whole or in part via slice notation or using `<tuple>.copy()`.

```python

>>> student_info = ("Alyssa", "grade 3", "female", 8 )

#name is at index 0 or index -4
>>> student_name = student_info[0]
Alyssa

>>> student_name = student_info[-4]
Alyssa

#age is at index 3 or index -1
>>> student_age_1 = student_info[3]
8

>>> student_age_2 = student_info[-1]
8

```

## Iteration Over Elements

Elements inside tuples can be iterated over in a loop using for `item in <tuple>` syntax. If both indexes and values are needed, `for index, item in enumerate(<tuple>)` can be used.

```python

>>> student_info = ("Alyssa", "grade 3", "female", 8 )
>>> for item in student_info:
...   print(item)

...
Alyssa
grade 3
female
8

>>> for index, item in enumerate(student_info):
...  print("Index is: " + str(index) + ", value is: " + str(item) +".")

...
Index is: 0, value is: Alyssa.
Index is: 1, value is: grade 3.
Index is: 2, value is: female.
Index is: 3, value is: 8.

```

## Tuples as Homogeneous Information

Tuples are often used as records containing data that is organizationally or conceptually homogeneous and treated as a single unit of information -- even if individual elements are of heterogeneous data types.

```python
>>> student_info = ("Alyssa", "grade 3", "female", 8 )
```

Tuples are also used when homogeneous immutable sequences of data are needed for hashability, storage in a set, or creation of keys in a dictionary.

Note that while tuples are in most cases immutable, because they can contain any data structure or object they can become mutable if any of their elements is a mutable type. Using a mutable data type within a tuple will make the enclosing tuple un-hashable.

```python

>>> cmyk_color_map = {
                      (.69, .3, .48, .1) : ("Teal 700", (59, 178, 146), 0x3BB292),
                      (0, .5, 1, 0) : ("Pantone 151", (247, 127, 1), 0xF77F01),
                      (.37, .89, 0, .44) : ("Pantone 267", (89, 16, 142), 0x59108E),
                      (0, 1, .46, .45) : ("Pantone 228", (140, 0, 76), 0x8C004C)
                     }

>>>> unique_rgb_colors = {
                          (59, 178, 146),
                          (247, 127, 1),
                          (89, 16, 142),
                          (140, 0, 76),
                          (76, 0, 140)
                         }

>>> teal_700 = hash((59, 178, 146))

>>> teal_700 = hash(("Pantone 228", [(140, 0, 76), 0x8C004C]))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'

```

## Extended tuples and related data types

Tuples are often used as records, but the data inside them can only be accessed via position/index. The `namedtuple()` class in the `collections` module extends basic tuple functionality to allow access of elements by name. Additionally, users can adapt a `dataclass` to provide similar named attribute functionality, with a some pros and cons.
