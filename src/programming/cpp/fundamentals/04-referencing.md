## Referencing

```cpp
#include <iostream>

using namespace std;

int main() {
  int a = 10;
  int &r = a;

  r = 25; // a becomes 25 as well
  // referencing doesn't consume memory, since it is not a pointer

  int b = 30;
  r = b; // this will also change a and r to 30

  cout << a << endl << r << endl;

  // r : variable
  // *r : store the address
  // &r : reference
}
```
