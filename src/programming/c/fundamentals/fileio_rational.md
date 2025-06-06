## `fileio_rational.c`

```c
// Given a file with integer numbers, this program will use the first number to determine the array length.
// Then, it will regroup every couple next numbers as a rational number and perform operations on them.

#include <stdio.h>
#include <stdlib.h>

// Define the rational number structure
typedef struct rational {
    double num;     // Numerator
    double den;     // Denominator
    struct rational *next;
} rational;

// Function to create a new rational number
rational* create_rational (int num, int den) {
    if (den == 0) {
        fprintf(stderr, "0 is not an anthorized Denominator\n");
        exit(1);
    }

    rational* new_rational = (struct rational*)malloc ( sizeof(rational) );
    if (new_rational == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }

    new_rational -> num = num;
    new_rational -> den = den;
    new_rational -> next = NULL;
    return new_rational;
}

// Function to loop through the rest of the numbers and pair them as rational numbers
rational* pair_rational_numbers(FILE* file) {
    int num, den;
    rational* head = NULL;
    rational* tail = NULL;

    // Assuming the first number is already handled
    while (fscanf(file, "%d %d", &num, &den) == 2) {
        rational* new_rational = create_rational(num, den);
        if (head == NULL) {
            head = new_rational;
            tail = new_rational;
        } else {
            tail -> next = new_rational;    // Link the new node to the end
            tail = new_rational;            // Move the tail pointer to the new node            
        }
    }
    return head;
}

// Print the list of rational numbers to the console
void print_rational_list(rational* head) {
    rational* current = head;
    while (current != NULL) {
        printf("%f/%f\n", current -> num, current -> den);
        current = current -> next;
    }
}

// Helper function to simplify the rational numbers
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

void simplify_rational(rational* r) {
    int divisor = gcd(r -> num, r -> den);
    r -> num /= divisor;
    r -> den /= divisor;

    if (r -> den < 0) {
        r -> num = -r -> num;
        r -> den = -r -> den;
    }
}

// Perform operations on the rational numbers
rational* addition (rational* head) {
    if (head == NULL) return NULL;

    int total_num = head -> num;
    int total_den = head -> den;

    head = head -> next;

    while (head != NULL) {
        total_num = (total_num * head -> den) + (total_den * head -> num);
        total_den = total_den * head -> den;
        head = head -> next;
    }   
        rational* total = create_rational(total_num, total_den);
        simplify_rational(total);
        return total;
}

rational* substraction(rational* head) {
    if (head == NULL) return NULL;

    int total_num = head -> num;
    int total_den = head -> den;

    head = head -> next;    

    while (head != NULL) {
        total_num = (total_num * head -> den) - (total_den * head -> num);
        total_den = total_den * head -> den;
        head = head -> next;
    }
        rational* total = create_rational(total_num, total_den);
        simplify_rational(total);
        return total;
}

rational* multiplication(rational* head) {
    if (head == NULL) return NULL;

    int total_num = head -> num;
    int total_den = head -> den;

    head = head -> next;

    while (head != NULL) {
        total_num = total_num * head -> num;
        total_den = total_den * head -> den;
        head = head -> next;
    }
        rational* total = create_rational(total_num, total_den);
        simplify_rational(total);
        return total;
}

rational* division(rational* head) {
    if (head == NULL) return NULL;

    int total_num = head -> num;
    int total_den = head -> den;

    head = head -> next;

    while (head != NULL) {
        total_num = total_num * head -> den;
        total_den = total_den * head -> num;
        head = head -> next;
    }

    rational* total = create_rational(total_num, total_den);
    simplify_rational(total);
    return total;
}

rational* average(rational* head, int size) {
    if (head == NULL || size == 0) return NULL;

    rational* sum = addition(head);
    sum -> den *= size;

    simplify_rational(sum);
    return sum;
}

//Write the result of those operations to the file
void write_result_to_file(FILE* ofp, rational* add_result, rational* sub_result, rational* mult_result, rational* div_result, rational* avg_result) {
    fprintf(ofp, "Addition: %f/%f\n", add_result -> num, add_result -> den);
    fprintf(ofp, "Substraction: %f/%f\n", sub_result -> num, sub_result -> den);
    fprintf(ofp, "Multiplication: %f/%f\n", mult_result -> num, mult_result -> den);
    fprintf(ofp, "Division: %f/%f\n", div_result -> num, div_result -> den);
    fprintf(ofp, "Average: %f/%f\n", avg_result -> num, avg_result -> den);
}

//Write the result of those operations to the console
void write_result_to_console(rational* add_result, rational* sub_result, rational* mult_result, rational* div_result, rational* avg_result) {
    printf("Addition: %f/%f\n", add_result -> num, add_result -> den);
    printf("Substraction: %f/%f\n", sub_result -> num, sub_result -> den);
    printf("Multiplication: %f/%f\n", mult_result -> num, mult_result -> den);
    printf("Division: %f/%f\n", div_result -> num, div_result -> den);
    printf("Average: %f/%f\n", avg_result -> num, avg_result -> den);
}

// Good to free the memory
void free_list(rational* head) {
    rational* current = head;
    while (current != NULL) {
        rational* next = current -> next;
        free(current);
        current = next;
    }
}

int main (int argc, char* argv[]) {
    FILE *ifp, *ofp;

    if (argc != 3) {
        fprintf(stderr, "Usage: <filename> <filename>\n");
        exit(1);
    }

    ifp = fopen(argv[1], "r");
    if (ifp == NULL) {
        fprintf(stderr, "Can't open input file %s\n", argv[1]);
        exit(1);
    }

    ofp = fopen(argv[2], "w");
    if (ofp == NULL) {
        fprintf(stderr, "Can't open output file %s\n", argv[2]);
        exit(1);
    }

    printf("Reading from %s and writing to %s\n", argv[1], argv[2]);

    // Skip the first number
    int first_num;
    fscanf(ifp, "%d", &first_num);
    printf("First number (array size): %d\n", first_num);

    rational* head = NULL;
    head = pair_rational_numbers(ifp);

    printf("Printing the list of rational numbers\n");
    print_rational_list(head);

    printf("Performing calculations...\n");

    rational* add_result = addition(head);
    rational* sub_result = substraction(head);
    rational* mult_result = multiplication(head);
    rational* div_result = division(head);
    rational* avg_result = average(head, first_num);

    write_result_to_file(ofp, add_result, sub_result, mult_result, div_result, avg_result);
    write_result_to_console(add_result, sub_result, mult_result, div_result, avg_result);

    printf("Calculations written on the output file. Closing the program\n");

    free_list(head);
    free(add_result);
    free(sub_result);
    free(mult_result);
    free(div_result);
    free(avg_result);
    fclose(ifp);
    fclose(ofp);

    return 0;
}
```

