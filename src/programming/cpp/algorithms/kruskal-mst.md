# Kruskal's MST Implementation in C++

A Minimum Spanning Tree (MST) of a connected weighted undirected graph is a sub graph that connects all the vertices while minimizing the total edge weight. It has the following properties:

- It spans all vertices of the original graph.
- It contains no cycles.
- The sum of its edge weights is minimal among all spanning trees.

Key points about MST:

- It provides a way to connect all nodes in a network with the least amount of wire/cable.
- In computer networks, it helps in designing efficient communication networks.
- In transportation systems, it aids in finding the shortest path between multiple destinations.

### History of Kruskal's Algorithm

Kruskal's algorithm was developed by Joseph Kruskal in 1956. It was one of the first algorithms to solve the Minimum Spanning Tree problem efficiently.
- Initially, it was designed for electrical engineering applications but later found widespread use in computer science.

### My Implementation

To achieve this, I was given a pseudocode to start with.

- Create a forest F (set of trees) where each vertex in the graph is a separate tree.
- Create a set S containing all the edges in the graph.
While S is nonempty and F is not yet spanning:
  - remove an edge with minimum weight from S
  - if that edge connects two different trees, then add it to the forest, combining two trees into a single tree
  - otherwise discard that edge.
- at the termination of the algorithm, the forest has only one component and forms a minimum spanning tree of the graph.

I have tried to keep the approach structured with class constructors, while the functions `KruskalMST()`, `add_edge()` and `computeMST()` serves to execute them. The results are shown at the end thanks to the `printMST()` function. The `main()` function is just there to route it all together.

```cpp
#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>

// Initialize edges and operator overloading
struct Edge {
  int u, v, weight;
  bool operator<(const Edge &other) const { return weight < other.weight; }
};

class KruskalMST {
public:
  // Constructor declarations
  KruskalMST(int n);
  void add_edge(int u, int v, int weight);
  void computeMST();
  void printMST();

private:
  // Build trees
  std::vector<Edge> edges;
  std::vector<Edge> mst;
  std::vector<int> parent, rank;
  int num_vertices;

  // Initialization
  void make_set(int v) {
    parent[v] = v;
    rank[v] = 0;
  }

  // Path compression
  int find_set(int v) {
    if (v == parent[v])
      return v;
    return parent[v] = find_set(parent[v]);
  }

  // Union by rank
  void union_sets(int a, int b) {
    a = find_set(a);
    b = find_set(b);
    if (a != b) {
      if (rank[a] < rank[b])
        std::swap(a, b);
      parent[b] = a;
      if (rank[a] == rank[b])
        rank[a]++;
    }
  }
};

void KruskalMST::add_edge(int u, int v, int weight) {
  edges.push_back({u, v, weight});

  if (u >= num_vertices || v >= num_vertices) {
    std::cerr << "Invalid edge: " << u << " - " << v << "\n";
    return;
  }
}

void KruskalMST::computeMST() {
  std::sort(edges.begin(), edges.end());

  for (Edge e : edges) {
    if (find_set(e.u) != find_set(e.v)) {
      mst.push_back(e);
      union_sets(e.u, e.v);
    }
  }
}
// Executing the algorithm itself
KruskalMST::KruskalMST(int n) {
  num_vertices = n;
  parent.resize(n);
  rank.resize(n);

  for (int i = 0; i < n; ++i)
    make_set(i);
}

// Function to print results
void KruskalMST::printMST() {
  int tot_weight = 0;

  std::cout << "Edges in the MST are \n";
  for (const Edge &e : mst) {
    std::cout << e.u << "--" << e.v << " : " << e.weight << "\n";
    tot_weight += e.weight;
  }

  std::cout << "\nTotal weight is: " << tot_weight << "\n";
};

// Testing above functions
int main() {
  KruskalMST graph(9);

  graph.add_edge(0, 3, 8);
  graph.add_edge(2, 5, 5);
  graph.add_edge(6, 1, 7);

  graph.computeMST();
  graph.printMST();

  return 0;
```
