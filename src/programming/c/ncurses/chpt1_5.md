### 📦 Setup: Makefile

```makefile
all: intro

intro: intro.c
	gcc -o output intro.c -lncurses
```

Simple and essential. Without `-lncurses`, nothing works and the curses gods laugh at you.

---

### ✨ Chapter 1: Hello World (But Make It Terminal)

**Concepts introduced:**

* `initscr()`, `printw`, `refresh`, `getch`, and `endwin`
* Cursor positioning with `move()`
* Replacing `printf` with `printw` because this is now a ~~windowed~~ world.

```c
// Hello world - moving curses

#include <ncurses.h>

int main(int argc, char **argv) {
  // Initialize the screen
  // sets up memory and clears the screen
  initscr();

  int x, y;
  x = y = 10;

  // moves the cursor to the specified location
  // ncurses works with y, then x axis
  move(y, x);

  // prints string(const char *)
  printw("Hello World");

  // refreshes the screen to match what's in memory
  refresh();

  // what's for user input, returns int value of that key
  int c = getch();

  // clears the screen
  clear();

  mvprintw(0, 0, "%d", c);

  getch();

  // deallocates memory and ends ncurses
  endwin();

  return 0;
}
```

---

### 🧱 Chapter 2: Your First Box

**Concepts introduced:**

* Basic window creation with `newwin`
* Drawing a border with `box()`
* Printing inside a window with `mvwprintw`

```c
// Basics of windows

#include <ncurses.h>

int main(int argc, char **argv) {
  initscr();
  int height = 10, width = 20, start_y = 10, start_x = 10;

  WINDOW *win = newwin(height, width, start_y, start_x);
  refresh();

  box(win, 0, 0);
  mvwprintw(win, 1, 1, "this is my box");
  wrefresh(win);

  getch();
  endwin();
  return 0;
}
```

---

### 📦 Chapter 3: Dialog Box with Custom Borders

**Concepts introduced:**

* `cbreak()`, `raw()`, and `noecho()` (user input control)
* Custom borders with `wborder()`
* ASCII fun with corner and edge characters

```c
// Display a dialog box in ncurses

#include <ncurses.h>

int main(int argc, char **argv) {
  /* NCURSES START */
  initscr();
  cbreak(); // lets you exit the program with Ctrl + C. Default behavior
  raw();    // takes all input as raw input
  noecho(); // user input does not show up on screen

  int height = 10, width = 20, start_y = 10, start_x = 10;
  
  WINDOW *win = newwin(height, width, start_y, start_x);
  refresh();

  char c = '+'; // workaround if you don't know ASCII values
  char space = ' ';

  // box(win, (int)c, 104); // these are ASCII values

  // a more fine tuned box
  int left = 103, right = 103, top = 104;
  int bottom = (int)space;
  int tlc = (int c), trc = (int)c, blc = bottom, brc = bottom;
  
  wborder(win, left, right, top, bottom, tlc, trc, blc, brc);
  mvwprintw(win, 2, 2, "my box");
  wrefresh(win);

  getch();
  getch();

  endwin();
  /* NCURSES END */
  return 0;
}
```

---

### 🎨 Chapter 4: Attributes and Colors

**Concepts introduced:**

* `has_colors()`, `start_color()`, `init_pair()`
* `COLOR_PAIR()`, `attron`, `attroff`
* Changing color definitions with `init_color()`
* Text attributes like `A_BOLD`, `A_BLINK`, `A_REVERSE`

```c
// Attributes and colors

#include <ncurses.h>

int main(int argc, char **argv) {
  /* NCURSES START */
  initscr();
  noecho();

  if (!has_colors()) {
    printw("No colors detected");
    getch();
    return -1;
  }
  
  start_color();
  init_pair(1, COLOR_CYAN, COLOR_MAGENTA); // pair number 1
  
  /*
   * COLOR_PAIR(n)
   * COLOR_BLACK    0
   * COLOR_RED      1
   * COLOR_GREEN    2
   * COLOR_YELLOW   3
   * COLOR_BLUE     4
   * COLOR_MAGENTA  5
   * COLOR_CYAN     6
   * COLOR_WHITE    7
   */


  // To change colors
  if (can_change_color()) {
    printw("Can change color");
    init_color(COLOR_CYAN, 123, 122, 138);
  }

  attron(COLOR_PAIR(1));
  printw("Test");
  attroff(COLOR_PAIR(1));

  /*
    A_NORMAL        Normal display (no highlight)
    A_STANDOUT      Best highlighting mode of the terminal.
    A_UNDERLINE     Underlining
    A_REVERSE       Reverse video
    A_BLINK         Blinking
    A_DIM           Half bright
    A_BOLD          Extra bright or bold
    A_PROTECT       Protected mode
    A_INVIS         Invisible or blank mode
    A_ALTCHARSET    Alternate character set
    A_CHARTEXT      Bit-mask to extract a character
    COLOR_PAIR(n)   Color-pair number n
  */

  getch();
  endwin();
  /* NCURSES END */
  return 0;
}
```

---

### 📋 Chapter 5: The Beginnings of a Menu

**Concepts introduced:**

* More `WINDOW` geometry functions: `getyx`, `getbegyx`, `getmaxyx`
* Laying the groundwork for interactive menu systems

```c
// Build a menu with ncurses

#include <ncurses.h>

int main(int argc, char **argv) {
  initscr();
  noecho();
  cbreak();

  int y, x, yBeg, xBeg, yMax, xMax;

  WINDOW *win = newwin(10, 20, 10, 10);

  getyx(stdscr, y, x);
  getbegyx(win, yBeg, xBeg);
  getmaxyx(stdscr, yMax, xMax);

  mvprintw(yMax / 2, xMax / 2, "%d %d", yBeg, xBeg);
  // printw("%d %d %d %d %d %d", y, x, yBeg, xBeg, yMax, xMax);

  // make sure the program waits before exiting
  getch();
  endwin();
  return 0;
}
```
