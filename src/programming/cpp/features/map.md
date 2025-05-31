# Ordered vs. Unordered Maps - When to Sort and When to Chaos

- `std::map` is a sorted associative container using a **red-black tree**, which means it's always in order, but inserts and lookups are logarithmic time (`O(log n)`). Great if you need your data sorted or care about order.
- `std::unordered_map` is based on a **hash table**, so you get average `O(1)` time for lookups and inserts, but no ordering. It's the gremlin that screams "fast but chaotic."

Both store key-value pairs (`std::pair<const Key, T>` under the hood).

```cpp
#include <iostream>
#include <map>
#include <ostream>
#include <string>
#include <unordered_map>

int main() {
  std::map<unsigned long, std::string> worker;
  std::unordered_map<unsigned long, unsigned> payroll;

  unsigned total_pay = 0;
  worker[99567800] = "Harold Fish";
  payroll[99567800] = 67300;
  worker[8567800] = "Philip Fish";
  payroll[8567800] = 87300;

  for (auto p = worker.begin(); p != worker.end(); ++p) {
    std::cout << "name " << (*p).second << "\tid no." << (*p).first << "\n";
  }

  for (auto p = payroll.begin(); p != payroll.end(); ++p) {
    total_pay += (*p).second;
  }
  std::cout << "Payroll totals $" << total_pay << "\n";
}
```

Expected output:

```plaintext
name Philip Fish        id no.8567800
name Harold Fish        id no.99567800
Payroll totals $154600
```
