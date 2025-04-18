# Quick Server-Side Sinatra Setup
_Minimal, elegant Ruby backend without JavaScript nonsense._

## Project Structure

```plaintext
my_app/
├── app.rb
├── views/
│   └── index.erb
├── public/
│   └── style.css
├── Gemfile
└── config.ru
```

## Step-by-Step

1. **Install Sinatra**

```bash
gem install sinatra
```

2. **Basic `app.rb` Template**

```ruby
require 'sinatra'

get '/' do
  erb :index
end
```

3. **Create Views**

```erb
<!-- views/index.erb -->
<h1>Hello, world</h1>
```

4. **Run It**

```bash
ruby app.rb
```

5. **Production Ready with Rack**

```ruby
# config.ru
require './app'
run Sinatra::Application
```

```bash
rackup config.ru
```

## TODO
- Add custom routes
- Add environment config (`dotenv`)
- Connect to Postgres

## Resources
- [Sinatra Docs](http://sinatrarb.com/)
- [Rack Configs](https://rack.github.io/)
