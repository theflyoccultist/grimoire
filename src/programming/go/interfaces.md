## **3D Volume Calculator Using Interfaces in Go**

```go
package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

type Solid interface {
	Volume() float64
}

type Sphere struct {
	radius float64
}

type Cube struct {
	length float64
}

type Pyramid struct {
	base   float64
	height float64
}

func (s Sphere) Volume() float64 {
	return 4 * math.Pi * math.Pow(s.radius, 3) / 3
}

func (l Cube) Volume() float64 {
	return math.Pow(l.length, 3)
}

func (p Pyramid) Volume() float64 {
	return math.Pow(p.base, 2) * p.height / 3
}

func main() {
	fmt.Println("Reading data.txt")
	file, err := os.Open("data.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()

	var solids []Solid

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Fields(line)
		if len(parts) != 3 {
			fmt.Println("Invalid line format: ", line)
			continue
		}

		shapeType := parts[0]
		dimension1, err1 := strconv.ParseFloat(parts[1], 64)
		dimension2, err2 := strconv.ParseFloat(parts[2], 64)
		if err1 != nil || err2 != nil {
			fmt.Println("Invalid number format in line:", line)
			continue
		}

		switch shapeType {
		case "S":
			solids = append(solids, Sphere{radius: dimension1})
		case "C":
			solids = append(solids, Cube{length: dimension1})
		case "P":
			solids = append(solids, Pyramid{base: dimension1, height: dimension2})
		default:
			fmt.Println("Unknown shape type in line:", line)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file", err)
	}

	for _, solid := range solids {
		fmt.Printf("Volume: %.2f\n", solid.Volume())
	}
}
```

#### **Key Concepts in Go**

1. **Interfaces**
   - An interface defines a set of method signatures. Any type that implements those methods satisfies the interface.
   - Here, the `Solid` interface requires the `Volume() float64` method.
   - This allows different shapes (Sphere, Cube, Pyramid) to be treated uniformly when calculating volume.

2. **Structs and Methods**
   - `Sphere`, `Cube`, and `Pyramid` are struct types, each with their own fields and a `Volume()` method matching the `Solid` interface.

3. **Input Parsing and File Handling**
   - Uses `bufio.Scanner` and `os.Open` to read and parse input from a file.
   - Handles errors gracefully for file operations and input format.

4. **Switch Statements**
   - The code uses a `switch` to select the correct struct type based on the input.

---

#### **Overview of the Program**

- The program reads a file (`data.txt`) where each line describes a solid:
  - The first letter is the shape type:  
    - `C` for Cube  
    - `P` for Pyramid  
    - `S` for Sphere  
  - The following two numbers are dimensions:
    - For `Cube`: side length, second value unused (set as 0.0 in file)
    - For `Sphere`: radius, second value unused (set as 0.0)
    - For `Pyramid`: base length and height

- For each line, the corresponding shape’s volume is calculated using methods that implement the interface, and the result is printed.

---

#### **Example Input (`data.txt`)**

```
C  2.5 0.0
P  3 6.0
S  4.5 0.0
...
```

---

#### **Code Explanation**

- **Solid Interface and Structs:**
  ```go
  type Solid interface {
      Volume() float64
  }
  type Sphere struct { radius float64 }
  type Cube struct { length float64 }
  type Pyramid struct { base, height float64 }
  ```

- **Volume Methods:**
  ```go
  func (s Sphere) Volume() float64 { return 4 * math.Pi * math.Pow(s.radius, 3) / 3 }
  func (l Cube) Volume() float64 { return math.Pow(l.length, 3) }
  func (p Pyramid) Volume() float64 { return math.Pow(p.base, 2) * p.height / 3 }
  ```

- **Input Handling:**
  - Reads each line, splits fields, converts numeric strings to float64, and selects the shape with a `switch`.
  - Handles invalid or unknown input gracefully.

- **Processing:**
  ```go
  for _, solid := range solids {
      fmt.Printf("Volume: %.2f\n", solid.Volume())
  }
  ```

---

#### **How to Run**

1. Prepare a `data.txt` file with one shape per line as above.
2. Save your Go file as `interfaces.go`.
3. Run with:
   ```bash
   go run interfaces.go
   ```
4. Sample output:
   ```
   Volume: 15.63
   Volume: 18.00
   Volume: 381.70
   ...
   ```

---

#### **Extensions & Real-World Applications**

- **Adding More Shapes:**  
  Implement more 3D solids by creating new structs and their `Volume` methods—no change to the main logic needed.
- **Polymorphism:**  
  Interfaces allow for flexible, extensible, and decoupled code, a key principle in large Go programs.
- **Error Reporting:**  
  Improve error messages, or log and skip bad lines in larger data files.
- **Practical Use:**  
  Useful for any geometry processing, CAD software, or scientific computation where multiple shape types are handled generically.
