# Poker Monte Carlo Simulation: The Final Boss of Single Iterators (for now)

This simulation is a chaotic but disciplined demonstration of core C++ features, data structures, and algorithmic logic. Here's what it leverages:

- `enum class`: a scoped, type-safe alternative to traditional C-style enums.
  - Syntax: `enum class Identifier : integral_type { list };`
  - Example: 
    ```cpp
    enum class Color { RED, GREEN, BLUE };
    enum class Spotlight { RED, YELLOW, GREEN };
    ```
  - In old-style enums, `RED` would be ambiguous if used in the same scope.
  - With `enum class`, `Color::RED` and `Spotlight::RED` are completely distinct.
  - `::` is called the **scope resolution operator**.
  - By default, the underlying type is int; but you can specify something smaller like `short` or `unsigned` (as long as it's integral).

- Custom `card` data type: modeled using `enum class` for suits and a `pips` class to represent values (1 to 13). Together, they form an easily extensible system for identifying and comparing cards.

- `std::vector<T>`, dynamic arrays that shrink and grow as needed. Also a great workaround to avoid using `new` and `delete`, something you would use if you're asking for problems. Vectors also provides iterator support for algorithms like `std::shuffle` and `std::sort`.

- Modern RNG:
  - `std::random_shuffle()` is deprecated.
  - The correct modern approach is:
    ```cpp
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(deck.begin(), deck.end(), g);
    ```
  - `std::mt19937` is a Mersenne Twister engine, high-quality and widely used.
  - `std::random_device` provides a non-deterministic seed (if supported by the system).

---

#### `std::map`:

To classify hands like pairs, three-of-a-kinds, full houses, and four-of-a-kinds, I used `std::map` as a clean alternative to writing multiple functions for each case.

* A `std::map<Key, Value>` stores **key-value pairs**, sorted by key in **ascending order** by default.
* In this simulation, the **key** is the pip value (card number), and the **value** is the count of how many times it appears in a hand.
* This allows a single pass over the hand to collect **all frequency data**, which can then be used to identify any relevant hand:

  * A key with a value of `4` → Four of a Kind
  * A key with a value of `3` and another with `2` → Full House
  * Two keys with value `2` → Two Pair
  * One key with value `2` → One Pair

Example usage:

```cpp
std::map<int, int> pip_counts;
for (const card& c : hand) {
    pip_counts[c.get_pips().get_pips()]++;
}
```

* Unlike `unordered_map`, which is backed by a hash table and has no guaranteed order, `std::map` keeps things **sorted**, which may help with debug output or extensions like detecting the highest kicker.

Using this map, a single `classify_hand()` function was enough to identify all hand types based on how many identical pip values were found.

---

### Suggestions for improvements

- Detecting royal flushes
- Analyzing average hand value
- Plotting probabilities as a histogram

---

```cpp
#include <algorithm>
#include <array>
#include <cassert>
#include <iostream>
#include <map>
#include <ostream>
#include <random>
#include <vector>

enum class suit : short { SPADE, HEART, DIAMOND, CLUB };
std::ostream &operator<<(std::ostream &out, const suit &s) {
  return out << static_cast<int>(s);
}

class pips {
public:
  pips(int val) : v(val) { assert(v > 0 && v < 14); }
  friend std::ostream &operator<<(std::ostream &out, const pips &p) {
    out << p.v;
    return out;
  };
  int get_pips() { return v; }

private:
  int v;
};

class card {
public:
  card() : s(suit::SPADE), v(1) {}
  card(suit s, pips v) : s(s), v(v) {}
  friend std::ostream &operator<<(std::ostream &out, const card &c);
  const suit get_suit() { return s; }
  pips get_pips() const { return v; }

private:
  suit s;
  pips v;
};

std::ostream &operator<<(std::ostream &out, const card &c) {
  out << c.v << c.s;
  return out;
}

void init_deck(std::vector<card> &d) {
  const std::array<suit, 4> all_suits = {suit::SPADE, suit::HEART,
                                         suit::DIAMOND, suit::CLUB};

  for (const auto &s : all_suits) {
    for (int p = 1; p < 14; ++p) {
      d.emplace_back(s, pips(p));
    }
  }
}

void print(std::vector<card> &deck) {
  for (auto cardval : deck)
    std::cout << cardval << "\n";
}

void classify_hand(std::vector<card> &hand, int &pairs, int &trips,
                   int &quads) {
  std::map<int, int> pip_count;

  for (const card &c : hand) {
    int pip = c.get_pips().get_pips();
    pip_count[pip]++;
  }

  pairs = 0;
  trips = 0;
  quads = 0;

  for (const auto &[pip, count] : pip_count) {
    if (count == 2)
      pairs++;
    else if (count == 3)
      trips++;
    else if (count == 4)
      quads++;
  }
}

bool is_flush(std::vector<card> &hand) {
  suit s = hand[0].get_suit();
  for (auto p = hand.begin() + 1; p != hand.end(); ++p)
    if (s != p->get_suit())
      return false;
  return true;
}

bool is_consecutive(int *pips) {
  for (int i = 1; i < 5; ++i)
    if (pips[i] != pips[i - 1] + 1)
      return false;
  return true;
}

bool is_straight(std::vector<card> &hand) {
  int pips_v[5];
  for (int i = 0; i < 5; ++i)
    pips_v[i] = hand[i].get_pips().get_pips();

  std::sort(pips_v, pips_v + 5);

  // Ace high: 10-J-Q-K-A
  if (pips_v[0] == 1 && pips_v[1] == 10)
    return pips_v[1] == 10 && pips_v[2] == 11 && pips_v[3] == 12 &&
           pips_v[4] == 13;

  // regular straight
  return is_consecutive(pips_v);
}

bool is_straight_flush(std::vector<card> &hand) {
  return is_flush(hand) && is_straight(hand);
}

int main() {
  std::vector<card> deck(52);
  srand(time(nullptr));
  init_deck(deck);
  int how_many;
  int high_card = 0, one_pair = 0, two_pair = 0, three_ofa_kind = 0,
      four_of_akind = 0, full_house = 0;
  int flush_count = 0, str_count = 0, str_flush_count = 0;
  std::cout << "How many shuffles? ";
  std::cin >> how_many;

  std::random_device rd;
  std::mt19937 g(rd());
  for (int loop = 0; loop < how_many; ++loop) {
    std::shuffle(deck.begin(), deck.end(), g);
    std::vector<card> hand(deck.begin(), deck.begin() + 5);

    int pairs = 0, trips = 0, quads = 0;
    classify_hand(hand, pairs, trips, quads);

    if (is_flush(hand))
      flush_count++;
    else if (is_straight(hand))
      str_count++;
    else if (is_straight_flush(hand))
      str_flush_count++;

    else if (quads == 1)
      four_of_akind++;
    else if (trips == 1 && pairs == 1)
      full_house++;
    else if (trips == 1)
      three_ofa_kind++;
    else if (pairs == 2)
      two_pair++;
    else if (pairs == 1)
      one_pair++;
    else
      high_card++;
  }

  std::cout << "High Card: " << high_card << " out of " << how_many << "\n";
  std::cout << "Pair: " << one_pair << " out of " << how_many << "\n";
  std::cout << "Two Pairs: " << two_pair << " out of " << how_many << "\n";
  std::cout << "Three of a kind: " << three_ofa_kind << " out of " << how_many
            << "\n";

  std::cout << "Straights: " << str_count << " out of " << how_many << "\n";
  std::cout << "Flushes: " << flush_count << " out of " << how_many << "\n";
  std::cout << "Full House: " << full_house << " out of " << how_many << "\n";
  std::cout << "Four of a kind: " << four_of_akind << " out of " << how_many
            << "\n";
  std::cout << "Straight Flushes: " << str_flush_count << " out of " << how_many
            << "\n";
}
```
