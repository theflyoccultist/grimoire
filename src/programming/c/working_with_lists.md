## Working with Lists Example in C

This program demonstrates the creation, manipulation, and sorting of a linked list using the Bubble Sort algorithm. The list is initially populated with random numbers, converted into a linked list, and then sorted.

### Overview
- Generates an array of random integers.
- Converts the array into a linked list.
- Sorts the linked list using an adapted Bubble Sort algorithm.

### Key Features
1. **Linked List Operations**:
   - Creation of nodes and linked lists.
   - Adding elements to the front of the list.
   - Conversion of an array to a linked list.
   - Traversing and freeing a linked list.
2. **Sorting Mechanism**:
   - Bubble Sort algorithm adapted for linked lists.
3. **Random Number Generation**:
   - Generates random integers between 0 and 100.

---

### Code Breakdown

#### 1. **Headers and Macros**
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 100
```
- `stdio.h`: Provides input/output functions like `printf`.
- `stdlib.h`: For memory allocation (`malloc`) and random number generation (`rand`).
- `time.h`: Used to seed the random number generator with the system time.
- `SIZE`: The size of the array and the linked list (100 elements).

---

#### 2. **Linked List Structure**
```c
typedef struct list { 
    int data;
    struct list *next;
} list;
```
- **`data`**: Holds the value of the node.
- **`next`**: Pointer to the next node in the list.

---

#### 3. **Node Creation**
```c
list* create_list(int d) {
    list* head = (list*)malloc(sizeof(list));
    head->data = d;
    head->next = NULL;
    return head;
}
```
- Allocates memory for a new node and initializes its data.

---

#### 4. **Adding Nodes to the List**
```c
list* add_to_front(int d, list* h) {
    list* head = create_list(d);
    head->next = h;
    return head;
}
```
- Adds a new node to the front of the list.

---

#### 5. **Array to Linked List Conversion**
```c
list* array_to_list(int d[], int size) {
    list* head = create_list(d[0]);
    for (int i = 1; i < size; i++) {
        head = add_to_front(d[i], head);
    }
    return head;
}
```
- Converts an array of integers into a linked list.

---

#### 6. **Freeing the List**
```c
void free_list(list *head) {
    list* current = head;
    list* next;

    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}
```
- Traverses through the list and frees each node to prevent memory leaks.

---

#### 7. **Random Number Generation**
```c
int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}
```
- Generates a random integer between `min` and `max`.

---

#### 8. **Bubble Sort Adaptation**
```c
void bubbleSort(list* h) {
    if (h == NULL || h->next == NULL) return;

    list *i, *j;
    for (i = h; i != NULL; i = i->next) {
        for (j = i->next; j != NULL; j = j->next) {
            if (i->data > j->data) {
                swap(i, j);
            }
        }
    }
}
```
- Sorts the linked list using the Bubble Sort algorithm.
- Compares adjacent nodes and swaps their data if they are out of order.

---

#### 9. **Swap Function**
```c
void swap(list* a, list* b) {
    int temp = a->data;
    a->data = b->data;
    b->data = temp;
}
```
- Swaps the `data` fields of two nodes in the list.

---

#### 10. **Printing the List**
```c
void print_list(list *h) {
    int count = 0;
    while (h != NULL) {
        printf("%d\t", h->data);
        count++;
        if (count % 5 == 0) printf("\n");
        h = h->next;
    }
}
```
- Prints the linked list's elements in rows of 5 for better readability.

---

#### 11. **Main Function**
```c
int main() {
    srand(time(NULL));
    list* head = NULL;

    int data[SIZE];

    for (int i = 0; i < SIZE; i++) {
        data[i] = getRandomNumber(0, 100);
    }

    head = array_to_list(data, SIZE);

    printf("\nBefore sorting\n");
    print_list(head);
    printf("\n");

    bubbleSort(head);

    printf("After Sorting\n");
    print_list(head);

    free_list(head);

    return 0;
}
```
- Initializes an array with 100 random integers.
- Converts the array into a linked list.
- Prints the list before and after sorting.
- Frees the list at the end to release memory.

---

### Sample Output
Before Sorting:
```
45	23	67	89	12	
34	78	56	90	11	
...
```

After Sorting:
```
1	2	5	6	9	
10	11	12	14	15	
...
```

---

### Key Points
1. **Linked List Manipulation**:
   - Demonstrates creation, traversal, and memory management.
2. **Sorting Algorithm**:
   - Adapts Bubble Sort for linked lists, showcasing its flexibility.
3. **Random Number Handling**:
   - Generates randomized inputs to simulate real-world scenarios.

### Limitations
1. **Inefficient Sorting**:
   - Bubble Sort has \(O(n^2)\) complexity, making it unsuitable for large datasets.
2. **Memory Overhead**:
   - The program uses dynamic memory allocation, which requires careful management to prevent leaks.

---

### Possible Improvements
1. **Sorting Efficiency**:
   - Replace Bubble Sort with a more efficient algorithm like Merge Sort.
2. **Dynamic Size**:
   - Allow the user to specify the size of the list at runtime.
3. **Error Handling**:
   - Add checks for memory allocation and null pointers.
