# Bulb On/Off (simple XAMPP project)

Place this folder inside your XAMPP `htdocs` directory (already set up to use this path). Start Apache, then open these pages from your phone or PC on the same network:

- Bulb view (read-only, auto-polls): http://localhost/bulb%20on%20off/bulbs.html
- Switches (control view): http://localhost/bulb%20on%20off/switches.html

Notes:
- `api.php` reads/writes `state.json` in the same folder. No authentication — keep on a trusted LAN.
- Change default bulb count from the Switches page.
