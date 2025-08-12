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
