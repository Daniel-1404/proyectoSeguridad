async function checkSession(allowedRoles) {
    try {
        const response = await fetch('http://localhost:3000/api/session/validation', {
            credentials: 'include',
        });

        if (!response.ok) {
            window.location.href = '/index.html';
            return;
        } else {
            const data = await response.json();
            if (!data.loggedIn) {
                window.location.href = '/index.html';
                return;
            }

            if (!allowedRoles.includes(data.user.name)) {
                if (data.user.name == "Registrador") {
                    window.location.href = '/public/views/crud_producto/dashboardProductos.html';
                    return;
                }
                else if (data.user.name == "SuperAdmin") {
                    window.location.href = '/public/views/crud_usuario/dashboard.html';
                    return;
                }
                else if (data.user.name == "Auditor") {
                    window.location.href = '/public/views/auditor/dashboard.html';
                    return;
                }
            }
        }
    } catch (error) {
        console.error('Error en la solicitud de sesión:', error);
        window.location.href = '/index.html';
        return;
    }
}

