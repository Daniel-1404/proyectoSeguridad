const pool = require('../config/dbConnection');

const createProduct = async (codigo, nombre, descripcion, cantidad, precio) => {
    try {
        const query = `
            INSERT INTO productos (codigo, nombre, descripcion, cantidad, precio) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING codigo, nombre, descripcion, cantidad, precio`;
        const values = [codigo, nombre, descripcion, cantidad, precio];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') throw new Error('El código ya existe');
        throw new Error('Error al crear producto');
    }
};

const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT codigo, nombre, descripcion, cantidad, precio FROM productos');
        return result.rows;
    } catch (err) {
        throw new Error('Error al obtener productos');
    }
};

const getProductByCode = async (codigo) => {
    try {
        const query = `
            SELECT codigo, nombre, descripcion, cantidad, precio 
            FROM productos 
            WHERE codigo = $1`;
        const { rows } = await pool.query(query, [codigo]);
        return rows[0]; // Devuelve el primer producto encontrado o undefined
    } catch (err) {
        throw new Error('Error al buscar producto por código: ' + err.message);
    }
};

const updateProduct = async (codigo, { nombre, descripcion, cantidad, precio }) => {
    try {
        // Validación adicional
        if (isNaN(cantidad) || isNaN(precio)) {
            throw new Error('Cantidad y precio deben ser números');
        }

        const query = `
            UPDATE productos 
            SET nombre = $1, 
                descripcion = $2, 
                cantidad = $3, 
                precio = $4 
            WHERE codigo = $5
            RETURNING codigo, nombre, descripcion, cantidad, precio`;

        const result = await pool.query(query, [
            nombre,
            descripcion,
            cantidad,
            precio,
            codigo
        ]);

        if (result.rowCount === 0) {
            throw new Error('No se encontró producto para actualizar');
        }

        return result.rows[0];

    } catch (err) {
        console.error('Error en updateProduct:', err);
        throw new Error(`Error al actualizar producto: ${err.message}`);
    }
};

const deleteProduct = async (codigo) => {
    try {
        const result = await pool.query(
            'DELETE FROM productos WHERE codigo = $1 RETURNING codigo',
            [codigo]
        );
        if (result.rows.length === 0) throw new Error('Producto no encontrado');
        return result.rows[0];
    } catch (err) {
        throw new Error('Error al eliminar producto');
    }
};

module.exports = { createProduct, getAllProducts, getProductByCode, updateProduct, deleteProduct };