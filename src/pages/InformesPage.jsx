import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import InformeFilters from "../components/informes/InformeFilters";

import InformeTable from "../components/informes/InformeTable";

import { obtenerMovimientos }
from "../services/movimientoService";

export default function InformesPage({

    onLogout

}) {

    const [movimientos, setMovimientos] =
        useState([]);

    const [filters, setFilters] =
        useState({

            tipo: "",

            producto: "",

            desde: "",

            hasta: ""
        });

    useEffect(() => {

        cargarMovimientos();

    }, []);

    const cargarMovimientos = async () => {

    try {

        console.log("Iniciando carga");

        const data =
            await obtenerMovimientos();

        console.log("MOVIMIENTOS:", data);

        setMovimientos(data);

    } catch (error) {

        console.error("ERROR:", error);

    }
};

    const handleFilterChange = (e) => {

        setFilters({

            ...filters,

            [e.target.name]:
                e.target.value
        });
    };

    const filteredMovimientos =
        movimientos.filter((mov) => {

            const tipoMatch =

                !filters.tipo ||

                mov.tipo === filters.tipo;

            const productoMatch =

                mov.producto
                    .toLowerCase()
                    .includes(
                        filters.producto
                            .toLowerCase()
                    );

            const desdeMatch =

                !filters.desde ||

                mov.fecha >= filters.desde;

            const hastaMatch =

                !filters.hasta ||

                mov.fecha <= filters.hasta;

            return (

                tipoMatch &&

                productoMatch &&

                desdeMatch &&

                hastaMatch
            );
        });

    // 👇 ACÁ VA EL RENDER
    return (

        <DashboardLayout
            onLogout={onLogout}
        >

            <div className="dashboard-header">

                <div>

                    <h1>
                        Informes
                    </h1>

                    <p>
                        Reporte de movimientos
                    </p>

                </div>

            </div>

            <InformeFilters

                filters={filters}

                onChange={
                    handleFilterChange
                }

            />

            <InformeTable

                movimientos={
                    filteredMovimientos
                }

            />

        </DashboardLayout>
    );
}