#!/usr/bin/env python3

# Creates a http server to serve the game files for local testing.
# default path is "LifeQuest/Export" relative to the server.py file.

# Script code to serve the game files over HTTP for local testing.
# Provided by the game engine developers.

# ai-gen start (ChatGPT-3.5, 0)
# Only the comments are done by the AI!
# 0 intervantion outside comments


# Import necessary libraries.
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
from pathlib import Path
import os
import sys
import argparse
import contextlib
import socket
import subprocess

# Custom HTTPServer class to handle dual-stack (IPv4 and IPv6) network configurations.
class DualStackServer(HTTPServer):
    def server_bind(self):
        # Try to enable dual-stack support. This may raise an exception on non-dual-stack environments,
        # which we silently ignore.
        with contextlib.suppress(Exception):
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()

# Custom request handler that adds Cross-Origin Resource Sharing (CORS) headers.
class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to both allow CORS and ensure the policies on cross-origin sharing are strict.
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

# Function to open a URL in the default system browser.
def shell_open(url):
    # Handles different OS-specific commands to open a URL in the default browser.
    if sys.platform == "win32":
        os.startfile(url)
    else:
        opener = "open" if sys.platform == "darwin" else "xdg-open"
        subprocess.call([opener, url])

# Function to start the server and optionally open a browser.
def serve(root, port, run_browser):
    os.chdir(root)  # Change the working directory to the root directory of the server.

    if run_browser:
        # Optionally open the served page in the user's default browser.
        print("Opening the served URL in the default browser (use `--no-browser` or `-n` to disable this).")
        shell_open(f"http://127.0.0.1:{port}")

    # Start the server with the given settings.
    test(CORSRequestHandler, DualStackServer, port=port)

# Command-line interface setup.
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", help="port to listen on", default=8060, type=int)
    parser.add_argument(
        "-r", "--root", help="path to serve as root (relative to `platform/web/`)", default="LifeQuest/Export", type=Path
    )
    browser_parser = parser.add_mutually_exclusive_group(required=False)
    browser_parser.add_argument(
        "-n", "--no-browser", help="don't open default web browser automatically", dest="browser", action="store_false"
    )
    parser.set_defaults(browser=True)
    args = parser.parse_args()

    # Ensures the script executes in the directory it's stored in.
    os.chdir(Path(__file__).resolve().parent)

    # Call the function to serve files and potentially open a web browser.
    serve(args.root, args.port, args.browser)

   # ai-gen end
