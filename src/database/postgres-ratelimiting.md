# Rate Limiting With PostgreSQL

If you have a small app, you do not need to setup an entire new Redis instance. You can instead build your own 'poor mans Redis', with unlogged tables (faster writes and no WAL overhead) and automatic cleanup with a cron job.
In this guide, you will learn how to add a rate limiting feature directly onto PostgreSQL, which is useful to greatly reduce the risk of brute force attacks.

**These queries are meant to be run from your backend application file, not from psql.** 

### Language Compatibility Notice
- This SQL syntax ($1, $2, etc...) is compatible with Ruby, JavaScript, and Go.
- If using Python (psycopg2), replace $1 with %s.
- If using Java (JDBC), use ? placeholders instead.
- **Regardless of the language, make sure to use parametrized queries** to prevent SQL injection.

## 1. The Rate-Limiting Table

Since this is login-related, we can use an UUID identifier and timestamps.

```sql
CREATE UNLOGGED TABLE login_attempts (
    session_id UUID DEFAULT gen_random_uuid(),  -- Secure, unique session tracking
    username TEXT NOT NULL,
    attempt_count INT DEFAULT 1,
    first_attempt TIMESTAMP DEFAULT now(),
    PRIMARY KEY (session_id, username)  -- Prevent duplicate session-user pairs
);
```

- Unlogged -> Faster writes, no WAL overhead.
- UUID session identifiers are more reliable than tracking IP addresses -> no risk of blocking users with shared IP, or letting botnets or spoof IPs pass.

## 2. When a Login Attempt Happens

Now, inserting into this table will automatically generate a secure, unique session identifier.

```sql
INSERT INTO login_attempts (username, attempt_count)
VALUES ($1, 1)
ON CONFLICT (username) 
DO UPDATE SET
  attempt_count = login_attempts.attempt_count + 1
  first_attempt = CASE
  WHEN login_attempts.first_attempt <= now() - INTERVAL '20 minutes'
  THEN now()
  ELSE login_attempts.first_attempt
END;
```

- If it’s a new user, it gets inserted.
- If it already exists, it updates only if the time window hasn’t expired.
- If it has expired, the row stays the same (so it doesn’t increment forever).

## 3. Checking If the UUID is Blocked

Before processing a login attempt, check if the UUID should be blocked.

```sql
SELECT attempt_count FROM login_attempts
WHERE username = $1
AND first_attempt > now() - INTERVAL '20 minutes';
```

If attempt_count > 5, deny the login request.

## 4. Automatically Cleaning Up Old Records

- Once an IP ages out of the 20-minute window, we don’t need to track it anymore.
- This step requires a PostgreSQL extension, pg_cron, which you can find here: [pg_cron](https://github.com/citusdata/pg_cron)
- Then, you might want to alter your default database configuration file (which you have hopefully created first by following [this guide](postgres-local.md).

```sql
ALTER USER my_project_user SET cron.job_run_as_owner = true;
```

- Set up the pg_cron extension:

```sql
CREATE EXTENSION pg_cron;

CREATE OR REPLACE FUNCTION cleanup_old_attempts() RETURNS VOID AS $$
DELETE FROM login_attempts WHERE first_attempt < now() - INTERVAL '20 minutes';
$$ LANGUAGE sql;

-- Auto clean up of old attempts, every 5 minutes
SELECT cron.schedule('*/5 * * * *', $$SELECT cleanup_old_attempts()$$);
```

- Keeps the table lightweight instead of storing old attempts forever.
- Runs every 5 minutes, but you can tweak as needed.

## For deployment

Google Cloud SQL supports pg_cron, but you have to manually enable it since it's disabled by default.

- Go to Google Cloud Console
- Navigate to your PostgreSQL instance
- Enable pg_cron extension
  - Go to Configuration -> Flags
  - Add a new flag:
  ```
  shared_preload_libraries = 'pg_cron'
  ```
  - Click 'Save Changes & Restart the instance'.
