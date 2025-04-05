// Función para obtener el código del producto desde la URL
const obtenerCodigoDesdeUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('codigo'); // Usamos 'codigo' en lugar de 'id'
};

// Función para cargar los datos del producto a editar
const cargarDatosProducto = async () => {
    const codigo = obtenerCodigoDesdeUrl();
    
    try {
        const response = await fetch(`http://localhost:3000/api/products/getProductByCode/${codigo}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Producto no encontrado');
        }

        const product = await response.json();

        const precio = parseFloat(product.precio) || 0;
        
        // Llenar formulario
        document.getElementById('codigo').value = product.codigo;
        document.getElementById('nombre').value = product.nombre;
        document.getElementById('descripcion').value = product.descripcion || '';
        document.getElementById('cantidad').value = product.cantidad;
        document.getElementById('precio').value = precio.toFixed(2);
        
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
        window.location.href = 'dashboardProductos.html';
    }
};

// Función para validar el formulario
const validateForm = () => {
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    if (precio < 0 || isNaN(precio)) {
        alert('El precio debe ser un número positivo');
        return false;
    }
    
    if (cantidad < 0 || isNaN(cantidad)) {
        alert('La cantidad debe ser un número entero positivo');
        return false;
    }
    
    return true;
};

// Función para enviar los datos actualizados
const submitForm = async (event) => {
    event.preventDefault();
    
    const form = event.target.closest('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!validateForm()) return;

    const codigo = obtenerCodigoDesdeUrl();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    // Limpiar mensajes de error previos
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    try {
        const response = await fetch(`http://localhost:3000/api/products/updateProduct/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                cantidad: parseInt(cantidad),
                precio: parseFloat(precio)
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            sessionStorage.setItem('showProductUpdatedAlert', 'true');
            window.location.href = '../../views/crud_producto/dashboardProductos.html';
        } else {
            errorMessageDiv.textContent = result.error || 'Error al actualizar el producto';
            errorMessageDiv.style.display = 'block';
        }
    } catch (error) {
        errorMessageDiv.textContent = 'Error de conexión con el servidor';
        errorMessageDiv.style.display = 'block';
        console.error('Error:', error);
    }
};

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosProducto();
    const saveButton = document.querySelector('.btn-success');
    if (saveButton) {
        saveButton.addEventListener('click', submitForm);
    }
});