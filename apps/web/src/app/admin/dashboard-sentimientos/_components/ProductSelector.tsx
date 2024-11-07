const ProductSelector = ({ selectedProduct, setSelectedProduct }) => {
  return (
    <div className="space-y-4">
      <label className="block font-medium">Productos</label>
      <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct} className="border rounded p-2 w-full">
        <option value="Paleta de Chocolate">Paleta de Chocolate</option>
        <option value="Cono">Cono</option>
      </select>
    </div>
  );
};

export default ProductSelector;
