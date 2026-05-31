import DashboardLayout from "../components/layout/DashboardLayout";

export default function InformesPage({ onLogout }) {

    return (

        <DashboardLayout onLogout={onLogout}>

            <div className="dashboard-header">

                <div>

                    <h1>Informes</h1>

                    <p>
                        Reportes de movimientos de stock
                    </p>

                </div>

            </div>

            <div className="content-card">

                <h2>Historial de movimientos</h2>

                <p>
                    Próximamente se mostrarán los reportes.
                </p>

            </div>

        </DashboardLayout>
    );
}