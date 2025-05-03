const kalenderContainer = document.getElementById("kalender-container");
// Referenz zum HTML-Element mit der ID "kalender-container" (Zielbereich für den Kalender)

const monate = [ // Array mit allen Monatsnamen
    "Januar", "Februar", "März", "April",
    "Mai", "Juni", "Juli", "August",
    "September", "Oktober", "November", "Dezember"
];

monate.forEach((monat) => { //durchlaufen des Arrays befüllen mit Namen
    const monatBox = document.createElement("div"); // CSS-Klasse "monat" hinzufügen (für Styling)
    monatBox.classList.add("monat"); //Zuteilung der Klasse Monat
    monatBox.textContent = monat; // Monatsnamen reinschreiben
    kalenderContainer.appendChild(monatBox); //Einfügen in HTML
});