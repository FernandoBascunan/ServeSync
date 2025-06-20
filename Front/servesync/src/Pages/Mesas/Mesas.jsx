import Header from '../../Components/Header/Header';
import './Mesas.css';

const TablesPage = () => (
  <div>
    <Header />

    <div className="tables-main">
      {/*Panel Izquierdo: Pisos*/}
      <aside className="zone-bar">
        <button className="zone-btn active">Piso 1</button>
        <button className="zone-btn">Piso 2</button>
        <button className="zone-btn">Patio</button>
        <button className="zone-btn">Terraza</button>

        <button className="zone-add">Agregar Zona</button>
      </aside>

      {/*Panel Derecho: Mesas*/}
      <section className="tables-area">
        <h2 className="tables-title">Mesas</h2>

        <div className="tables-grid">
          <div className="table-circle">
            <span className="table-number">1°</span>
            <span className="table-cap">2/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">2°</span>
            <span className="table-cap">2/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">3°</span>
            <span className="table-cap">3/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">7°</span>
            <span className="table-cap">6/8</span>
          </div>

          <div className="table-circle">
            <span className="table-number">4°</span>
            <span className="table-cap">3/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">5°</span>
            <span className="table-cap">4/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">6°</span>
            <span className="table-cap">4/4</span>
          </div>
          <div className="table-circle">
            <span className="table-number">8°</span>
            <span className="table-cap">8/8</span>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default TablesPage;
