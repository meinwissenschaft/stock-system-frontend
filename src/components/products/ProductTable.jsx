import { useState, useMemo, useRef } from 'react';
import Pagination from '../ui/Pagination';
import ConfirmDialog from '../ui/ConfirmDialog';
import ProductForm from './ProductForm';

const PER_PAGE_OPTIONS = [15, 25, 50, 100];

const ProductTable = ({ products, loading, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const searchRef = useRef(null);

  // Filtrar productos por búsqueda
  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().trim();
    return products.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.codigo.toLowerCase().includes(q) ||
      String(p.id).includes(q) ||
      String(p.cantidad).includes(q)
    );
  }, [products, search]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  // Reset page when search or perPage changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Edit
  const handleEditClick = (product) => {
    setEditingProduct({
      id: product.id,
      nombre: product.nombre,
      tipo: product.tipo,
      cantidad: product.cantidad,
    });
  };

  const handleEditSubmit = async (data) => {
    await onEdit(editingProduct.id, data);
    setEditingProduct(null);
  };

  // Delete
  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(deletingProduct.id);
      setDeletingProduct(null);
    } catch {
      // Error manejado por hook
    } finally {
      setDeleteLoading(false);
    }
  };

  // Expose focus search for keyboard shortcut
  ProductTable.focusSearch = () => searchRef.current?.focus();

  return (
    <div className="content-card">
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <div className="table-search">
            <div className="table-search-icon">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar por nombre, ID, código o cantidad..."
              value={search}
              onChange={handleSearchChange}
              id="product-search"
            />
          </div>
          <div className="table-per-page">
            <span>Mostrar</span>
            <select value={perPage} onChange={handlePerPageChange} id="per-page-select">
              {PER_PAGE_OPTIONS.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">
          <p>Cargando productos...</p>
        </div>
      ) : paginated.length === 0 ? (
        <div className="table-empty">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <p>{search ? 'No se encontraron productos' : 'No hay productos registrados'}</p>
          <span>{search ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer producto para comenzar'}</span>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>

              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td><code style={{ fontSize: '0.8rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>{prod.codigo}</code></td>
                <td style={{ fontWeight: 500 }}>{prod.nombre}</td> <td
  style={{
    maxWidth: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem'
  }}
  title={prod.descripcion}
>

  {prod.descripcion}

</td>
                <td>
                  <span style={{ fontSize: '0.8rem', background: 'var(--bg-hover)', padding: '3px 10px', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                    {prod.tipo}
                  </span>
                </td>
                <td>{prod.cantidad}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-action-btn edit"
                      onClick={() => handleEditClick(prod)}
                      title="Editar producto"
                      aria-label={`Editar ${prod.nombre}`}
                    >
                      <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button
                      className="table-action-btn delete"
                      onClick={() => handleDeleteClick(prod)}
                      title="Eliminar producto"
                      aria-label={`Eliminar ${prod.nombre}`}
                    >
                      <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setCurrentPage}
      />

      {/* Edit Modal */}
      <ProductForm
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditSubmit}
        editData={editingProduct}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingProduct?.nombre}
        loading={deleteLoading}
      />
    </div>
  );
};

export default ProductTable;
