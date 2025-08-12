# Tuples

## Creation of Tuples

```cpp

// Create a tuple

#include <tuple>

int main() {
  // direct initialization
  std::tuple<int, int, int> time(1, 42, 30);

  // using make_tuple (type deduced)
  auto anotherTime = std::make_tuple(1, 22, 60);

  // works with mixed types
  auto person = std::make_tuple("Pwatpwat", 22, 8.2); // name, age, height
}

```

## Accessing Tuples

```cpp

#include <iostream>
#include <tuple>

int main() {
  auto time = std::make_tuple(1, 42, 30);

  // Modifying elements
  std::get<1>(time) = 59;

  // std::get<index> (compile-time index)
  std::cout << "Hours: " << std::get<0>(time) << "\n";
  std::cout << "Minutes: " << std::get<1>(time) << "\n";
  std::cout << "Seconds: " << std::get<2>(time) << "\n";

  // unpacking tuples (c++17 feature)
  auto [h, m, s] = time;
  std::cout << h << "h " << m << "m " << s << "s\n";
}

```

## Returning Tuples

```cpp

#include <iostream>
#include <tuple>

std::tuple<int, int, int> timeDecomposition(int seconds) {
  int h = seconds / 3600;
  int m = (seconds % 3600) / 60;
  int s = seconds % 60;
  return std::make_tuple(h, m, s);
}

int main() {
  int seconds = 8850;
  std::tuple time = timeDecomposition(seconds);

  auto [h, m, s] = time;

  std::cout << seconds << " seconds equals to:" << std::endl;
  std::cout << h << "h " << m << "m " << s << "s" << std::endl;
}

```
