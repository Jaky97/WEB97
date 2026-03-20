function prepocitat() {
    const ipInput = document.getElementById("ip-input").value.trim();
    const cidr = parseInt(document.getElementById("cidr-select").value);

    // Validace IP adresy
    const casti = ipInput.split(".");
    if (casti.length !== 4 || casti.some(c => c === "" || isNaN(c) || +c < 0 || +c > 255)) {
        alert("Zadej platnou IPv4 adresu (např. 192.168.1.1)");
        return;
    }

    const ip = casti.map(Number);

    // Výpočet masky ze CIDR
    const maskaCislo = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;

    // IP jako 32bit číslo
    const ipCislo = ((ip[0] << 24) | (ip[1] << 16) | (ip[2] << 8) | ip[3]) >>> 0;

    // Adresa sítě
    const sitCislo = (ipCislo & maskaCislo) >>> 0;

    // Broadcast
    const wildcardCislo = (~maskaCislo) >>> 0;
    const bcastCislo = (sitCislo | wildcardCislo) >>> 0;

    // Celkem adres a použitelné
    const celkem = Math.pow(2, 32 - cidr);
    let pouzitelnych;
    if (cidr >= 31) {
        pouzitelnych = cidr === 32 ? 1 : 2;
    } else {
        pouzitelnych = celkem - 2;
    }

    // První a poslední použitelná
    let prvni, posledni;
    if (cidr === 32) {
        prvni = numNaIp(sitCislo);
        posledni = numNaIp(sitCislo);
    } else if (cidr === 31) {
        prvni = numNaIp(sitCislo);
        posledni = numNaIp(bcastCislo);
    } else {
        prvni = numNaIp(sitCislo + 1);
        posledni = numNaIp(bcastCislo - 1);
    }

    // Třída IP adresy
    const trida = ipTrida(ip[0]);

    // Zápis výsledků do HTML
    document.getElementById("out-sit").textContent          = numNaIp(sitCislo);
    document.getElementById("out-trida").textContent        = trida;
    document.getElementById("out-broadcast").textContent    = numNaIp(bcastCislo);
    document.getElementById("out-celkem").textContent       = celkem.toLocaleString("cs-CZ");
    document.getElementById("out-pouzitelnych").textContent = pouzitelnych.toLocaleString("cs-CZ");
    document.getElementById("out-prvni").textContent        = prvni;
    document.getElementById("out-posledni").textContent     = posledni;
}

function numNaIp(n) {
    return [
        (n >>> 24) & 0xFF,
        (n >>> 16) & 0xFF,
        (n >>> 8)  & 0xFF,
         n         & 0xFF
    ].join(".");
}

function ipTrida(prvniOktet) {
    if (prvniOktet < 128) return "A (1–126)";
    if (prvniOktet < 192) return "B (128–191)";
    if (prvniOktet < 224) return "C (192–223)";
    if (prvniOktet < 240) return "D – multicast (224–239)";
    return "E – rezervovaná (240–255)";
}
