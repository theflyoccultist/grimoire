# Functools

It's an interesting assortment of utilities that alters functions or methods in some way.

## `functools.cache`

This has a memorizing power, that's why it's so good. It basically keeps some data allowing quicker lookup.

```python

from functools import cache


@cache
def factorial(n):
    return n * factorial(n - 1) if n else 1


print(factorial(10))
# 3628800 
# new lookups: recursive calls.

print(factorial(5))
# 120 just looks up cached value result

print(factorial(12))
# 479001600 makes some new recursive call, and add new cached value result

# Crashes on those edge cases
# print(-5)
# print(1.5)

```

## `functools.cached_property`

This would be much slower if evaluated without cache. With this simple change, you can dramatically impact performance for expensive operations.

This computes once, stashes it and then reuses it.

```python

from functools import cached_property


class DataSet:
    def __init__(self, sequence_of_numbers):
        self._data = sequence_of_numbers

    @cached_property
    def sum(self):
        return (sum(self._data))


ds = DataSet([1, 2, 3, 4, 5])
print(ds.sum)   # computes statistics.stdev once
print(ds.sum)   # instant lookup, no recomputation. It won't reevaluate.


del ds.sum

ds._data.append(7)  # needs manual deletion to recalculate
print(ds.sum)

```

Example projects where you could use this: simple calculator, database connection and file processing.

## `lru_cache`
