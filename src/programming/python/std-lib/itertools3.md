# Itertools pt.3

## `islice`

A function that will get slices over an iterator. To use this, you can provide three arguments.
- A range 
- Beginning point
- End point
- Steps

```python
import itertools

# result = itertools.islice(range(10), start=1, stop=5, step=2)

result = itertools.islice(range(1000), 1, 8, 2)

for item in result:
    print(item)

# 1
# 3
# 5
# 7
```

Useful when: 
- We have an iterator that is too large for memory, so we only want a slice of it.
- Example: log file that is thousands of lines, but you only want to grab a selection of lines. This will avoid having to wait for the script to load the entire content of those files.

- Let's use `islice` over this!

```
Date: 2077-05-34
Author: Evil AI
Description: This is a sample log file

Some very long log file that machines likes to spit out a lot of the time.
...
We might be in the future, our computers are more powerful but not faster, as software had become proportionally inefficient.
...
Pretend it goes on forever
```

With something like this, we can choose to only grab the first three lines.

```python
with open('log.txt', 'r') as f:
    header = itertools.islice(f, 3)

    for line in header:
        print(line, end='')
```


## `compress`

Potentially useful for machine learning!?

```python
letters = ['a', 'b', 'c', 'd']
selectors = [True, False, True, True]
# Let's pretend this is very long

result = itertools.compress(letters, selectors)

for item in result:
    print(item)

# a
# c
# d
```

This only selects the corresponding values to the selectors out of the `letters` list.

It is a bit different to the filter function. That one determines whether something is true or false, but with compress, those values are just passed as an iterable.

## `filterfalse`

```python
def it_2(n):
    if n < 2:
        return True


numbers = [-1, -5, -8, 7, 0, 1, 2, 3]

result = itertools.filterfalse(it_2, numbers)

for item in result:
    print(item)

# 7
# 2
# 3
```

## `dropwhile`

```python

def it_2(n):
    if n < 2:
        return True


numbers = [-5, -10, -8, -1, 1, 1, 1, 0, 1, 2, 3, 2, 1, 0, -8, -10]

result = itertools.dropwhile(it_2, numbers)

for item in result:
    print(item)

# 2
# 3
# 2
# 1
# 0
# -8
# -10
```

As you can see, this only drops numbers while the criteria is not met (item in numbers less than 2). But once it's met, it will stop filtering.

## `accumulate`

This takes an iterable, and makes accumulated sums of each item that it sees. It will use addition by default, but you can use other operators as well.

```python
numbers = [-5, -10, -8, -1, 1, 1, 9, 0, 11, 2, 13, 2, 9, -8, -10]

result = itertools.accumulate(numbers)

for item in result:
    print(item)

# -5
# -15
# -23
# -24
# -23
# -22
# -13
# -13
# -2
# 0
# 13
# 15
# 24
# 16
# 6
```

## `groupby`

```python
people = [
    {
        'name': 'John Doe',
        'city': 'Gotham',
        'state': 'NY'
    },
    {
        'name': 'Jane Doe',
        'city': 'Kings Landing',
        'state': 'NY'
    },
    {
        'name': 'Corey Schafer',
        'city': 'Boulder',
        'state': 'CO'
    },
    {
        'name': 'Al Einstein',
        'city': 'Denver',
        'state': 'CO'
    },
    {
        'name': 'John Henry',
        'city': 'Hinton',
        'state': 'WV'
    },
    {
        'name': 'Randy Moss',
        'city': 'Rand',
        'state': 'WV'
    },
    {
        'name': 'Nicole K',
        'city': 'Asheville',
        'state': 'NC'
    },
    {
        'name': 'Jim Doe',
        'city': 'Charlotte',
        'state': 'NC'
    },
    {
        'name': 'Jane Taylor',
        'city': 'Faketown',
        'state': 'NC'
    }
]
# list of dictionaries: dictionary contains information about individual people
# Let's say we want to group people by 'state' : 'NC'


def get_state(person):
    return person['state']


person_group = itertools.groupby(people, get_state)

for key, group in person_group:
    print(key)
    for person in group:
        print(person)
    print()

# NY
# {'name': 'John Doe', 'city': 'Gotham', 'state': 'NY'}
# {'name': 'Jane Doe', 'city': 'Kings Landing', 'state': 'NY'}
#
# CO
# {'name': 'Corey Schafer', 'city': 'Boulder', 'state': 'CO'}
# {'name': 'Al Einstein', 'city': 'Denver', 'state': 'CO'}
#
# WV
# {'name': 'John Henry', 'city': 'Hinton', 'state': 'WV'}
# {'name': 'Randy Moss', 'city': 'Rand', 'state': 'WV'}
#
# NC
# {'name': 'Nicole K', 'city': 'Asheville', 'state': 'NC'}
# {'name': 'Jim Doe', 'city': 'Charlotte', 'state': 'NC'}
# {'name': 'Jane Taylor', 'city': 'Faketown', 'state': 'NC'}
```


Yeah, this does a lot of work in the background to let us have some nice sorted data.
- One thing to note: the dict data must already be sorted before groupby can work properly.
- In that sense, it's a bit different from SQL `GROUP_BY` because that one doesn't care about sorting.

## `tee`

- To replicate an iterator easily.
- You can no longer use the original iterator after it has been copied. You can only use the copies.

```python
person_group = itertools.groupby(people, get_state)

copy1, copy2 = itertools.tee(person_group)

for key, group in person_group:
    print(key, len(list(group)))
    print()

# NY 2
# CO 2
# WV 2
# NC 3
```

This actually isn't quite the same as the Linux `tee` command, which lets you write some input to several files:

```bash
echo "copy me everywhere" | tee file1.txt file2.txt
```

```bash
tee file.txt
some text
```
