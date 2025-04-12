const API_URL = "http://localhost:3000/api/users/getAllUsers"; // Endpoint del backend

// Función para obtener usuarios de la API
const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL, {
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/index.html';
            return; 
        }
        if (!response.ok) throw new Error("Error al obtener los usuarios");
        

        return await response.json();
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        return []; // Retorna un array vacío en caso de error
    }
};

// Función para generar el contenido de la tabla con los usuarios
const renderUserTable = async () => {
    const users = await fetchUsers(); // Obtenemos los usuarios
    const tableBody = document.querySelector("tbody");
    // Si no hay usuarios, mostramos un mensaje
    if (users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">No hay usuarios disponibles</td></tr>`;
        return;
    }
    // Generamos las filas dinámicamente
    tableBody.innerHTML = users.map(user => {
        const permissions = Array.isArray(user.permisos) ?
            `<div class="accordion" id="permissionsAccordion-${user.usuario_id}">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading-${user.usuario_id}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse-${user.usuario_id}" aria-expanded="true"
                            aria-controls="collapse-${user.usuario_id}">
                            Permisos
                        </button>
                    </h2>
                    <div id="collapse-${user.usuario_id}" class="accordion-collapse collapse" aria-labelledby="heading-${user.usuario_id}" data-bs-parent="#permissionsAccordion-${user.usuario_id}">
                        <div class="accordion-body">
                            <ul class="list-unstyled">
                                ${user.permisos.map(permission => `<li>${permission}</li>`).join("")}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>` : "No hay permisos";
        return `
            <tr>
                <td class="text-center">${user.nombre_usuario}</td>
                <td class="text-center">${user.rol}</td>
                <td class="text-center">${permissions}</td>
                <td class="text-center">
                ${user.ultimo_login 
                    ? new Date(user.ultimo_login).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })
                    : 'Sin registro'}
                </td>
                <td class="d-flex justify-content-center">
                    <a href="editarUsuario.html?id=${user.usuario_id}" class="btn btn-warning btn-sm me-2">Editar</a>
                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                        data-bs-target="#eliminaModal" data-bs-id="${user.usuario_id}">Eliminar</button>
                </td>
            </tr>
        `;
    }).join(""); // Convertimos el array en una cadena de HTML
};


// Llamamos a la función para generar la tabla
renderUserTable();
