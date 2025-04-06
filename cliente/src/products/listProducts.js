const API_URL = "http://localhost:3000/api/products/getAllProducts"; // Endpoint de productos

// Función para obtener productos de la API
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token JWT
            },
            credentials: 'include',
        });

        if (response.status === 401) {
            window.location.href = '/index.html'; 
            return; 
        }

        if (!response.ok) throw new Error("Error al obtener los productos");
        return await response.json();
    } catch (error) {
        console.error("Error al cargar productos:", error);
        return []; // Retorna array vacío en caso de error
    }
};

// Función para renderizar la tabla de productos
const renderProductTable = async () => {
    try {
        const products = await fetchProducts();
        const tableBody = document.querySelector("tbody");
        
        if (products.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">No hay productos disponibles</td></tr>`;
            return;
        }

        tableBody.innerHTML = products.map(product => {
            // Asegurar que el precio sea numérico
            const precio = parseFloat(product.precio) || 0; // Si falla la conversión, usa 0
            
            return `
                <tr>
                    <td class="text-center">${escapeHtml(product.codigo)}</td>
                    <td class="text-center">${escapeHtml(product.nombre)}</td>
                    <td class="text-center">${escapeHtml(product.descripcion || 'N/A')}</td>
                    <td class="text-center">${product.cantidad}</td>
                    <td class="text-center">$${precio.toFixed(2)}</td>
                    <td class="d-flex justify-content-center">
                        <a href="editarProducto.html?codigo=${product.codigo}" class="btn btn-warning btn-sm me-2">Editar</a>
                        <button 
                            type="button" 
                            class="btn btn-danger btn-sm" 
                            data-bs-toggle="modal"
                            data-bs-target="#deleteProductModal" 
                            data-bs-code="${product.codigo}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    } catch (error) {
        console.error("Error al renderizar productos:", error);
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar los productos</td></tr>`;
    }
};

// Función para sanitizar contenido (anti-XSS)
const escapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Inicializar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", renderProductTable);