## 🧙‍♀️ C++ Class Inheritance & Polymorphism – With a 3D Geometry Twist

### 🧱 Base Class – Point2D

```cpp
class Point2D {
protected:
    float x, y;

public:
    Point2D(float x = 0, float y = 0) : x(x), y(y) {}

    virtual void print() const {
        std::cout << "Point2D(" << x << ", " << y << ")" << std::endl;
    }

    virtual ~Point2D() {} // Always virtual destructor for polymorphic base
};
```

* `protected`: accessible to subclasses, but hidden from the outside world like a locked diary.
* `virtual`: magic keyword that enables polymorphism (late binding).
* Destructor is virtual so your objects don’t leave memory corpses behind. 👻

---

### 🌌 Subclass – Point3D

```cpp
class Point3D : public Point2D {
    float z;

public:
    Point3D(float x = 0, float y = 0, float z = 0) : Point2D(x, y), z(z) {}

    void print() const override {
        std::cout << "Point3D(" << x << ", " << y << ", " << z << ")" << std::endl;
    }
};
```

* `public` inheritance: “yes, I’m extending the public interface, not hiding it.”
* `override`: optional, but makes the compiler scream if you mess up a virtual override (bless her).

---

### 🧪 Polymorphism in Action

```cpp
void describePoint(const Point2D& p) {
    p.print();
}

int main() {
    Point2D p2(1, 2);
    Point3D p3(3, 4, 5);

    describePoint(p2); // prints Point2D(1, 2)
    describePoint(p3); // prints Point3D(3, 4, 5) – polymorphism magic!
}
```

* This is the power move: a `Point2D` reference holds a `Point3D` object, but still calls the right method.
* No casting. No mess. Just vibes. 🎩✨

---

### 💀 What If You Forget `virtual`?

If you remove `virtual` from `Point2D::print()`, then the method won’t get overridden at runtime — you’ll always call the base version. This is what we call... *a tragic plot twist.*

---

### 🔮 When to Use This

| Use Case                                                      | Inheritance?                      |
| ------------------------------------------------------------- | --------------------------------- |
| You need multiple related types that behave differently       | **Yes**                           |
| You want to generalize with base class pointers or references | **Yes**                           |
| You’re sharing behavior across *unrelated* classes            | **No**, use composition/templates |
| You don’t want to deal with destructor landmines              | **Use smart pointers**, queen     |

