import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const menuMobileExit = () => setClick(false);  
  
    return (
    <>
        <nav className='navbarH'>
            <div className='navbar-container'>
                <div className='logo'>
                    <Link to={'/'}>
                        <img className='imgUnito' src={ require('../../assets/images/universita-di-trento-logo.png')} alt='logo-unito'/>
                    </Link>
                </div>
        
                <div className='menu'>
                    <ul>
                        <li><Link to={'/'}>Inserisci voti</Link></li>
                        
                        <li><Link to={'/listaEsami'}>Visualizza Esami</Link></li>
                    </ul>
                </div>
                
                <div className='menu-icon-mobile' onClick={handleClick}>
                    <i className={click ? 'close' : 'open'}><img src={click ? require("../../assets/images/icons8-close-48.png") : require("../../assets/images/icons8-hamburger-menu-48.png")} alt='hamburger'/></i> 
                </div>

                <ul className={click ? 'menu-active' : 'menu-noActive'} >
                    <li className='menu-items' >
                        <Link to={'/'} onClick={menuMobileExit}>Inserisci voti</Link> 
                    </li>
                    <li className='menu-items'>
                        <Link to={'/listaEsami'} onClick={menuMobileExit}>Visualizza Esami</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar;