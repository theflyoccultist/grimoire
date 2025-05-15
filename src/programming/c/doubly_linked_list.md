## Doubly Linked List

```c
// Given a list of integers, the program will sort the list using merge sort and remove any duplicates.
// It uses a doubly linked list to store the integers.

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 200

// Define the list node structure
typedef struct list { 
    int data;           // Data stored in the node
    struct list *next;  // Pointer to the next node
    struct list *prev;  // Pointer to the previous node
} list;

// Function to create a new doubly linked list
struct list* create_list (int d) 
{
    struct list* newList = (struct list*)malloc( sizeof(struct list) );
        if (newList == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
        }

    newList -> data = d;
    newList -> next = NULL;
    newList -> prev = NULL;
    
    return newList;
}

// Function to add a new node with data 'd' to the front of the list 'h'
struct list* add_to_front(int d, list* h)
{
    list* head = create_list(d);

    head -> next = h;
    if (h != NULL) {
        h -> prev = head;
    }

    return head;
}

// Function to convert an array of integers into a linked list
struct list* array_to_list(int d[], int size)
{
    if (d == NULL || size <= 0) {
    fprintf(stderr, "Invalid array or size\n");
    return NULL;
    }
    // Create the head of the list using the first element of the array
    list* head = create_list(d[0]);
    
    // Loop through the remaining elements of the array
    for (int i = 1; i < size; i++)
    {
        // Add each element to the front of the list
        head = add_to_front(d[i], head);
    }
    // Return the head of the linked list
    return head;
}

// Function to generate random numbers between 0 and 100
int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}

struct list* split_list(struct list* head) {
    struct list* slow = head;
    struct list* fast = head;

    while (fast != NULL && fast -> next != NULL) {
        slow = slow -> next;
        fast = fast -> next -> next;
    }

    if (slow != NULL && slow -> prev != NULL) {
        slow -> prev -> next = NULL;    // Break forward link
        slow -> prev = NULL;            // Break backward link
    }

    return slow; // Return the head of the second half
}

struct list* merge(struct list* head_a, struct list* head_b) {
    if (head_a == NULL) return head_b;
    if (head_b == NULL) return head_a;
    
    struct list* result = NULL;

    // Compare data and recursively merge
    if (head_a -> data < head_b -> data) {
        result = head_a;
        result -> next = merge(head_a -> next, head_b);
        if (result -> next != NULL) {
            result -> next -> prev = result; // Update backward link            
        }
    } else {
        result = head_b;
        result -> next = merge(head_a, head_b -> next);
        if (result -> next != NULL) {
            result -> next -> prev = result;
        }    
    }
    
    return result;
}

struct list* merge_sort(struct list* head) {
    if (head == NULL || head -> next == NULL) return head;

    struct list* second_half = split_list(head); // Split the list into two halves

    // Recursively sort half
    struct list* left_sorted = merge_sort(head);
    struct list* right_sorted = merge_sort(second_half);

    return merge(left_sorted, right_sorted);
}

// This function unlinks the duplicate node in next pointer.
struct list* remove_duplicates(struct list* head) {
    if (head == NULL || head -> next == NULL) return head;

    struct list* current = head;

    while (current != NULL && current -> next != NULL) {
        if (current -> data == current -> next -> data) {
            struct list* duplicate = current -> next;

            current -> next = duplicate -> next;

            if (duplicate -> next != NULL) {
                duplicate -> next -> prev = current;
            }

            free(duplicate);

        } else {
            current = current -> next;
        }
    }
    return head;
}

// Print the numbers in rows of 5
void print_list (struct list *head) {
    if (head == NULL || head -> next == NULL) return;

    int count = 0;
    while (head != NULL) {
        printf("%d\t", head -> data);
        count ++;
        if (count % 5 == 0) printf("\n");
        head = head -> next;
    }
}

void free_list(struct list *head) {
    list* current = head;
    list* next;

    // Traverse the list and free each node
    while (current != NULL) {
        next = current -> next; // Save the pointer to the next node
        free(current);          // Free the current node
        current = next;         // Move to the next node
    }
}

int main() {
    srand(time(NULL));

    int data[SIZE];
    for (int i = 0; i < SIZE; i++) {
        data[i] = getRandomNumber(0, 49);
    }

    // Convert the array to a doubly linked list
    struct list* head = array_to_list(data, SIZE);

    printf("Before Sorting:\n");
    print_list(head);
    printf("\n");

    // Perform merge sort on the list, and remove duplicates
    head = merge_sort(head);
    remove_duplicates(head);

    printf("After Sorting and Removing Duplicates:\n");
    print_list(head);

    free_list(head); // Free allocated memory

    return 0;
}
```


