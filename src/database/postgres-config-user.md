🐘 PostgreSQL: Local User Authentication Without the Superuser Cloak

Sometimes, you don't want to use postgres like a spoiled brat wearing admin privileges. Here's how to spawn a lesser mortal (a.k.a. a local user with real responsibilities):
🔹 Step 1: Enter the PSQL Underworld

Invoke the superuser rites (only for this step):

sudo -u postgres psql

🔹 Step 2: Summon Your New User

In the PSQL shell, cast:

CREATE USER your_user_username;

Don't forget the semicolon—PostgreSQL is classy like that.
🔹 Step 3: Grant Special Talents

Give your user the power to create roles and databases, because being helpless is so last season:

ALTER ROLE your_user_username CREATEROLE CREATEDB;

Check what powers everyone holds using:

\du

🔹 Step 4: Edit the Sacred pg_hba.conf

Navigate to the dark tome:

sudo nano /etc/postgresql/<version>/main/pg_hba.conf

Under this comment:

```
# Database administrative login by Unix domain socket
```

You’ll find this line:

local all postgres peer

Copy it, then tweak it for your new user:

local all your_user_username md5
local all postgres peer

🧙 Final Notes

    Replace <version> with your actual PostgreSQL version (ls /etc/postgresql/ if you forgot).

    md5 means password-based login. You’ll need to set a password with:

ALTER USER your_user_username WITH PASSWORD 'your_secure_password';
