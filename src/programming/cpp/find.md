# Non mutating algorithms: `std::find`

- Does not modify the contents of the container they work on.
- Typical operation is searching the container for a particular element and returning its position

```cpp
template <class InputIter, Class T>
InputIter find(InputIter b, InputIter e, const T &t);
```
  - This returns an iterator to the first matching element (or `end()` if not found), so checking against the end is crucial for sanity.

```cpp
template <class InputIter, Class Predicate>
InputIter find(InputIter b, InputIter e, Predicate p);
```
  - Finds position of first element that makes Predicate true in range b to e, otherwise position e is returned.

Another possibility:
```cpp
template <class InputIter, Class Function>
void for_each(InputIter b, InputIter e, Function f);
```
  - Apply f for each value found in range b to e.
  - `std::for_each` is great for side effects, but in modern C++, it's usually replaced with range-based for loops or algorithms like `std::transform` or `std::accumulate` for actual data transformation.

#### `find()` algorithm example

```cpp
#include <algorithm>
#include <iostream>
#include <ostream>
#include <string>

int main() {
  std::string words[5] = {"my", "hop", "mop", "hope", "cope"};
  std::string *where;

  where = std::find(words, words + 5, "hop");
  std::cout << *++where << "\n";
  std::sort(words, words + 5);
  where = std::find(words, words + 5, "hop");
  std::cout << *++where << "\n";
}
```

Expected output:
```plaintext
mop
hope
```

- Here, sort does a lexicographic sort. "cope" will end up first and "my" will end up last.
