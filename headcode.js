<script>
// Funktion zur Überprüfung der Cookie-Zustimmung
function isCookieConsentGiven() {
  // Überprüfe den Cookie-Wert oder den Zustand des Cookie-Script-Moduls
  return document.cookie.indexOf("cookieConsent=true") > -1 ||
         CookieScript.instance.currentState().action === 'accept';
}

</script>
