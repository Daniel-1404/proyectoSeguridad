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
    
    const usuario = document.getElementById('usuario').value;
        const rolAsignado = document.getElementById('roleSelect').value;
        const usuarioId = obtenerIdDesdeUrl(); // Obtener ID desde la URL

        // Validación simple
        if (!usuario || !rolAsignado) {
            document.getElementById('errorMessage').textContent = "Por favor, completa todos los campos.";
            document.getElementById('errorMessage').style.display = 'block';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/updateUser/${usuarioId}`, {
                method: 'PUT', // Usamos PUT para actualizar
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usuario,
                    rol_id: rolAsignado
                }),
            });

            const result = await response.json();
            if (response.ok) {
                 // Guardamos el mensaje de éxito en sessionStorage
                sessionStorage.setItem('showUserCreatedAlert', 'true');
                // Redirigir a otro lugar si la actualización fue exitosa
                window.location.href = "../../views/crud_usuario/dashboard.html";
            } else {
                document.getElementById('errorMessage').textContent = result.message;
                document.getElementById('errorMessage').style.display = 'block';
            }
        } catch (error) {
            document.getElementById('errorMessage').textContent = "Hubo un error en la actualización.";
            document.getElementById('errorMessage').style.display = 'block';
        }
};

// Asignar la función al botón de guardar
const saveButton = document.querySelector('.btn-success');
saveButton.addEventListener('click', submitForm);