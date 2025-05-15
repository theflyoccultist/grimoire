## **Dijkstra's Algorithm in Go**

```go
package main

import "fmt"

// Edge represents a connection between two nodes
type Edge struct {
	Source      int
	Destination int
	Weight      int
}

// Graph represents a graph with a list of edges
type Graph struct {
	vertices int
	edges    []Edge
}

const large = 999999

// NewGraph creates a new graph with a given number of vertices
func NewGraph(vertices int) *Graph {
	return &Graph{
		vertices: vertices,
		edges:    make([]Edge, 0),
	}
}

// AddEdge adds an edge to the graph
func (g *Graph) AddEdge(source, destination, weight int) {
	g.edges = append(g.edges, Edge{source, destination, weight})
	g.edges = append(g.edges, Edge{destination, source, weight})
}

// Dijkstra calculates the shortest path from a source node to all other nodes
func (g *Graph) Dijkstra(source int) []int {
	distances := make([]int, g.vertices)
	visited := make([]bool, g.vertices)

	for i := range distances {
		distances[i] = large
	}
	distances[source] = 0

	for i := 0; i < g.vertices-1; i++ {
		u := g.minDistance(distances, visited)
		visited[u] = true

		for _, edge := range g.edges {
			if !visited[edge.Destination] && edge.Source == u {
				newDistance := distances[u] + edge.Weight
				if newDistance < distances[edge.Destination] {
					distances[edge.Destination] = newDistance
				}
			}
		}
	}

	return distances
}

func (g *Graph) minDistance(distances []int, visited []bool) int {
	minDist := large
	minIndex := -1

	for v := 0; v < g.vertices; v++ {
		if !visited[v] && distances[v] <= minDist {
			minDist = distances[v]
			minIndex = v
		}
	}

	return minIndex
}

func main() {
	g := NewGraph(9)

	// Add edges to the graph
	g.AddEdge(0, 1, 4)
	g.AddEdge(0, 7, 8)
	g.AddEdge(1, 2, 8)
	g.AddEdge(1, 7, 11)
	g.AddEdge(2, 3, 7)
	g.AddEdge(2, 8, 2)
	g.AddEdge(2, 5, 4)
	g.AddEdge(3, 4, 9)
	g.AddEdge(3, 5, 14)
	g.AddEdge(4, 5, 10)
	g.AddEdge(5, 6, 2)
	g.AddEdge(6, 7, 1)
	g.AddEdge(6, 8, 6)
	g.AddEdge(7, 8, 7)

	// Calculate the shortest path from node 0 to all other nodes
	distances := g.Dijkstra(0)

	// Print the shortest path to all nodes
	fmt.Println("Shortest path from node 0 to all other nodes:")
	for i, distance := range distances {
		fmt.Printf("Node %d: %d\n", i, distance)
	}
}
```

#### **Key Concepts in Go**

1. **Graph Representation**
   - The graph is modeled using a `Graph` struct with a slice of `Edge` structs.
   - Each `Edge` holds a source, destination, and weight.

2. **Dijkstra's Algorithm**
   - Finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights.
   - The implementation uses basic slices for distances and visited nodes, focusing on simplicity and readability.

3. **Idiomatic Go**
   - Makes use of Go’s slices, custom struct types, and method receivers for clean, modular code.
   - Uses zero-based indexing and initialization patterns familiar to Go developers.

---

#### **Overview of the Program**

- **Purpose:**  
  Finds the shortest path from a starting node (node 0) to all other nodes in a sample undirected weighted graph.
- **How It Works:**  
  1. A graph is created and edges are added.
  2. The `Dijkstra` method computes shortest paths from node 0.
  3. Results are printed to the terminal.

---

#### **Code Explanation**

- **Structs and Graph Construction**
  ```go
  type Edge struct { Source, Destination, Weight int }
  type Graph struct { vertices int; edges []Edge }
  ```
  - The graph is undirected: each `AddEdge` call inserts both directions.

- **Dijkstra’s Algorithm**
  ```go
  func (g *Graph) Dijkstra(source int) []int {
      distances := make([]int, g.vertices)
      visited := make([]bool, g.vertices)
      // Initialize all distances to a large value
      // Main loop: pick unvisited node with smallest distance, update neighbors
  }
  ```
  - Uses a simple linear search for the next node (not a heap/priority queue), prioritizing clarity over speed.

- **Result Output**
  ```go
  for i, distance := range distances {
      fmt.Printf("Node %d: %d\n", i, distance)
  }
  ```

---

#### **How to Run**

1. Save the file as `dijkstra.go`.
2. Run the program:
   ```bash
   go run dijkstra.go
   ```
3. Expected output:
   ```
   Shortest path from node 0 to all other nodes:
   Node 0: 0
   Node 1: 4
   Node 2: 12
   Node 3: 19
   Node 4: 21
   Node 5: 11
   Node 6: 9
   Node 7: 8
   Node 8: 14
   ```

---

#### **Real-World Applications**

- **Navigation & Routing:**  
  GPS, mapping software, network packet routing.
- **Game Development:**  
  Pathfinding for AI, dynamic environments.
- **Operations Research:**  
  Logistics, resource allocation, project planning.

---

#### **Extensions**

- **Performance:**  
  For larger graphs, replace the linear search in `minDistance` with a min-heap (priority queue).
- **Directed Graphs:**  
  Modify `AddEdge` to add only one direction for directed graphs.
- **Path Reconstruction:**  
  Track predecessors to reconstruct the actual shortest path, not just distances.

---

#### **Why Go?**

- **Simplicity:**  
  Go’s syntax allows for clear and concise code, reducing boilerplate.
- **Concurrency:**  
  While not used here, Go excels at concurrent computation—useful for parallel pathfinding in large or dynamic graphs.
- **Readability:**  
  Easier for teams to understand and maintain compared to lower-level languages.
