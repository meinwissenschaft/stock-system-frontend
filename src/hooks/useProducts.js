import { useEffect, useState } from "react";

import {
    obtenerProductos,
    crearProducto
}
from "../services/productoService";

export const useProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    // =========================
    // LOAD
    // =========================
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

    // =========================
    // INIT
    // =========================
    useEffect(() => {

        cargarProductos();

    }, []);

    // =========================
    // ADD
    // =========================
    const addProduct = async (producto) => {

        await crearProducto(producto);

        // 🔥 refrescar tabla
        await cargarProductos();
    };

    // =========================
    // TEMPORALES
    // =========================
    const editProduct = async () => {

        console.warn("editar pendiente");
    };

    const removeProduct = async () => {

        console.warn("eliminar pendiente");
    };

    return {

        products,

        loading,

        addProduct,

        editProduct,

        removeProduct
    };
};