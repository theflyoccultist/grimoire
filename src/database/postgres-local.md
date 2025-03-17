# PostgreSQL Local Setup Guide

Use the postgres superuser to create a new user, a new database and manage their permissions. For all future database operations and for production, only use the created my_project_user.

The following guide might seem a little over-engineered for a casual app, but it will ensure a level of security conform to production level applications.

## Step 1: Login as superuser

```bash
sudo -u postgres psql
```

- The default Postgres installation comes with a superuser called postgres.
- We use this account to set up new users and databases.

**You can fill in with your own informations, store them in a file (such as `setup.sql`) and use them in production.**

## Step 2: Create a New Database, Two New Users and A Separate Schema

- Inside the Postgres shell (`psql`) run (or better: write into your `setup.sql` file):

```sql
-- Create a database user (replace with a strong password) and a temporary admin

CREATE USER temp_admin WITH PASSWORD 'temp_admin_password';
CREATE USER my_project_user WITH PASSWORD 'supersecurepassword';

-- Create the database and assign ownership to the user

CREATE DATABASE my_project_db OWNER temp_admin;
GRANT CONNECT ON DATABASE my_project_db TO my_project_user;

-- If you want isolation from the default public schema, create a custom schema:
CREATE SCHEMA my_project_schema AUTHORIZATION my_project_user;
ALTER DATABASE my_project_db SET search_path TO my_project_schema;
GRANT USAGE ON SCHEMA my_project_schema TO my_project_user;
```

- This ensures that your database is not owned by the postgres superuser.
- The my_project_user will have full control over my_project_db, but no power over system-wide databases.
- **From here, this guide assumes you have created my_project_schema.**

## Step 3: Restrict Dangerous Permissions

By default, new users can create or drop objects inside the project schema. We don’t want that.

```sql
-- Revoke ONLY drop and truncate, but leave CREATE intact
REVOKE DROP, TRUNCATE ON SCHEMA my_project_schema FROM my_project_user;

-- Explicitly grant back CREATE
GRANT CREATE ON SCHEMA my_project_schema TO my_project_user;

-- Explicitly remove DROP privileges on existing tables
REVOKE DROP ON ALL TABLES IN SCHEMA my_project_schema FROM my_project_user;
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
REVOKE DROP ON TABLES FROM my_project_user;
```

- This prevents accidental database-wide modifications.
- The user will still be able to read and modify existing tables.

## Step 4: Enforce Security Best Practices

You should prevent the user from becoming a superuser, creating other databases and creating new users.

```sql
ALTER USER my_project_user WITH NOSUPERUSER NOCREATEDB NOCREATEROLE;
```

## Step 5: Allow CRUD Operations

```sql
-- Grant CRUD operations to the user, and ensure it has access to future tables as well
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO my_project_user;
```

## Step 6: Grant Usage on Sequences (Critical for Auto Increments)

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO my_project_user;
```

## Step 7: Drop temp_admin

Since at this point, temp_admin has only been used to create a new database, it still has full ownership and is a security risk. You should reassign everything and then delete it.
If you want, you can always keep it and modify its permissions separately, but this is a pragmatic and secure solution.

```sql
-- Reassign all objects owned by temp_admin to my_project_user
REASSIGN OWNED BY temp_admin TO my_project_user;

-- Remove any remaining privileges
DROP OWNED BY temp_admin;

-- Finally, delete the user
DROP USER temp_admin;
```

## Step 8: Exit and Verify Setup

`\l`: List all databases

`\du`: List all users and their roles

`\q`: Exit Postgres shell

- Show a user's privilege:
```sql
SELECT * FROM information_schema.role_table_grants
WHERE grantee='my_project_user';
```

## Step 9: Connect as the New User

If you have created a `setup.sql` file with the informations above and filled in with your own data, you can import it into Postgres with this simple command:

```bash
psql -U postgres -f setup.sql
```

Now test logging into your database as the newly created user:
```bash
psql -U my_project_user -d my_project_db
```

## Troubleshooting 

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

- If Postgres refuses to drop the user because they still own objects, you might need to do this before dropping the user:
```sql
REASSIGN OWNED BY my_project_user TO project_admin;
DROP OWNED BY my_project_user;
DROP USER my_project_user;
```

- Find Which Database a User Owns

```sql
SELECT datname, pg_catalog.pg_get_userbyid(datdba) AS owner
FROM pg_database;
```

## Add the User to your backend .env File

```bash
DATABASE_URL=postgres://my_project_user:supersecurepassword@localhost/my_project_db
```

- This keeps credentials outside of the codebase.
- Use environment variables instead of hardcoding credentials.
