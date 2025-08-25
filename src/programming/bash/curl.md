# curl cheatsheet

## Health check of a website

```bash
curl -sSf http://example.org > /dev/null
```

- If the request was successful, it will return... Nothing. If it's unsuccessful, it will try for a while and then return `Could not resolve host: <hostname>` 

## How to test if your rate limiting works:

```bash
for i in {1..200}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4567; done
```

- 1..200: number of requests
- http://localhost:4567: the URL that needs to be tested
