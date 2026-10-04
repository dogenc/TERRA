from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import webbrowser

LOGO = """
  ████████╗ ███████╗ ██████╗  ██████╗   █████╗
  ╚══██╔══╝ ██╔════╝ ██╔══██╗ ██╔══██╗ ██╔══██╗
     ██║    █████╗   ██████╔╝ ██████╔╝ ███████║
     ██║    ██╔══╝   ██╔══██╗ ██╔══██╗ ██╔══██║
     ██║    ███████╗ ██║  ██║ ██║  ██║ ██║  ██║
     ╚═╝    ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝
E R D A T L A S  ·  3 D  ·  O P E N  S O U R C E
"""

PORT = 8767
URL = f"http://127.0.0.1:{PORT}"


class Handler(SimpleHTTPRequestHandler):
    # Python kennt nicht alle Atlas-Dateitypen; ES-Module brauchen den passenden MIME-Typ.
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".js": "text/javascript", ".mjs": "text/javascript",
                      ".geojson": "application/geo+json", ".webmanifest": "application/manifest+json"}


def main():
    root = Path(__file__).resolve().parent / "dist"
    if not (root / "index.html").is_file():
        raise SystemExit("Der Ordner „dist“ fehlt. Bitte zuerst die gesamte ZIP-Datei entpacken.")
    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=str(root)))
    except OSError:
        raise SystemExit(f"Port {PORT} ist belegt. Beende einen bereits laufenden TERRA-Start und versuche es erneut.")
    try:
        print(LOGO)
    except UnicodeEncodeError:
        print("TERRA · Erdatlas in 3D")
    print(f"TERRA · DGKN@Labs\n{URL} · Nur auf diesem Computer erreichbar · Strg+C beendet den Atlas")
    webbrowser.open(URL)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
