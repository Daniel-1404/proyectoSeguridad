const API_URL = "http://localhost:3000/api/users/getAllUsers";

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
        return [];
    }
};

const renderUserTable = async () => {
    const users = await fetchUsers();
    const tableBody = document.getElementById("usersTableBody");

    if (users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay usuarios disponibles</td></tr>`;
        return;
    }

    tableBody.innerHTML = users.map(user => {
        const permissions = Array.isArray(user.permisos) ?
            user.permisos.join(", ") : "No hay permisos";

        return `
            <tr>
                <td class="text-center">${escapeHtml(user.nombre_usuario)}</td>
                <td class="text-center">${escapeHtml(user.rol)}</td>
                <td class="text-center">${escapeHtml(permissions)}</td>
                <td class="text-center">
                    ${user.ultimo_login
                ? new Date(user.ultimo_login).toLocaleString('es-ES')
                : 'Sin registro'}
                </td>
            </tr>
        `;
    }).join("");
};

const escapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

document.addEventListener("DOMContentLoaded", renderUserTable);