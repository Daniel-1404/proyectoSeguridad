// Función para obtener el ID desde la URL
const obtenerIdDesdeUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');  // Retorna el valor de 'id' desde la URL
  };
  
// Función para obtener los datos del usuario y llenar el formulario
const cargarDatosUsuario = async () => {
    const usuarioId = obtenerIdDesdeUrl();  
    try {
        // Obtener los datos del usuario con el ID desde la URL
        const response = await fetch(`http://localhost:3000/api/users/getUser/${usuarioId}`);
        const usuario = await response.json();
        if (!usuario) {
            alert("Usuario no encontrado");
            return;
        }
        // Llenar los campos del formulario con los datos del usuario
        document.getElementById("usuario").value = usuario.username;
        const roles = await fetchRolesWithPermissions(); // Cargar los roles desde la API
        if (roles.length === 0) {
            console.error("No se encontraron roles");
            return;
        }
        // Buscar el rol actual del usuario
        const rolUsuario = usuario.rol; 
         // Establecer el valor por defecto del select de roles al rol del usuario
         const roleSelect = document.getElementById('roleSelect');
         const permissionsContainer = document.getElementById('permissionsContainer'); // Contenedor de permisos
         if (roleSelect && permissionsContainer) {
             // Buscar el rol en la lista de roles y establecerlo como valor seleccionado
             const rolExistente = roles.find(role => role.rol === rolUsuario);
             if (rolExistente) {
                 roleSelect.value = rolExistente.rol_id;      
                 // Mostrar los permisos del rol seleccionado
                 if (rolExistente.permisos) {
                     let html = `<h6 class="fw-bold">Permisos asociados:</h6><ul class="list-group">`;
                     rolExistente.permisos.forEach(permiso => {
                         html += `<li class="list-group-item">${permiso}</li>`;
                     });
                     html += `</ul>`;
                     permissionsContainer.innerHTML = html;
                 } else {
                     permissionsContainer.innerHTML = '<p class="text-muted">Este rol no tiene permisos asignados</p>';
                 }
             }
         }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
};

// Llamar a la función para cargar los datos
cargarDatosUsuario();