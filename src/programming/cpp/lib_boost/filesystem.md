# Boost.filesystem to print stats about files and directories

In this tutorial we will see a command line tool to scan a directory and print stats about files, using `boost::filesystem`

Essentially, we are seeing a more high level version of the `ls` command you'd find in POSIX.

[Reference for filesystem](https://www.boost.org/doc/libs/1_88_0/libs/filesystem/doc/reference.html#is_empty)

To compile those programs, you would have to use this command:

```bash
g++ -o example example.cpp -lboost_filesystem
```

## Reporting the size of one file

This simple program will print the size of a file in bytes.
It has some limitations though: it will crash if a directory, or a file that doesn't exist is called. That is because `file_size()` only works with regular files.

```cpp

#include <boost/filesystem.hpp>
#include <iostream>
using namespace boost::filesystem;

int main(int argc, char *argv[]) {
  if (argc < 2) {
    std::cout << "Usage: tut1 path\n";
    return 1;
  }
  std::cout << argv[1] << " " << file_size(argv[1]) << "\n";
  return 0;
}

```

## Using status queries to determine file existence and type

`boost::filesystem` includes status query functions such as `exists`, `is_directory` and `is_regular_file`. These returns boolean values.
Even though this new version works fine, we'd typically like to see the contents of a directory, not just that it exists.

```cpp

#include <boost/filesystem.hpp>
#include <iostream>
using namespace boost::filesystem;

int main(int argc, char *argv[]) {
  if (argc < 2) {
    std::cout << "Usage: ./test path\n";
    return 1;
  }
  path p(argv[1]);
  if (exists(p)) {
    if (is_regular_file(p))
      std::cout << p << " size is " << file_size(p) << "\n";

    else if (is_directory(p))
      std::cout << p << " is a directory\n";

    else
      std::cout << " exists, but is not a regular file or directory\n";
  } else {
    std::cout << p << " does not exist\n";
  }

  return 0;
}

```

## Directory iteration and catching exceptions

`boost::filesystem` has a `directory_iterator` class that is just what we need here. It follows the general pattern of the standard library's `istream_iterator`. Constructed from a path, it iterates over the contents of the directory. A default constructed `directory_iterator` acts as the end iterator.

The value type of `directory_iterator` is `directory_entry`. A  `directory_entry` object contains `path` and file_status information. A `directory_entry` object can be used directly, but can also be passed to path arguments in function calls.


To increase robustness, we could have an error handling at each `boost::filesystem` function, but for simplicity a try/catch block is used here.

```cpp

#include <boost/filesystem.hpp>
#include <iostream>

using std::cout;
using namespace boost::filesystem;

int main(int argc, char *argv[]) {
  if (argc < 2) {
    cout << "Usage: tut3 path\n";
    return 1;
  }

  path p(argv[1]);

  try {
    if (exists(p)) {
      if (is_regular_file(p))
        cout << p << " size is " << file_size(p) << "\n";
      else if (is_directory(p)) {
        cout << p << " is a directory containing:\n";
        for (directory_entry &x : directory_iterator(p))
          cout << "     " << x.path() << "\n";
      } else
        cout << p << " exists, but is not a regular file or directory\n";
    } else
      cout << p << " does not exist\n";
  } catch (const filesystem_error &ex) {
    cout << ex.what() << "\n";
  }

  return 0;
}

```

Some further improvements to consider:
- Display only the filename, not the full path.
- On Linux the listing isn't sorted. That's because we need to specify the ordering of directory iteration.

## Path decomposition, and sorting results

For directories, we can build a `std::vector` of all the entries and then sort them before writing them to `cout`.

```cpp

#include <algorithm>
#include <boost/filesystem.hpp>
#include <iostream>
#include <vector>
using std::cout;
using namespace boost::filesystem;

int main(int argc, char *argv[]) {
  if (argc < 2) {
    cout << "Usage: test path\n";
    return 1;
  }

  path p(argv[1]);

  try {
    if (exists(p)) {
      if (is_regular_file(p))
        cout << p << " size is " << file_size(p) << "\n";
      else if (is_directory(p)) {
        cout << p << " is a directory containing:\n";

        std::vector<path> v;

        for (auto &&x : directory_iterator(p))
          v.push_back(x.path());

        std::sort(v.begin(), v.end());

        for (auto &&x : v)
          cout << "    " << x.filename() << "\n";
      } else
        cout << p << " exists, but is not a regular file or a directory\n";
    } else
      cout << p << " does not exist\n";
  } catch (const filesystem_error &ex) {
    cout << ex.what() << "\n";
  }

  return 0;
}

```

`filename()` is one of several class path decomposition functions. It extracts the filename portion from a path (i.e. "index.html" from "/home/beman/boost/trunk/index.html").

You could replace this line:

```cpp
v.push_back(x.path());
```

With:

```cpp
v.push_back(x.path().filename());
```

Since we only care about the file name.
