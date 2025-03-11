### A Basic Program to Convert Miles to Kilometers

```cpp
#include <iostream>
#include <limits>
using namespace std;

const double m_to_km = 1.60934;

// Inline function to convert miles to kilometers
inline double convert(double miles) {
    return miles * m_to_km;
}

int main() {
    double miles = -1;

    while (miles != 0) {
        cout << "Input distance in miles (0 to quit): ";
        cin >> miles;

        // Validate input
        if (cin.fail()) {
            cin.clear(); // Clear the error flag
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Ignore bad input
            cout << "Invalid input. Please enter a number." << endl;
            continue;
        }

        if (miles == 0) break;

        cout << miles << " miles is equal to " << convert(miles) << " kilometers." << endl;
    }

    cout << "Bye!" << endl;
    return 0;
}
```

### A Simple Program to Calculate A Sum

```cpp
// C to C++ conversion

#include <iostream>
#include <vector>

const int N = 40;

inline void sum(int *p, int n, const std::vector<int>& d) {
    *p = 0;
    for (int i = 0; i < n; ++i) {
        *p = *p + d[i];
    }
}

int main() {
    int accum = 0;
    std::vector<int> data(N);

    for (int i = 0; i < N; ++i) {
        data[i] = i;
    }
    sum(&accum, N, data);

    std::cout << "Sum is: " << accum << std::endl;
    return 0;
}
```

### Example of Template Programming

```cpp
// Template programming

#include <iostream>
#include <vector>

const int N = 40;

template <typename T>
T substract(const T data[], int n, T s = 0) {
    for (int i = 0; i < n; ++i) {
        s = s - data[i];
    }
    return s;
}

int main() {
    std::cout << "template for substract()" << std::endl;

    int a[] = {1,2,3};
    double b[] = {2.1, 2.2, 2.3};

    std::cout << substract(a, 3) << std::endl;
    std::cout << substract(b, 3) << std::endl;
    
    return 0;
}
```

### Another Example Of Templating

```cpp
#include <iostream>

template <class T>
class Summable {
public:
    T sum(const T data[], int size, T s = 0) {
        for (int i = 0; i < size; ++i) {
            s += data[i];
        }
        return s;
    }
};

int main() {
    Summable<int> intSummable;
    int intData[] = {1, 2, 3, 4, 5};
    int intSum = intSummable.sum(intData, 5);
    std::cout << "Sum of int array: " << intSum << std::endl;

    Summable<double> doubleSummable;
    double doubleData[] = {1.1, 2.2, 3.3, 4.4, 5.5};
    double doubleSum = doubleSummable.sum(doubleData, 5);
    std::cout << "Sum of double array: " << doubleSum << std::endl;

    return 0;
}
```

