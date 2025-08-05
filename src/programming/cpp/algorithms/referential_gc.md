## Referential Garbage Collection

- Rather than a full copy, we maintain pointers to an aggregate, and a `use` counter.
- When `use` (reference count) goes to zero, we actually call `delete` on an object.
- When we create a new instance, `use` is initialized to 1.

```cpp
#include <iostream>
#include <ostream>

class Tree; // forward declare it first

class Node {
  friend class Tree;
  friend std::ostream &operator<<(std::ostream &, const Tree &);
  int use; // reference count, allows deletion if 0

protected:
  Node() { use = 1; }
  virtual void print(std::ostream &) = 0;
  virtual ~Node() { std::cout << "Node destroyed\n"; }
  virtual int eval() = 0; // pure
};

// class for one constant: inherited from the Node class
class ConstNode : public Node {
  int value;

public:
  ConstNode(int v) : value(v) {}
  void print(std::ostream &o) override { o << value; }
  int eval() override { return value; }
};

class Tree {
  friend class Node;
  // Polymorphic print
  // Invokes at runtime the appropriate print
  friend std::ostream &operator<<(std::ostream &o, const Tree &t) {
    t.p->print(o);
    return o;
  }
  Node *p; // Polymorphic pointer. This setup allows you to call the right
           // evaluation function

public:
  Tree(int); // constant
  Tree(const Tree &t) {
    p = t.p;
    ++p->use;
  } // copy constructor, increment use - referential copy

  ~Tree() {
    if (--p->use == 0)
      delete p;
  } // destructor decrement use and test if use is 0
  void operator=(const Tree &t) {
    if (this != &t) {
      ++t.p->use;
      if (--p->use == 0)
        delete p;
      p = t.p;
    }
  };

  int eval() { return p->eval(); }
};

Tree::Tree(int n) { p = new ConstNode(n); }

int main() {
  Tree t(42);
  std::cout << "Tree: " << t << std::endl;
  std::cout << "Evaluated: " << t.eval() << std::endl;
  return 0;
}
```
