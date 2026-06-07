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

        await onSubmit({

            productoId: product.id,

            cantidad: Number(cantidad)

        });

        setCantidad("");

        onClose();
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