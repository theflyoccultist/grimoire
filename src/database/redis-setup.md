# How to Boot Up Redis

## 1.Installing Redis on Debian

Add the repository to the APT index, update it, and install Redis:

```bash
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
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

```bash
# bind 127.0.0.1 ::1
```

Keep this enabled by default

```bash
protected-mode yes
```

- Set a strong password:
Set a password (optional, overkill for local but useful for staging/prod):

```bash
requirepass supersecurepassword
```

🔐 If you do this, don't forget to connect with:

```ruby
Redis.new(password: ENV['REDIS_PASSWORD'])
```

- Restart Redis for changes to apply:

```bash
sudo systemctl restart redis
```

Confirm it's only bound to localhost:

```bash
sudo ss -tlnp | grep redis
```

