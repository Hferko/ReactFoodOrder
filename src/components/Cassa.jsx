import { useContext, useState, useEffect } from "react";
import Modal from "./UI/Modal";
import KosarContext from "../store/KosarContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import ModalContext from "../store/modalContext.jsx";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const regName = /^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ]+$/;
const regSzam = /[0-9]+/;
const regMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const regStreet = /^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ0-9 ./]+$/;
const wrongName = (value) => (value.trim() === '' || !regName.test(value));
const wrongNum = (value) => (value.trim() === '' || !regSzam.test(value));
const wrongEmail = (value) => (value.trim() === '' || !regMail.test(value));
const wrongStreet = (value) => (value.trim() === '' || !regStreet.test(value));

let wrongData = '';

export default function Cassa() {
    const [perfect, setPerfect] = useState();
    const [hiba, setHiba] = useState('');

    const { data, loading: isSending, error, keresKuldese, clearData } =
        useHttp('https://httpreact-schwarz-default-rtdb.europe-west1.firebasedatabase.app/orders.json', requestConfig)
    //useHttp('http://localhost:3000/orders', requestConfig)       

    const cartCtx = useContext(KosarContext);
    const userProgressCtx = useContext(ModalContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) =>
        totalPrice + item.price * item.quantity, 0);

    function closeCartHandler() {
        userProgressCtx.hideCheckout();
    }

    function finishHandler() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function errorInput() {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        setHiba(wrongData);
        wrongData = '';
        clearData();
    }

    function submitHandler(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        console.log(customerData);

        if (wrongName(customerData.name)) { wrongData = 'Nem megfelelő név.'; }
        if (wrongEmail(customerData.email)) { wrongData = 'Helytelen Email cím.'; }
        if (wrongStreet(customerData.street)) { wrongData = 'Nem megfelelő utca, házszám.'; }
        if (wrongNum(customerData["postal-code"])) { wrongData = 'Helytelen irányítószám.'; }
        if (wrongName(customerData.city)) { wrongData = 'Melyik városról is van szó?'; }

        if (wrongData !== '') {
            errorInput();
            setPerfect(false);
            return;
        }
        else {
            keresKuldese(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            }));
        }
    }

    let actions = (
        <>
            <Button textOnly={true} type="button" onClick={closeCartHandler}>Mégsem</Button>
            <Button>RENDELÉS LEADÁSA</Button>
        </>
    );

    if (isSending) {
        actions = <span>Rendelés adatainak küldése...</span>
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={finishHandler}>
                <h2>Rendelése sikeresen továbbításra került</h2>
                <p>A rendelése részleteit és az elkészített számlát e-mailben küldjük önnek a megadott címre</p>
                <p className="modal-actions">
                    <Button onClick={finishHandler}>Rendben</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={submitHandler}>
                <h3>Rendelés adatai</h3>
                <p className="title">Fizetendő összeg: <b>{currencyFormatter.format(cartTotal)}  &#8497;&#566;</b></p>

                <Input label="Teljes név" type="text" id="name" />
                <Input label="E-mail cím" type="email" id="email" />
                <Input label="Utca, házszám" type="text" id="street" />

                <div className="control-row">
                    <Input label="Irányítószám" type="text" id="postal-code" />
                    <Input label="Település" type="text" id="city" />
                </div>

                {!perfect && (<p style={{ color: 'red' }}>{hiba}</p>)}

                {error && <Error title="Sikertelen a rendelés leadása" message={error} close={errorInput} />}
                <p className="modal-actions">
                    {actions}
                </p>

            </form>
        </Modal>
    );
}