---

### Example Input and Output for a Doubly Linked List Program

#### Example Input
Let's assume this doubly linked list program supports typical operations like adding, deleting, and traversing nodes. Here’s a sample input sequence:

1. Add 10 to the list.
2. Add 20 to the list.
3. Add 30 to the list.
4. Traverse the list forward.
5. Traverse the list backward.
6. Delete 20 from the list.
7. Traverse the list forward again.

#### Example Output
**Step-by-Step Output:**

1. Adding 10 to the list:  
   `List: 10`

2. Adding 20 to the list:  
   `List: 10 <-> 20`

3. Adding 30 to the list:  
   `List: 10 <-> 20 <-> 30`

4. Traversing forward:  
   `Forward: 10 -> 20 -> 30`

5. Traversing backward:  
   `Backward: 30 -> 20 -> 10`

6. Deleting 20 from the list:  
   `List: 10 <-> 30`

7. Traversing forward again:  
   `Forward: 10 -> 30`

---

### Merge Sort in Doubly Linked Lists

#### How It Works
Merge sort is a divide-and-conquer algorithm that splits the list into smaller sublists, sorts them individually, and then merges them back together in sorted order. With doubly linked lists, this algorithm can be implemented efficiently because of the bidirectional traversal and the ability to split and merge nodes easily.

#### Key Functions:
1. **`split_list`**  
   This function divides the doubly linked list into two halves. The midpoint is typically found using a slow and fast pointer approach.

2. **`merge`**  
   This function takes two sorted sublists and merges them into a single sorted list, maintaining the order.

#### Advantages of Merge Sort in Doubly Linked Lists:
- **Stability:** Maintains the relative order of equal elements.
- **Efficiency:** Performs well on linked lists as it doesn't require random access to elements.
- **Recursive Nature:** Leverages the recursive structure of merge sort for easy implementation.

#### Example Input and Output for Merge Sort

**Input:**  
Unsorted list: `30 <-> 10 <-> 20 <-> 50 <-> 40`

**Output:**  
Sorted list: `10 <-> 20 <-> 30 <-> 40 <-> 50`

---

This addition will make your documentation even more robust and appealing to readers! If you'd like, I can analyze the `double_linked_lists.c` file to verify and explain your implementation of `split_list` and `merge`.

### Advantages of a Doubly Linked List Over a Singly Linked List

1. **Bidirectional Traversal:**  
   The biggest advantage is the ability to traverse both forwards and backwards. This makes certain algorithms and operations easier to implement.

2. **Easier Deletion:**  
   Deleting a node is simpler because you have a pointer to the previous node, so there's no need to traverse the list to find it.

3. **Flexibility in Insertion:**  
   Insertion after or before a given node is straightforward as you can access both the next and previous pointers.

---

### Drawbacks of a Doubly Linked List Compared to a Singly Linked List

1. **Increased Memory Usage:**  
   Each node requires an extra pointer (`prev`), which doubles the memory used for pointers.

2. **Reduced Performance:**  
   Due to the extra pointer, operations like insertion and deletion involve slightly more overhead for managing the `prev` pointer.

3. **Complexity:**  
   The implementation is more complex, especially when handling edge cases like inserting or deleting the first or last node.

---

### Summary
While a doubly linked list provides more flexibility with bidirectional traversal and easier node deletion/insertion, it comes at the cost of increased memory usage and slightly reduced performance. It's an excellent choice for scenarios where frequent backward traversal is needed or when node deletion happens often.
