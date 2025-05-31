# C++ OOP Cheatsheet 💀

C++ is not a fully object-oriented language like Java—it gives you the choice of using OOP, procedural, or even template-based metaprogramming. However, when you do use OOP, C++ expects you to take responsibility (i.e., manual memory management, virtual destructors, and explicit inheritance rules).

## Basic OOP Program

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

### Basic Class Definition: Car

Key Takeaways

1. **Encapsulation**
- brand and speed are private, meaning they cannot be accessed outside of the class.
- Access is provided through getter functions (getBrand(), getSpeed()).

2. **Constructors & Initialization Lists**
- Car(std::string b, int s) : brand(b), speed(s) {} → This is a constructor with an initializer list.
- Instead of assigning values inside {} manually, we use direct initialization, which is faster and cleaner.

3. **Virtual Destructor (~Car())**
- Why virtual? So that if you delete a SportsCar through a Car*, it calls the correct destructor.
- Without virtual, only Car's destructor would run, and SportsCar's destructor wouldn’t execute.

4. **Operator Overloading (<<)**
- We define friend std::ostream& operator<<(...) to allow std::cout << myCar.
- Friend functions allow non-member functions to access private class members.

### Inheritance: SportsCar Extends Car

Key Takeaways

1. **Single Inheritance (class SportsCar : public Car)**
- SportsCar inherits all properties of Car but can add new behavior (turboBoost()).
- SportsCar(std::string b, int s) : Car(b, s) calls the base class (Car) constructor.

2. **Destructor Handling**
- Why is the destructor not virtual? Since Car already has a virtual destructor, it ensures that deleting a SportsCar object correctly calls both destructors.
- Destruction order: SportsCar's destructor runs first, then Car's.

### The main() Function

Key Takeaways

1. **Automatic Object Lifetime Management**
- myCar and mySportsCar are stack-allocated.
- No need for delete because destructors run automatically when they go out of scope.

2. **Calling Methods on Objects**
- myCar.accelerate(); increases the speed by 10.
- mySportsCar.turboBoost(); is only available in SportsCar.

3. **Overloaded << Operator Works as Expected**
- `std::cout << myCar << std::endl;` → Calls the overloaded << function.

## OOP with Parameterized Constructors & Operator Overloading in C++

This program introduces parameterized constructors and expands on operator overloading, reinforcing core C++ OOP concepts. While it follows the same fundamental principles as the Car example, the use of constructors and the + operator overload adds complexity.

```cpp
#include <iostream>
using namespace std;

class Point {
private:
    double x, y;

public:
    // Default constructor
    Point() : x(0.0), y(0.0) {}

    // Parameterized constructor
    Point(double xVal, double yVal) : x(xVal), y(yVal) {}

    // Getter for x
    double getX() const {
        return x;
    }

    // Setter for x
    void setX(double v) {
        x = v;
    }

    // Getter for y
    double getY() const {
        return y;
    }

    // Setter for y
    void setY(double v) {
        y = v;
    }

    // Overload the + operator
    Point operator+ (const Point& p) const {
        return Point(x + p.x, y + p.y);
    }

    // Overload the << operator for output
    friend ostream& operator << (ostream& out, const Point& p) {
        out << "(" << p.x << ", " << p.y << ")";
        return out;
    }
};

int main() {
    Point a(3.5, 2.5), b(2.5, 4.5), c;
    cout << "a = " << a << " b = " << b << endl;
    c = a + b;
    cout << "sum = " << c << endl;
    return 0;
}
```

### Class Definition: Point

Key Takeaways

```cpp
Point() : x(0.0), y(0.0) {}
```

1. **Default Constructor (Point())**
- This constructor initializes x and y to 0.0 by default.
- Why use an initializer list (: x(0.0), y(0.0)) instead of assignment in {}?
    - Faster: Directly initializes members instead of assigning values later.
    - Mandatory for const or reference members (not in this example, but useful elsewhere).

2. **Parameterized Constructor (Point(double xVal, double yVal))**

```cpp
Point(double xVal, double yVal) : x(xVal), y(yVal) {}
```

Allows creating a Point object with custom values.

3. **Getter & Setter Methods**

```cpp
double getX() const { return x; }
void setX(double v) { x = v; }
```

