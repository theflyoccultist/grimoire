## Structures

```cpp
#include <cstdio>
#include <iostream>

struct Rectangle {
  int length;
  int breadth;
  char x; // allocates 4 bytes but will only use 1 byte. It is called padding of
          // memory
};

// struct Rectangle {
//   int length;
//   int breadth;
// } r1, r2, r3;
// can also be declared like this

int main() {
  struct Rectangle r1 = {10, 5};

  r1.length = 15;
  r1.breadth = 7;
  // can be reassigned with the dot operator

  std::cout << r1.length << std::endl;
  std::cout << r1.breadth << std::endl;

  // printf("%lu\n", sizeof(r1));
}
```
