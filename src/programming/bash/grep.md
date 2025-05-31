# 🔍 Basic Grep Guide

- Search for a word in all .md files
```sh
grep "keyword" *.md
```

- Search recursively through directories
```sh
grep -r "keyword" .
```

- Ignore case
```sh
grep -i "keyword" filename.md
```

- Show line numbers
```sh
grep -n "keyword" filename.md
```

- Combine: recursive, case-insensitive, line numbers
```sh
grep -rin "keyword" .
```

- Use regular expressions (careful—this is where it gets spicy)
```sh
grep -E "foo|bar" file.md
```

