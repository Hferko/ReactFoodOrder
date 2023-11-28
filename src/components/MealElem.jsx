import React, { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import KosarContext from '../store/KosarContext.jsx';
import Kep from './UI/Kep';


export default function MealElem({ meal }) {
    const cartCtx = useContext(KosarContext);

    function kosarhozAdHandler(params) {
        cartCtx.addItem(meal);
    }

    return <li className="meal-item">
        <article>
            <Kep
                src={`../${meal.image}`}
                alt={meal.name}
                title={meal.name}
                fallback={<img src={`../images/nopicture.jpg`} alt={meal.name} title={meal.name}/>}
            />   
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)} &#8497;&#566;</p>
                <p className="meal-item-description ">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={kosarhozAdHandler}>Kosárba</Button>
            </p>
        </article>
    </li>
}