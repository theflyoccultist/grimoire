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

