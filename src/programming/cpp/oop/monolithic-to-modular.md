# Monolithic Program to Modular C++ Class

### Monolithic:

```cpp

#include <iostream>

using namespace std;

int main() {
  int length = 0, breadth = 0;
  cout << "Enter Length and Breadth: ";
  cin >> length >> breadth;

  int area = length * breadth;
  int peri = 2 * (length + breadth);

  cout << "Area = " << area << "\n" << "Perimeter = " << peri << "\n";

  return 0;
}

```

### Modular

```cpp

#include <iostream>

using namespace std;

class Rectangle {
private:
  int length;
  int breadth;

public:
  Rectangle(int l, int b) {
    length = l;
    breadth = b;
  }

  int area() { return length * breadth; }

  int perimeter() {
    int p = 0;
    p = 2 * (length + breadth);
    return p;
  }
};

int main() {
  int l = 0, b = 0;
  cout << "Enter Length and Breadth: ";
  cin >> l >> b;

  Rectangle r = {l, b};

  int a = r.area();
  int peri = r.perimeter();

  cout << "Area = " << a << "\n" << "Perimeter = " << peri << "\n";

  return 0;
}

```

There is nothing wrong using the monolithic method for small test programs. But if you ware planning to have a much larger code in the future, then start cutting up your program into smaller functions.
