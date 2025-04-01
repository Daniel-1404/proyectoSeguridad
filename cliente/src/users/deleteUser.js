// Función para eliminar usuario
const deleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/deleteUser/${userId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || "Error al eliminar el usuario");
        }

        return true; // Éxito
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        return false; // Falla
    }
};

// Capturar el modal y guardar el userId al abrirlo
const eliminaModal = document.getElementById("eliminaModal");
if (eliminaModal) {
    eliminaModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        const userId = button.getAttribute("data-bs-id");

        const form = eliminaModal.querySelector("#form-elimina");
        form.setAttribute("data-user-id", userId); // Guarda el ID en el formulario
    });
}

// Capturar el submit del formulario y ejecutar deleteUser
document.addEventListener("DOMContentLoaded", () => {
    const formElimina = document.getElementById("form-elimina");

    if (formElimina) {
        formElimina.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evita que el formulario haga un POST tradicional
            const userId = formElimina.getAttribute("data-user-id"); // Recupera el ID almacenado
            if (!userId) {
                console.error("No se encontró un ID de usuario para eliminar.");
                return;
            }
            const success = await deleteUser(userId);

            if (success) {
                const modal = bootstrap.Modal.getInstance(document.getElementById("eliminaModal"));
                modal.hide();
                
                // Redirigir a la página de confirmación
                window.location.href = "../../views/crud_usuario/eliminarUsuario.html";
            } else {
                alert("Error al eliminar el usuario.");
            }
        });
    }
});
