import Header from '../../Components/Header/Header';
import './Perfil.css'; 

const profilePage = () => {
    const handleLogin = () => {
    window.location.href = "/Login"; // o tu ruta deseada
    };
    return (
        <div>
            <Header />
            <div className='main-content'>
                <div className='container'>
                    <div className='profile-card'>
                        <img src="/user.png" alt="User" className='profile-image' />
                        <h2 className='profile-name'>Nombre de la PYME</h2>
                        <h2 className='profile-email'>Rut de la PYME</h2>
                        <h2 className='profile-name'>Nombre Dueno</h2>
                        <h2 className='profile-email'>Email</h2>
                        <h2 className='profile-name'>Telefono</h2>
                    </div>
                    <div>
                        <button className='login-button'>Editar Perfil</button>
                        <button className='login-button' onClick={handleLogin}>Cerrar Sesion</button>
                    </div>

                </div>

                <div className='containerRight'>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
};

export default profilePage;
