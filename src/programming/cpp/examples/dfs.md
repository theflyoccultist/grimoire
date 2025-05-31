## 🔍 DFS vs BFS: When to Use What

| Feature                  | **DFS**                                  | **BFS**                               |
| ------------------------ | ---------------------------------------- | ------------------------------------- |
| **Search Style**         | Goes deep along a path                   | Explores all neighbors level by level |
| **Data Structure**       | Stack (or recursion)                     | Queue                                 |
| **Memory Use**           | Lower in wide graphs                     | Higher in wide graphs                 |
| **Finds Shortest Path?** | ❌ No (it may take the scenic route)      | ✅ Yes (fewest moves)                  |
| **Easier to implement?** | ✅ Often simpler for grid/graph traversal | ✅ Also easy with STL queue            |
| **Good for...**          | Existence of a path                      | Finding optimal path length           |

---

### 🧠 So for your **Hex win check**:

* **You only care if a path exists** between one side and the other.
* **You don’t care how long the path is.**

✅ So **DFS is perfect**:

* Fast
* Low overhead
* Easy to implement
* Works great for this use case

---

### 🧪 Your mdBook Entry Could Look Like:

---

## DFS: Detecting a Path Between Hex Cells

This algorithm is used to determine whether a player has connected their respective sides of the Hex board (left-to-right or top-to-bottom).

### Why DFS?

* We don't care how long the path is—just whether one exists.
* DFS is lightweight and simple for this use case.
* It allows us to “flood” from the border and check if the opposite side is reachable.

### Code Sketch (using a stack)

```cpp
std::stack<Point> stack;
std::vector<std::vector<bool>> visited(board_size, std::vector<bool>(board_size, false));

// Start from the player’s border cells
for (int i = 0; i < board_size; ++i)
  if (border_cell[i] == player)
    stack.push({x, y});

while (!stack.empty()) {
  Point current = stack.top();
  stack.pop();

  // Skip visited
  if (visited[current.x][current.y]) continue;
  visited[current.x][current.y] = true;

  // Check if we reached the goal edge
  if (current.y == board_size - 1) return true;

  // Explore neighbors
  for (auto n : get_neighbors(current.x, current.y))
    if (!visited[n.x][n.y] && cells[n.x][n.y] == player)
      stack.push(n);
}
```

### BFS Alternative

* Use a queue instead of a stack.
* Use it when path length matters (e.g. shortest route to victory).
* Slightly more memory-intensive in wide boards.


## BFS in Graphs

Breadth-First Search explores a graph level-by-level using a **queue**. It’s useful for finding the shortest path or testing reachability.

### C++ (Pointer-Based Version)

```cpp
class Graph {
  int V;
  std::list<int>* adj;

  // ... constructor, addEdge, etc.

  void BFS(int start) {
    bool* visited = new bool[V];
    std::fill(visited, visited + V, false);

    std::list<int> queue;
    visited[start] = true;
    queue.push_back(start);

    while (!queue.empty()) {
      int node = queue.front();
      queue.pop_front();
      // Process node...

      for (auto neighbor : adj[node]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push_back(neighbor);
        }
      }
    }

    delete[] visited;
  }
};
```

### ⚠️ Gotchas:

* `std::vector<bool>` is **not** safe for pointer-like access.
* Prefer `std::vector<char>` if you're doing raw pointer-style stuff in C++.


