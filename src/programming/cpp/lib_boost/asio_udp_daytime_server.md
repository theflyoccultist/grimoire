# Boost.Asio: UDP Daytime Server

```cpp

#include <array>
#include <boost/asio.hpp>
#include <boost/system/error_code.hpp>
#include <exception>
#include <iostream>
#include <string>

using boost::asio::ip::udp;

std::string make_daytime_string() {
  using namespace std;
  time_t now = time(0);
  return ctime(&now);
}

int main() {
  try {
    // creation of socket
    boost::asio::io_context io_context;
    udp::socket socket(io_context, udp::endpoint(udp::v4(), 13));

    // wait for a client to initiate contact
    for (;;) {
      std::array<char, 1> recv_buf;
      udp::endpoint remote_endpoint;
      socket.receive_from(boost::asio::buffer(recv_buf), remote_endpoint);

      // what will be sent back to the client
      std::string message = make_daytime_string();

      // send the response to the remote_endpoint
      boost::system::error_code ignored_error;
      socket.send_to(boost::asio::buffer(message), remote_endpoint, 0,
                     ignored_error);
    }
  } catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }
}
```

- Create an `ip::udp::socket` object to receive requests on UDP port 13.
- Wait for a client to initiate contact with us (with the for loop). The `remote_endpoint` object will be populated by `ip::udp::socket::receive_from()`.
- Determine what we are going to send back to the client (with the `make_daytime_string`).
- Send the response to the remote_endpoint (with `socket.send_to`).
