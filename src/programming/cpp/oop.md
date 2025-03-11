### A Basic Example of OOP In C++

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

### Point

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

### Deep Copy Constructor

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