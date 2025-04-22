const AUD_USER_API_URL = "http://localhost:3000/api/users/getAllUsers";

const fetchUsers = async () => {
    try {
        const response = await fetch(AUD_USER_API_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 401) {
            window.location.href = '/index.html';
            return;
        }

        if (!response.ok) throw new Error("Error al obtener los usuarios");

        return await response.json();
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        return [];
    }
};

const renderUserTable = async () => {
    const users = await fetchUsers();
    const tableBody = document.getElementById("usersTableBody");

    if (users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">No hay usuarios disponibles</td></tr>`;
        return;
    }

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
                <td class="text-center">${UserescapeHtml(user.nombre_usuario)}</td>
                <td class="text-center">${UserescapeHtml(user.rol)}</td>
                <td class="text-center">${permissions}</td>
                <td class="text-center">
                    ${user.ultimo_login
                ? new Date(user.ultimo_login).toLocaleString('es-ES', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })
                : 'Sin registro'}
                </td>
            </tr>
        `;
    }).join("");
};

const UserescapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

document.addEventListener("DOMContentLoaded", renderUserTable);
