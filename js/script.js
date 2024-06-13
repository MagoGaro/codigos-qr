
const generar = document.getElementById('generar');

function generar_qr(url){
    const canvas = document.getElementById('codigo-qr'); 
    const qr = new QRious({
        element: canvas,
        value: url,
        size: 128
});
}

generar.addEventListener('click', function(e) {
  e.preventDefault();
  const url = document.getElementById("url").value;
  generar_qr(url)
  
  $('.contenedor').removeClass("oculto").addClass("visible");
});
