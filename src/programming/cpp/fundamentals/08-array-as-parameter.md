## Array as Parameter

```cpp
// array as parameter
#include <iostream>

using namespace std;
// arrays can only be passed by address
// brackets: pointer to an array
// n is passed by value
// int *A as parameter: valid too, but can point to anything
// int A[] as parameter: can only be an array

void fun(int *A, int n) {
  // you cannot use a range for loop here because the parameter is a pointer
  // for (int a : A)
  //   cout << a << endl;

  A[0] = 15; // because it is a pointer, this will work

  for (int i = 0; i < n; i++)
    cout << A[i] << endl;
}

int main() {
  int A[] = {2, 4, 6, 8, 10};
  int n = 5;

  fun(A, n);
  for (int x : A)
    cout << x << " ";

  return 0;
}
```

### Dynamically sized array

```cpp
// create an array inside a function and return its address
// demo of a dynamicaly sized array
#include <iostream>

using namespace std;

// int [] is not supported by the latest compilers
int *fun(int size) {
  int *p;
  p = new int[size];

  for (int i = 0; i < size; i++)
    p[i] = i + 1;

  return p;
}

int main() {
  int *ptr, sz = 7;

  ptr = fun(sz);

  for (int i = 0; i < sz; i++)
    cout << ptr[i] << endl;

  delete[] ptr;
  return 0;
}
```

