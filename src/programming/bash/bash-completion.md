### How to test if your rate limiting works:

```bash
for i in {1..200}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4567; done
```

1..200: number of requests
http://localhost:4567: the URL that needs to be tested

--- 

### Step-by-Step Bash Completion Check-Up 💅

Verify the package is installed:

```bash
dpkg -l | grep bash-completion
```

If nothing shows up:
```bash

sudo apt install bash-completion
```

Reload your .bashrc:

```bash
source ~/.bashrc
```

Test it:
Try typing something like:

```bash
git ch<TAB><TAB>
```

You should see suggestions like checkout, cherry-pick, etc.

Or try:

```
ssh <TAB><TAB>
```

And see if it lists known hosts.

