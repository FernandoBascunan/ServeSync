import './ProductoInv.css';

const ProductoInv = () => {
    const handleDetallesProducto = () => {
        window.location.href = "/DetallesProducto";
    };

    return(
    <button className='producto' onClick={handleDetallesProducto}>    
    <div className='product-card'>
        <img src='https://via.placeholder.com/80' alt='Producto'/>
        <div className='product-info'>
            <h3>Producto</h3>
            <p>Fecha de último pedido</p>
            <p>Descripción del producto</p>
        </div>
        <div className='product-stock'>
            <p>Stock en cantidad</p>
        </div>
    </div>
    </button>
    );
}
export default ProductoInv;