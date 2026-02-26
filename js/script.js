const generar = document.getElementById('generar');
const generarWifi = document.getElementById('generar-wifi');
const generarContacto = document.getElementById('generar-contacto');
const generarEvento = document.getElementById('generar-evento');

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

// Contact QR Generation
generarContacto.addEventListener('click', function (e) {
    e.preventDefault();
    const nombre = document.getElementById("vcard-nombre").value;
    const tel = document.getElementById("vcard-tel").value;
    const email = document.getElementById("vcard-email").value;

    if (nombre.trim() === "" || tel.trim() === "") return;

    let vcardString = `BEGIN:VCARD\nVERSION:3.0\nN:${nombre}\nTEL:${tel}`;
    if (email.trim() !== "") {
        vcardString += `\nEMAIL:${email}`;
    }
    vcardString += `\nEND:VCARD`;

    generar_qr(vcardString);
    $('.contenedor').removeClass("oculto").addClass("visible");
});

// Helper for VEvent date format (YYYYMMDDTHHMMSS)
function formatVEventDate(dateString) {
    if (!dateString) return "";
    const d = new Date(dateString);
    const pad = (num) => num.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

// Event QR Generation
generarEvento.addEventListener('click', function (e) {
    e.preventDefault();
    const titulo = document.getElementById("vevent-titulo").value;
    const inicioDate = document.getElementById("vevent-inicio").value;
    const finDate = document.getElementById("vevent-fin").value;
    const ubicacion = document.getElementById("vevent-ubicacion").value;

    if (titulo.trim() === "" || inicioDate === "" || finDate === "") return;

    let veventString = `BEGIN:VEVENT\nSUMMARY:${titulo}\nDTSTART:${formatVEventDate(inicioDate)}\nDTEND:${formatVEventDate(finDate)}`;

    if (ubicacion.trim() !== "") {
        veventString += `\nLOCATION:${ubicacion}`;
    }
    veventString += `\nEND:VEVENT`;

    generar_qr(veventString);
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

        // Hide QR container when switching tabs
        $('.contenedor').removeClass("visible").addClass("oculto");
    });
});
