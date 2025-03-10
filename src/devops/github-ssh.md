# Setting Up SSH for GitHub

This will make GitHub stop asking you for your username and access token every time.

## Step 1: Check if you already have a key

- Before generating a new one, check if you already have an SSH key:
```sh
ls -al ~/.ssh
```
If you see files like ``id_rsa`` and ``id_rsa.pub`` (or ``id_ed25519`` and ``id_ed25519.pub``), you probably already have an SSH key. If not, generate one.

## Step 2: Generate a New SSH key (if needed)

If you don't have an existing SSH key, generate a new one:

```sh
ssh-keygen -t ed25519 -C "yourmail@example.com"
```
- When it asks for a file location, just press Enter (this will save it in ``~/.ssh/id_ed25519``).
- When it asks for a passphrase, you can leave it empty (or set one for extra security).

## Step 3: Add Your SSH Key to the SSH Agent

- Now, you need to add the key to your local SSH agent so it gets used automatically:
```sh
eval "$(ssh-agent -s)"
```

- Then add your key:
```sh
ssh-add ~/.ssh/id_ed25519
```
(If you used ``rsa``, replace ``id_ed25519`` with ``id_rsa``.)

## Step 4: Copy Your SSH Key to GitHub

Now, you need to add your SSH key to your GitHub account.
- Copy the key to your clipboard:
```sh
cat ~/.ssh/id_ed25519.pub
```
It will output something like:
```sh
ssh-ed25519 AAAAC3Nza...yourlongpublickeyhere yourmail@example.com
```
- Go to GitHub → SSH Keys Settings
- Click "New SSH Key", paste your key, and give it a name.
- Save it.

## Step 5: Test the Connection

- Check if GitHub recognizes your SSH key:
```sh
ssh -T git@github.com
```
If everything is set up correctly, you should see:
```sh
Hi <your-github-username>! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 6: Change Your Git Remote to Use SSH

- If your Git remote is still using HTTPS (which asks for a password), switch it to SSH:
```sh
git remote -v
```
If you see:
```sh
origin https://github.com/your-username/repository.git (fetch)
origin https://github.com/your-username/repository.git (push)
```
- Change it to SSH:
```sh
git remote set-url origin git@github.com:your-username/repository.git
```

Now, every push/pull will use SSH, and you’ll never have to enter your password again.
