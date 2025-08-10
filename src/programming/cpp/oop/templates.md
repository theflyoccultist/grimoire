# Templates

Templates in C++ are a nice feature that will prevent you from writing the exact same function for different data types. You define a generic `T` type and you can reuse the same function for `int`, `double` and `float`, even `char` without copy pasting!

```cpp

#include <iostream>

using namespace std;

template <class T> class Arithmetic {
private:
  T a;
  T b;

public:
  Arithmetic(T a, T b);
  T add();
  T sub();
};

template <class T> Arithmetic<T>::Arithmetic(T a, T b) {
  this->a = a;
  this->b = b;
}

template <class T> T Arithmetic<T>::add() {
  T c;
  c = a + b;
  return c;
}

template <class T> T Arithmetic<T>::sub() {
  T c;
  c = a - b;
  return c;
}

int main() {
  Arithmetic<int> ar(10, 5);
  Arithmetic<float> ar2(15.2, 7.5);

  cout << "add " << ar.add() << endl;
  cout << "sub " << ar.sub() << endl;

  cout << "add " << ar2.add() << endl;
  cout << "sub " << ar2.sub() << endl;

  return 0;
}

```
