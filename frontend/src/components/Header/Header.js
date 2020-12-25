import { useState } from 'react';
import './Header.css';
const Header = () => {

    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClicked(!clicked);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <>
            <div className={navbar ? 'header sticky' : 'header'}>
                <a href="#" className='logo'>
                    <span>F</span>oodApp
                </a>
                <div className='menuIcon' onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'navigation active' : 'navigation'}>
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </div>
            <div className='root'>
                <div className='content'>
                    <h2>Nothing brings people together like good food..</h2>
                    <p>
                        foodApp provides you best restaurant of town and our restaurant have best quality food. And we also ensure you that we have best service and fastest delivery.
                    </p>
                    <a href="#" className='btn'>Our Menu</a>
                </div>
            </div>
        </>
    )
}

export default Header;
