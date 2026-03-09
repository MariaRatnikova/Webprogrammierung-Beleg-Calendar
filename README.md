# Kalender-PWA

Eine vollständig offline-fähige Progressive Web App (PWA) zur Darstellung eines Jahreskalenders für das Bundesland Sachsen. Enthält Feiertage, Kalenderwochen, heutiges Datum und eine flexible Jahresauswahl von 2000 bis 2099 – optimiert für Desktop, Tablet und Smartphone.

## 🧑‍💻 Team
- Lilly Schilling (s87216)
- Marija (s86339)

## 📁 Projektstruktur
- `index.html` – Hauptseite der PWA
- `style.css` – Design
- `script.js` – Kalenderlogik (dynamisch per JS)
- `data/feiertage.json` – Feiertage (statisch + dynamisch)
- `assets/icons/` – PWA-Icons
- `manifest.json`, `sw.js` – PWA-Funktionalität (folgt)

## ▶️ Lokale Nutzung

1. Projektordner entpacken / klonen
2. Ein beliebigen lokalen Server starten (z. B. VSCode mit Live Server Plugin)
3. index.html im Browser aufrufen
4. Projekt wird im Browser geööfnet
5. Offline-Test
    - DevTools - Application - Service Worker - "Offline" aktivieren
    - Seite neu laden - App funktioniert ohne Internet

## Installation als App
1. Aufrufen im Browser
2. "App installieren" auswöhlen - in Adresszeile oder Menü
3. App läuft nun im App Fester mit App Icon an Taskleiste

## Features
- Dynamische Darstellung des gesamten Jahres (2000–2099)
- Sachsen-spezifische Feiertage (fix + beweglich)
- Hervorhebung des heutigen Tages und der Feiertage
- Kalenderwochen + Farbsystem für bessere Orientierung
- Responsives Layout (Desktop, Tablet, Smartphone)
- Installierbar als PWA
- Vollständig offline nutzbar

## Genutzte Technologien
- HTML5, CSS3, JavaScript (Es6)
- Css Grid Layout und Media Querires
- Gaußsche Osterformel
- JSON (Ajax Fetch)
- PWA: Manifest, Service Worker, Icons

