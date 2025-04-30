🪞 pwatmirror — Dual-Database Archiver Daemon

Because your ephemeral SQLite deserves a second chance at life.
A companion to pwatgres, this daemon transfers select data from a local SQLite database into a permanent PostgreSQL tomb where it can rest in peace (and analytics).
✨ Purpose

pwatmirror is a Ruby-based background job tool designed for hybrid database architectures.
It:

    Reads from a fast, disposable SQLite store (your “RAM-like” system).

    Transfers and persists data into a Postgres database (your “long-term memory”).

    Scrubs expired entries from SQLite to avoid bloat.

    Provides hooks for logging, analytics, and failure resilience.

Perfect for systems where real-time metrics or jobs are recorded in SQLite, but need to be archived for compliance, analysis, or posterity.
💻 Features

    CLI-based daemon with dry-run and verbose modes.

    Configurable transfer rules (time-based, size-based, custom SQL filters).

    SQLite schema introspection for flexible table mapping.

    Batched inserts into Postgres to avoid performance hits.

    Dry-wipe mode for testing data deletions without regret.

    Built-in sass mode (--roast) that critiques bad schema design.

🔧 Requirements

    Ruby >= 3.0

    sqlite3, pg, and sequel gems

    Access to both databases (obviously)

🛠 Example Usage

pwatmirror --sqlite db/volatile.sqlite3 \
           --postgres "postgres://user:pass@localhost/permanent_db" \
           --table vm_stats \
           --archive "created_at < NOW() - INTERVAL '3 days'" \
           --verbose

🗃 Future Features

    HTMX admin panel (of course)

    Cron integration for scheduled runs

    Error resilience with retry logic

    ASCII dashboard of archived data stats

    Optionally feed into a Prometheus exporter

🙏 Thanks

To pwatgres for walking so pwatmirror could sprint.
To SQLite, for being fast.
To Postgres, for never letting go.
To you, for believing in cursed infrastructure.
