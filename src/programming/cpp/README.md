# C++ 🤖

Welcome to my C++ notes. Categorized for your sanity and mine.

- [Fundamentals](fundamentals/)
- [Object-Oriented Programming](oop/README.md)
- [Language Features](features/)
- [Practical Algorithms](algorithms/)


## Personal Story
Maybe it's the challenging aspects of this language that pulls me into it. Maybe it is its rich history; either way I have decided to become overly committed to its complex syntax, and the endless possibilities it offers. It is not my fault that every single crazy project I dream of (plugins for music production, compilers, game engines) all uses C++ for its performance and complete out-of-the-box tooling.

It is definitely a language to use with precaution, a language you could lose yourself into, for better or for worse.

---

## Setting Up C++ on Linux

To get started with C++ development, you can install the essential tools via your package manager. On Ubuntu/Debian-based systems, run:

```sh
sudo apt update
sudo apt install build-essential
```

This installs both the C and C++ compilers (gcc and g++), along with useful build tools like make.

For debugging and memory checking, install:

```sh
sudo apt install gdb valgrind
```

### Setting Up Language Server (LSP) for Neovim

If you use Neovim with Mason.nvim, you can install the clangd language server for better code intelligence:

1. Open Neovim.
2. Run `:Mason` and search for `clangd`.
3. Install `clangd` from Mason's UI.

---

## Updating g++ for New C++ Standards (e.g., C++26)

When a new C++ standard (like C++26) is released and you want to try it:

- First, check if your distribution’s repositories have the updated g++ version:

    ```sh
    sudo apt update
    sudo apt install g++-13   # replace 13 with the latest version available
    ```

- If the latest version is not available, you might need to use a PPA (on Ubuntu), download from the official GNU Toolchain, or build from source.

- You can check your g++ version with:

    ```sh
    g++ --version
    ```

- When compiling with a new standard, use the appropriate flag (e.g., `-std=c++2b` or `-std=c++26` when it’s officially supported):

    ```sh
    g++ -std=c++2b main.cpp -o main
    ```

