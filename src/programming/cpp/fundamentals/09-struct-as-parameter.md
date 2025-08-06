## Struct as Parameter

```cpp
#include <cstdio>

struct Rectangle {
  int length;
  int breadth;
};

void fun(struct Rectangle *r) {
  r->length = 20;
  printf("Length %d \n Breadth %d \n", r->length, r->breadth);
}

int main() {
  struct Rectangle r = {10, 5};
  fun(&r);

  printf("Length %d \n Breadth %d \n", r.length, r.breadth);
  return 0;
}
```

### An example where one of the structs in the parameters is an array

```cpp
// When one of the parameters in struct is an array

#include <cstdio>

struct Rectangle {
  int length[4];
  int breadth;
};

void fun(struct Rectangle *r) {
  r->length[1] = 7;
  printf("Length %d \n Breadth %d \n", r->length[1], r->breadth);
}

int main() {
  struct Rectangle r = {{5, 3, 2, 10}, 5};
  fun(&r);

  printf("Length %d \n Breadth %d \n", r.length[1], r.breadth);
  return 0;
}
```

### Creating a struct in heap memory

```cpp
// creating a struct in heap

#include <iostream>

struct Rectangle {
  int length;
  int breadth;
};

struct Rectangle *fun() {
  struct Rectangle *p;
  p = new Rectangle;

  p->length = 15;
  p->breadth = 7;

  return p;
}

int main() {
  struct Rectangle *ptr = fun();

  std::cout << "length " << ptr->length << std::endl
            << "Breadth " << ptr->breadth << std::endl;

  delete ptr;

  return 0;
}
```
