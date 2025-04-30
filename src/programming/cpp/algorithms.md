# Dijkstra's Algorithm with Edge List (C++ Edition)

The graph is represented using an **edge list**, not an adjacency matrix, which is simpler to work with when dynamically generating graphs of varying densities.

---

## 💻 Key Concepts

- **Graph Structure**: `std::vector<Edge>` with an `Edge` struct holding source, destination, and weight.
- **Dijkstra’s Algorithm**: Classic implementation using a `distances[]` array and a greedy loop with `minDistance()` helper.
- **Random Graph Generation**: Custom `generateRandomGraph()` function adds edges based on a given density (e.g. 20% or 40%).

---

## The Code

```cpp
#include <ctime>
#include <iostream>
#include <limits>
#include <random>
#include <set>
#include <vector>

const int INF = std::numeric_limits<int>::max();

struct Edge {
  int source;
  int destination;
  int weight;

  Edge(int s, int d, int w) : source(s), destination(d), weight(w) {}
};

class Graph {
public:
  Graph(int vertices) : vertices(vertices) {}

  void addEdge(int source, int destination, int weight) {
    edges.emplace_back(source, destination, weight);
    edges.emplace_back(destination, source, weight);
  }

  int getVertices() const { return vertices; }
  const std::vector<Edge> &getEdges() const { return edges; }

  std::vector<int> Dijkstra(int source) {
    std::vector<int> distances(vertices, INF);
    std::vector<int> visited(vertices, 0);

    distances[source] = 0;

    for (int i = 0; i < vertices - 1; ++i) {
      int u = minDistance(distances, visited);
      if (u == -1)
        break;

      visited[u] = 1;

      for (const auto &edge : edges) {
        if (!visited[edge.destination] && edge.source == u) {
          int newDistance = distances[u] + edge.weight;
          if (newDistance < distances[edge.destination]) {
            distances[edge.destination] = newDistance;
          }
        }
      }
    }

    return distances;
  }

private:
  int vertices;
  std::vector<Edge> edges;

  int minDistance(const std::vector<int> &distances,
                  const std::vector<int> &visited) {
    int minDist = INF;
    int minIndex = -1;

    for (int v = 0; v < vertices; ++v) {
      if (!visited[v] && distances[v] <= minDist) {
        minDist = distances[v];
        minIndex = v;
      }
    }
    return minIndex;
  }
};

void generateRandomGraph(Graph &g, int vertices, double density, int minWeight,
                         int maxWeight) {
  int maxEdges = vertices * (vertices - 1) / 2;
  int targetEdges = static_cast<int>(density * maxEdges);

  std::mt19937 rng(static_cast<unsigned int>(time(nullptr)));
  std::uniform_int_distribution<int> vertexDist(0, vertices - 1);
  std::uniform_int_distribution<int> weightDist(minWeight, maxWeight);

  std::set<std::pair<int, int>> existingEdges;

  while (static_cast<int>(existingEdges.size()) < targetEdges) {
    int u = vertexDist(rng);
    int v = vertexDist(rng);

    if (u != v && existingEdges.find({u, v}) == existingEdges.end() &&
        existingEdges.find({u, v}) == existingEdges.end()) {
      int weight = weightDist(rng);
      g.addEdge(u, v, weight);
      existingEdges.insert({u, v});
    }
  }
}

int main() {
  int vertices = 50;
  Graph g(vertices);

  double density = 0.2;
  generateRandomGraph(g, vertices, density, 1, 10);

  std::vector<int> distances = g.Dijkstra(0);

  int sum = 0;

  for (int i = 1; i < vertices; ++i) {
    std::cout << "Distance from 0 to " << i << ": " << distances[i] << "\n";
    sum += distances[i];
  }

  std::cout << "Average Path : " << static_cast<float>(sum) / 49.0 << "\n";

  return 0;
}
```
