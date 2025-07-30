const modalElement = document.getElementById('exampleModal');
  const modal = new bootstrap.Modal(modalElement);
  const formulario=document.querySelector('form') 
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
  }); 
  modalElement.addEventListener('shown.bs.modal', function () {
    console.log("saludillos aquí")
    setTimeout(function () {
      modal.hide();
    }, 3000); // 3 segundos
  });