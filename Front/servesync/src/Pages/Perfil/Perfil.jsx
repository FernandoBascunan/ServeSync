import Header from '../../Components/Header/Header';
import './Perfil.css'; 

const profilePage = () => {
    return (
        <div>
            <Header />
            <div className='main-content'>
                <div className='container'>
                    <div className='profile-card'>
                        <img src="/user.png" alt="User" className='profile-image' />
                        <h2 className='profile-name'>Nombre de Usuario</h2>
                        <h2 className='profile-email'>Email</h2>
                    </div>
                </div>

                <div className='containerRight'>
                    <h2>ajkshdajksdhkjasd</h2>
                </div>
            </div>
        </div>
    );
};

export default profilePage;
