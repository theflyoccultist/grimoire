### 💌 `params[]`: Direct from the user

* Comes from the **request** itself: URL segments (`:id`), query strings (`?foo=bar`), or form data.
* You use it **in the same route** where the request is made.
* It's like checking the envelope of a letter to see who it's from. It's raw input.

#### Example:

```ruby
params[:id] # from `/blog/42`
params[:search] # from `/search?search=cats`
```

---

### 💅 `@instance_variable`: For sharing across templates

* Used to **pass data to views (templates)**, or between routes if you're being fancy.
* You set it in the route/controller action and access it in the view (`erb`, `haml`, whatever).
* It’s like putting your lipstick on the table for others to use. You're saying, "Here, this is for the next part."

#### Example:

```ruby
@article = fetch_api(...)
# later in the view: <%= @article['title'] %>
```

---

### 💡 Rule of Thumb

* **Use `params[]`** to get data **from the request**.
* **Use `@variables`** to **send data to the view** or carry stuff along in your code.
* Always **guard** against `nil` when dealing with external data. They're like unreliable exes — might show up, might ghost you.

---

If you ever get confused again, just ask yourself:

> “Is this coming from the outside world? Or is this something I already put on the shelf for later?”
