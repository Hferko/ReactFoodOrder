import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import KosarContext from "../store/KosarContext.jsx";
import { currencyFormatter } from '../util/formatting';
import Button from "./UI/Button.jsx";
import ModalContext from "../store/modalContext.jsx";
import KosarElem from "./KosarElem.jsx";

export default function Kosar(params) {
    const cartCtx = useContext(KosarContext);
    const userProgressCtx = useContext(ModalContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) =>
        totalPrice + item.price * item.quantity, 0);

    function closeCartHandler() {
        userProgressCtx.hideCart();
    }

    function penztarhoz() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Kosár tartalma</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <KosarElem 
                    key={item.id} 
                    name={item.name} 
                    quantity={item.quantity} 
                    price={item.price} 
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    onIncrease={() => cartCtx.addItem(item)}
                    />
                ))}
            </ul>
            <p className="cart-total"> Összesen: &nbsp; {currencyFormatter.format(cartTotal)} &#8497;&#566;</p>
            <p className="modal-actions">
                <Button textOnly={true} onClick={closeCartHandler}>Mégsem</Button>
                {cartCtx.items.length > 0 && (<Button onClick={penztarhoz}>Tovább a rendeléshez</Button>)}
            </p>
        </Modal>
    );
}