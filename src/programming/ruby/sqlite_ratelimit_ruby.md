# Use SQLite3 as Your RateLimiter in Ruby

Sometimes, your project is small, scalability is a problem for later and you can't afford to deploy Redis separately either. In that case, you can always rely on SQLite3 to gatekeep users that might be making too many requests.

```ruby
# frozen_string_literal: true

require 'dotenv/load'
require 'sqlite3'

# The @limit and @period instance variables specify
# the maximum number of requests and the time period,
# respectively.
class RateLimiter
  def initialize(app, limit:, period:, db_path: 'data/rate-limiter.db')
    @app = app
    @limit = limit
    @period = period

    @db = SQLite3::Database.new(db_path)
    create_table
  end

  def call(env)
    req = Rack::Request.new(env)
    ip = req.ip

    current_time = Time.now.to_i
    window_start = current_time - @period

    @db.execute('DELETE FROM rate_limits WHERE timestamp < ?', window_start)

    count = @db.get_first_value('SELECT COUNT(*) FROM rate_limits WHERE ip = ?', ip)

    return [429, { 'content-type' => 'text/plain' }, ['rate limit exceeded']] if count > @limit

    @db.execute('INSERT INTO rate_limits (ip, timestamp) VALUES (?, ?)', [ip, current_time])

    @app.call(env)
  end

  private

  def create_table
    @db.execute <<-SQL
      CREATE TABLE IF NOT EXISTS rate_limits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      );
    SQL
  end
end
```
