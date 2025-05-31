## Chapter 8: A Rogue like Game Engine

- Movements, walls, boundaries, breadcrumbs.

This is the demo for a tiny rogue-like engine, a `@` character leaving `.` bread crumbs wherever it goes.

It is using several files with `struct` which are the equivalent of constructors in C++. Methods becomes plain old functions.
Everything is pointer based.

### `player.h`

```c
#ifndef PLAYER_H
#define PLAYER_H

#include <ncurses.h>

typedef struct Player {
  int yLoc, xLoc;
  int yMax, xMax;
  char character;
  WINDOW *curwin;
} Player;

Player *create_player(WINDOW *win, int y, int x, char c);
void move_up(Player *p);
void move_down(Player *p);
void move_left(Player *p);
void move_right(Player *p);
int get_input(Player *p);
void display_player(Player *p);

#endif
```

### `player.c` Implementation

```c
#include "player.h"
#include <stdlib.h>

Player *create_player(WINDOW *win, int y, int x, char c) {
  Player *p = (Player *)malloc(sizeof(Player));
  p->curwin = win;
  p->yLoc = y;
  p->xLoc = x;
  getmaxyx(win, p->yMax, p->xMax);
  keypad(win, TRUE);
  p->character = c;
  return p;
}

void move_up(Player *p) {
  mvwaddch(p->curwin, p->yLoc, p->xLoc, '.');
  p->yLoc--;
  if (p->yLoc < 1)
    p->yLoc = 1;
}

void move_down(Player *p) {
  mvwaddch(p->curwin, p->yLoc, p->xLoc, '.');
  p->yLoc++;
  if (p->yLoc > p->yMax - 2)
    p->yLoc = p->yMax - 2;
}

void move_left(Player *p) {
  mvwaddch(p->curwin, p->yLoc, p->xLoc, '.');
  p->xLoc--;
  if (p->xLoc < 1)
    p->xLoc = 1;
}

void move_right(Player *p) {
  mvwaddch(p->curwin, p->yLoc, p->xLoc, '.');
  p->xLoc++;
  if (p->xLoc > p->xMax - 2)
    p->xLoc = p->xMax - 2;
}

int get_input(Player *p) {
  int choice = wgetch(p->curwin);
  switch (choice) {
    case KEY_UP:
      move_up(p);
      break;
    case KEY_DOWN:
      move_down(p);
      break;
    case KEY_LEFT:
      move_left(p);
      break;
    case KEY_RIGHT:
      move_right(p);
      break;
    default:
      break;
  }
  return choice;
}

void display_player(Player *p) {
  mvwaddch(p->curwin, p->yLoc, p->xLoc, p->character);
}
```

### `main.c`

```c
#include "player.h"
#include <ncurses.h>
#include <stdlib.h>

int main(int argc, char **argv) {
  initscr();
  noecho();
  cbreak();

  int yMax, xMax;
  getmaxyx(stdscr, yMax, xMax);

  WINDOW *playwin = newwin(20, 50, (yMax / 2) - 10, 10);
  box(playwin, 0, 0);
  refresh();
  wrefresh(playwin);

  Player *p = create_player(playwin, 1, 1, '@');

  do {
    display_player(p);
    wrefresh(playwin);
  } while (get_input(p) != 'x');

  endwin();
  free(p);
  return 0;
}
```

### Makefile

```Makefile
all: player

player: main.c player.c player.h
	gcc -Wall -o output main.c player.c -lncurses
```
