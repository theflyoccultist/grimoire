# Operator Overloading

This program introduces parameterized constructors and expands on operator overloading. In this case we allow `<<` to be used to print stuff out.

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
