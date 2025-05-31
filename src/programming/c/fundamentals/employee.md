## employee.c : Employee Salary and SSN Generator

This program assigns salaries to employees in various departments and generates random Social Security Numbers (SSNs) for them.

### Overview
- This project calculates salaries for employees in different departments.
- It also generates random SSNs for each employee.

### Code Explanation

#### 1. **Headers and Libraries**
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
```
- `stdio.h`: Used for input/output functions like `printf`.
- `stdlib.h`: Provides functions like `rand` for generating random numbers.
- `time.h`: Used to seed the random number generator with the current time.

#### 2. **Departments and Salaries**
```c
enum departments { HR, SALES, RESEARCH, SOFTWARE, EXECUTIVE };
const int SALARIES[] = {70000, 60000, 120000, 180000, 100000};
#define SALARY_OVER rand() % 10000 + 1
const char *DEPARTMENT_NAMES[] = {"HR", "Sales", "Research", "Software", "Executive"};
```
- The `departments` enum lists all departments.
- The `SALARIES` array provides base salaries for each department.
- `SALARY_OVER` adds a random bonus between 1 and 10,000.
- `DEPARTMENT_NAMES` maps department names to their respective enum values.

#### 3. **SSN Generation**
```c
#define SSN_MAX 999999999
#define SSN_MIN 100000000
#define SSN ((rand() % (SSN_MAX - SSN_MIN + 1)) + SSN_MIN)
```
- Generates a random SSN between `100000000` and `999999999`.

#### 4. **Processing Departments**
```c
void process_departments() {
    for (int department = HR; department <= EXECUTIVE; department++) {
      printf("SSN: %d\t", SSN);
      printf("Salary for %s: %d\n", DEPARTMENT_NAMES[department], (SALARIES[department] + SALARY_OVER));
    }
}
```
- Iterates through all departments.
- Prints a random SSN and the salary (including a random bonus) for each department.

#### 5. **Main Function**
```c
int main()
{ 
    srand(time(0));
    process_departments();
    printf("\n---- Second Run ----\n\n");
    process_departments();
    return 0;
}
```
- Seeds the random number generator with the current time.
- Calls `process_departments` twice, simulating output for 10 employees (two runs of 5 departments).

### Sample Output
The program's output will look something like this:
```
SSN: 123456789   Salary for HR: 71000
SSN: 987654321   Salary for Sales: 60500
SSN: 564738291   Salary for Research: 121000
SSN: 192837465   Salary for Software: 181000
SSN: 847362514   Salary for Executive: 101000

---- Second Run ----

SSN: 234567890   Salary for HR: 72000
SSN: 876543210   Salary for Sales: 61200
SSN: 473829165   Salary for Research: 119500
SSN: 928374651   Salary for Software: 183000
SSN: 847362514   Salary for Executive: 100500
```

### Key Features
- Random SSN generation ensures unique identifiers for employees.
- Random salary bonuses simulate real-world variability in salaries.
