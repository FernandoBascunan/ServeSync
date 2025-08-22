import './Header.css';



const Header = () => {
    const handlePerfil = () => {
    window.location.href = "/perfil";
    };
    const handleInventario = () => {
    window.location.href = "/inventario"; 
    };
    const handleMesas = () => {
    window.location.href = "/mesas"; 
    };
    const handlePedidos = () => {
    window.location.href = "/pedidos";
    };
    return(
        <div className="header">
            <button onClick={handlePerfil}>Perfil</button>
            <button onClick={handleInventario}>Inventario</button>
            <button onClick={handleMesas}>Mesas</button>
            <button onClick={handlePedidos}>Pedidos</button>
            <img src="/logo.png" alt="Logo" className="logo" />
        </div>

    );
}
export default Header;