# Deep Copy Constructor

C++ has a doubly linked list in the std library, but you should know how they are implemented under the hood.

### Why Do We Need a Deep Copy Constructor?

By default, when you copy an object in C++, the compiler performs a shallow copy, meaning:

- It copies the memory addresses instead of duplicating the data itself.
- If the copied object modifies the data, the original object also changes because they share the same memory.
- When one object is destroyed, the other might point to an invalid memory location (dangling pointers).

To avoid this nightmare, we manually implement a deep copy constructor. This ensures: 
- Each object gets its own separate copy of the data.
- Deleting one object doesn’t affect the others.
- No accidental shared memory corruption.

```cpp
#include <iostream>
using namespace std;

class list_element {
public:
    int d;
    list_element* next;

    list_element(int n = 0, list_element* ptr = nullptr) : d(n), next(ptr) {}
};

class list {
public:
    list() : head(nullptr), cursor(nullptr) {}
    ~list();  // Destructor to free memory
    list(const list& lst);  // Copy constructor

    void prepend(int n);    // Insert at front value n
    int get_element() { return cursor->d; }
    void advanced() { cursor = cursor->next; }
    void print();

private:
    list_element* head;
    list_element* cursor;
};

// Destructor implementation
list::~list() {
    while (head != nullptr) {
        list_element* temp = head;
        head = head->next;
        delete temp;
    }
}

// Deep copy constructor
list::list(const list& lst) {
    if (lst.head == nullptr) {
        head = nullptr;
        cursor = nullptr;
    } else {
        cursor = lst.head;
        list_element* h = new list_element(cursor->d);
        list_element* previous = h;
        head = h;
        cursor = cursor->next;

        while (cursor != nullptr) {
            h = new list_element(cursor->d);
            previous->next = h;
            previous = h;
            cursor = cursor->next;
        }

        cursor = head;
    }
}

void list::prepend(int n) {
    if (head == nullptr)  // empty list case
        cursor = head = new list_element(n, head);
    else    // add to front-chain
        head = new list_element(n, head);
}

void list::print() {
    list_element* h = head;
    while (h != nullptr) {
        cout << h->d << ", ";
        h = h->next;
    }
    cout << "###" << endl;
}

int main() {
    list a, b;
    a.prepend(9); a.prepend(8);
    cout << "list a" << endl;
    a.print();

    // Use the copy constructor
    list c = a;
    cout << "list c (copy of a)" << endl;
    c.print();

    for (int i = 0; i < 40; ++i)
        b.prepend(i * i);
    cout << "list b" << endl;
    b.print();

    return 0;
}
```

### Expected Output

```cpp
list a
8, 9, ###
list c (copy of a)
8, 9, ###
list b
1521, 1444, 1369, ..., 0, ###
```

Why is list c identical to list a?
- Because it was deep copied, not shallow copied.
- Modifying c will not affect a, proving that they are independent lists.

## C++ Rule of Three (or Five)

If a class manages dynamic memory, you MUST define these manually:

- Copy Constructor (list(const list&))
- Copy Assignment Operator (operator=)
- Destructor (~list())
- (Optional) Move Constructor (list(list&&))
- (Optional) Move Assignment Operator (operator=(list&&))

Without these, you get shallow copies, which can lead to: 
- Memory leaks
- Double deletion errors
- Undefined behavior
