import { useState } from "react";
import Modal from "../ui/Modal";

export default function StockMovementModal({

    isOpen,

    onClose,

    onSubmit,

    product,

    type

}) {

    const [cantidad, setCantidad] =
        useState("");

    const handleSubmit = async () => {

        if (!cantidad || Number(cantidad) <= 0) {

            alert(
                "Ingrese una cantidad válida"
            );

            return;
        }

        if (
            type === "EGRESO" &&
            Number(cantidad) > product.cantidad
        ) {
            alert(
                `Stock insuficiente. Disponible: ${product.cantidad}`
            );
            return;
        }

        try {

            await onSubmit({
            productoId: product.id,
            cantidad: Number(cantidad)
        });

            setCantidad("");
            onClose();

        } catch (error) {

            alert(
                error.response?.data?.error
                || "Error al registrar movimiento"
            );
        }
    };

    return (

        <Modal

            isOpen={isOpen}

            onClose={onClose}

            title={
                type === "INGRESO"

                    ? "Ingresar Stock"

                    : "Egresar Stock"
            }

            footer={

                <>
                    <button
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                    >
                        Confirmar
                    </button>
                </>

            }

        >

            <p>
                Producto:
                <strong>
                    {" "}
                    {product?.nombre}
                </strong>
            </p>

            <p>
                Stock actual:
                <strong>
                    {" "}
                    {product?.cantidad}
                </strong>
            </p>

            <div className="form-group">

                <label>

                    Cantidad

                </label>

                <input

                    type="number"

                    min="1"

                    value={cantidad}

                    onChange={(e) =>
                        setCantidad(
                            e.target.value
                        )
                    }

                />

            </div>

        </Modal>
    );
}