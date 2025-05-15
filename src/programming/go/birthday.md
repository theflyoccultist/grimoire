## **Birthday Paradox in Go**

```go
package main

import "fmt"

func birthdayProbability(n int) float64 {
	probability := 1.0

	for i := 0; i < n; i++ {
		probability *= float64(365-i) / 365
	}

	return 1 - probability
}

func main() {
	const iterations = 10000
	fmt.Printf("People in the room \t Probability of 2 (or more) having the same birthday\n")

	for n := 10; n <= 100; n += 10 {
		totalProbability := 0.0

		for i := 0; i < iterations; i++ {
			totalProbability += birthdayProbability(n)
		}

		averageProbability := totalProbability / iterations
		fmt.Printf("\t%d\t\t\t%f\n", n, averageProbability)
	}

	fmt.Printf("Total number of iterations : %d\n", iterations)
}
```

#### **Key Concepts in Go**
This example introduces:
- **Loops**: Both `for` loops are used for iterative calculations (one to compute probabilities and another for multiple iterations).
- **Floating-point Arithmetic**: Calculations involve `float64` for precise probability computation.
- **Modularity**: The function `birthdayProbability` is separated from the main logic for clarity and reusability.

---

#### **Overview of the Birthday Paradox**
The "birthday paradox" refers to the counterintuitive probability that in a group of just 23 people, there’s a greater than 50% chance that at least two of them share the same birthday.

---

#### **Real-World Applications**
- **Cryptography**:
  - Hash collisions: The birthday paradox helps understand the likelihood of two different inputs producing the same hash.
- **Simulation Models**:
  - Event overlaps in large datasets.
  - Predicting collisions in distributed systems.

---

#### **Code Explanation**
```go
func birthdayProbability(n int) float64 {
	probability := 1.0

	for i := 0; i < n; i++ {
		probability *= float64(365-i) / 365
	}

	return 1 - probability
}
```
- This function calculates the probability of at least two people having the same birthday in a group of size `n`.

```go
for n := 10; n <= 100; n += 10 {
	totalProbability := 0.0

	for i := 0; i < iterations; i++ {
		totalProbability += birthdayProbability(n)
	}

	averageProbability := totalProbability / iterations
	fmt.Printf("\t%d\t\t\t%f\n", n, averageProbability)
}
```
- The outer loop iterates through different group sizes (`n`).
- The inner loop computes the probability multiple times (`iterations`) to average out randomness.

---

### Example output:

   ```
   People in the room 	 Probability of 2 (or more) having the same birthday
   	10				0.116948
   	20				0.411438
   	30				0.706316
   	...
   ```

