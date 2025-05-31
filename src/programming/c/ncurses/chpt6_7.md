### 🧾 Chapter 6: Reading User Input in Pure C (No C++ Sorcery Allowed)

**Concepts introduced:**

* `getstr()` for reading strings from the user
* Centered text with `mvprintw()` and screen dimensions via `getmaxyx()`
* Classic C-style string handling (`char[]` and `strlen()`)

```c
// Working with user input
#include <ncurses.h>
#include <string.h>

int main() {
  char msg[] = "Enter a string";
  char str[80];  // fixed-size buffer (because this is C, not a luxury resort)

  int row, col;
  initscr();
  getmaxyx(stdscr, row, col);

  mvprintw(row / 2, (col - strlen(msg)) / 2, "%s", msg);
  getstr(str);  // reads a line of text

  mvprintw(LINES - 2, 0, "You entered: %s", str);
  getch();
  endwin();

  return 0;
}
```

> ⚠️ Reminder: `getstr()` is a bit raw and assumes you won’t type more than 79 characters. If you do, chaos. Handle with care or replace with `wgetnstr()` for actual safety.

---

### 🎮 Chapter 7: Building a Menu with Arrow Keys (Real Game Dev Vibes)

**Concepts introduced:**

* Menu system with `const char*` and `keypad()`
* Highlighting selections with `A_REVERSE`
* User selection handling with `KEY_UP`, `KEY_DOWN`, and Enter (`10`)
* Fixed buffer index handling to prevent out-of-bounds disasters

```c
#include <ncurses.h>

int main(int argc, char **argv) {
  initscr();
  noecho();
  cbreak();

  int yMax, xMax;
  getmaxyx(stdscr, yMax, xMax);

  WINDOW *menuwin = newwin(6, xMax - 12, yMax - 8, 5);
  box(menuwin, 0, 0);
  refresh();
  wrefresh(menuwin);

  keypad(menuwin, true);

  const char *choices[3] = {"Walk", "Jog", "Run"};
  int choice;
  int highlight = 0;

  while (1) {
    for (int i = 0; i < 3; ++i) {
      if (i == highlight)
        wattron(menuwin, A_REVERSE);

      mvwprintw(menuwin, i + 1, 1, "%s", choices[i]);

      wattroff(menuwin, A_REVERSE);
    }

    choice = wgetch(menuwin);

    switch (choice) {
      case KEY_UP:
        highlight--;
        if (highlight < 0)
          highlight = 0;
        break;
      case KEY_DOWN:
        highlight++;
        if (highlight > 2)
          highlight = 2;
        break;
      default:
        break;
    }

    if (choice == 10)  // Enter key
      break;
  }

  clear();
  mvprintw(0, 0, "Your choice: %s", choices[highlight]);
  refresh();

  getch();
  endwin();
  return 0;
}
```

