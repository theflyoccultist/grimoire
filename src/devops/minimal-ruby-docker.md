# The Skinny Ruby Queen: Minimal Dockerfile for Production


---- Build Stage ----
# We're building in style, baby. Ruby + Alpine = skinny legend
```Dockerfile
FROM ruby:3.3-alpine AS build
```

# Install a full dev toolchain to compile native gems (yes, Ruby still lives in C land)
```Dockerfile
RUN apk add --no-cache build-base
```

# Set the working directory—aka the sacred ground where it all happens
```Dockerfile
WORKDIR /usr/src/app
```

# Copy only Gemfile and lockfile first (layer caching magic)
```Dockerfile
COPY Gemfile Gemfile.lock ./
```

# Configure bundler to install gems locally under vendor/bundle
# This will be copied over to the final image later like a blessed artifact
```Dockerfile
RUN bundle config set --local path 'vendor/bundle' \
  && bundle install
```

# Copy the rest of your application—code, chaos, and all
```Dockerfile
COPY . .
```


# ---- Final Stage ----
# A clean Alpine base with Ruby and none of that build baggage. We like our containers *light.*
```Dockerfile
FROM ruby:3.3-alpine
```

# Set the working dir again (yes, you need to re-declare it—Docker has no memory of its past life)
```Dockerfile
WORKDIR /usr/src/app
```

# Copy everything from the build stage, including those precious compiled gems
```Dockerfile
COPY --from=build /usr/src/app /usr/src/app
```

# Let Ruby know where the gems are—because it forgets if you don’t tell it
```Dockerfile
ENV GEM_PATH=/usr/src/app/vendor/bundle/ruby/3.3.0
ENV PATH=$GEM_PATH/bin:$PATH
```

# Install only the runtime dependencies needed for your app to vibe
```Dockerfile
RUN apk add --no-cache \
        libstdc++ \       # C++ runtime
        libffi \          # Needed by some gems (e.g., FFI, psych)
        yaml \            # YAML parsing
        zlib \            # Compression stuff
        openssl \         # HTTPS, TLS, etc.
        tzdata            # So your logs don’t think it's 1970
```

# Declare yourself: prod mode on
```Dockerfile
ENV RACK_ENV=production
ENV PORT=8080
EXPOSE 8080
```

# Finally, launch the Ruby app like the main character it is
```Dockerfile
CMD ["ruby", "server.rb"]
```

Some useful commands:

```bash
docker build -t your-image-name .

docker images

docker run -p 8080:8080 your-image-id

docker rmi your-image-id

docker container prune
```

Pro Tips from the Underworld:
If you're using gems that compile C extensions (like pg, nokogiri, ffi), you’ll likely need additional Alpine dependencies, e.g.:

```Dockerfile
RUN apk add --no-cache build-base libxml2-dev libxslt-dev postgresql-dev
```

For scripts that are long-running, consider using:

```Dockerfile
CMD ["ruby", "start.rb"]
```

Or even:
```Dockerfile
ENTRYPOINT ["bundle", "exec"]
CMD ["ruby", "start.rb"]
```
