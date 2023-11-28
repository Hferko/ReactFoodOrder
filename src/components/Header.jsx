import { useContext } from 'react';
import './Header.css';
import Button from './UI/Button';
import mealImg from '../images/meals.jpg';
import KosarContext from '../store/KosarContext';
import Logo from '../images/logo.png';
import ModalContext from '../store/modalContext';

export default function Header() {
    const cartCtx = useContext(KosarContext);
    const modalCtx = useContext(ModalContext);

    const osszKosarElem = cartCtx.items.reduce((kosarElemekSzama, item) => {
        return kosarElemekSzama + item.quantity;
    }, 0);

    function showCartHandler() {
        modalCtx.showCart();
    }

    return (
        <>
            <header id='main-header'>
                <div id='title'>
                    <img src={Logo} alt="Fincsi étterem" />
                    <h1>Maros Konyha</h1>
                </div>
                <nav>
                    <Button textOnly={true} onClick={showCartHandler}>
                        <img src="cart.svg" alt="Kosár" /> &nbsp;Kosár tartalma: <span>{osszKosarElem}</span>
                    </Button>
                </nav>
            </header>
            <div className='main-image'>
                <img src={mealImg} alt="Napi kínálatunk" />
            </div>
            <div id='toUp'>
                <a href="#title">
                    <Button textOnly={true} >
                        <p id='arrow'>&#8679;</p>
                        <img src="cart.svg" alt="Kosár" />
                        <p>{osszKosarElem}</p>
                    </Button>
                </a>
            </div>
        </>
    )
}