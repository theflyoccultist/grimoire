# Functional Objects in STL Algorithms

- It's useful to have function objects to further leverage the STL library
- Numerical functions have built-in meaning using + or *, as well as user provided binary operators which could be passed in.
- Functors like `std::plus`, `std::minus`, `std::multiplies`, etc. are part of `<functional>`.
- `std::accumulate` takes a starting value and a binary operation to process each element.
- You can plug in your own class with `operator()` to accumulate however you want.
- It’s an elegant way to avoid lambda clutter in simple cases.

```cpp
#include <functional>
#include <iostream>
#include <numeric>

int main() {
  double v1[3] = {1.0, 2.5, 4.6}, sum;
  sum = std::accumulate(v1, v1 + 3, 0.0, std::minus<double>());
  std::cout << "sum = " << sum << "\n";
}
```

`Expected output: -8.1`

## Generator Object & Integration

#### 📝Function Object aka Functor

- `operator()` lets you treat an object like a function.
- This is **zero-parameter**, meaning it's called like `g()`; no arguments.
- Each call advances `x` and returns `x²`.

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

public:
  gen(double x_zero, double increment) : x(x_zero), incr(increment) {}
  double operator()() {
    x += incr;
    return x * x;
  }

private:
  double x, incr;
};
```

#### `std::generate()` + Functor

- `std::generate` takes a range and a function object.
- It calls `g()` `n` times, populating the vector with values like `(Δx)², (2Δx)², ...`.
- Then `accumulate` computes the average: approximating ∫x² dx.

```cpp
double integrate(gen g, int n) {
  std::vector<double> fx(n);
  std::generate(fx.begin(), fx.end(), g);
  return std::accumulate(fx.begin(), fx.end(), 0.0) / n;
}
```

This is basically doing numerical integration of `f(x) = x²` over `[Δx, 1]` by approximating the area under the curve using small slices.

#### Testing:

```cpp
int main() {
  const int n = 10000;

  gen g(0.0, 1.0 / n);
  std::cout << "Integration program x**2" << "\n";
  std::cout << integrate(g, n) << "\n";
}
```

#### Generator Objects with operator()()
- A generator object is a class that maintains state and returns a value on each call to `operator()`.
- Acts like a function but remembers where it left off.
- Commonly used in STL algorithms like `std::generate()`.

#### Usage in Numerical Integration
- Create a functor that simulates the progression of `x` in a function `f(x)`.
- Call it repeatedly to generate the range `f(x₁), f(x₂), ..., f(xₙ)`.
- Sum and average to estimate integrals (e.g. Riemann sum).

## Function Adapters
Things like `bind1st`, `bind2nd`, `ptr_fun` are deprecated nowadays. You needed to stack templates on templates just to multiply something by 2. They are now replaced by:

- **Lambdas** for inline operations
- `std::function` for **polymorphic callables**
- `std::bind` if you're feeling retro (avoid at all costs)

Old version:

```cpp
#include <functional>
auto f = std::bind(std::multiplies<>(), std::placeholders::_1, 2);
```

New version:

```cpp
#include <algorithm>
#include <iostream>

template <class ForwIter>
void print(ForwIter first, ForwIter last, const char *title) {
  std::cout << title << "\n";
  while (first != last)
    std::cout << *first++ << "\t";
  std::cout << "\n";
}

int main() {
  int data[3] = {9, 10, 11};
  print(data, data + 3, "Original Values");

  std::transform(data, data + 3, data, [](int x) { return x * 2; });

  print(data, data + 3, "New values");
}
```

