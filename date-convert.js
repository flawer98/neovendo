<script async>
  
  // Dieses Skript übersetzt Datumsformate in das europäische Datumsformat
  
	document.addEventListener("DOMContentLoaded", function () {
    const data = {
      months: {
        en: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        local: [
          'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
          'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
        ],
        shortEn: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        shortLocal: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      },
      days: {
        en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        local: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        shortEn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        shortLocal: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      }
    };

    // Funktion zur sicheren Übersetzung
    const translate = (value, fromArray, toArray) => {
      const index = fromArray.indexOf(value);
      return index !== -1 ? toArray[index] : value; // Rückgabe des Originals, wenn nicht gefunden
    };

    // Textknoten verarbeiten
    const processTextNodes = (node) => {
      if (node.nodeType === 3) { // Nur Textknoten
        let text = node.nodeValue.trim();

        // 1. Übersetze Wochentag + Datum + Monat + Jahr
        text = text.replace(
          /([A-Za-zäöüÄÖÜß]+),\s([A-Za-zäöüÄÖÜß]+)\s(\d{1,2}),\s(\d{4})/,
          (match, weekday, month, day, year) => {
            const translatedWeekday = translate(weekday, data.days.en, data.days.local);
            const translatedMonth = translate(month, data.months.en, data.months.local);
            return `${translatedWeekday}, ${day}. ${translatedMonth} ${year}`;
          }
        );

        // 2. Übersetze isolierte Monatsnamen (Lang- und Kurzform)
        data.months.en.forEach((month, i) => {
          text = text.replace(new RegExp(`\\b${month}\\b`, 'g'), data.months.local[i]);
        });
        data.months.shortEn.forEach((shortMonth, i) => {
          text = text.replace(new RegExp(`\\b${shortMonth}\\b`, 'g'), data.months.shortLocal[i]);
        });

        // 3. Übersetze isolierte Wochentagsnamen (Lang- und Kurzform)
        data.days.en.forEach((day, i) => {
          text = text.replace(new RegExp(`\\b${day}\\b`, 'g'), data.days.local[i]);
        });
        data.days.shortEn.forEach((shortDay, i) => {
          text = text.replace(new RegExp(`\\b${shortDay}\\b`, 'g'), data.days.shortLocal[i]);
        });

        // Aktualisierten Text zurücksetzen
        node.nodeValue = text;
      } else if (node.nodeType === 1) {
        // Über Kindknoten iterieren
        Array.from(node.childNodes).forEach(processTextNodes);
      }
    };

    // Verarbeitung starten
    processTextNodes(document.body);
  });
</script>
