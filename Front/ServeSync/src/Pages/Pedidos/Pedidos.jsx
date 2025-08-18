import Header from '../../Components/Header/Header'; 
import "./Pedidos.css";

const Pedidos = () => {
    // Ejemplo de pedidos de prueba
    const pedidos = [
        { id: 1, cliente: "Juan Pérez", productos: 3, hora: "14:30", estado: "Finalizado" },
        { id: 2, cliente: "Ana Torres", productos: 2, hora: "15:10", estado: "En Proceso" },
        { id: 3, cliente: "Carlos Ruiz", productos: 5, hora: "15:40", estado: "En Espera" },
    ];

    return (
        <div>
            <Header/>

            <div className="pedidos-container">
                {pedidos.map(pedido => (
                    <div className="pedido-card" key={pedido.id}>
                        <div className="pedido-header">
                            <h3 className="pedido-titulo">Pedido #{pedido.id}</h3>
                            <span className={`badge ${pedido.estado.replace(" ", "").toLowerCase()}`}>
                                {pedido.estado}
                            </span>
                        </div>
                        <div className="pedido-content">
                            Cliente: {pedido.cliente} <br/>
                            Productos: {pedido.productos} <br/>
                            Hora: {pedido.hora}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pedidos;
