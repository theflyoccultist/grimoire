# Functools: Caching

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
```

## `functools.cached_property`

This would be much slower if evaluated without cache. With this simple change, you can dramatically improve performance for expensive operations.

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

ds._data.append(7)
print(ds.sum)   # needs manual deletion, otherwise it will always give the same result
```

Example projects where you could use this: database connection and file processing.

### Database Connection

```python

import sqlite3
from functools import cached_property

class DB:
    def __init__(self, db_path):
        self._path = db_path

    @cached_property
    def conn(self):
        return sqlite3.connect(self._path)

    def get_conn(self):
        """Return a working connection, refresh if dead."""
        try:
            # Quick sanity check: lightweight query
            self.conn.execute("SELECT 1;")
            return self.conn
        except sqlite3.Error:
            # Connection is stale -> reset cache
            if "conn" in self.__dict__:
                del self.__dict__["conn"]
            return self.conn  # triggers re-connect
```

### JSON file processing

```python

import json
from functools import cached_property

class Config:
    def __init__(self, path):
        self._path = path

    @cached_property
    def data(self):
        with open(self._path, "r") as f:
            return json.load(f)
```


## `functools.lru_cache`

Yet another function decorator, this one is more flexible than the default cache because you can set a max size or enable type hints (so it stores Ints and Doubles separately, for example).

`lru` means Least Recently Used, which means that when faced with new results, it will push out the oldest results if `maxsize` was reached.

To not use in functions where there's side effects, with mutable objects on each call, or impure functions such as `time()` or `random()`. You should only use it when you want to reuse previously computed values.

To help you tune the maxsize of the cache, this comes with a function called `cache_info()`. It's a good idea to tune it so that your cache does not grow without bound on long-running processes.

```
CacheInfo(hits=1, misses=3, maxsize=2, currsize=2)
```

What the terms in `cache_info()` means:
- misses: Number of times your function had to run, because it wasn't cached yet.
- hits: Number of times Python found the result already in the cache and just handed it back.
- maxsize: How many results you're allowed to keep (You could set it to `None` if you want infinite caching, but it's only recommended for small input domains.)
- currsize: How many results are actually in there right now.

### Fetching articles from an API

```python

from functools import lru_cache

@lru_cache(maxsize=2)
def get_article(article_id):
    print(f"Fetching article {article_id} from API...")
    return {"id": article_id, "content": f"Article {article_id}"}

# First two fetches -> real calls
get_article(1)
get_article(2)

# Cache hit for 1
get_article(1)

# New fetch -> kicks out least recently used (2)
get_article(3)

print(get_article.cache_info())

```

Output:

```
Fetching article 1 from API...
Fetching article 2 from API...
Fetching article 3 from API...
CacheInfo(hits=1, misses=3, maxsize=2, currsize=2)
```

In this example cache had room for only 2 articles at once, so it kicked out Article 2 since it was the least recently used.
