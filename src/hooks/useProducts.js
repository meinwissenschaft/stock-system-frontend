import { useEffect, useState } from "react";

import {

    obtenerProductos,

    crearProducto,

    actualizarProducto,

    eliminarProducto

}
from "../services/productoService";

export const useProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    // Carga de Productos:
    const cargarProductos = async () => {

        try {

            setLoading(true);

            const data = await obtenerProductos();

            setProducts(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    // Inicialización de productos:
    useEffect(() => {

        cargarProductos();

    }, []);

    // Crear Productos:
    const addProduct = async (producto) => {

        await crearProducto(producto);

        // Refrescar tabla:
        await cargarProductos();
    };

    // Editar Producto:
    const editProduct = async (id, producto) => {

        await actualizarProducto(id, producto);

        await cargarProductos();
    };

    // Eliminar Producto:
    const removeProduct = async (id) => {

        await eliminarProducto(id);

        await cargarProductos();
    };

    return {

        products,

        loading,

        addProduct,

        editProduct,

        removeProduct,

        cargarProductos
    };
};