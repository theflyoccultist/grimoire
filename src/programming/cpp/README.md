# C++ 🤖

You, who loves a difficult to write and extremely performant program... Run before it's too late!

- [Fundamentals](fundamentals/)
- [Object-Oriented Programming](oop/)
- [Recursion](recursion/)
- [Practical Algorithms](algorithms/)
- [Modern C++ features (C++11 and later)](features/)
- [The Boost Library](lib_boost/)

---

## Setting Up C++ on Linux

To get started with C++ development, you can install the essential tools via your package manager. On Ubuntu/Debian-based systems, run:

```sh
sudo apt update
sudo apt install build-essential
```

This installs both the C and C++ compilers (gcc and g++), along with useful build tools like make.

Always recommended! For debugging and memory checking, install:

```sh
sudo apt install gdb valgrind
```

## Setting Up Language Server (LSP) for Neovim

If you use Neovim with Mason.nvim, you can install the clangd language server for better code intelligence:

1. Open Neovim.
2. Run `:Mason` and search for `clangd`.
3. Install `clangd` from Mason's UI.

---

## Setting up CMake to try out new C++ features (e.g., C++26)

- When compiling with a new standard, use the appropriate flag (e.g., `-std=c++2b` or `-std=c++26` when it’s officially supported):

    ```sh
    g++ -std=c++2b main.cpp -o main
    ```

- However, with this alone, your LSP won't understand the new syntax.
- To solve this, we can use CMake to have everything in sync.
- Create a `CMakeLists.txt` file in your project folder:

```cmake
cmake_minimum_required(VERSION 3.25)
project(test_program LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 26)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(compiled_test_program main.cpp)
```

- Then:

```bash
mkdir build && cd build
cmake ..
make
```

CMake also has the advantage of making your project work with any compiler and make cross platform builds, so it's generally a great idea to use it in a project.

## Setting up clangd on its own to try out new C++ features

- There is also a way to let clangd know that you are using the C++26 standard, without having to bundle a whole project with CMake (if you just want to quickly test it without this linter screaming at you).

To do that, simply create a `.clangd` file in the directory where you store your C++ "experiments" and add this:

```yaml
CompileFlags:
  Add: [-std=c++26]
```
