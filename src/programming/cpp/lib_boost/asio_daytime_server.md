# Boost.Asio: TCP Daytime Server


```cpp

#include <boost/asio.hpp>
#include <ctime>
#include <exception>
#include <iostream>
#include <string>

using boost::asio::ip::tcp;

// create the string to be sent back to the client
std::string make_daytime_string() {
  using namespace std;
  time_t now = time(0);
  return ctime(&now);
}

int main() {
  try {
    boost::asio::io_context io_context;

    // listen for new connections
    tcp::acceptor acceptor(io_context, tcp::endpoint(tcp::v4(), 13));

    for (;;) {
      // creates socket, waits for a connection
      tcp::socket socket(io_context);
      acceptor.accept(socket);

      // Determine current time
      std::string message = make_daytime_string();

      // transfer this information to the client
      boost::system::error_code ignored_error;
      boost::asio::write(socket, boost::asio::buffer(message), ignored_error);
    }
  } catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }

  return 0;
}

```

- The function `make_daytime_string()` is defined so create the time and date that will be sent back to the client. You can just reuse this function for all daytime server applications.

- `io_context` is Boost.Asio's event loop manager, in charge of all I/O operations: network sockets, timers, serial ports, and it keeps track of which ones are ready to work. In blocking mode like here, it is still needed because the socket objects rely on it under the hood.

- A `ip::tcp::acceptor` object is created to listen for new connections. Here, it listens on TCP port 13, for IP version 4.

- This is an iterative server, and can only handle one connection at a time. It creates a single socket (`tcp::socket socket(io_context);`) and waits for a connection (`acceptor.accept(socket);`).

- When a client accesses the server, this program will determine the current time and transfer this information to the client.

## Testing:
- Execute both the server program.
- When executing the client program, add 127.0.0.1 as the command line argument.
- You should see the current time as the response message.
