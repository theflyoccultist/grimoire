### Create a new repository from the command line

```bash
echo "# http_server" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:theflyoccultist/http_server.git
git push -u origin main
```

### Connect to a new repository

1. Open a Terminal

    Navigate to the directory where you want to clone the repository.
    
    ```bash
    cd /path/to/your/directory
    ```

2. Clone the Repository

    Run the following command:

    ```bash
    git clone https://github.com/theflyoccultist/kepler-rss-feed.git
    ```

    Or, if using SSH:

    ```bash
    git clone git@github.com:theflyoccultist/kepler-rss-feed.git
    ```

3. Navigate into the Repository

    After cloning, navigate into the repository folder:

    ```bash
    cd kepler-rss-feed
    ```

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
git reset HEAD^
```
