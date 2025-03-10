### Use the postgres superuser to create a new user, a new database and manage their permissions.

For all future database operations and for production, only use the created my_project_user.

Local setup:
```sql
-- Create the user (if not already created)

CREATE USER my_project_user WITH PASSWORD 'supersecurepassword';

-- Create the database and assign ownership

CREATE DATABASE my_project_db OWNER my_project_user;

-- Revoke dangerous permissions

REVOKE CREATE, DROP, TRUNCATE ON SCHEMA public FROM my_project_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
REVOKE CREATE ON TABLES FROM my_project_user;

-- Allow only CRUD operations

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO my_project_user;
```
