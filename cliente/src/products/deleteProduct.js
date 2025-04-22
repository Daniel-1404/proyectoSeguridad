// Función para eliminar producto
const deleteProduct = async (codigo) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/deleteProduct/${codigo}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Añadir token JWT
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/index.html'; 
            return; 
        }

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || "Error al eliminar el producto");
        }

        return true; // Éxito
    } catch (error) {
        console.error("Error eliminando producto:", error);
        return false; // Falla
    }
};

// Capturar el modal y guardar el código del producto al abrirlo
const deleteModal = document.getElementById("deleteProductModal");
if (deleteModal) {
    deleteModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        const productCode = button.getAttribute("data-bs-code"); // Cambiado a data-bs-code

        const form = deleteModal.querySelector("#form-delete-product");
        form.setAttribute("data-product-code", productCode); // Guarda el código en el formulario
    });
}

// Capturar el submit del formulario y ejecutar deleteProduct
document.addEventListener("DOMContentLoaded", () => {
    const formDelete = document.getElementById("form-delete-product");

    if (formDelete) {
        formDelete.addEventListener("submit", async (event) => {
            event.preventDefault();
            const productCode = formDelete.getAttribute("data-product-code");
            
            if (!productCode) {
                console.error("No se encontró un código de producto para eliminar.");
                return;
            }

            const success = await deleteProduct(productCode);

            if (success) {
                const modal = bootstrap.Modal.getInstance(document.getElementById("deleteProductModal"));
                modal.hide();
                
                // Redirigir a la página de confirmación
                window.location.href = "../../views/crud_producto/eliminarProducto.html";
            } else {
                alert("Error al eliminar el producto. Verifica tus permisos o intenta nuevamente.");
            }
        });
    }
});