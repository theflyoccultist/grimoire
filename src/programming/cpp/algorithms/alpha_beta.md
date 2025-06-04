## Alpha Beta Pruning

- Leaf nodes are evaluated on a scale
- Larger negative value in minimizer will win
- Larger positive value in maximizer will win
- Values are backed up by the tree : alternate max and min.

- Maximizer : I can at least get alpha `-∞` 
- Minimizer : I can at least get beta `+∞`
- Optimum is when best moves are being considered.

```cpp
#include <algorithm>
#include <iostream>
#include <limits>

const int MAX = std::numeric_limits<int>::max();
const int MIN = std::numeric_limits<int>::min();

int minimax(int depth, int node_index, bool max_player, int values[], int alpha, int beta) {
  if (depth == 3)
    return values[node_index];

  if (max_player) {
    int best = MIN;

    for (int i = 0; i < 2; i++) {
      int val = minimax(depth + 1, node_index * 2 + i, false, values, alpha, beta);
      best = std::max(best, val);
      alpha = std::max(alpha, best);

      if (beta <= alpha)
        break;
    }
    return best;
  } else {
    int best = MAX;

    for (int i = 0; i < 2; i++) {
      int val = minimax(depth + 1, node_index * 2 + i, true, values, alpha, beta);
      best = std::min(best, val);
      beta = std::min(beta, best);

      if (beta <= alpha)
        break;
    }
    return best;
  }
}

int main() {
  int values[8] = {3, 8, 1, 3, 4, 8, 4, 6};

  std::cout << "The optimal value is: "
            << minimax(0, 0, true, values, MIN, MAX) << std::endl;

  return 0;
}
```


