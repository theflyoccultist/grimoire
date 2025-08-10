# OOP with Scope Resolution Operators

Scope resolutions allows the programmers to define functions outside of the class, while still inheriting its properties.

```cpp

#include <iostream>

class Rectangle {
private:
  int length;
  int breadth;

public:
  Rectangle() {
    length = 0;
    breadth = 0;
  }
  Rectangle(int l, int b);
  int area();
  int perimeter();

  void setLength(int l) { length = l; }
  void setBreadth(int b) { breadth = b; }
  int getLength() { return length; }
  int getBreadth() { return breadth; }

  ~Rectangle() { std::cout << "Destructor\n"; }
};

Rectangle::Rectangle(int l, int b) {
  length = l;
  breadth = b;
}

int Rectangle::area() { return length * breadth; }
int Rectangle::perimeter() { return 2 * (length + breadth); }

int main() {
  Rectangle r(10, 5);
  std::cout << r.area() << "\n";
  std::cout << r.perimeter() << "\n";
  r.setLength(20);
  std::cout << r.getLength() << "\n";
  return 0;
}

```
