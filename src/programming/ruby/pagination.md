## 🗂️ Clean Pagination in Sinatra (Backend-Controlled)

To avoid loading too many records and letting the UI handle paging, use SQL's `LIMIT` and `OFFSET` directly in your Sinatra route:

```ruby
get '/' do
  page = params[:page].to_i
  page = 1 if page < 1
  limit = 10
  offset = (page - 1) * limit

  @posts = db.execute("SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset])
  @total_posts = db.get_first_value('SELECT COUNT(*) FROM posts')
  @current_page = page

  smart_template(:index)
end
```

---

And in your ERB view, display pagination buttons dynamically:

```erb
<div class="pagination">
  <% total_pages = (@total_posts.to_f / 10).ceil %>

  <% if @current_page > 1 %>
    <button hx-get="/?page=<%= @current_page - 1 %>"
            hx-target="#content"
            hx-swap="innerHTML">Previous</button>
  <% end %>

  <% if @current_page < total_pages %>
    <button hx-get="/?page=<%= @current_page + 1 %>"
            hx-target="#content"
            hx-swap="innerHTML">Next</button>
  <% end %>
</div>
```

This ensures fast load times, clean UX, and a backend that acts like a proper gatekeeper of database sanity.
