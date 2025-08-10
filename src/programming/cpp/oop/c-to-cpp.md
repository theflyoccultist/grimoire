# Converting a C program to a C++ class

Those two programs do the same thing. It is useful to know how to convert programs between each other.

### C program

```c
struct Rectangle {
  int length;
  int breadth;
};

void initialize(struct Rectangle *r, int l, int b) {
  r->length = l;
  r->breadth = b;
}

int area(struct Rectangle r) { return r.length * r.breadth; }

void changeLength(struct Rectangle *r, int l) { r->length = l; }

int main() {
  struct Rectangle r;

  initialize(&r, 10, 5);
  area(r);
  changeLength(&r, 20);
}
```

### C++ OOP

```cpp
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

  void changeLength(int l) { length = l; }
};

int main() {
  Rectangle r(10, 5);

  r.area();
  r.changeLength(20);
}
```
