#!/usr/bin/bash

# These are the dependencies to install Sonic-pi, to make music by coding.

dependencies=("build-essential" "git" "libssl-dev" "ruby-dev" "elixir" "erlang-dev" "erlang-xmerl" "qt6-tools-dev" "qt6-tools-dev-tools" "libqt6svg6-dev"
  "libqt6opengl6-dev" "supercollider-server" "sc3-plugins-server" "alsa-utils" "libasound2-dev" "cmake" "ninja-build" "pipewire-jack" "libspa-0.2-jack"
  "qt6-wayland" "libwayland-dev" "libxkbcommon-dev" "libegl1-mesa-dev" "libx11-dev" "libxft-dev" "libxext-dev" "qpwgraph" "compton" "m4" "libaubio-dev" "libpng-dev"
  "libboost-all-dev" "librtmidi-dev")

echo 'installing dependencies...'
for dep in "${dependencies[@]}"; do sudo apt install -y "$dep"; done

echo 'cloning the repository...'
git clone https://github.com/sonic-pi-net/sonic-pi.git ~/Development/sonic-pi
cd ~/Development/sonic-pi/app

echo 'starting build script...'
./linux-build-all.sh
