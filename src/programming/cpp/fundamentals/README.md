# A quick tour of the C++ fundamentals 💀

- [Arrays](01-arrays.md)
- [Structures](02-structures.md)
- [Pointers](03-pointers.md)
- [Referencing](04-referencing.md) 
- [Pointer to Struct](05-pointer_to_struct.md)
- [Functions](06-functions.md)
- [Parameter Passing Methods](07-parameter-passing-methods.md)
- [Array As Parameter](08-array-as-parameter.md)
- [Struct As Parameter](09-struct-as-parameter.md)

## Intro: A Basic Program to Convert Miles to Kilometers

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

1. **cin.fail() must be explicitly checked**
- If a user enters non-numeric input, cin enters an error state and stops working.
- Without cin.clear() and cin.ignore(), the program will enter an infinite loop or crash.
- C++ doesn’t do automatic input validation, so you must babysit it manually.

2. **What inline really does**
- inline suggests to the compiler "hey, just copy-paste this function where it's called instead of doing a full function call."
- This is only useful for very small functions (like our convert() function) because function calls have a small overhead.
- Modern compilers already optimize this automatically, so using inline manually is usually unnecessary.

## Intro 2: A Simple Program to Calculate A Sum

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

1. **Why is const int better than #define?**
- It has type safety (#define doesn’t care what type it is).
- It respects C++ scoping rules (macros don’t respect namespaces).
- Debuggers understand const variables, but they don’t track macros.

2. **Why use int *p instead of return?***
- This function modifies accum directly in memory via the pointer.
- This mimics how C functions typically modify values passed by reference.
- However, in modern C++, it’s cleaner to use int& p instead of int* p.

3. **Why pass std::vector<int>& d by const reference?**
- Prevents unnecessary copying of the entire vector.
- const ensures the function can’t modify d accidentally.
- Without const, passing a vector by reference (vector<int>& d) allows modifications.

4. **Why std::vector<int> instead of a plain array?**
- No need for malloc/free like in C.
- Dynamic resizing (though we’re not using it here).
- Memory safety: avoids out-of-bounds access if used properly.

5. **Why do we pass &accum instead of returning a value?**
- C++ style would be to return int instead of modifying via pointer.
- This is still very C-like, since we’re explicitly using pointer manipulation.
