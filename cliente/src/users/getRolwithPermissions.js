// Función para obtener los roles y permisos desde la API
const fetchRolesWithPermissions = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/users/getRols/', {
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/index.html'; 
            return; 
        }

        return await response.json();
    } catch (error) {
        console.error('Error al cargar los roles:', error);
        return [];
    }
};
// Función para llenar el selector de roles y mostrar permisos
const populateRolesDropdown = async () => {
    const roleSelect = document.getElementById('roleSelect');
    const permissionsContainer = document.getElementById('permissionsContainer');

    if (!roleSelect || !permissionsContainer) {
        console.error("Elementos HTML no encontrados");
        return;
    }

    const roles = await fetchRolesWithPermissions();
    if (roles.length === 0) {
        permissionsContainer.innerHTML = '<p class="text-danger">No hay roles disponibles</p>';
        return;
    }

    // Llenar el selector con opciones
    roleSelect.innerHTML = '<option value="">Seleccione un rol</option>';
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.rol_id;
        option.textContent = role.rol;
        roleSelect.appendChild(option);
    });

    // Manejar el cambio de selección
    roleSelect.addEventListener('change', function () {
        const selectedRoleId = this.value;
        if (!selectedRoleId) {
            permissionsContainer.innerHTML = '';
            return;
        }

        // Encontrar el rol seleccionado
        const selectedRole = roles.find(role => role.rol_id.toString() === selectedRoleId);

        // Mostrar los permisos
        if (selectedRole && selectedRole.permisos) {
            let html = `<h6 class="fw-bold">Permisos asociados:</h6><ul class="list-group">`;
            selectedRole.permisos.forEach(permiso => {
                html += `<li class="list-group-item">${permiso}</li>`;
            });
            html += `</ul>`;
            permissionsContainer.innerHTML = html;
        } else {
            permissionsContainer.innerHTML = '<p class="text-muted">Este rol no tiene permisos asignados</p>';
        }
    });
};

populateRolesDropdown();