# C++ OOP Overview 💀

C++ is not a fully object-oriented language like Java—it gives you the choice of using OOP, procedural, or even template-based metaprogramming. However, when you do use OOP, C++ expects you to take responsibility (i.e., manual memory management, virtual destructors, and explicit inheritance rules).

So welcome to the C++ OOP section, and be prepared for madness.

- [Converting a C program to C++ OOP](c-to-cpp.md)
- [Monolithic Program to Modular C++ Class](monolithic-to-modular.md)
- [OOP with Scope Resolution Operators](scope-resolution.md)
- [Operator Overloading](ostream.md)
- [Deep Copy Constructor](deep-copy.md)
- [Templates](templates.md)
- [More About Templates](templates2.md)
- [Inheritance and derived classes](inheritance_derived.md)
- [Inheritance and Polymorphism](inheritance_polymorphism.md)
- [Virtual Function Behavior](virtual.md)
- [Shapes with OOP](shapes.md)
- [Move Semantics](move.md)
- [Move Semantics pt.2](move2.md)

## Introduction: a basic Program with an OOP structure

```cpp
#include <iostream>
#include <string>

class Car {
private:
    std::string brand;
    int speed;

public:
    // Constructor
    Car(std::string b, int s) : brand(b), speed(s) {
        std::cout << brand << " Car is being created.\n";
    }

    // Virtual destructor
    virtual ~Car() {
        std::cout << brand << " Car is being destroyed.\n";
    }

    // Method
    void accelerate() {
        speed += 10;
        std::cout << brand << " is going " << speed << " km/h.\n";
    }

    // Getter for brand
    std::string getBrand() const {
        return brand;
    }

    // Getter for speed
    int getSpeed() const {
        return speed;
    }

    // Operator overloading
    friend std::ostream& operator<<(std::ostream& os, const Car& c) {
        os << c.brand << " at " << c.speed << " km/h";
        return os;
    }
};

// Single inheritance
class SportsCar : public Car {
public:
    SportsCar(std::string b, int s) : Car(b, s) {
        std::cout << b << " SportsCar is being created.\n";
    }

    void turboBoost() {
        std::cout << "Boosting the " << getBrand() << "!\n";
    }

    // Destructor
    ~SportsCar() {
        std::cout << getBrand() << " SportsCar is being destroyed.\n";
    }
};

int main() {
    Car myCar("beetle", 50);
    myCar.accelerate();
    myCar.accelerate();

    SportsCar mySportsCar("Ferrari", 100);
    mySportsCar.accelerate();
    mySportsCar.turboBoost();

    // Using the overloaded << operator to print Car objects
    std::cout << myCar << std::endl;
    std::cout << mySportsCar << std::endl;

    return 0;
}
```


