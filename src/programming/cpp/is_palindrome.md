# Bidirectional Iterator: `is_palindrome.cpp`

This algorithm demonstrates how to use bidirectional iterators, which allow traversal both forward and backward—a requirement for checking palindromes efficiently.

#### Key Traits of a Bidirectional Iterator:
- Must support both ++ and -- operators (aka "backing up the iterator").
- Used in algorithms like `std::reverse()` and `std::equal()` that walk from both ends inward.

#### Old-School Approach (`is_palindrome`)

This version uses two pointers (`first`, `last`) that walk inward and compare characters:

```cpp
#include <algorithm>
#include <cctype>
#include <iostream>
#include <regex>
#include <string>

template <typename Bidirectional>
bool is_palindrome(Bidirectional first, Bidirectional last) {
  if (first == last)
    return true;

  --last;
  while (first < last) {
    if (*first != *last)
      return false;
    ++first;
    --last;
  }
  return true;
}

int main() {
  std::string input;
  std::cout << "Is the input a palindrome? ";
  std::getline(std::cin, input);

  // lowercase input
  std::transform(input.begin(), input.end(), input.begin(), ::tolower);

  // remove non-alphanumeric
  input = std::regex_replace(input, std::regex(R"([^a-z0-9])"), "");

  if (is_palindrome(input.begin(), input.end()))
    std::cout << "Yes\n";
  else
    std::cout << "No\n";
}
```

**How it works**:
- This is the low-level “two-pointer” style, seen often in C-style code.
- It stops early if any characters differ.
- If the pointers meet (or cross), it returns true.

Compared to using a forward-only iterator (which would require repeatedly walking from the start to simulate --), this approach is linear instead of quadratic.

#### Input Normalization

Before checking, we normalize the input to handle mixed case and punctuation (e.g. "A man, a plan, a canal, Panama!"):

```cpp
std::transform(input.begin(), input.end(), input.begin(), ::tolower);
input = std::regex_replace(input, std::regex(R"([^a-z0-9])"), "");
```

- `std::transform` applies `::tolower` to each character. This is necessary because uppercase and lowercase letters have different values in memory, unlike scripting languages that hide this behind `.to_lower()` or `${1,,}`.
- `std::regex_replace` strips out all non-alphanumeric characters.

### Modern C++ One-Liner: `std::equal`

You can replace the entire is_palindrome function with one clean STL call:

```cpp
std::equal(input.begin(), input.begin() + input.size() / 2, input.rbegin())
```

This:
- Compares the first half of the string with the reverse of the second half.
- Automatically handles “meeting in the middle” without manual pointer arithmetic.

```cpp
#include <algorithm>
#include <cctype>
#include <iostream>
#include <regex>
#include <string>

int main() {
  std::string input;
  std::cout << "Is the input a palindrome? ";
  std::getline(std::cin, input);

  // lowercase input
  std::transform(input.begin(), input.end(), input.begin(), ::tolower);

  // remove non-alphanumeric
  input = std::regex_replace(input, std::regex(R"([^a-z0-9])"), "");

  // check for palindrome
  if (std::equal(input.begin(), input.begin() + input.size() / 2,
                 input.rbegin()))
    std::cout << "Yes\n";
  else
    std::cout << "No\n";
}
```

Summary
- You should still learn the manual ++/-- method—understanding the low-level behavior makes STL functions less magical and more powerful.
- But once you get it, use std::equal. It’s cleaner, easier to read, and less error-prone. Let the STL do the pointer math.
