# Calendar PWA

A fully offline-capable Progressive Web App (PWA) for displaying a yearly calendar for the federal state of Saxony (Germany). It includes public holidays, calendar weeks, the current day, and a flexible year selection from 2000 to 2099 – optimized for desktop, tablet, and smartphone.

## 🧑‍💻 Team
- Lilly Schilling (s87216)
- Marija Ratnikova (s86339)

## 📁 Project Structure
- `index.html` – Main page of the PWA
- `style.css` – Design and styling
- `script.js` – Calendar logic (generated dynamically with JavaScript)
- `data/feiertage.json` – Public holidays (static + calculated)
- `assets/icons/` – PWA icons
- `manifest.json`, `sw.js` – PWA functionality

## ▶️ Local Usage

1. Download or clone the project folder  
2. Start any local server (for example VSCode with the Live Server extension)  
3. Open `index.html` in the browser  
4. The project will run in the browser  

### Offline Test
1. Open **DevTools**
2. Go to **Application → Service Worker**
3. Enable **Offline**
4. Reload the page — the app should work without an internet connection

## Installation as an App

1. Open the project in a browser  
2. Select **Install App** in the address bar or browser menu  
3. The app will run in its own application window with an icon in the taskbar

## Features

- Dynamic display of the entire year (2000–2099)
- Saxony-specific public holidays (fixed and movable)
- Highlighting of the current day and holidays
- Calendar weeks with a color system for better orientation
- Responsive layout (desktop, tablet, smartphone)
- Installable as a PWA
- Fully usable offline

## Technologies Used

- HTML5, CSS3, JavaScript (ES6)
- CSS Grid Layout and Media Queries
- Gauss algorithm for calculating Easter
- JSON (AJAX Fetch)
- PWA technologies: Manifest, Service Worker, Icons

