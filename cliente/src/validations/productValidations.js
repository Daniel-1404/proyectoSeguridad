const validateProductForm = () => {
    const code = document.getElementById('codigo').value.trim();
    const name = document.getElementById('nombre').value.trim();
    const description = document.getElementById('descripcion').value.trim();
    const quantity = document.getElementById('cantidad').value.trim();
    const price = document.getElementById('precio').value.trim();
    const errorMessageDiv = document.getElementById('errorMessage');

    let errors = [];

    // Validar código del producto (debe coincidir con server: isAlphanumeric, length 3-50)
    if (!code) {
        errors.push('El código es obligatorio');
    } else if (code.length < 3 || code.length > 50) {
        errors.push('El código debe tener entre 3 y 50 caracteres');
    } else if (!/^[a-zA-Z0-9]+$/.test(code)) {
        errors.push('El código debe contener solo letras y números');
    }

    // Validar nombre del producto (length 3-255)
    if (!name) {
        errors.push('El nombre es obligatorio');
    } else if (name.length < 3 || name.length > 255) {
        errors.push('El nombre debe tener entre 3 y 255 caracteres');
    }

    // Validar cantidad (entero positivo)
    if (!quantity) {
        errors.push('La cantidad es obligatoria');
    } else if (!Number.isInteger(Number(quantity))) {
        errors.push('La cantidad debe ser un número entero');
    } else if (Number(quantity) < 0) {
        errors.push('La cantidad debe ser un número entero positivo');
    }

    // Validar precio (positivo, puede ser decimal)
    if (!price) {
        errors.push('El precio es obligatorio');
    } else if (isNaN(parseFloat(price))) {
        errors.push('El precio debe ser un número válido');
    } else if (parseFloat(price) < 0) {
        errors.push('El precio debe ser un número positivo');
    }

    // Mostrar errores si existen
    if (errors.length > 0) {
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.innerHTML = errors.join('<br>');
        return false;
    }

    // Limpiar mensajes de error si todo está correcto
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';
    return true;
};