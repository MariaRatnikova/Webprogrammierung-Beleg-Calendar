# Kalender-PWA

Eine vollständig offline-fähige Progressive Web App (PWA) zur Darstellung eines Jahreskalenders für das Bundesland Sachsen. Enthält Feiertage, Kalenderwochen, heutiges Datum und eine flexible Jahresauswahl von 2000 bis 2099 – optimiert für Desktop, Tablet und Smartphone.

## 🧑‍💻 Team
- Lilly Schilling (s87216)
- Marija (S-Nummer)

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

## Erfüllte Anforderungen
| Kriterium | Umsetzung |
|----------|-----------|
| **Darstellung eines Kalenders mit Kalenderwochen** | Dynamische Generierung im CSS-Grid-Layout mit 3×4 Monaten und 8 Spalten (KW + Mo–So) |
| **Statische Feiertage (JSON)** | `feiertage.json` im Verzeichnis `data/` – mit Name, Tag, Monat |
| **Dynamische Feiertage (berechnet)** | Mit JavaScript (inkl. Gaußsche Osterformel, Schaltjahrprüfung) |
| **Aktuelles Datum markiert** | Korallrot hervorgehoben (`.heute`) |
| **Feiertage farblich hervorgehoben** | In Mint (`.feiertag`) + Tooltip bei Klick |
| **Kalenderjahr wählbar (Topbar + Select)** | Dynamische Jahresauswahl über Overlay (`select` für Ziffern) |
| **Voreinstellung: aktuelles Jahr** | Dynamisch gesetzt bei App-Start und Reload |
| **Responsives Design** | CSS-Media-Queries für Tablet (<900px) & Mobile (<600px) |
| **Title-Tag mit Jahr** | Dynamisch via JavaScript gesetzt |
| **PWA-Funktionalität (Manifest, Icons)** | `manifest.json` + `assets/icons/` eingebunden |
| **Service Worker (Caching, Offline)** | `sw.js` – statische Assets gecached, Fallback funktioniert ohne offline.html |
| **Test über Chrome DevTools: erfolgreich** | Offline-Modus geprüft (Application > Service Worker > „Offline“ ✓) |
## Angestrebte Note
| Bewertungsstufe | Kriterium | ✔ Erfüllt |
|-----------------|-----------|-----------|
| **Genügend** | Kalender, Feiertage im Code, dynamische Berechnung | ✅ |
| **Befriedigend** | Kalenderwochen, aktueller Tag, Title-Tag, Topbar, Feiertage als JSON | ✅ |
| **Gut** | Responsives Layout, Feiertage via Fetch/Ajax aus externer JSON | ✅ |
| **Sehr gut** | PWA installierbar, funktioniert komplett offline | ✅ |
## 📅 Abgabe
- Als ZIP an paul@informatik.htw-dresden.de
- Deadline: **10.06.2025 – 23:59 Uhr**
- Betreff: MI – Beleg Kalender-PWA – [Name, S-Nummern]