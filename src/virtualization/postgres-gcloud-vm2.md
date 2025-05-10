## Create an HMAC Server API with Python

```python
from fastapi import FastAPI, Request, HTTPException
import hmac
import hashlib

app = FastAPI()


def calc_digest(key, message):
    key = bytes(key, 'utf-8')
    message = bytes(message, 'utf-8')
    dig = hmac.new(key, message, hashlib.sha256)
    return dig.hexdigest()

# HMAC Server
@app.post("/verify")
async def verify_signature(request: Request):
    body = await request.json()
    recieved_mac = request.headers.get("X-HMAC-Signature")

    if not recieved_mac:
        raise HTTPException(status_code=400, detail="Missing HMAC header")

    msg_string = f"{body['mac_address']}:{body['timestamp']}"
    expected_mac = calc_digest('secret-key', msg_string)

    if not hmac.compare_digest(recieved_mac, expected_mac):
        raise HTTPException(status_code=403, detail="Invalid signature")

    return {"status": "Verified"}
```

## Testing HMAC Protected Endpoints with curl (Bash Script)

```bash
#!/bin/bash

MESSAGE='{"mac_address":"12:34:56:78:9a:bc","timestamp":"2025-04-30T15:00:00"}'
SIGNATURE=$(echo -n '{"mac_address":"12:34:56:78:9a:bc","timestamp":"2025-04-30T15:00:00"}' |
  openssl dgst -sha256 -hmac "secret-key" | sed 's/^.* //')

curl -X POST http://127.0.0.1:8000/verify \
  -H "Content-Type: application/json" \
  -H "X-HMAC-Signature: $SIGNATURE" \
  -d "$MESSAGE"
```

## Establish connection with an HMAC client (for example, with Ruby)

```ruby
require 'openssl/hmac'
require 'mac-address'

# HMAC Client
class Hmac
  def self.call
    key = secret_key
    mac_address = MacAddress.address
    halt 404, 'Mac Address not found' if mac_address.nil?

    timestamp = Time.now.to_i
    message = "#{mac_address}:#{timestamp}"
    mac = calc_digest(key, message)
    { signature: mac, timestamp: timestamp, mac_address: mac_address }
  end

  def self.secret_key
    ENV['API_DB_KEY'] || raise('Missing API_DB_KEY')
  end

  def self.calc_digest(key, message)
    OpenSSL::HMAC.hexdigest('sha256', key, message)
  end
end
```