- const after getX() → Ensures getX() does not modify the object.
- Setters allow modification, while getters ensure read-only access.

4. **Operator Overloading**

- Overloading the + Operator

```cpp
Point operator+ (const Point& p) const {
    return Point(x + p.x, y + p.y);
}
```

- Allows adding Point objects like a + b.
- Why return a Point object?
  - Instead of modifying `this`, it creates a new Point.

Example:
```cpp
c = a + b;
```
Equivalent to `c = Point(a.getX() + b.getX(), a.getY() + b.getY());`

- Overloading the << Operator (Friend Function)

```cpp
friend ostream& operator << (ostream& out, const Point& p) {
    out << "(" << p.x << ", " << p.y << ")";
    return out;
}
```

Allows printing Point objects using:
```cpp
cout << a;  // Outputs (3.5, 2.5)
```

Why is operator<< a friend function?
- It needs access to private members (x and y).
- Cannot be a member function because the first parameter must be ostream&.

### The main() Function

```cpp
int main() {
    Point a(3.5, 2.5), b(2.5, 4.5), c;
    cout << "a = " << a << " b = " << b << endl;
    c = a + b;
    cout << "sum = " << c << endl;
    return 0;
}
```

1. What Happens Here?

- Objects are created:

```cpp
Point a(3.5, 2.5), b(2.5, 4.5), c;
```

- a is initialized with (3.5, 2.5), b with (2.5, 4.5), and c is (0.0, 0.0) by default.

Operator overloading is used:
```cpp
c = a + b;
```

- Triggers operator+() and stores the result in c.

- Objects are printed using operator<<:
```cpp
cout << "sum = " << c << endl;
```

- Calls operator<<() to format the output.

Output:
```cpp
a = (3.5, 2.5) b = (2.5, 4.5)
sum = (6, 7)
```

## Deep Copy Constructor

C++ has a doubly linked list in the std library, but you should know how they are implemented under the hood.

### Why Do We Need a Deep Copy Constructor?

By default, when you copy an object in C++, the compiler performs a shallow copy, meaning:

- It copies the memory addresses instead of duplicating the data itself.
- If the copied object modifies the data, the original object also changes because they share the same memory.
- When one object is destroyed, the other might point to an invalid memory location (dangling pointers).

To avoid this nightmare, we manually implement a deep copy constructor. This ensures: 
- Each object gets its own separate copy of the data.
- Deleting one object doesn’t affect the others.
- No accidental shared memory corruption.

```cpp
#include <iostream>
using namespace std;

class list_element {
public:
    int d;
    list_element* next;

    list_element(int n = 0, list_element* ptr = nullptr) : d(n), next(ptr) {}
};

class list {
public:
    list() : head(nullptr), cursor(nullptr) {}
    ~list();  // Destructor to free memory
    list(const list& lst);  // Copy constructor

    void prepend(int n);    // Insert at front value n
    int get_element() { return cursor->d; }
    void advanced() { cursor = cursor->next; }
    void print();

private:
    list_element* head;
    list_element* cursor;
};

// Destructor implementation
list::~list() {
    while (head != nullptr) {
        list_element* temp = head;
        head = head->next;
        delete temp;
    }
}

// Deep copy constructor
list::list(const list& lst) {
    if (lst.head == nullptr) {
        head = nullptr;
        cursor = nullptr;
    } else {
        cursor = lst.head;
        list_element* h = new list_element(cursor->d);
        list_element* previous = h;
        head = h;
        cursor = cursor->next;

        while (cursor != nullptr) {
            h = new list_element(cursor->d);
            previous->next = h;
            previous = h;
            cursor = cursor->next;
        }

        cursor = head;
    }
}

void list::prepend(int n) {
    if (head == nullptr)  // empty list case
        cursor = head = new list_element(n, head);
    else    // add to front-chain
        head = new list_element(n, head);
}

void list::print() {
    list_element* h = head;
    while (h != nullptr) {
        cout << h->d << ", ";
        h = h->next;
    }
    cout << "###" << endl;
}

int main() {
    list a, b;
    a.prepend(9); a.prepend(8);
    cout << "list a" << endl;
    a.print();

    // Use the copy constructor
    list c = a;
    cout << "list c (copy of a)" << endl;
    c.print();

    for (int i = 0; i < 40; ++i)
        b.prepend(i * i);
    cout << "list b" << endl;
    b.print();

    return 0;
}
```

