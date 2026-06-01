/**
 * script.js – Generátor hesel
 * Logika pro generování náhodného bezpečného hesla.
 */

/* ===================================================
   Znakové sady
   =================================================== */
const CHARS_LOWER   = 'abcdefghijklmnopqrstuvwxyz';   // Malá písmena
const CHARS_UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';   // Velká písmena
const CHARS_DIGITS  = '0123456789';                    // Číslice
const CHARS_SPECIAL = '~@#$_-';                        // Speciální symboly

/* ===================================================
   Pomocná funkce: kryptograficky bezpečné náhodné číslo
   v rozsahu [0, max)
   =================================================== */
function secureRandom(max) {
  // Využíváme window.crypto pro bezpečnou náhodnost
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

/* ===================================================
   Hlavní funkce: generatePassword
   Volána při kliknutí na tlačítko GENEROVAT.
   =================================================== */
function generatePassword() {
  // --- Načtení hodnot z formuláře ---
  const lengthInput   = document.getElementById('passwordLength');
  const specialToggle = document.getElementById('specialChars');
  const display       = document.getElementById('passwordDisplay');

  // Délka hesla – validace rozsahu 6–24
  let length = parseInt(lengthInput.value, 10);
  if (isNaN(length) || length < 6)  length = 6;
  if (length > 24)                  length = 24;
  lengthInput.value = length; // Opravíme vstup, pokud byl mimo rozsah

  // --- Sestavení povolené znakové sady ---
  let charset = CHARS_LOWER + CHARS_UPPER + CHARS_DIGITS;
  if (specialToggle.checked) {
    charset += CHARS_SPECIAL;
  }

  /* -----------------------------------------------
     Bezpečné heslo musí obsahovat alespoň jeden znak
     z každé povinné kategorie (lower, upper, digit).
     Při použití speciálních znaků přidáme i jeden z nich.
     ----------------------------------------------- */
  const required = [
    CHARS_LOWER[secureRandom(CHARS_LOWER.length)],
    CHARS_UPPER[secureRandom(CHARS_UPPER.length)],
    CHARS_DIGITS[secureRandom(CHARS_DIGITS.length)],
  ];

  if (specialToggle.checked) {
    required.push(CHARS_SPECIAL[secureRandom(CHARS_SPECIAL.length)]);
  }

  // --- Zbytek znaků vybíráme náhodně z celé sady ---
  const remaining = length - required.length;
  const passwordChars = [...required];

  for (let i = 0; i < remaining; i++) {
    passwordChars.push(charset[secureRandom(charset.length)]);
  }

  // --- Zamíchání pole (Fisher-Yates shuffle) ---
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  // --- Zobrazení hesla ---
  const password = passwordChars.join('');
  display.textContent = password;

  // --- Animace "bliknutí" pro vizuální zpětnou vazbu ---
  display.classList.remove('flash');
  // Krátké zpoždění zajistí opětovné spuštění animace
  void display.offsetWidth; // reflow
  display.classList.add('flash');

  // Odebereme třídu po skončení přechodu (0.4 s)
  setTimeout(() => display.classList.remove('flash'), 400);
}

/* ===================================================
   Inicializace: vygenerujeme heslo při načtení stránky
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  generatePassword();
});
