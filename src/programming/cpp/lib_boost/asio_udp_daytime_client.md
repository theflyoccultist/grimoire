# Boost.Asio: UDP Daytime Client

What's the difference between TCP and UDP (User Datagram Protocol) ?
- Connectionless: You just send packets at the recipient's IP/port without saying hello.
- Unreliable: No guarantees your packet arrives.
- No ordering: Packets might arrive in any order, or not at all.
- Faster: Less overhead, great for real-time data.
- Use cases: Streaming video/audio, VoIP, online gaming, DNS.

[Source](https://www.boost.org/doc/libs/latest/doc/html/boost_asio/tutorial/tutdaytime4.html)

```cpp

#include <array>
#include <boost/asio.hpp>
#include <cstddef>
#include <exception>
#include <iostream>

using boost::asio::ip::udp;

int main(int argc, char *argv[]) {
  try {
    if (argc != 2) {
      std::cerr << "Usage: client <host>" << std::endl;
      return 1;
    }

    boost::asio::io_context io_context;

    // udp resolver
    udp::resolver resolver(io_context);
    udp::endpoint receiver_endpoint =
        *resolver.resolve(udp::v4(), argv[1], "daytime").begin();

    // initiate contact with the remote endpoint
    udp::socket socket(io_context);
    socket.open(udp::v4());

    std::array<char, 1> send_buf = {{0}};
    socket.send_to(boost::asio::buffer(send_buf), receiver_endpoint);

    // endpoint, receiving the server's response
    std::array<char, 128> recv_buf;
    udp::endpoint sender_endpoint;
    size_t len =
        socket.receive_from(boost::asio::buffer(recv_buf), sender_endpoint);

    std::cout.write(recv_buf.data(), len);
  } catch (std::exception &e) {
    std::cerr << e.what() << std::endl;
  }

  return 0;
}

```

- The start of the application is essentially the same as for the TCP daytime client.

- We use an `ip::udp::resolver` object to find the correct remote endpoint to use based on the host and service names. The query is restricted to return only IPv4 endpoints by the `ip::udp::v4()` argument.
- The `ip::udp::resolver::resolve()` function is guaranteed to return at least one endpoint in the list if it does not fail. This means it is safe to dereference the return value directly.

- Since UDP is [datagram-oriented](https://en.wikipedia.org/wiki/Datagram), we will not be using a stream socket. Create an `ip::udp::socket` and initiate contact with the remote endpoint.

- Now we need to be ready to accept whatever the server sends back to us. The endpoint on our side that receives the server's response will be initialised by `ip::udp::socket::receive_from()`.
