// Función para enviar los datos del formulario al servidor
const submitForm = async (event) => {
    event.preventDefault();

    // Verificar si el formulario es válido 
    const form = event.target.closest('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Validar el formulario antes de enviarlo (si tienes validaciones adicionales)
    if (!validateForm()) return;

    // Obtener los valores de los campos del formulario
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    // Limpiar mensajes de error previos
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    // Crear objeto con los datos (solo campos requeridos)
    const productData = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio)
    };

    // Enviar datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/products/createProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo autenticación JWT
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (response.ok) {
            // Guardar mensaje de éxito y redirigir
            sessionStorage.setItem('showProductCreatedAlert', 'true');
            window.location.href = '../../views/crud_producto/dashboardProductos.html';
        } else {
            // Mostrar error específico del servidor
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = result.error || 'Error al crear el producto';
        }
    } catch (err) {
        console.error('Error al enviar los datos:', err);
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.textContent = 'Error de conexión con el servidor';
    }
};

// Asignar la función al botón de guardar
const saveButton = document.querySelector('.btn-success');
saveButton.addEventListener('click', submitForm);

// Validación adicional del formulario (opcional)
function validateForm() {
    const codigo = document.getElementById('codigo').value;
    const precio = document.getElementById('precio').value;

    // Validar que el código sea alfanumérico (frontend)
    if (!/^[a-zA-Z0-9]+$/.test(codigo)) {
        alert('El código debe ser alfanumérico');
        return false;
    }

    // Validar que el precio sea positivo
    if (parseFloat(precio) < 0) {
        alert('El precio no puede ser negativo');
        return false;
    }

    return true;
}