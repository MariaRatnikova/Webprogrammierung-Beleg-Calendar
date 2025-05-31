
const kalender   = document.getElementById("kalender-container"); // Container für alle Monatsboxen
const jahrLabel  = document.getElementById("jahr-anzeige");       // Anzeige der aktuellen Jahreszahl

const overlay    = document.getElementById("year-overlay");       // Overlay-Hintergrund zur Jahresauswahl
const okBtn      = document.getElementById("year-ok");            // Button zum Bestätigen des neuen Jahres
const d3         = document.getElementById("d3");                 // Eingabefeld für dritte Ziffer des Jahres (z. B. „2“ bei 2025)
const d4         = document.getElementById("d4");                 // Eingabefeld für vierte Ziffer des Jahres (z. B. „5“ bei 2025)

const resetBtn   = document.getElementById("reset-jahr");         // Button zum Zurücksetzen auf das aktuelle Jahr
const popup      = document.getElementById("feiertag-popup");     // Tooltip zur Anzeige von Feiertagsnamen


const heute      = new Date();               // Heutiges Datum (aktuelles Datum vom System)
let   aktJahr    = heute.getFullYear();      // Das momentan angezeigte Jahr
const aktMonat   = heute.getMonth();         // Der aktuelle Monat (0–11, Januar=0)

const monate = [ "Januar","Februar","März","April","Mai","Juni",
                 "Juli","August","September","Oktober","November","Dezember" ]; // Monatsnamen


// M2A: ISO-Wochennummer berechnen (für Anzeige der Kalenderwoche)
function isoKW(d){
  const tmp=new Date(d); tmp.setHours(0,0,0,0);                             // Zeit zurücksetzen
  tmp.setDate(tmp.getDate()+3-((tmp.getDay()+6)%7));                       // zum Donnerstag der Woche springen
  const w1=new Date(tmp.getFullYear(),0,4);                                // erster Donnerstag im Jahr
  return 1+Math.round(((tmp-w1)/864e5-3+((w1.getDay()+6)%7))/7);           // ISO-Wochennummer berechnen
}

/*  M3B: Gaußformel zur Osterberechnung
   Diese Funktion berechnet das Datum des Ostersonntags für ein gegebenes Jahr (j)
   mithilfe der klassischen Gaußformel. Von diesem Datum werden  dynamische
   Feiertage wie Karfreitag, Ostermontag, Himmelfahrt und Pfingsten abgeleitet.
 */

function ostern(j){
  const a=j%19,                               // jahr im Mondzyklus
        b=Math.floor(j/100),               //b für das jahundert und c das jahr in einem jahrhundert
        c=j%100,
        d=Math.floor(b/4),
        e=b%4,       // d und e helfen den kalender zu kalibrieren
        f=Math.floor((b+8)/25),
        g=Math.floor((b-f+1)/3), //f und g sind für feinkorrekturen des kalender verhaltens
        h=(19*a+b-d-g+15)%30,
        i=Math.floor(c/4),
        k=c%4, // i und k passen den Tag im Monat an
        l=(32+2*e+2*i-h-k)%7, //Korrektur des Wochentags
        m=Math.floor((a+11*h+22*l)/451), // fällt der tag auf märz oder april ??
        n=Math.floor((h+l-7*m+114)/31),
        p=(h+l-7*m+114)%31+1; //n schaut auf den monat 3 für märz oder 4 für april und p ist der tag vor dem monat
  return new Date(j,n-1,p);                                               // Datum des Ostersonntags zurückgeben
}

/* M3A: Feiertage laden via JSON & Fetch (AJAX)
   - Feiertage werden aus externer JSON-Datei geladen (feiertage.json)
   - Fetch wird verwendet
   - Statische Feiertage werden direkt als Date-Objekte gespeichert
*/

async function feiertageFür(j){
  const res  = await fetch("./data/feiertage.json");                      // JSON-Datei laden
  const js   = await res.json();                                          // Inhalt parsen

  const stat = js.statisch.map(f=>({name:f.name, date:new Date(j,f.monat-1,f.tag)})); // feste Feiertage erzeugen

  const easter = ostern(j);                                              // Ostersonntag berechnen

  // M3B: Dynamische Feiertage anhand des Osterdatums berechnen

  const dyn = [
    {name:"Karfreitag",     date:new Date(+easter-2*864e5)},             // Karfreitag = 2 Tage vor Ostern
    {name:"Ostermontag",    date:new Date(+easter+864e5)},               // Ostermontag = 1 Tag nach Ostern
    {name:"Himmelfahrt",    date:new Date(+easter+39*864e5)},            // Himmelfahrt = 39 Tage nach Ostern
    {name:"Pfingstmontag",  date:new Date(+easter+50*864e5)},            // Pfingstmontag = 50 Tage nach Ostern
    {name:"Buß- und Bettag",date:(d=>{while(d.getDay()!==3)d.setDate(d.getDate()-1);return d})(new Date(j,10,23))} // Vorletzter Mittwoch im November
  ];
  return [...stat,...dyn];                                              // feste + dynamische Feiertage zusammenführen
}

/*  M2A: Kalender-Logik
   - Dynamische Erzeugung der Monatsansicht
   - Berücksichtigt Anzahl der Tage inkl. Schaltjahr
   - Kalenderwochen (ISO) werden korrekt eingefügt
   - Feiertage und aktueller Tag werden hervorgehoben
 */

