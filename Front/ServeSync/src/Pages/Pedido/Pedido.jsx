import Header from '../../Components/Header/Header'; 
import "./Pedido.css";

const Pedido = () => {

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

}

export default Pedido;