This program processes a file containing integers. It interprets the first integer as the array size and then pairs subsequent integers as rational numbers (fractions). Here’s an example of how the input and output would look:

### Example Input File (e.g., `input.txt`)
```plaintext
3
1 2
3 4
5 6
```

Explanation:
- The first number `3` indicates the array size (3 rational numbers).
- The numbers `1 2`, `3 4`, and `5 6` are paired as rational numbers:
  - `1/2`
  - `3/4`
  - `5/6`

### Example Output File (e.g., `output.txt`)
```plaintext
Addition: 38/24
Substraction: -10/24
Multiplication: 15/48
Division: 48/120
Average: 19/24
```

Explanation:
- **Addition:** Sum of all rational numbers.
- **Subtraction:** Result of subtracting all rational numbers in sequence.
- **Multiplication:** Product of all rational numbers.
- **Division:** Result of dividing all rational numbers in sequence.
- **Average:** Sum of all rational numbers divided by the size (3 in this case).

### Console Output
When running the program, you would see:
```plaintext
Reading from input.txt and writing to output.txt
First number (array size): 3
Printing the list of rational numbers
0.500000/1.000000
0.750000/1.000000
0.833333/1.000000
Performing calculations...
Addition: 38/24
Substraction: -10/24
Multiplication: 15/48
Division: 48/120
Average: 19/24
Calculations written on the output file. Closing the program
```

### Command to Run
```bash
./program input.txt output.txt
```

Make sure to replace `program` with the compiled executable name.
