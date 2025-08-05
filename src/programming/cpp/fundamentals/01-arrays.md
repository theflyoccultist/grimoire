## Arrays

```cpp
#include <cstdio>
#include <iostream>

using namespace std;

int main() {
  // int A[5];
  // A[0] = 12;
  // A[1] = 15;
  // A[2] = 25;
  // initializing aray elements individually

  // int A[10] = {2, 4, 8, 10, 12, 14};
  // the rest of the elements will be filled with zeros
  //which is guaranteed behavior in the C++ standard.

  // int b[10] = {0};
  // don't forget to assign {0} so the array is filled with 0
  // and not garbage values.

  // for (int i = 0; i < 10; i++) {
  //   cout << A[i] << endl;
  // }
  // basic loop

  int n;
  cout << "enter size";
  cin >> n;
  int A[n];
  A[0] = 2;
  // will give garbage values after A[0]

  for (int x : A) {
    cout << x << endl;
  }
  // a more concise way to write a loop

  // cout << sizeof(A) << endl;
  // shows how much size the array occupies in memory
  // cout << A[1] << endl;
  // printf("%d\n", A[2]);
  // classic C style prints works here too

  return 0;
}
```
