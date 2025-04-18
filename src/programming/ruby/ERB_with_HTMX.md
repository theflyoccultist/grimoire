# ERB Templates with HTMX
_Using server-side rendered HTML fragments with zero JS frameworks._

## Goal
Combine Ruby’s ERB templating system with HTMX to create reactive web pages without using JavaScript libraries.

## Setup

### HTML Template

```erb
<!-- views/index.erb -->
<div id="content">
  <%= erb :partial, locals: { message: "Initial load" } %>
</div>

<button hx-get="/update" hx-target="#content" hx-swap="innerHTML">Click Me</button>
```

### Route in Sinatra

```ruby
get '/update' do
  erb :partial, locals: { message: "Updated via HTMX!" }
end
```

### Partial Template

```erb
<!-- views/_partial.erb -->
<p><%= message %></p>
```

## Server Behavior

- On button click, HTMX sends GET request
- Server returns only the partial
- Target content is replaced with new HTML fragment

## Advanced Use
- Use `hx-post` for form submissions
- Load content into modals
- Trigger spinners using `hx-indicator`

## TODO
- Add CSRF protection
- Explore `htmx:configRequest` for headers
- Integrate with sessions or user auth

## Resources
- [HTMX Docs](https://htmx.org/docs/)
- [Sinatra with ERB](http://sinatrarb.com/)
