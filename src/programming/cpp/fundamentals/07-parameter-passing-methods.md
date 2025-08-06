## Parameter Passing Methods

### Call by value

```cpp
#include <iostream>

using namespace std;

// This is a call by value mechanism
// The value of num1 and num2 will be copied in A and B respectively

// int add(int a, int b) {
//   int c;
//   c = a + b;
//
//   return c;
// }

// in this example a will change to 11 but num1 will remain 10
int add(int a) {
  a++;
  return a;
}

int main() {
  int num1 = 10, sum;

  sum = add(num1);

  cout << sum << endl;
  cout << num1 << endl;

  return 0;
}
```

### Call by address

```cpp
#include <iostream>

using namespace std;

// Example of call by address
// The parameters should be of type pointers
// When to use:
// - When you want a function to directly work upon the actual parameters
// - If you have some variable and want the same variable to be modified

void swap(int *x, int *y) {
  int temp;
  temp = *x;
  *x = *y;
  *y = temp;
}

int main() {
  int num1 = 10, num2 = 15;

  swap(&num1, &num2);

  cout << "first number" << num1 << endl;
  cout << "second number" << num2 << endl;

  return 0;
}
```

### Call by Reference

```cpp
#include <iostream>

using namespace std;

// Example of call by reference
// Supported by C++
// references are nicknames:
// - the compiler may implement them as a pointer
// - or an inline function

void swap(int &x, int &y) {
  int temp;
  temp = x;
  x = y;
  y = temp;
}

int main() {
  int num1 = 10, num2 = 15;

  swap(num1, num2);

  cout << "first number" << num1 << endl;
  cout << "second number" << num2 << endl;

  return 0;
}

```
