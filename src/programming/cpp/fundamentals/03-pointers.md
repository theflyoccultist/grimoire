## Pointers

### Basic assignment and referencing

```cpp
#include <iostream>

using namespace std;

int main() {
  int a = 10;
  int *p; // declaration
  p = &a; // assign to address a

  cout << a << endl;
  // cout << *a; : compiler won't understand, because a is an int and not a pointer
  cout << "using pointer " << *p << &a << endl;
  // *p : dereferencing, &a outputs the memory address

  return 0;
}
```

### Pointer to an array

```cpp
#include <iostream>

using namespace std;

int main() {
  int A[5] = {2, 4, 6, 8, 10};
  int *p;
  p = A; // you don't have to give ampersand (&) when you are giving an array
         // name to the pointer
  int *q;
  // q=&A; compile error
  q = &A[0]; // this will output the same result as p = A

  for (int i = 0; i < 5; i++)
    cout << A[i] << endl; // p[i] works too

  return 0;
}
```

### Pointer: Heap Allocation

```cpp
#include <cstdlib>
#include <iostream>

using namespace std;

int main() {
  int *p;
  // p = (int *)malloc(5 * sizeof(int)); // access the heap memory, C style
  p = new int[5]; // C++ style

  // unique_ptr<int[]> p = make_unique<int[]>(5);
  // smart pointer alternative, which would
  // automatically clean up once it goes out of scope

  p[0] = 10;
  p[1] = 15;
  p[2] = 14;
  p[3] = 21;
  p[4] = 31;

  for (int i = 0; i < 5; i++)
    cout << p[i] << endl;

  // free(p); // used in C
  delete[] p; // when you have finished using the heap memory
              // you should free it

  return 0;
}
```

### In this example, all data types are padded to have the same number of bytes

```cpp
#include <cstdlib>
#include <iostream>

using namespace std;

struct Rectangle {
  int length;
  int breadth;
};

int main() {
  int *p1;
  char *p2;
  float *p3;
  double *p4;
  struct Rectangle *p5;

  cout << sizeof(p1) << endl;
  cout << sizeof(p2) << endl;
  cout << sizeof(p3) << endl;
  cout << sizeof(p4) << endl;
  cout << sizeof(p5) << endl;
  // all of them are padded at 8 bytes

  return 0;
}
```
