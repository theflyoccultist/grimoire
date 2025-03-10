# Deploying mdBook to GitHub Pages With GitHub Actions

## Step 1: Setup the Repo

- Create a new GitHub repo.

- Run:
```sh
cargo install mdbook
mdbook init my-docs
cd my-docs
```

## Step 2: Add GitHub Actions Workflow

- Create .github/workflows/deploy.yml:
```yml
name: Deploy mdBook to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install mdBook
        run: cargo install mdbook

      - name: Build the book
        run: mdbook build

      - name: Setup SSH Authentication
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
```

``SSH_PRIVATE_KEY`` -> (``id_ed25519``)
``GITHUB_TOKEN`` -> GitHub adds this automatically

## Step 3: Add Secrets

- Generate a separate SSH key for CI/CD
```sh
ssh-keygen -t id_ed25519 -C "GitHub Actions Deploy Key"
```

- Go to Repo -> Settings -> Secrets and Variables -> Actions

- Add ``SSH_PRIVATE_KEY`` -> Paste the private key (``id_ed25519``)

- Go to Repo -> Settings -> Deploy key

- Paste the public key (``id_ed25519.pub``)

## Step 4: Enable Permissions

- Go to Repo -> Settings -> Actions -> General 
- Under Workflow Permissions, enable:
✅ Read and Write Permissions
✅ Allow GitHub Actions to create and approve pull requests

## Step 5: Push and Deploy
```sh
git add .
git commit -m "Deploy Book"
git push origin main
```

If it all goes well, your docs should be live.


