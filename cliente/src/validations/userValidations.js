const validateForm = () => {
    const username = document.getElementById('usuario').value.trim();
    const passwordElement = document.getElementById('contraseña');
    const password = passwordElement ? passwordElement.value : '';
    const rol_id = document.getElementById('roleSelect').value;
    const errorMessageDiv = document.getElementById('errorMessage');

    let errors = [];

    // Validar username
    if (!username) {
        errors.push('El nombre de usuario es obligatorio.');
    } else if (username.length < 3 || username.length > 20) {
        errors.push('El nombre de usuario debe tener entre 3 y 20 caracteres.');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('El nombre de usuario solo puede contener letras, números y guiones bajos.');
    }

    // Validar password solo si se ha proporcionado
    if (password && password.length > 0) {
        if (password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres.');
        } else if (!/[A-Z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra mayúscula.');
        } else if (!/[a-z]/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra minúscula.');
        } else if (!/[0-9]/.test(password)) {
            errors.push('La contraseña debe contener al menos un número.');
        } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
            errors.push('La contraseña solo puede contener letras y números.');
        }
    } else {
    }

    // Validar rol_id
    if (!Number.isInteger(Number(rol_id))) {
        errors.push('El rol debe ser un número entero.');
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
