## 🔍 CLI Tools to See Background Services (the Cool Girl Terminal Way)

🧙‍♀️ `ps aux`

This is the classic spell for peeking into the underworld of processes.

```bash
ps aux
```

- Lists all processes.
- USER, PID, %CPU, %MEM, and the command path.
- Pipe it to less or grep for sanity.

**Example:** See what’s using Postgres

```bash
ps aux | grep postgres
```

---

`top` / `htop` (More Visual)

`top`: Built-in, real-time process overview.

`htop`: Fancy, colored, scrollable version. (You will want this.)

```bash
htop
```
Install it with:

```bash
sudo apt install htop  # Debian-based
# or
sudo xbps-install -S htop  # Void Linux
```

Use F10 to exit, arrow keys to scroll, and F9 to send kill signals like a Linux grim reaper.

---

## 🧼 List Only Services

**🚫 systemd:**

If you're on a systemd-based distro (not Void, so skip this if you're on musl Void), use:

```bash
systemctl list-units --type=service
```

**☠️ runit (Void Linux)**

If you're using Void: you’re blessed. You get runit, not that systemd drama.

To list services:

```bash
sv status /var/service/*
```

Each service will say `run` if active.

You can stop services with:

```bash
sudo sv stop <service>
```

Start them:

```bash
sudo sv start <service>
```