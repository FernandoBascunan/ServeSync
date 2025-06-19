import './Header.css';



const Header = () => {
    const handlePerfil = () => {
    window.location.href = "/perfil"; // o tu ruta deseada
    };
    const handleInventario = () => {
    window.location.href = "/inventario"; // o tu ruta deseada
    };
    const handleMesas = () => {
    window.location.href = "/mesas"; // o tu ruta deseada
    };
    const handlePedidos = () => {
    window.location.href = "/ingresos"; // o tu ruta deseada
    };
    return(
        <div className="header">
            <button onClick={handlePerfil}>Perfil</button>
            <button onClick={handleInventario}>Inventario</button>
            <button onClick={handleMesas}>Mesas</button>
            <button onClick={handlePedidos}>Pedidos</button>
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1>ServeSync</h1>
        </div>

    );
}
export default Header;