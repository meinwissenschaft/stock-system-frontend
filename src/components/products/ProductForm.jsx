import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { PRODUCT_TYPES } from "../../services/productoService";

const emptyForm = {
  nombre: '',
  descripcion: '',
  tipo: PRODUCT_TYPES[0].nombre,
  cantidad: ''
};

const ProductForm = ({ isOpen, onClose, onSubmit, editData = null }) => {
  const [form, setForm] = useState(editData || emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(editData);

  const resetForm = () => setForm({ ...emptyForm });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim()) return 'El nombre del producto es obligatorio';
    if (!form.tipo) return 'Selecciona un tipo de producto';
    if (!form.cantidad || Number(form.cantidad) < 0) return 'La cantidad debe ser un número positivo';
    return null;
  };

  const handleSubmit = async (closeAfter) => {
    const error = validate();
    if (error) return alert(error);

    setSubmitting(true);
    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        tipo: form.tipo,
        cantidad: Number(form.cantidad),
      });

      if (closeAfter) {
        resetForm();
        onClose();
      } else {
        resetForm();
      }
    } catch {
      // Error ya manejado por useProducts con toast
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Resetear form cuando cambia editData
  useEffect(() => {
    if (editData) setForm(editData);
    else resetForm();
  }, [editData]);

  const footer = isEditing ? (
    <>
      <button className="btn-secondary" onClick={handleClose} disabled={submitting}>Cancelar</button>
      <button className="btn-primary" onClick={() => handleSubmit(true)} disabled={submitting}>
        {submitting ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </>
  ) : (
    <>
      <button className="btn-secondary" onClick={() => handleSubmit(false)} disabled={submitting}>
        {submitting ? 'Agregando...' : 'Agregar producto'}
      </button>
      <button className="btn-primary" onClick={() => handleSubmit(true)} disabled={submitting}>
        {submitting ? 'Agregando...' : 'Agregar y cerrar'}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      footer={footer}
    >
      <div className="form-group">
        <label htmlFor="prod-nombre">Nombre del producto</label>
        <input
          id="prod-nombre"
          type="text"
          name="nombre"
          placeholder="Ej: Tornillo Hexagonal M8"
          value={form.nombre}
          onChange={handleChange}
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="prod-descripcion">
          Descripción
        </label>
        <textarea
          id="prod-descripcion"
          name="descripcion"
          placeholder="Descripción del producto"
          value={form.descripcion}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="prod-tipo">Tipo de producto</label>
        <select id="prod-tipo" name="tipo" value={form.tipo} onChange={handleChange}>
          {PRODUCT_TYPES.map(type => (
            <option
              key={type.id}
              value={type.nombre}
            >
              {type.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="prod-cantidad">Cantidad</label>
        <input
          id="prod-cantidad"
          type="number"
          name="cantidad"
          placeholder="0"
          min="0"
          value={form.cantidad}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
};

export default ProductForm;
