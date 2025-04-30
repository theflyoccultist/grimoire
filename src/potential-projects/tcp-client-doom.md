    Quest: Hello, Marine

    Objective:

        Build a TCP server in C that listens on a port (e.g., 6666).

        Accept new incoming clients (players).

        As soon as a client connects, send a simple greeting message: "HELLO, MARINE. WELCOME TO HELL."

        Server must stay up and handle multiple clients sequentially (one at a time is fine for now).

    Bonus Goals (for extra XP):

        Print in your server terminal whenever a client connects or disconnects.

        Gracefully handle client disconnects without crashing the server.

        Write a client in C (or Python if you need to move fast) that can connect and receive the welcome message.

    Super Boss Mode (Optional, if you're feeling spicy):

        Handle multiple clients concurrently using fork(), select(), or poll().
        (only if you’re mentally stable that day lmao)

Victory Conditions:

    If you can launch the server, connect a client, and see "HELLO, MARINE. WELCOME TO HELL." pop up on the client’s side without server crash?
    Mission Clear.
