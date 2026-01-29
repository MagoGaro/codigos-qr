const generar = document.getElementById('generar');
const generarWifi = document.getElementById('generar-wifi');

function generar_qr(url) {
    const canvas = document.getElementById('codigo-qr');
    const qr = new QRious({
        element: canvas,
        value: url,
        size: 150 // Increased size for visibility
    });
}

// QR Generation
generar.addEventListener('click', function (e) {
    e.preventDefault();
    const url = document.getElementById("url").value;
    if (url.trim() === "") return; // Basic validation

    generar_qr(url);
    $('.contenedor').removeClass("oculto").addClass("visible");
});

// WiFi QR Generation
generarWifi.addEventListener('click', function (e) {
    e.preventDefault();
    const ssid = document.getElementById("ssid").value;
    const password = document.getElementById("password").value;
    const security = document.getElementById("security").value;

    if (ssid.trim() === "") return;

    // Format: WIFI:T:WPA;S:mynetwork;P:mypass;;
    // T = Type (WPA, WEP, nopass)
    // S = SSID
    // P = Password
    let wifiString = `WIFI:S:${ssid};`;

    if (security !== 'nopass') {
        wifiString += `T:${security};P:${password};;`;
    } else {
        wifiString += `T:nopass;;`;
    }

    generar_qr(wifiString);
    $('.contenedor').removeClass("oculto").addClass("visible");
});

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});
