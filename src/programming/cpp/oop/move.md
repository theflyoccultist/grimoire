## Move semantics

- In C++11 there is a sequential container class defined in `<array>` that specifies at compile time a fixed length array.

- Vectors: expandable. Has more features.
But not without a cost.

- Go back to basic C arrays? Discipline yourself to not get off by one errors, memory leaks and etc...

- Use `std::array`! Maintain efficiency of raw arrays, but has now added functionality.

- It supports move semantics (And RAII): we will learn about those features.

```cpp
template <class T, int n>

class my_container {
public:
  my_container() { a = new T[n]; };
  ~my_container() { delete[] a; };

private:
  T *a;
};
```

- However this code requires manual memory cleanup, uses raw pointers and so a lot to worry about. By using `std::array` you can get rid of those problems.

### Some further constructions

```cpp
template <class T, int n>

class my_container {
public:
  my_container() { a = new T[n]; };
  ~my_container() { delete[] a; };

  explicit my_container(T *b) : my_container() {
    for (int i = 0; i < n; ++i)
      a[i] = b[i];
  }
```
- `explicit` suppresses automatic coercion.
- Delegate construction and enhance code reuse.


```cpp
  my_container(const my_container &b) : my_container() {
    for (int i = 0; i < n; ++i)
      a[i] = b.a[i];
  }
```

- Ordinary copy constructor - again with constructor delegation.

```cpp
private:
  T *a;
};
```

Typical constructors for a class:
- Default : void signature
- Conversion constructor: single argument (we use explicit)
- Copy constructor: `const class Type&`

### Move constructor

```cpp
  my_container(my_container &&b) noexcept {
    a = b.a;
    b.a = nullptr;
  }
```

Contents are "moved" not copied.
- `noexcept`: I don't do anything that will create an exception.
- Shallow copy : b disappears.
- This operation doesn't slow down even with a large number of datasets. Constant time algorithm.
- Use of `&&` to mean an `rvalue` address.

You might want to overload the = operator:

```cpp
  my_container &operator=(my_container &&b) noexcept {
    a = b.a;
    b.a = nullptr;
    return *this;
  }
```

- `std::move() static_cast<T&&>(t)` - destructive assignment
- More efficient because all the assignments are referential.

### Efficient swap with move semantics

We know that my_container temp won't be reused later, so it can disappear.
Perfect use for move semantics.

```cpp
  void swap(my_container &b) {
    my_container temp = std::move(b);
    b = std::move(*this);
    *this = std::move(temp);
  }
```
