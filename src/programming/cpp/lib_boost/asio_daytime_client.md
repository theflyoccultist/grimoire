# Boost.Asio: Daytime TCP Client

## A synchronous TCP daytime client

As a starter, we will use asio to implement a client application with TCP. The purpose of this application is to access a daytime service, so we need the user to specify the server.

This will work on a server that runs the daytime protocol on TCP port 13, which is rare now. Still, it is a good introduction to the complex world of network programming.

So, what is TCP? (Transmission Control Protocol)
- Connection oriented: You handshake first, then start sending data.
- Reliable: Every byte sent gets an acknowledgement, lost packets are resent.
- Ordered: Data arrives in the same order it was sent.
- Slower: All that reliability adds overhead.
- Use cases: Web traffic (HTTP/HTTPS), email (SMTP), file transfer (FTP), SSH.

```cpp

#include <array>
#include <boost/asio.hpp>
#include <cstddef>
#include <exception>
#include <iostream>

using boost::asio::ip::tcp;

int main(int argc, char *argv[]) {

  try {
    if (argc != 2) {
      std::cerr << "Usage: client <host>" << std::endl;
      return 1;
    }

    // resolver
    boost::asio::io_context io_context;
    tcp::resolver resolver(io_context);
    tcp::resolver::results_type endpoints =
        resolver.resolve(argv[1], "daytime");

    // create socket and connect
    tcp::socket socket(io_context);
    boost::asio::connect(socket, endpoints);

    for (;;) {
      std::array<char, 128> buf;
      boost::system::error_code error;

      // read response loop
      size_t len = socket.read_some(boost::asio::buffer(buf), error);

      if (error == boost::asio::error::eof)
        break;
      else if (error)
        throw boost::system::system_error(error);

      // print response
      std::cout.write(buf.data(), len);
    }

  } catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }
  return 0;
}
```

Flow of the program: resolve -> connect -> read loop -> print

- The line `boost::asio::io_context io_context;` is always needed in any program that uses asio. It serves as an I/O execution context.
We need to turn the server name that was specified as a parameter to the application, into a TCP endpoint. To do this we use an `ip::tcp::resolver` object, with `io_context` as the argument. 

- A resolver turns the server name that was specified as a parameter to the application. It takes a host name and service name and turns them into a list of endpoints. We perform a resolve call using the name of the server, specified in `argv[1]`, and the name of the service, in this case "daytime".

- The list of endpoints is returned using an object of type `ip::tcp::resolver::results_type`. This object is a range, with `begin()` and `end()` member functions that may be used for iterating over the results.

- Socket creation and connection. The list obtained by the `endpoints` variable may contain both IPv4 and IPv6 endpoints, so we need to try each of them until we find one that works.  This keeps the client program independent of a specific IP version. The `boost::asio::connect()` function does this for us automatically.

- Reading the response from the daytime service: We use a `std::array` to hold the received data. The `boost::asio::buffer()` function automatically determines the size of the array to help prevent buffer overruns. Instead of a `std::array`, we could have used a `char []` or `std::vector`.

```cpp

size_t len = socket.read_some(boost::asio::buffer(buf), error);

```

- This line of code does most of the heavy lifting:
  - Return value: `len` tells you how many bytes you got, which might be less than the buffer size.
  - This is blocking, the program sits there waiting until something happens.
  - It doesn't try to fill the entire buffer, it returns as soon as there's some data.
  - When the server closes the connection, `ip::tcp::socket::read_some()` will gracefully exit the loop with the `boost::asio::error::eof` error.
  - If something else went wrong, `error` gets another code, and you can throw.

- Finally, print the results with `std::cout.write(buf.data(), len);`

The "resolver -> socket -> loop" structure is common in many protocols (such as HTTP, SMTP, FTP, Telnet, etc.) with the only big differences being:
  - Which port/protocol you connect to
  - What you send before reading (if anything)
  - How you parse the response
  - Whether you wrap it in SSL/TLS.
