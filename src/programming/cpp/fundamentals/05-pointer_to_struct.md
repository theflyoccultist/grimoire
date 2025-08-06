## Pointer to Structure

```cpp
#include <iostream>
#include <stdlib.h>

using namespace std;

struct Rectangle {
  int length;
  int breadth;
};

int main() {
  Rectangle r = {10, 5};
  // in C++ you can strip "struct". but not in C
  cout << r.length << endl << r.breadth << endl;

  Rectangle *p = &r;
  cout << p->length << endl << p->breadth << endl;
  // pointer to a structure: dot operator cannot be used

  return 0;
}
```

### Creating a struct in heap

```cpp
#include <iostream>
#include <stdlib.h>

using namespace std;

struct Rectangle {
  int length;
  int breadth;
};

int main() {
  // how to create an object in heap
  Rectangle *p;
  // p = (struct Rectangle *)malloc(sizeof(struct Rectangle));
  // in C
  p = new Rectangle; // in C++

  p->length = 15;
  p->breadth = 7;

  cout << p->length << endl << p->breadth << endl;
  delete p;

  return 0;
}
```
