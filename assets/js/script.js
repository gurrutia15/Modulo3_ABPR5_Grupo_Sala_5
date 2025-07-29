// catalogo

const products = [
  { id: '001', imagen: './assets/images/product1.jpeg', nombre: "Robot Aspirador X300", codigo: "T001", descripcion: "Aspiradora inteligente con mapeo láser y app control. Ideal para pisos de hasta 120m².", precio: 249990 },
  { id: '002', imagen: './assets/images/product2.jpeg', nombre: "Airfryer Digital 5L", codigo: "T002", descripcion: "Freidora de aire con 8 programas preestablecidos y tecnología 360° para cocción uniforme.", precio: 89990 },
  { id: '003', imagen: './assets/images/product3.jpeg', nombre: "Smartwatch Deportivo Pro", codigo: "T003", descripcion: "Monitor de ritmo cardíaco, GPS integrado y resistencia al agua 50m. Batería de 7 días.", precio: 129990 },
  { id: '004', imagen: './assets/images/product4.jpeg', nombre: "Parlante Bluetooth XSound", codigo: "T004", descripcion: "Sonido 360° con 20W de potencia. Resistente al agua IPX7 y batería de 15 horas.", precio: 59990 },
  { id: '005', imagen: './assets/images/product5.jpeg', nombre: "Kit Limpieza para Robot", codigo: "T005", descripcion: "Incluye 6 paños de microfibra, 2 cepillos y solución limpiadora compatible con marcas principales.", precio: 19990 },
  { id: '006', imagen: './assets/images/product6.jpeg', nombre: "Cargador Inalámbrico 3en1", codigo: "T006", descripcion: "Carga tu smartphone, reloj y audífonos simultáneamente. Potencia 15W.", precio: 34990 },
  { id: '007', imagen: './assets/images/product7.jpeg', nombre: "Laptop UltraSlim i7", codigo: "T007", descripcion: "Pantalla de 14' FHD, 16GB RAM, SSD 512GB, Intel Iris Xe. Solo 1.2kg de peso.", precio: 899990 },
  { id: '008', imagen: './assets/images/product8.jpeg', nombre: "Robot Cocina 12 en 1", codigo: "T008", descripcion: "Amasa, cocina al vapor, fríe y más. Pantalla táctil y 50 recetas preprogramadas.", precio: 249990 },
  { id: '009', imagen: './assets/images/product9.jpeg', nombre: "Monitor Gamer 32' 4K", codigo: "T009", descripcion: "144Hz, 1ms, HDR600, AMD FreeSync Premium. Incluye soporte ajustable.", precio: 459990 },
  { id: '010', imagen: './assets/images/product10.jpeg', nombre: "Cafetera Smart WiFi", codigo: "T010", descripcion: "Prepara café desde tu app. Molinillo integrado y 6 perfiles de bebidas.", precio: 179990 },
  { id: '011', imagen: './assets/images/product11.jpeg', nombre: "SSD Externo 2TB USB-C", codigo: "T011", descripcion: "1050MB/s, resistente a golpes y agua. Ideal para gamers y creadores de contenido.", precio: 89990 },
  { id: '012', imagen: './assets/images/product12.jpeg', nombre: "Mouse Gaming Pro RGB", codigo: "T012", descripcion: "16.000 DPI, 8 botones programables, iluminación RGB personalizable y diseño ergonómico para gaming prolongado.", precio: 49990 }
];

let carrito= [];
let carritoItems= null;

const carritoSummary = document.getElementById('carrito-summary');

document.addEventListener('DOMContentLoaded', function() {
  const productList = document.getElementById('catalogo_productos');
  carritoItems=document.getElementById('carrito-items')

  if (!productList) {
    console.error('No se encontró #catalogo_productos');
    return;
  }

  if (!carritoItems) {
    console.error('No se encontró #carrito-items');
    return;
  } 
    if (productList) {
        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-sm-12 col-md-4 mb-4';
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text text-muted mb-1">Código: ${product.codigo}</p>
                        <p class="card-text">${product.descripcion}</p>
                        <h4 class="text-primary mt-3">$${product.precio.toLocaleString('es-CL')}</h4>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <!-- Línea 1: checkbox y label -->
                        <div class="form-check mb-2">
                          <input type="checkbox" class="form-check-input border-dark" id="chk-${product.id}">
                          <label class="form-check-label" for="chk-${product.id}">Cantidad</label>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="input-group" style="width: 9.7rem;">
                            <button class="btn btn-outline-secondary minus-btn" type="button">-</button>
                            <input type="number" class="form-control text-center quantity-input" id="cinput-${product.id}" value="1" min="1">
                            <button class="btn btn-outline-secondary plus-btn" type="button">+</button>
                          </div>
                          <button class="btn btn-primary" onclick="agregaCarrito('${product.id}')" data-id="${product.id}">Agregar</button>
                        </div>
                      </div>
                </div>
            `;
            productList.appendChild(col);
        });
    }
});

window.agregaCarrito = function(productId) {
    const cantidadProducto = document.getElementById(`cinput-${productId}`);
    if (!cantidadProducto) {
      console.error(`Input cinput-${productId} no encontrado`);
      return;
    }

    const cantidad = parseInt(cantidadProducto.value, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Cantidad no válida");
      return;
    }

    const producto = products.find(p => p.id === productId);
    if (!producto) return;

    const existente = carrito.find(item => item.id === productId);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }

    cantidadProducto.value = 1;
    renderCarrito();
  };

  window.cambiarCantidad = function(id, delta) {
    const input = document.getElementById(`cinput-${id}`);
    if (!input) return;
    let valor = parseInt(input.value) + delta;
    if (valor < 1) valor = 1;
    input.value = valor;
  };

  window.renderCarrito = function () {
    const seccionCarrito = document.getElementById('seccion-carrito')
  const tabla = document.getElementById('tabla-carrito');
  const tbody = tabla.querySelector('tbody');
  if (!tabla) {
    console.error('Tabla del carrito no encontrada');
    return;
  }

  
  tbody.innerHTML = '';

  if (carrito.length === 0) {
    seccionCarrito.style.display='none'
    return
  } 
  seccionCarrito.style.display='block'

  carrito.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toLocaleString('es-CL')}</td>
        <td>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
        <td><button class="btn btn-danger" onclick="eliminarDelCarrito('${item.id}')">BORRAR</button></td>
      `;
      tbody.appendChild(tr);
    });
    
const neto = carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
const iva = neto * 0.19;
let bruto = neto + iva;
const despacho = bruto < 200000 ? bruto * 0.05 : 0;
bruto += despacho;

carritoSummary.innerHTML = `<p><strong>Valor Neto:</strong> $${neto.toLocaleString()}</p>
                            <p><strong>IVA 19%:</strong> $${iva.toLocaleString()}</p>
            ${despacho > 0 ? `<p><strong>Despacho:</strong> $${despacho.toLocaleString()}</p>` : ''}
                            <p><strong>Valor Bruto:</strong> $${bruto.toLocaleString()}</p>`

};

  window.eliminarDelCarrito = function(productId) {
    const index = carrito.findIndex(item => item.id === productId);
    if (index !== -1) {
      carrito.splice(index, 1);
      renderCarrito();
    }
  };

  renderCarrito();

  // ==============================

/*const alert = document.querySelector('.form__button')

alert.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('successAlert').style.display = 'block'
}) */

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