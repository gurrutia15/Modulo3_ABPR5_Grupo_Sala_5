let alert = document.querySelector('.form__button')

alert.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('successAlert').style.display='block'
})

// Modal cierre automáticamente luego del tiempo indicado
document.addEventListener('DOMContentLoaded', function () {
    const modalElement = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElement);

    modalElement.addEventListener('shown.bs.modal', function () {
      setTimeout(function () {
        modal.hide();
      }, 3000); // 3 segundos
    });
  });