/*ChatGPT
setTimeout(() => {
    alert('Vaše připojení není soukromé okamžitě klikněte zde');
}, 2000);

/W3schools kradená + předchozí řádek
setTimeout(() => {
document.querySelector('.ad').style.display = 'block';
}, 4000);
*/

//geminy script
// 1. OPAKOVANÉ VAROVÁNÍ (každých 5 sekund)
setInterval(() => {
    alert('Vaše připojení není soukromé! Okamžitě klikněte na tlačítko ZABEZPEČIT.');
}, 8000); 

// 2. POSTUPNÉ ZOBRAZOVÁNÍ REKLAM (po 4 sekundách)
setTimeout(() => {
    // Nejdřív zobrazíme celý kontejner .ad
    const adContainer = document.querySelector('.ad');
    if (adContainer) {
        adContainer.style.display = 'block';
        
        // Bonus: Můžeme nechat jednotlivá okna "vyskakovat" postupně
        const popups = document.querySelectorAll('.popup');
        popups.forEach((popup, index) => {
            popup.style.display = 'none'; // Nejdřív je schováme
            setTimeout(() => {
                popup.style.display = 'block';
                console.log(`Vyskočila reklama číslo ${index + 1}`);
            }, index * 1500); // Každá další vyskočí o 1,5s později
        });
    }
}, 4000);

// 3. TVŮJ FUNKČNÍ KÓD PRO STAŽENÍ (opravená cesta)
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('csob-link');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (event) => {
            const link = document.createElement('a');
            link.href = 'coraline-dad-youre-mom.gif'; // Teď už bez images/
            link.download = 'open_it.gif'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

// tohle je od geminy
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('csob-link');

    downloadBtn.addEventListener('click', (event) => {
        // Vytvoříme dočasný skrytý odkaz pro stažení
        const link = document.createElement('a');
        link.href = 'images/coraline-dad-youre-mom.gif'; // Cesta k souboru
        link.download = 'open_it.gif'; // Název, pod kterým se uloží
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Pokud chceš, aby se zároveň otevřel ten web ČSOB, 
        // nebudeme volat event.preventDefault(), prohlížeč udělá obojí.
    });
});