# Setup a Redis Rate Limiter with Ruby

The @limit and @period instance variables specify the maximum number of requests and the time period, respectively. 
We use the redis gem to create a new Redis client and increment the request count for each client.

```ruby
class RateLimiter
  def initialize(app, limit:, period:)
    @app = app
    @limit = limit
    @period = period
    @redis = Redis.new(password: ENV['REDIS_PASSWORD'])
  end

  def call(env)
    req = Rack::Request.new(env)
    ip = req.ip
    key = "rate-limit:#{ip}"
    count = @redis.incr(key)
    @redis.expire(key, @period) if count == 1

    return [429, { 'Content-Type' => 'text/plain' }, ['Rate Limit exceeded']] if count > @limit

    @app.call(env)
  end
end
```
