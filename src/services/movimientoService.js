import api from "../api/axios";

// INGRESO:
export const registrarIngreso = async (
    productoId,
    cantidad
) => {

    const payload = {

        productoId,

        cantidad
    };

    const response = await api.post(
        "/ingresos",
        payload
    );

    return response.data;
};


// EGRESO
export const registrarEgreso = async (
    productoId,
    cantidad
) => {

    const payload = {

        productoId,

        cantidad
    };

    const response = await api.post(
        "/egresos",
        payload
    );

    return response.data;
};

//obtener movimientos:
export const obtenerMovimientos =
    async () => {

        const response = await api.get(
            "/movimientos"
        );

        return response.data;
    };