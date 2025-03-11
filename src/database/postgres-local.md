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

- Inside the Postgres shell (`psql`) run:

```sql
-- Create a database user and a database admin (replace with strong passwords)

CREATE USER project_admin WITH PASSWORD 'verysecurepassword';
CREATE USER my_project_user WITH PASSWORD 'supersecurepassword';

-- Create the database and assign ownership to the user

CREATE DATABASE my_project_db OWNER project_admin;
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
-- Prevents the user from creating, dropping, or truncating tables in the project schema.
REVOKE CREATE, DROP, TRUNCATE ON SCHEMA my_project_schema FROM my_project_user RESTRICT;

-- Ensures that my_project_user cannot create tables in the project schema, even if new ones are added.
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
REVOKE CREATE ON TABLES FROM my_project_user;

-- Explicitly remove DROP privileges on existing tables
REVOKE DROP ON ALL TABLES IN SCHEMA my_project_schema FROM my_project_user;
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA public REVOKE DROP ON TABLES FROM my_project_user;
```

- This prevents accidental database-wide modifications.
- The user will still be able to read and modify existing tables.

## Step 4: Enforce Security Best Practices

You should prevent the user from becoming a superuser, creating other databases and creating new users.

```sql
ALTER USER my_project_user WITH NOSUPERUSER NOCREATEDB NOCREATEROLE;
```

## Step 5: Allow Some Operations

To know `my_project_schema.table1, my_project_schema.table2`, just add the corresponding values from your backend code.

```sql
-- You should grant CRUD operations, but only for specific tables
GRANT SELECT, INSERT, UPDATE, DELETE ON my_project_schema.table1, my_project_schema.table2 TO my_project_user;

-- Make sure the user has access to future tables as well
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO my_project_user;
```

## Step 6: Grant Usage on Sequences (Critical for Auto Increments)

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE my_project_user IN SCHEMA my_project_schema
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO my_project_user;
```

## Step 7: Drop project_admin

Since at this point, project_admin has only been used to create a new database, it still has full ownership and is a security risk. You should reassign everything and then delete it:

```sql
-- Reassign all objects owned by project_admin to my_project_user
REASSIGN OWNED BY project_admin TO my_project_user;

-- Remove any remaining privileges
DROP OWNED BY project_admin;

-- Finally, delete the user
DROP USER project_admin;
```

## Step 8: Exit and Verify Setup

`\l`: List all databases

`\du`: List all users and their roles

`\q`: Exit Postgres shell

- Show a user's privilege:
```sql
SELECT grantee, privilege_type, table_schema, table_name
FROM information_schema.role_table_grants
WHERE grantee='my_project_user';
```

## Step 9: Connect as the New User

Now test logging into your database as the newly created user:
```bash
psql -U my_project_user -d my_project_db
```

## Troubleshooting: How to delete the Database/User (if needed)

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
