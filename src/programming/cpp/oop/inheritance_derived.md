## C++ Inheritance and Derived Classes

### The Inheritance Mechanism
- Allows deriving new classes from existing base classes.
- Reuses existing code, avoiding tedious and error-prone duplication.
- Derived classes extend or alter base class functionality.
- Creates a hierarchy of related types sharing code and interface.

---

### Base Class: `student`
```cpp
#include <cstring>
#include <iostream>

class student {
public:
  enum year { fresh, soph, junior, senior, grad };
  student(char *nm, int id, double g, year x);
  void print() const;

protected:
  int student_id;
  double gpa;
  year y;
  char name[30];
};
```

### Derived Class: `grad_student`
```cpp
class grad_student : public student {
public:
  enum support { ta, ra, fellowship, other };
  grad_student(char *nm, int id, double g, year x, support t, char *d, char *th);
  void print() const;

protected:
  support s;
  char dept[10];
  char thesis[80];
};
```

---

### Constructors
```cpp
student::student(char *nm, int id, double g, year x)
    : student_id(id), gpa(g), y(x) {
  strcpy(name, nm);
}

grad_student::grad_student(char *nm, int id, double g, year x, support t,
                           char *d, char *th)
    : student(nm, id, g, x), s(t) {
  strcpy(dept, d);
  strcpy(thesis, th);
}
```

- `grad_student` constructor invokes the base `student` constructor.
- Base class constructed first.
- `student_id` and `gpa` are `protected`, so accessible to derived class.

---

### Print Functions
```cpp
void student::print() const {
  std::cout << name << " , " << student_id << " , " << y << " , " << gpa << std::endl;
}

void grad_student::print() const {
  student::print();
  std::cout << dept << " , " << s << std::endl << thesis << std::endl;
}
```

- `grad_student::print` reuses `student::print` and adds extra info.

---

### `main()` Function
```cpp
int main() {
  student s("Mae Pohl", 100, 3.425, student::fresh), *ps = &s;
  grad_student gs("Morris Pohl", 200, 3.2564, student::grad, grad_student::ta,
                  "Pharmacy", "Retail Pharmacies"), *pgs;
  
  ps->print();  // student::print
  ps = pgs = &gs;
  ps->print();  // still student::print due to pointer type
  pgs->print(); // grad_student::print
}
```

- Demonstrates polymorphism via pointer to base class.
- `ps` points to both `student` and `grad_student` objects.
- Without `virtual`, the base class's `print()` is called.
- `pgs` calls the derived version because it's typed as `grad_student*`.

---

### Benefits Recap
- Reuse of tested code.
- Reflects domain relationships.
- Allows treating derived types as base types.
- Simpler, more maintainable code.

---

**Reminder**: Mark that `print()` function as `virtual` if you want actual polymorphism, otherwise it’s just pretending like your last situationship.

