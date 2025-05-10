# Output a Random Graph in C++

Context: Refactor of an instructor-provided codebase to generate a random undirected graph with cost and color data. Original code was a memory-leaking, segfault-happy mess.

Generate a random graph using a 2D adjacency matrix, apply weights (cost) and labels (color) to edges, and export the result to a .txt file.

💥 Original Problems
- Used raw pointers (`new[]`) without any `delete[]`: memory leak central.
- No structure—everything shoved into `main()`.

🔧 Refactor Goals
- Encapsulate logic in a Graph class.
- Use `std::vector<std::vector<T>>` for memory safety and clarity.
- Organize code: generation, cost assignment, and file output as clean methods.
- Eliminate leaks and crashes; run clean under Valgrind.

⚙️ Inputs
- `int size`: graph size (number of nodes)
- `double density`: probability of edge existence between nodes
- `std::string filename`: output filename for the graph data

```cpp
#include <cstdlib>
#include <ctime>
#include <fstream>
#include <iostream>
#include <ostream>
#include <string>
#include <vector>

class Graph {
private:
  double prob() { return (static_cast<double>(rand()) / RAND_MAX); }

public:
  // Constructor
  std::vector<std::vector<bool>> graph;
  std::vector<std::vector<int>> color;
  std::vector<std::vector<int>> cost;
  int size;
  double density;

  Graph(int s, double d) : size(s), density(d) {
    graph.resize(size, std::vector<bool>(size, false));
    color.resize(size, std::vector<int>(size, 0));
    cost.resize(size, std::vector<int>(size, 0));
  }

  // generate graph
  void generate_graph() {
    for (int i = 0; i < size; ++i)
      for (int j = i; j < size; ++j)
        if (i == j)
          graph[i][j] = false;
        else
          graph[i][j] = graph[j][i] = (prob() < density);
  }

  // generate cost and color
  void cost_and_color() {
    for (int i = 0; i < size; ++i)
      for (int j = i; j < size; ++j)
        if (graph[i][j]) {
          color[i][j] = color[j][i] = rand() % 3;
          cost[i][j] = cost[j][i] = prob() * 30;
        }
  }

  // write to a txt file
  void output_file(const std::string &filename) {
    std::ofstream outp(filename);
    outp << size << "\n";
    for (int i = 0; i < size; ++i)
      for (int j = 0; j < size; ++j) {
        if (graph[i][j])
          outp << i << '\t' << j << '\t' << cost[i][j] << '\t' << color[i][j]
               << '\n';
      }
  }
};

int main(void) {
  int size;
  double density;
  std::string filename;

  // User input
  std::cout << "graph size?" << "\n";
  std::cin >> size;
  std::cout << "graph density (0,1)?" << "\n";
  std::cin >> density;

  Graph g(size, density);
  g.generate_graph();
  g.cost_and_color();

  std::cout << "file name?" << "\n";
  std::cin >> filename;
  g.output_file(filename);
  std::cout << "done." << "\n";
}
```