function baueMonat(j,m,fts){
  const box = document.createElement("div");                            // Monats-Container
  box.className = "monat";
  box.innerHTML = `<h3>${monate[m]}</h3>
     <div class="tage-header" style="display:grid;grid-template-columns:repeat(8,1fr);font-weight:bold">
       <div>KW</div><div>Mo</div><div>Di</div><div>Mi</div><div>Do</div><div>Fr</div><div>Sa</div><div>So</div>
     </div>`; // Tabellenkopf mit Wochentagen + KW

  const grid = document.createElement("div");                           // Grid für einzelne Tage
  grid.className = "tage-container";
  grid.style.cssText = "display:grid;grid-template-columns:repeat(8,1fr)";

  const maxTage = new Date(j,m+1,0).getDate();                          // Anzahl der Tage im Monat
  let offen = false;                                                    // Steuert, ob Woche offen ist

  for(let d=1; d<=maxTage; d++){
    const dat = new Date(j,m,d), iso = (dat.getDay()||7);              // aktuelles Datum & ISO-Wochentag (1=Mo, 7=So)

    if(!offen || iso===1){                                             // neue Woche beginnt
      const kw = document.createElement("div");
      kw.textContent = isoKW(dat);                                     // ISO-Woche einfügen
      kw.className   = "kw-cell";
      grid.appendChild(kw);
      offen = true;
      for(let i=1;i<iso;i++) grid.appendChild(document.createElement("div")); // leere Zellen vor Montag
    }

    const zelle = document.createElement("div");                       // Zelle für einen Kalendertag
    zelle.className = "tag";
    zelle.textContent = d;
    zelle.dataset.jahr=j; zelle.dataset.monat=m; zelle.dataset.tag=d; // Datumswerte speichern

    const heuteDatum = new Date();                                     // aktuelles Datum abrufen
    const heuteFlag = j === heuteDatum.getFullYear() &&
                      m === heuteDatum.getMonth() &&
                      d === heuteDatum.getDate();                      // prüfen, ob dieser Tag heute ist
    
    const feiertagObj = fts.find(f=>f.date.getFullYear()===j&&f.date.getMonth()===m&&f.date.getDate()===d); // Feiertag?

    if(heuteFlag)          zelle.classList.add("heute");               // "heute"-Markierung

    // M3B: Feiertag optisch hervorheben + Tooltip anzeigen

    if(feiertagObj){
      zelle.classList.add("feiertag");                                 // Feiertags-Markierung
      zelle.title = feiertagObj.name;                                  // Tooltip-Text setzen
    }
    if(heuteFlag && feiertagObj) zelle.classList.add("heute","feiertag"); // beide Klassen setzen

    grid.appendChild(zelle);                                           // Tag einfügen

    if(iso===7 || d===maxTage){                                        // Woche beenden
      const rest = 7-iso;
      for(let i=0;i<rest;i++) grid.appendChild(document.createElement("div")); // leere Zellen bis Sonntag
      offen=false;
    }
  }
  box.appendChild(grid);                                               // Grid in Monatsbox einfügen
  return box;
}

// M2A: Komplette Jahresübersicht rendern, ruft baueMonat() für alle 12 Monate auf

async function zeigeJahr(j){
  const fts = await feiertageFür(j);                                   // Feiertage für das Jahr laden
  kalender.innerHTML = "";                                             // alten Kalender löschen
  for(let m=0;m<12;m++) kalender.appendChild(baueMonat(j,m,fts));      // alle 12 Monate einfügen

  aktJahr            = j;                                              // aktives Jahr aktualisieren
  jahrLabel.textContent = j;                                           // Jahreszahl in der Anzeige aktualisieren
}


document.addEventListener("click",evt=>{
  const el = evt.target;
  if(el.classList.contains("tag") && el.classList.contains("feiertag")){
    popup.textContent = el.title;                                      // Namen des Feiertags zeigen
    popup.style.left  = `${evt.pageX+10}px`;
    popup.style.top   = `${evt.pageY+10}px`;
    popup.classList.remove("hidden");                                  // Tooltip anzeigen
  }else popup.classList.add("hidden");                                 // Tooltip ausblenden
});


function setDigits(y){ const s=String(y); d3.value=s[2]; d4.value=s[3]; } // Ziffernfelder setzen

jahrLabel.addEventListener("click",()=>{
  setDigits(aktJahr);                                                  // Ziffern synchronisieren
  overlay.classList.remove("hidden");                                  // Overlay anzeigen
});

overlay.addEventListener("click",e=>{
  if(e.target===overlay) overlay.classList.add("hidden");              // Klick außerhalb: Overlay schließen
});

okBtn.addEventListener("click",()=>{
  const y = 2000 + (+d3.value)*10 + (+d4.value);                       // Jahr berechnen
  overlay.classList.add("hidden");                                     // Overlay schließen
  zeigeJahr(y);                                                        // Jahr anzeigen
});


resetBtn.addEventListener("click",()=> zeigeJahr(heute.getFullYear())); // Aktuelles Jahr anzeigen


/* ───── dritte & vierte Ziffern initial befüllen ─────────────────── */
for(let i=0;i<=9;i++){ d3.add(new Option(i,i)); d4.add(new Option(i,i)); } // Optionen 0–9 einfügen

/* ───── Start: aktuelles Jahr darstellen ─────────────────────────── */
zeigeJahr(aktJahr); // Kalender für aktuelles Jahr anzeigen

//Serviceworker für Offline nutzung
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registriert:', reg.scope))
        .catch(err => console.error('Service Worker Fehler:', err));
  });
}