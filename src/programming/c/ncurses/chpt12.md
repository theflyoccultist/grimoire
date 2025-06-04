## MenuBar with ncurses

`Makefile`
```Makefile
all: menu

menu: main.c menu.c submenu.c
	gcc -Wall -o menu main.c menu.c submenu.c -lncurses
```

---

`main.c`
```c
#include "menu.h"
#include "submenu.h"
#include <curses.h>

int main() {
  initscr();
  noecho();
  curs_set(0);

  int yMax, xMax;
  getmaxyx(stdscr, yMax, xMax);
  WINDOW *win = newwin(yMax / 2, xMax / 2, yMax / 4, xMax / 4);
  box(win, 0, 0);

  const char *file_items[] = {"open", "save", "quit", NULL};
  const char *edit_items[] = {"cut", "copy", "paste", NULL};
  const char *opt_items[] = {"settings", "lorem", "ipsum", NULL};

  Menu menus[] = {
      {2, "file", 'f', file_items},
      {7, "edit", 'e', edit_items},
      {12, "options", 'o', opt_items},
  };

  int num_menus = sizeof(menus) / sizeof(Menu);

  draw_menus(win, menus, num_menus);
  wrefresh(win);

  char ch;
  int active_index = -1;
  while ((ch = wgetch(win))) {
    unhighlight_all(win, menus, num_menus);

    for (int i = 0; i < num_menus; i++) {
      if (ch == menus[i].trigger) {
        highlight_menu(win, menus[i]);
        clear_submenu_area(win);
        active_index = i;
      }
      if (ch == ' ') {
        if (active_index != -1) {
          show_submenu(win, menus[active_index]);
          wrefresh(win);
        }
      }
    }
  }

  wrefresh(win);

  endwin();
  return 0;
}

```

Note the `const char *...items`:
these are how you would do an array of strings in c.
Note `bool submenu_open`: 

--- 

`menu.h`

```c
#ifndef MENU_H
#define MENU_H

#include <curses.h>

// top level menu label
typedef struct Menu {
  int start_x;
  const char *text;
  char trigger;
  const char **submenu;
} Menu;

typedef struct MenuItem {
  const char *label;
  int x;
} MenuItem;

void draw_menus(WINDOW *win, Menu menus[], int count);

void highlight_menu(WINDOW *win, Menu menu);

void unhighlight_all(WINDOW *win, Menu menus[], int count);

#endif // !_MENU_H_
```

Note how the structs are defined with `typedef struct ... { ... }`. These are for how you would structure your memory.

--- 

`menu.c`

```c
#include "menu.h"
#include <curses.h>

void draw_menus(WINDOW *win, Menu menus[], int count) {
  for (int i = 0; i < count; i++) {
    mvwprintw(win, 0, menus[i].start_x, "%s", menus[i].text);
  }
}

void highlight_menu(WINDOW *win, Menu menu) {
  wattron(win, A_STANDOUT);
  mvwprintw(win, 0, menu.start_x, "%s", menu.text);
  wattroff(win, A_STANDOUT);
}

void unhighlight_all(WINDOW *win, Menu menus[], int count) {
  for (int i = 0; i < count; i++) {
    mvwprintw(win, 0, menus[i].start_x, "%s", menus[i].text);
  }
}
```

Take a look at the `wattron` and `wattroff` functions. Short for Window Attributes. This acts as a toggle.

---

`submenu.h`

```c
#ifndef SUBMENU_h
#define SUBMENU_h

#include "menu.h"
#include <curses.h>

void show_submenu(WINDOW *win, Menu menu);
void clear_submenu_area(WINDOW *win);

#endif
```

This is here so that functions from `submenu.c` can be called from different files, as long as they `#include "submenu.h"`.

---

`submenu.c`

```c
#include "submenu.h"
#include "menu.h"
#include <curses.h>

void show_submenu(WINDOW *win, Menu menu) {
  int y = 1;
  for (int i = 0; menu.submenu[i] != NULL; i++) {
    mvwprintw(win, y++, menu.start_x, "--> %s", menu.submenu[i]);
  }
}

void clear_submenu_area(WINDOW *win) {
  int width = getmaxx(win);
  for (int i = 1; i <= 5; i++) {
    mvwprintw(win, i, 1, "%*s", width - 2, " ");
  }
}
```

### How to use the program:
- Press f for file, e for edit and o for options to highlight that menu item.
- Press the space key to display submenus.
- Press the menu item key again to hide the submenu.
