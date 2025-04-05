// Función para obtener el código del producto desde la URL
const obtenerCodigoDesdeUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('codigo');
};

// Función para cargar los datos del producto a editar
const cargarDatosProducto = async () => {
    const codigo = obtenerCodigoDesdeUrl();
    
    if (!codigo) {
        alert('No se ha especificado un código de producto');
        window.location.href = 'dashboardProductos.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/products/getProductByCode/${codigo}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Producto no encontrado');
        }

        const product = await response.json();
        
        // Llenar formulario con los datos del producto
        document.getElementById('codigo').value = product.codigo;
        document.getElementById('nombre').value = product.nombre;
        document.getElementById('descripcion').value = product.descripcion || '';
        document.getElementById('cantidad').value = product.cantidad;
        document.getElementById('precio').value = parseFloat(product.precio || 0).toFixed(2);
        
    } catch (error) {
        console.error('Error al cargar producto:', error);
        alert(error.message);
        window.location.href = 'dashboardProductos.html';
    }
};

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosProducto);