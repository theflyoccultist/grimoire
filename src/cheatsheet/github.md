### .gitignore a file that has already been pushed

```bash
echo debug.log >> .gitignore

git rm --cached debug.log

git commit -m "Start ignoring debug.log"
```

### Change the URL of a repository:

```bash
git remote -v
```

Then, you can set it with:

```bash
git remote set-url origin <NEW_GIT_URL_HERE>
```

### Remove a Git commit which has not yet been pushed

```bash
git reset --hard HEAD~1
```
