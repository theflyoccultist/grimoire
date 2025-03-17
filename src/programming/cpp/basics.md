# C++ Cheat Sheet 💀

## 1. Variables, Data Types & Initialization

C++ has multiple ways to declare variables, and some are better than others:

```cpp
int x = 10;  // Traditional C-style initialization
int y(20);   // Constructor-style initialization
int z{30};   // C++11 Uniform Initialization (safer, avoids narrowing conversions)

std::cout << x << " " << y << " " << z << std::endl;
```

Prefer {} (uniform initialization) because it avoids weird implicit conversions:

```cpp
double d{4.5};
int i{d};  // ❌ ERROR: Narrowing conversion not allowed!
```

## 2. Pointers and References

C++ inherits pointers from C, but adds references to make life slightly easier:

Pointers (Classic C-style)
```cpp
int a = 10;
int* ptr = &a;  // Pointer stores the memory address of 'a'

std::cout << *ptr << std::endl;  // Dereference the pointer (output: 10)
```

References (C++ Feature)
```cpp
int x = 42;
int& ref = x;  // Reference to x (alias)

ref = 50;  // Modifies x as well
std::cout << x << std::endl;  // Output: 50
```

Use references instead of pointers when:
- You don’t need null values.
- You don’t want to manually dereference things.

🚨 Pointers are still useful for dynamic memory allocation & function arguments that can be null.

## 3. Dynamic Memory (Heap Allocation)

C++ lets you manually allocate and deallocate memory with `new` and `delete` (but later you should use smart pointers).

```cpp
int* heapInt = new int(99);  // Allocate an int on the heap
std::cout << *heapInt << std::endl;  // Output: 99

delete heapInt;  // Free memory (or you'll have a memory leak)
```

🚨 Memory Management Rules
- Every new must have a corresponding delete.
- Every new[] (array allocation) must have a corresponding delete[].

```cpp
int* arr = new int[10];  // Allocating an array
delete[] arr;  // Use delete[] for arrays!
```

In modern C++, prefer std::vector or smart pointers instead of raw new/delete.

## 4. Functions: Pass by Value, Reference, and Pointer

### Pass by Value (Makes a Copy)

```cpp
void changeValue(int num) {
    num = 100;  // This only changes the local copy
}

int x = 5;
changeValue(x);
std::cout << x;  // Still 5 (copy was modified, not the original)
```

### Pass by Reference (Modifies Original)

```cpp
void changeRef(int& num) {
    num = 100;
}

int x = 5;
changeRef(x);
std::cout << x;  // Now it's 100
```

### Pass by Pointer (Also Modifies Original)

```cpp
void changePointer(int* num) {
    *num = 100;  // Dereferencing modifies the actual value
}

int x = 5;
changePointer(&x);
std::cout << x;  // Output: 100
```

- Use references when modification is required.
- Pass by value when you want a copy (not for large objects).
- Use pointers when passing optional values (nullable).

## 5. `const`: Read-Only Safety

`const` makes sure your variables can’t be modified accidentally.

```cpp
const int a = 10;  // Can’t change a
a = 20;  // ❌ ERROR!
```

`const` with Pointers

```cpp
const int* ptr = &a;  // Pointer to constant int (data is immutable)
int* const ptr2 = &a;  // Constant pointer (address is immutable)
const int* const ptr3 = &a;  // Both data and address are immutable
```

🚨 If something doesn’t need to change, mark it `const`!
(Especially function parameters, so you don’t accidentally modify them.)

## 6. Structs vs Classes

Structs in C++ are like classes, except their members are public by default.

```cpp
struct Point {
    int x, y;
};
```

```cpp
class Point {
public:
    int x, y;
};
```

- Use struct when you just need a simple data container.
- Use class when you need encapsulation, methods, and complex logic.

## 7. `enum` and `enum class`

C++ has two types of enums, but only one is safe.

### Traditional C-style Enum (Unsafe)

```cpp
enum Color { RED, GREEN, BLUE };
Color c = RED;
```

🚨 Problem: Color values are just ints, so they can accidentally mix with unrelated values.

### C++11 enum class (Scoped and Safer)

```cpp
enum class Color { RED, GREEN, BLUE };
Color c = Color::RED;
```

- Prevents name conflicts.
- Doesn’t implicitly convert to int.

## 8. Input & Output (Stream Handling)

#### Basic I/O

```cpp
#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello, " << name << "!" << endl;
}
```

🚨 Issue: cin >> name; only takes one word.

#### Reading Full Lines

```cpp
string fullName;
getline(cin, fullName);
```

## 9. Arrays & Vectors

#### C-Style Array

```cpp
int arr[5] = {1, 2, 3, 4, 5};
```

🚨 Problems: No size tracking, no bounds checking.

#### Modern Alternative: std::vector

```cpp
#include <vector>
std::vector<int> vec = {1, 2, 3, 4, 5};
vec.push_back(6);
std::cout << vec[2];  // Safe indexing
```

- Automatically resizes.
- Safer than raw arrays.

## 10. The `auto` Keyword

C++ lets you infer types automatically with auto:

```cpp
auto num = 42;  // Compiler infers int
auto pi = 3.14;  // Compiler infers double
auto word = "hello";  // Compiler infers const char*
```

- Good for readability, especially with long types.
- Avoid using auto everywhere, it reduces code clarity.

## Bonus: A Basic Program to Convert Miles to Kilometers

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

## Bonus: A Simple Program to Calculate A Sum

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


