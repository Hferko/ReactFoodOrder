import { currencyFormatter } from "../util/formatting";

export default function KosarElem({ name, quantity, price, onIncrease, onDecrease }) {
    return (
        <li className="cart-item">
            <p>
            <span className="title"> {name} </span>
            {quantity}&#215;{currencyFormatter.format(price)} &#61; {currencyFormatter.format(price*quantity)}&#8497;&#566;
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>&#10134;</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>&#10133;</button>
            </p>
        </li>
    );
}