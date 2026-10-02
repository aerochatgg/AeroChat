# AeroChat Desktop — Setup Guide

This turns your existing AeroChat website into a real Windows/Mac app.
Nothing about your Supabase backend changes — this only changes how the
app's files get to the user (bundled into the app itself, instead of
downloaded from Netlify every time).

## What you need first

**Node.js** — this is a program that lets your computer run JavaScript
outside a browser, which is what Electron needs.

1. Go to **nodejs.org**
2. Download the **LTS** version (the button that just says "Download" —
   not "Current")
3. Run the installer, click through with defaults

## One-time setup

1. Unzip/place this whole `aerochat-desktop` folder somewhere on your
   computer (Desktop is fine).
2. Open a terminal in that folder:
   - **Windows**: open the folder in File Explorer, click the address
     bar, type `cmd`, press Enter
   - **Mac**: right-click the folder → Services → "New Terminal at
     Folder" (or open Terminal and type `cd ` then drag the folder in)
3. Type this and press Enter:
   ```
   npm install
   ```
   This downloads Electron itself — it may take a minute or two and
   only needs to happen once.

## Test it

Still in that same terminal:
```
npm start
```
A window should open with AeroChat running in it, no browser
involved. Close the window when you're done testing.

## Build a real installer

When you're happy with it:
```
npm run build
```
This creates an installer file inside a new `dist` folder —
a `.exe` on Windows, a `.dmg` on Mac. That's the actual file you'd
share with someone to install AeroChat like a normal app.

## If something goes wrong

- **"npm is not recognized"** → Node.js didn't install correctly, or
  you need to close and reopen the terminal after installing it.
- **`npm run build` fails on Windows about needing admin rights** →
  right-click Command Prompt and "Run as administrator", then try
  again from that window.
- Paste the exact error back to me and I'll help you fix it.

## Updating the app later

Any time you want to update AeroChat (new features, bug fixes):
1. Replace the files inside the `app` folder with the new ones
2. Run `npm run build` again to produce a new installer

## About Claude Code

Everything above is normal terminal commands — if you'd rather not
type them by hand, **Claude Code** (Anthropic's coding tool) can run
these commands for you interactively and fix errors as they come up,
right on your own computer.
