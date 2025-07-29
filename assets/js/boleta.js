// Detalle del producto
document.addEventListener('DOMContentLoaded', function() {
    const detalleProducto = JSON.parse(localStorage.getItem('carrito')) || [];
    const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || {};

    const tbody = document.querySelector('#tabla-carrito tbody');
    tbody.innerHTML = ''

    detalleProducto.forEach(item => {
        const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>$${item.cantidad.toLocaleString('es-CL')}</td>
                <td>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
            `;
            tbody.appendChild(tr);
        });
    
    // Resumen de Compra
    document.getElementById('montoNeto').textContent = `$${resumenCompra.neto?.toLocaleString('es-CL') || '0'} `;
    document.getElementById('impuesto').textContent = `$${resumenCompra.iva?.toLocaleString('es-CL') || '0'} `;
    document.getElementById('montoBruto').textContent = `$${resumenCompra.bruto?.toLocaleString('es-CL') || '0'} `;

})

// Dirección de despacho

window.enviarDespacho = function() {
        const nombreReceptor = document.getElementById('nombreReceptor').value;
        const email = document.getElementById('email').value;
        const direccion = document.getElementById('direccion').value;
        const comuna = document.getElementById('comuna').value;
        const regionSelect = document.getElementById('region');
        const region = regionSelect.options[regionSelect.selectedIndex].text;

        document.getElementById('boleta-direccion').textContent = direccion;
        document.getElementById('boleta-comuna').textContent = comuna;
        document.getElementById('boleta-region').textContent = region;
        document.getElementById('boleta-nombreReceptor').textContent = nombreReceptor;
        document.getElementById('boleta-email').textContent = email;

};

