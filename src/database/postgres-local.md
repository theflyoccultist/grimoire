# PostgreSQL Local Setup Guide

Use the postgres superuser to create a new user, a new database and manage their permissions. For all future database operations and for production, only use the created my_project_user.

## Step 1: Login as superuser

```bash
sudo -u postgres psql
```

- The default Postgres installation comes with a superuser called postgres.
- We use this account to set up new users and databases.

## Step 2: Create a New User and Database

- Inside the Postgres shell (`psql`) run:

```sql
-- Create a database user (replace with a strong password)

CREATE USER my_project_user WITH PASSWORD 'supersecurepassword';

-- Create the database and assign ownership to the user

CREATE DATABASE my_project_db OWNER my_project_user;
```

- This ensures that your database is not owned by the postgres superuser.
- The my_project_user will have full control over my_project_db, but no power over system-wide databases.

## Step 3: Restrict Dangerous Permissions

By default, new users can create or drop objects inside the public schema. We don’t want that.

```sql
-- Revoke database-wide dangerous permissions

REVOKE CREATE, DROP, TRUNCATE ON SCHEMA public FROM my_project_user;

-- Prevent automatic grants on future tables

ALTER DEFAULT PRIVILEGES IN SCHEMA public
REVOKE CREATE ON TABLES FROM my_project_user;
```

- This prevents accidental database-wide modifications.
- The user will still be able to read and modify existing tables.

## Step 4: Allow Only CRUD Operations

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO my_project_user;
```

- This ensures the user can only perform CRUD operations, and not create/drop tables.

## Step 5: Exit and Verify Setup

`\l`: List all databases

`\du`: List all users and their roles

`\q`: Exit Postgres shell

- Show a user's privilege:
```sql
SELECT grantee, privilege_type
FROM information_schema.role_table-grants
WHERE grantee='my_project_user';
```

## Step 6: Connect as the New User

Now test logging into your database as the newly created user:
```bash
psql -U my_project_user -d my_project_db
```

## Step 7: How to delete the Database/User (if needed)

- Delete database/user (if you messed up, can happen):
```sql
DROP DATABASE my_project_db;
DROP USER my_project_user;
```

- If Postgres refuses to drop a database because it's in use, force disconnect users before deleting:
```sql
SELECT pg_terminate_backend (pid)
FROM pg_stat_activity
WHERE datname='my_project_db';
```
This correctly finds active connections and terminates them.

## Step 8: Find Which Database a User Owns

```sql
SELECT datname, pg_catalog.pg_get_userbyid(datdba) AS owner
FROM pg_database;
```

## Step 9: Add the User to your .env File

```bash
DATABASE_URL=postgres://my_project_user:supersecurepassword@localhost/my_project_db
```

- This keeps credentials outside of the codebase.
- Use environment variables instead of hardcoding credentials.
