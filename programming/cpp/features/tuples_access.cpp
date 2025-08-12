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
