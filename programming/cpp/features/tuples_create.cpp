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
