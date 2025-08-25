# Itertools 2

## `starmap`

Very similar to `map()`

```python
squares = itertools.starmap(pow, [(0, 2), (1, 2), (2, 2)])

print(list(squares))

# [0, 1, 4]
```

## `combinations`

Order does not matter in this combination. If one is needed, see `permutations`.

```python
import itertools


letters = ['a', 'b', 'c', 'd']

result = itertools.combinations(letters, 2)

for item in result:
    print(item)

# ('a', 'b')
# ('a', 'c')
# ('a', 'd')
# ('b', 'c')
# ('b', 'd')
# ('c', 'd')

```

## `permutation`

```python
import itertools


letters = ['a', 'b', 'c', 'd']

result = itertools.product(numbers, 2)

for item in result:
    print(item)

# ('a', 'b')
# ('a', 'c')
# ('a', 'd')
# ('b', 'a')
# ('b', 'c')
# ('b', 'd')
# ('c', 'a')
# ('c', 'b')
# ('c', 'd')
# ('d', 'a')
# ('d', 'b')
# ('d', 'c')
```

This generates all possible values in order. To use with precaution. Good in capable hands.

You could for example use it in a password breaker. Here's an example with four number digits:

```python
import itertools

numbers = [0, 1, 2, 3]

result = itertools.product(numbers, repeat=4)

for item in result:
    print(item)

```

A C++ implementation of the same example, made just to jumpscare the casual python programmers:

```cpp
#include <iostream>
#include <string>

void product(const std::string &elems, int repeat, std::string &current) {
  if (current.size() == repeat) {
    std::cout << current << "\n";
    return;
  }

  for (auto c : elems) {
    current.push_back(c);
    product(elems, repeat, current);
    current.pop_back();
  }
}

int main() {
  std::string elems = "0123";
  int repeat = 4;
  std::string current;

  product(elems, repeat, current);
}

```


`combinations_with_replacement` makes for a pleasant pattern. Go check it out!

```python
import itertools

numbers = [0, 1, 2, 3]

result = itertools.combinations_with_replacement(numbers, 4)

for item in result:
    print(item)

# (0, 0, 0, 0)
# (0, 0, 0, 1)
# (0, 0, 0, 2)
# (0, 0, 0, 3)
# (0, 0, 1, 1)
# (0, 0, 1, 2)
# (0, 0, 1, 3)
# (0, 0, 2, 2)
# (0, 0, 2, 3)
# (0, 0, 3, 3)
# (0, 1, 1, 1)
# (0, 1, 1, 2)
# (0, 1, 1, 3)
# (0, 1, 2, 2)
# (0, 1, 2, 3)
# (0, 1, 3, 3)
# (0, 2, 2, 2)
# (0, 2, 2, 3)
# (0, 2, 3, 3)
# (0, 3, 3, 3)
# (1, 1, 1, 1)
# (1, 1, 1, 2)
# (1, 1, 1, 3)
# (1, 1, 2, 2)
# (1, 1, 2, 3)
# (1, 1, 3, 3)
# (1, 2, 2, 2)
# (1, 2, 2, 3)
# (1, 2, 3, 3)
# (1, 3, 3, 3)
# (2, 2, 2, 2)
# (2, 2, 2, 3)
# (2, 2, 3, 3)
# (2, 3, 3, 3)
# (3, 3, 3, 3)

```

Those have great use cases, but can unfortunately be pretty slow. Here is something that can be more efficient:

## `chain`

```python

import itertools

letters = ['a', 'b', 'c', 'd']
numbers = [0, 1, 2, 3]
names = ['Corey', 'Nicole']

combined = itertools.chain(letters, numbers, names)

for item in combined:
    print(item)

# a
# b
# c
# d
# 0
# 1
# 2
# 3
# Corey
# Nicole
```
