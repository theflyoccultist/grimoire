# Lambda expressions: `for_each()` function

Lambda expressions:
- Derived from Lisp
- Previously `for_each()` needs a function
- Will use C++11 idea: write an unnamed function in place: a lambda expression

You can use it, fall in love with it even if you don't have Lisp experience - or in more modern terms, Haskell.

#### Old style `for_each()`

```cpp
#include <algorithm>
#include <iostream>
#include <ostream>
#include <vector>

void incr(int &i) {
  static int n = 1;
  i = n++;
}
void outvec(int i) { std::cout << i << "\n"; }

int main() {
  std::vector<int> v(6);
  std::for_each(v.begin(), v.end(), incr);
  std::for_each(v.begin(), v.end(), outvec);
}
```

#### Lambda in C++11

- Unnamed function
```cpp
[](int i) { cout << i << "\n"; }
```
- `[]` Goes where the function object is required.
- `(int i)` Parameters
- `{ cout << i << "\n"; }` Executable

`[](int n) { return n * 5.5; }` deduces the return value as double
`[](int n) -> int { return ++n; }` explicit type declaration.

```cpp
#include <algorithm>
#include <iostream>
#include <ostream>
#include <vector>

void incr(int &i) {
  static int n = 1;
  i = n++;
}
auto outvec = [](int i) { std::cout << i << "\n"; };

// auto outvec: (lambda) = [](int i) -> void { std::cout << i << "\n"; };

int main() {
  std::vector<int> v(6);
  std::for_each(v.begin(), v.end(), incr);
  std::for_each(v.begin(), v.end(), outvec);
}
```

#### Bonus from the Void If you are still here: Chaining Lambdas

- Defining a lambda
- That returns another lambda
- That closes over `factor` 

```cpp
#include <iostream>

int main() {
  // make_multiplier is a function (a lambda) that takes one int: factor
  auto make_multiplier = [](int factor) {
  
    // It returns another function - also a lambda!
    // That lambda takes int x and multiplies it by factor
    return [factor](int x) {
      return x * factor; 
    };
  };
  
  // times5 is literally this: [](int x) { return x * 5; }
  auto times5 = make_multiplier(5);

  // This is calling 10 * 5 -> 50
  std::cout << times5(10) << "\n";
}
```

Expected output: 50
