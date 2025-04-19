const API_URL = "http://localhost:3000/api/products/getAllProducts";

const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/index.html';
            return;
        }
        if (!response.ok) throw new Error("Error al obtener los productos");
        return await response.json();
    } catch (error) {
        console.error("Error al cargar productos:", error);
        return [];
    }
};

const renderProductTable = async () => {
    const products = await fetchProducts();
    const tableBody = document.getElementById("productsTableBody");

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No hay productos disponibles</td></tr>`;
        return;
    }

    tableBody.innerHTML = products.map(product => {
        const precio = parseFloat(product.precio) || 0;

        return `
            <tr>
                <td class="text-center">${escapeHtml(product.codigo)}</td>
                <td class="text-center">${escapeHtml(product.nombre)}</td>
                <td class="text-center">${escapeHtml(product.descripcion || 'N/A')}</td>
                <td class="text-center">${product.cantidad}</td>
                <td class="text-center">$${precio.toFixed(2)}</td>
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

document.addEventListener("DOMContentLoaded", renderProductTable);