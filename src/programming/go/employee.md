## **Employee Salary Parser in Go**

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	// Open the file for reading
	f, err := os.Open("employee.txt")
	check(err)
	defer f.Close()

	// Read the file line by line
	scanner := bufio.NewScanner(f)

	// Declare slices
	var fullNames []string
	var salaries []uint32

	// Add data to the corresponding slice
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Fields(line)

		if len(parts) == 3 {
			fullName := parts[0] + " " + parts[1]
			fullNames = append(fullNames, fullName)
			salary, err := strconv.ParseUint(parts[2], 10, 32)
			check(err)
			salaries = append(salaries, uint32(salary))
		} else {
			fmt.Println("-> Invalid line format")
		}
	}

	// Error handling
	if err := scanner.Err(); err != nil {
		check(err)
	}

	//Find the employee with the smallest salary
	minSalary := salaries[0]
	minIndex := 0
	for i, salary := range salaries {
		if salary < minSalary {
			minSalary = salary
			minIndex = i
		}
	}

	//Find the employee with the largest salary
	maxSalary := salaries[0]
	maxIndex := 0
	for i, salary := range salaries {
		if salary > maxSalary {
			maxSalary = salary
			maxIndex = i
		}
	}

	//Find the average salary
	var totalSalary uint32
	for _, salary := range salaries {
		totalSalary += salary
	}
	averageSalary := float64(totalSalary) / float64(len(salaries))

	fmt.Printf("Company's smallest salary: %s, with: %v\n", fullNames[minIndex], minSalary)
	fmt.Printf("Company's largest salary: %s, with: %v\n", fullNames[maxIndex], maxSalary)
	fmt.Printf("Company's average salary: %.2f", averageSalary)
}
```

#### **Key Concepts in Go**
This example introduces:
1. **File Handling**:
   - Using `os.Open` to read files and `bufio.Scanner` to process them line by line.
2. **Error Handling**:
   - The `check` function demonstrates a simple way of handling errors.
3. **String and Slice Operations**:
   - Parsing strings with `strings.Fields` and managing dynamic collections with slices.
4. **Numeric Conversions**:
   - Converting string data to unsigned integers with `strconv.ParseUint`.
5. **Basic Algorithms**:
   - Finding minimum, maximum, and average values in a dataset.

---

#### **Overview of the Program**
The program reads a file (`employee.txt`) containing employee data in the format:
```
FirstName LastName Salary
```
- **Example Content**:
  ```
  John Doe 5000
  Jane Smith 7500
  Alice Johnson 4000
  Bob Brown 8000
  ```
- It processes this data to:
  1. Find the employee with the smallest salary.
  2. Find the employee with the largest salary.
  3. Calculate the average salary across all employees.

---

#### **Real-World Applications**
1. **Payroll Management**:
   - This example can form the basis of more comprehensive payroll systems, such as generating reports or filtering employees by salary range.
2. **Data Analytics**:
   - Parsing and analyzing structured text data for insights.
3. **File Processing**:
   - A starting point for building tools to process large datasets.

---

#### **Code Explanation**
The code can be divided into key steps:

1. **Reading and Parsing the File**:
   ```go
   f, err := os.Open("employee.txt")
   check(err)
   defer f.Close()
   scanner := bufio.NewScanner(f)
   ```
   - Opens the file and initializes a scanner to read it line by line.

2. **Processing Each Line**:
   ```go
   parts := strings.Fields(line)
   if len(parts) == 3 {
       fullName := parts[0] + " " + parts[1]
       salary, err := strconv.ParseUint(parts[2], 10, 32)
       check(err)
       fullNames = append(fullNames, fullName)
       salaries = append(salaries, uint32(salary))
   } else {
       fmt.Println("-> Invalid line format")
   }
   ```
   - Splits each line into parts: first and last name, and salary.
   - Validates the format and appends data to slices.

3. **Finding Minimum and Maximum Salaries**:
   ```go
   minSalary := salaries[0]
   minIndex := 0
   for i, salary := range salaries {
       if salary < minSalary {
           minSalary = salary
           minIndex = i
       }
   }
   ```
   - Iterates through the `salaries` slice to find the smallest and largest values and their indices.

4. **Calculating the Average Salary**:
   ```go
   var totalSalary uint32
   for _, salary := range salaries {
       totalSalary += salary
   }
   averageSalary := float64(totalSalary) / float64(len(salaries))
   ```
   - Computes the total salary and divides it by the number of employees.

5. **Displaying Results**:
   ```go
   fmt.Printf("Company's smallest salary: %s, with: %v\n", fullNames[minIndex], minSalary)
   fmt.Printf("Company's largest salary: %s, with: %v\n", fullNames[maxIndex], maxSalary)
   fmt.Printf("Company's average salary: %.2f", averageSalary)
   ```
   - Outputs the results with appropriate formatting.

---

#### **How to Run**
- Example output:
   ```
   Company's smallest salary: Alice Johnson, with: 4000
   Company's largest salary: Bob Brown, with: 8000
   Company's average salary: 6125.00
   ```

---

#### **Extensions**
1. **Input Validation**:
   - Add checks for negative salaries or invalid characters.
2. **Additional Analytics**:
   - Include features like median salary or salary distribution.
3. **Dynamic Input**:
   - Allow the filename to be passed as a command-line argument.
4. **Database Integration**:
   - Replace file-based storage with database queries for scalability.
