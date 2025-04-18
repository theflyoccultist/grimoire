🧠 Common Lisp on Void Linux: The Arcane Setup

This guide walks you through a CLISP-based Common Lisp setup on Void Linux, optimized for low-resource environments and terminal-only workflows—because your old machine doesn’t need Electron bloat to be blessed with sentience.
1. 🔮 Install CLISP via XBPS

xbps-install -Sy clisp

    This installs CLISP, a compact and ANSI-compliant Common Lisp implementation—perfect for ancient machines. No SBCL compilation marathons here.

2. 💬 REPL Invocation

Start the Lisp shell:

clisp

You’ll get something like:

[1]> (+ 1 2 3)
6

Type (exit) to leave the shell like a polite demon.
3. 📜 Hello World in Lisp

Make your first spell:

vim hello.lisp

(format t "Hello from the haunted machine!~%")

Run it like so:

clisp hello.lisp

4. 🔁 Compile for Ritual Speed

CLISP can "compile" files to bytecode using compile-file:

[1]> (compile-file "hello.lisp")

It creates a .fas file:

ls hello.fas

You can now load it faster in sessions:

(load "hello.fas")

5. 🔧 REPL Scripting Tips

In clisp, you can define functions interactively:

(defun cursed-add (a b)
  (+ a b))

Then call it:

(cursed-add 6 6)

6. 🪬 Optional Enhancements

If your laptop can handle it, consider:

xbps-install rlwrap

Then launch Lisp with:

rlwrap clisp

This gives you command history and line editing, because even ghosts deserve usability.
7. 💀 Your Next Rituals

    Write a Lisp script to generate creepy ASCII art.

    Use recursion to model rituals and summonings.

    Combine it with C via FFI if you’re feeling extra cursed.
