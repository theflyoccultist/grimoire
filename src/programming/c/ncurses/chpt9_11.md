### 📚 Chapters 9–10–11: Input Modes, Color Witchcraft, and Keyboard Sorcery

---

#### **🧩 Chapter 9: Input Timing & Modes**

**Learn the nuanced differences between:**

* `cbreak()` – reads input *immediately*, char by char (but still blocks).
* `halfdelay(t)` – like cbreak, but `getch()` times out after *tenths of a second*.
* `nodelay(stdscr, TRUE)` – makes `getch()` non-blocking entirely.
* `timeout(ms)` – `getch()` blocks for up to `ms` milliseconds.

```c
#include <ncurses.h>
#include <stdbool.h>

int main(int argc, char **argv) {
  initscr();
  noecho();

  // Input mode options (uncomment to test different ones)
  cbreak();                 // read instantly but still blocks
  // halfdelay(10);         // waits up to 1s (10 * 0.1s)
  // nodelay(stdscr, TRUE); // never blocks
  timeout(500);             // wait 500ms max for input

  int c;
  while ((c = getch()) != 'x') {
    printw("%d\n", c);
  }

  endwin();
  return 0;
}
```

---

#### **🎨 Chapter 10: Color and Attribute Combos**

**Level up your `ncurses` glam** with:

* Multiple color pairs
* Mixing colors with attributes like `A_REVERSE`
* Creating `chtype` values with embedded style

```c
#include <curses.h>

int main(int argc, char **argv) {
  initscr();
  if (!has_colors()) {
    endwin();
    printf("Color can't be used.\n");
    return 1;
  }

  start_color();

  init_pair(1, COLOR_YELLOW, COLOR_BLACK);
  init_pair(2, COLOR_RED, COLOR_BLACK);

  attron(A_REVERSE | COLOR_PAIR(2));
  mvaddch(5, 5, 'a');
  mvaddch(5, 6, 'b');
  mvaddch(5, 7, 'c');
  attroff(A_REVERSE | COLOR_PAIR(2));

  // Color + attribute embedded in a single value
  chtype c = '@' | A_REVERSE | COLOR_PAIR(1);
  mvaddch(9, 5, c);

  getch();
  endwin();
  return 0;
}
```

---

#### **⌨️ Chapter 11: Ctrl Key Handling**

**Detect Ctrl + key combos like a boss**
(e.g., for shortcuts or a baby `nano` editor vibe)

```c
#include <ncurses.h>

#define ctrl(x) ((x) & 0x1F)
// Shift detection? Sorry hun, not in this terminal's reality

int main(int argc, char **argv) {
  initscr();
  noecho();

  char ch;
  while ((ch = getch())) {
    mvprintw(1, 0, "KEY NAME : %s - 0x%02x\n", keyname(ch), ch);
    if (ch == ctrl('a')) {
      mvprintw(0, 0, "Detected Ctrl+A!");
    }
  }

  endwin();
  return 0;
}
```
