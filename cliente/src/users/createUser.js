// Función para enviar los datos del formulario al servidor
const submitForm = async (event) => {

    event.preventDefault();
    // Verificar si el formulario es válido 
    const form = event.target.closest('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return; // Salimos de la función si el formulario no es válido
    }

    // Validar el formulario antes de enviarlo
    if (!validateForm()) return;
    
    // Obtener los valores de los campos del formulario
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('contraseña').value;
    const rol_id = document.getElementById('roleSelect').value;

    // Limpiar cualquier mensaje de error previo
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    // Crear un objeto con los datos
    const userData = {
        username: username,
        password: password,
        rol_id: rol_id
    };
    // Enviar los datos al servidor
    try {
        const response = await fetch('http://localhost:3000/api/users/createUser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            // Guardamos el mensaje de éxito en sessionStorage
            sessionStorage.setItem('showUserCreatedAlert', 'true');
            // Redirigimos inmediatamente al dashboard
            window.location.href = '../../views/crud_usuario/dashboard.html';
            

        } else {
            // Mostrar el mensaje de error en el div
            errorMessageDiv.style.display = 'block';
            errorMessageDiv.textContent = result.error || 'Hubo un error al crear el usuario por parte del servidor.';
        }

    } catch (err) {
        console.error('Error al enviar los datos:', err);
        alert('Hubo un error al enviar los datos');
    }
};

// Asignar la función al botón de guardar
const saveButton = document.querySelector('.btn-success');
saveButton.addEventListener('click', submitForm);