## 📐 C++ Shapes with OOP

### 🧠 Concept

In object-oriented design, **shapes** are abstractions made up of **points** and behaviors (like calculating area, or drawing). By using **inheritance** and **polymorphism**, we create a base `Shape` class and specialize it into specific geometric forms like `Triangle`, `Circle`, etc.

### 💡 Why Use Inheritance Here?

* Shared interface via base class: `Shape` defines what a shape *can do*.
* Specialization via subclasses: Each shape has its own way to draw and compute area.
* Allows dynamic polymorphism: store and manipulate shapes through base class pointers (`Shape*`), but still get the *actual* shape behavior.

### 🧱 Base Class: Shape

```cpp
class Shape {
public:
    virtual void draw() const = 0;
    virtual float area() const = 0;
    virtual ~Shape() {}
};
```

* Declares pure virtual methods = **abstract class**.
* No objects of `Shape` directly; it’s just a blueprint.
* Destructor is virtual to ensure correct cleanup when using base pointers.

---

### 🔺 Triangle

* Defined by 3 points.
* Area is computed using **Heron's formula**.
* Inherits from `Shape`.

---

### 🔵 Circle

* Defined by center + radius.
* Area is `πr²`.
* Also overrides `draw()` and `area()`.

---

### 🧪 Polymorphic Usage

```cpp
std::vector<Shape*> scene;
scene.push_back(new Triangle(...));
scene.push_back(new Circle(...));
for (Shape* s : scene) {
    s->draw();
    std::cout << s->area();
}
```

This allows us to treat all shapes *uniformly* while letting each class decide how to behave. That’s **real polymorphism energy**.

---

### Full code

```cpp
#include <iostream>
#include <math.h>
#include <vector>

struct Point2D {
  float x, y;
};

// virtual forces subclasses to implement
class Shape {
public:
  virtual void draw() const = 0;
  virtual float area() const = 0;
  virtual ~Shape() {}
};

class Triangle : public Shape {
  Point2D a, b, c;

  float distance(const Point2D &p1, const Point2D &p2) const {
    return std::hypot(p2.x - p1.x, p2.y - p1.y);
  }

public:
  Triangle(Point2D a, Point2D b, Point2D c) : a(a), b(b), c(c) {}

  void draw() const override {
    std::cout << "Drawing triangle between A, B, C.\n";
  }

  float area() const override {
    // Heron’s formula because we fancy
    float ab = distance(a, b);
    float bc = distance(b, c);
    float ca = distance(c, a);
    float s = (ab + bc + ca) / 2;
    return std::sqrt(s * (s - ab) * (s - bc) * (s - ca));
  }
};

class Circle : public Shape {
  Point2D center;
  float radius;

public:
  Circle(Point2D c, float r) : center(c), radius(r) {}

  void draw() const override {
    std::cout << "Drawing circle at (" << center.x << ", " << center.y
              << ") with radius " << radius << "\n";
  }

  float area() const override { return M_PI * radius * radius; }
};

int main() {
  std::vector<Shape *> scene;
  scene.push_back(new Triangle({0, 0}, {1, 0}, {0, 1}));
  scene.push_back(new Circle({0, 0}, 5));

  for (Shape *shape : scene) {
    shape->draw();
    std::cout << "Area: " << shape->area() << "\n";
  }

  // free memory
  for (Shape *shape : scene)
    delete shape;
}
```
