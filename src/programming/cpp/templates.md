# Introduction to Templates in C++ 💀

Templates are one of C++’s most powerful and frightening features. They let you write generic code that can work with multiple data types without duplication. But they also have the potential to turn your code into an unreadable mess of cryptic compiler errors if misused.

In these examples, we’ll look at two ways templates are used:
- Function Templates – Making a single function that works with multiple types.
- Class Templates – Making a class that can handle multiple data types dynamically.


// Function templates: subtract()
```cpp
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

Key Takeaways

1. **template <typename T> – This is the template declaration.**
- T is a placeholder for any data type (int, double, float, etc.).
- When calling substract(), the compiler automatically replaces T with the correct type.

2. **Function works for multiple data types**
- substract(a, 3) works for int.
- substract(b, 3) works for double.

3. **Why templates instead of function overloading?**
- Without templates, you’d have to write separate functions for int, double, float, etc.
- Templates let you write the function once and use it for any compatible type.

4. **Is this just like inline?**
- No, but function templates can be inlined by the compiler if they are small.
- The compiler generates a separate function for each unique type used.
- This means substract<int> and substract<double> are compiled separately.

### Templates Part Two

```cpp
// Class Templates: Summable<T>
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

Key Takeaways

1. **template <class T> makes Summable<T> a generic class**
- This class works with any type that supports the += operator.
- We create Summable<int> and Summable<double> instances separately.

2. **Why use a class template instead of a function template?**
- If we only needed a single sum() function, a function template is fine.
- But if we wanted to add more operations (like multiplication, average, etc.), then a class template organizes everything better.

3. **How does the compiler handle this?**
- When you write Summable<int>, the compiler generates an int-specific version of the class.
- When you write Summable<double>, the compiler generates a separate double version.
