// Función para enviar los datos actualizados
const submitForm = async (event) => {
    event.preventDefault();
    
    // Validación HTML5 básica
    const form = event.target.closest('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Validación personalizada
    if (!validateProductForm()) return;

    const codigo = obtenerCodigoDesdeUrl();
    const productData = {
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        cantidad: parseInt(document.getElementById('cantidad').value),
        precio: parseFloat(document.getElementById('precio').value)
    };

    // Limpiar mensajes de error previos
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    try {
        const response = await fetch(`http://localhost:3000/api/products/updateProduct/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(productData)
        });

        if (response.status === 401) {
            window.location.href = '/index.html'; 
            return; 
        }

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
        console.error('Error al actualizar producto:', error);
    }
};

// Asignar evento al botón de guardar
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.btn-success');
    if (saveButton) {
        saveButton.addEventListener('click', submitForm);
    }
});