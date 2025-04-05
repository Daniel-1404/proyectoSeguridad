// Función para enviar los datos del formulario al servidor
const submitForm = async (event) => {
    event.preventDefault();

    // Verificar validación HTML5 básica
    const form = event.target.closest('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Validación personalizada más completa
    if (!validateProductForm()) return;

    // Obtener y preparar los datos
    const productData = {
        codigo: document.getElementById('codigo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        cantidad: parseInt(document.getElementById('cantidad').value),
        precio: parseFloat(document.getElementById('precio').value)
    };

    // Limpiar mensajes de error previos
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    // Enviar datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/products/createProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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