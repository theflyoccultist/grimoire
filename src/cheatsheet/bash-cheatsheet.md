# How to test if your rate limiting works:

```bash
for i in {1..200}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4567; done
```

1..200: number of requests
http://localhost:4567: the URL that needs to be tested

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