### Class Definition

```cpp
#include <iostream>
using namespace std;

class list_element {
public:
    int d;
    list_element* next;

    list_element(int n = 0, list_element* ptr = nullptr) : d(n), next(ptr) {}
};
```

Each list_element stores:
- d (data).
- next (pointer to the next element).

#### The `list` class

```cpp
class list {
public:
    list() : head(nullptr), cursor(nullptr) {}
    ~list();  // Destructor to free memory
    list(const list& lst);  // Copy constructor

    void prepend(int n);    // Insert at front value n
    int get_element() { return cursor->d; }
    void advanced() { cursor = cursor->next; }
    void print();

private:
    list_element* head;
    list_element* cursor;
};
```

- Encapsulates a linked list.
- Implements deep copy via list(const list& lst).
- Destructor (~list()) manually frees memory.

### Destructor: Preventing Memory leaks

```cpp
list::~list() {
    while (head != nullptr) {
        list_element* temp = head;
        head = head->next;
        delete temp;  // Free each element
    }
}
```

- Ensures no memory leaks when an object is destroyed.
- Deletes every node one by one.
- Without this, dynamically allocated list_elements would never be freed.

### The Deep Copy Constructor

```cpp
list::list(const list& lst) {
    if (lst.head == nullptr) {
        head = nullptr;
        cursor = nullptr;
    } else {
        cursor = lst.head;
        list_element* h = new list_element(cursor->d);  // Create first element
        list_element* previous = h;
        head = h;
        cursor = cursor->next;

        while (cursor != nullptr) {
            h = new list_element(cursor->d);  // Deep copy each node
            previous->next = h;
            previous = h;
            cursor = cursor->next;
        }

        cursor = head;
    }
}
```

How It Works

- Creates a new list_element for each node in the original list.
- Does NOT reuse pointers from the old list.
- Ensures the new object is an independent copy.
What Happens If We Didn’t Do This?

```cpp
list c = a;  // Calls copy constructor
```
    
- Without a deep copy, c would just reuse a's pointers.
- Modifying c would modify a, which is unintended behavior.
- Deleting c would leave a with dangling pointers, causing undefined behavior.

### Other Methods

- **Prepend (Insert at Front)**

```cpp
void list::prepend(int n) {
    if (head == nullptr)  // Empty list case
        cursor = head = new list_element(n, head);
    else    // Add new element at the front
        head = new list_element(n, head);
}
```

- Creates a new list_element and links it to the front of the list.
- If the list is empty, initializes cursor.

- **Print the List**

```cpp
void list::print() {
    list_element* h = head;
    while (h != nullptr) {
        cout << h->d << ", ";
        h = h->next;
    }
    cout << "###" << endl;
}
```

- Iterates over the list and prints each value.
- Stops when nullptr is reached.

- **The main() Function**

```cpp
int main() {
    list a, b;
    a.prepend(9); a.prepend(8);
    cout << "list a" << endl;
    a.print();

    // Use the copy constructor
    list c = a;
    cout << "list c (copy of a)" << endl;
    c.print();

    for (int i = 0; i < 40; ++i)
        b.prepend(i * i);
    cout << "list b" << endl;
    b.print();

    return 0;
}
```

- Creates multiple lists (a, b, c).
- Copies a into c using the deep copy constructor.
- Adds elements to b and prints everything.

### Expected Output

```cpp
list a
8, 9, ###
list c (copy of a)
8, 9, ###
list b
1521, 1444, 1369, ..., 0, ###
```

Why is list c identical to list a?
- Because it was deep copied, not shallow copied.
- Modifying c will not affect a, proving that they are independent lists.

C++ Rule of Three (or Five)

If a class manages dynamic memory, you MUST define these manually:

- Copy Constructor (list(const list&))
- Copy Assignment Operator (operator=)
- Destructor (~list())
- (Optional) Move Constructor (list(list&&))
- (Optional) Move Assignment Operator (operator=(list&&))

Without these, you get shallow copies, which can lead to: 
- Memory leaks
- Double deletion errors
- Undefined behavior
