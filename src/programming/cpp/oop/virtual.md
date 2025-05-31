## C++ Virtual Function Behavior

### Virtual Function Selection
- Base classes typically define a `virtual` function.
- Derived classes override these functions.
- Pointer to base can point at base or derived class objects.
- Function selected depends on **object type**, not **pointer type**.
- If no derived override exists, the base class function is used.

### Virtual & Overloaded Function Selection
- Overloaded member functions are selected **at compile-time** based on signature.
- They can have different return types.
- Once a function is declared `virtual`, it stays virtual in derived classes.
- The `virtual` keyword is not required in the redefinition, but it's clearer if included.

---

### Example Code
```cpp
#include <iostream>
#include <ostream>

class B {
public:
  int i;
  virtual void print_i() const { std::cout << i << " inside B" << std::endl; }
};

class D : public B {
public:
  void print_i() const { std::cout << i << " inside D" << std::endl; }
};

int main() {
  B b;
  B *pb = &b; // point at a B object
  D f;

  f.i = 1 + (b.i = 1);
  pb->print_i(); // Call B::print_i()
  pb = &f;       // point at D object
  pb->print_i(); // Call D::print_i()
}
```

### Output
```
1 inside B
2 inside D
```

### Analysis
- First `pb->print_i()` calls `B::print_i()` because `pb` points to a `B` object.
- Second `pb->print_i()` calls `D::print_i()` because `pb` now points to a `D` object.
- Function selection happens **dynamically** at **runtime** based on the actual object.

---

### Object-Oriented Principles
- Abstract Data Types (ADTs), inheritance, and polymorphism allow treating different class objects through a common interface.
- Virtual functions enable run-time method resolution—**true polymorphism**.
- This dynamic dispatch is at the heart of OOP.

