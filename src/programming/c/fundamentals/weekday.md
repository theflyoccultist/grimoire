## weekday.c

### Purpose
This C program demonstrates the use of `enum`, `switch`, and `case` constructs in C by working with days of the week. It includes functions to get the next and previous day and prints the corresponding day names.

### Code Explanation
1. **Enum Definition**:  
   - `enum day {sun, mon, tue, wed, thu, fri, sat};`  
     Defines an enumerated type `day` to represent days of the week.

2. **print_day Function**:  
   - Takes an enum `day` value as input and prints the corresponding day name using a `switch` statement. If the input is invalid, it prints an error message.

3. **next_day Function**:  
   - Takes an enum `day` value as input and computes the next day based on modulo arithmetic.

4. **previous_day Function**:  
   - Takes an enum `day` value as input and computes the previous day based on modulo arithmetic.

5. **main Function**:  
   - Demonstrates how to use the enumerated type and the functions:
     - Initializes today as `fri`.
     - Prints the current day.
     - Prints an invalid day (to demonstrate error handling).
     - Prints the next and previous days.

### Example Usage
Here’s how the program would behave:

```c
enum day today = fri;
print_day(today);         // Outputs: friday
print_day(7);             // Outputs: 7 is an error
print_day(next_day(today)); // Outputs: saturday
print_day(previous_day(today)); // Expected Output: thursday
```

### Output Example
When you compile and run the program:

```plaintext
friday
7 is an error
saturday
thursday
```

### Complete Code

```c
#include <stdio.h>

enum day {sun, mon, tue, wed, thu, fri, sat};

void print_day (enum day d) {
  switch(d) {
    case sun: printf("sunday"); break;
    case mon: printf("monday"); break;
    case tue: printf("tuesday"); break;
    case wed: printf("wednesday"); break;
    case thu: printf("thursday"); break;
    case fri: printf("friday"); break;
    case sat: printf("saturday"); break;
    default: printf("%d is an error", d);
  }
}

enum day next_day (enum day d) {
  return (d + 1) % 7;
}

enum day previous_day (enum day d) {
  return (d + 6) % 7;
}

int main() {
  enum day today = fri;
  print_day(today);
  printf("\n");
  print_day(7);
  printf("\n");
  print_day(next_day(today));
  printf("\n");
  print_day(previous_day(today));
  return 0;
}
```

### Key Learning Points
- Enumerations (`enum`) are useful for defining named constants.
- `switch` and `case` statements simplify multi-branch conditional logic.
- Be cautious of operator precedence when performing arithmetic operations.
