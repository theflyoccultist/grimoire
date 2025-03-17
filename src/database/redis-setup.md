# How to Boot Up Redis

## 1.Installing Redis on Debian

```bash
sudo apt update && sudo apt install redis-server
```

- Then enable and start the service:

```bash
sudo systemctl enable redis
sudo systemctl start redis
```

## 2. Basic Configuration (to Avoid Chaos)

- Redis has a bad habit of storing everything in RAM, so if you don’t configure it properly, it could eat all your memory and crash your system. (A very unforgiving trait.)
- Edit /etc/redis/redis.conf and set some sanity limits:

```bash
maxmemory 256mb
maxmemory-policy allkeys-lru
```

Explanation:
- Limits Redis to 256MB so it doesn’t consume your entire system.
- Uses allkeys-lru policy, meaning it will automatically remove the least recently used keys once the memory limit is reached.

## 3. Connecting to Redis

- After installing, you can test it by running:

```bash
redis-cli ping
```

- If it replies with PONG, congratulations—you've awakened another beast.

- Set and retrieve a value:

```bash
SET spell "fireball"
GET spell
```

→ Should return "fireball" (instant, no SQL involved).

## 4. Securing Redis (Because It Trusts Too Much)

- By default, Redis binds to all interfaces, meaning anyone could connect if they know the IP. That’s bad.

- Limit Redis to localhost:
Edit /etc/redis/redis.conf and change:

bind 127.0.0.1

- Set a strong password:
Uncomment and modify this line:

requirepass supersecurepassword

- Now, clients must authenticate before using Redis.

- Restart Redis for changes to apply:
```bash
sudo systemctl restart redis
```
