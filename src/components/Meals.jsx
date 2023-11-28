// import { useState, useEffect } from "react";
import MealElem from "./MealElem";
import Fincsi from "./Fincsi";
import Error from "./Error";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function Meals() {
    const {data: loadedMeals, loading, error} = 
    //useHttp('http://localhost:3000/meals', requestConfig, []);
    useHttp('https://httpreact-schwarz-default-rtdb.europe-west1.firebasedatabase.app/available-meals.json', requestConfig, []);
    

    if (loading) {
        return <h3 className="fincsi">Étlap betöltése...</h3>;
    }

    if (error) {
       return <Error title='Nem sikerült betölteni az étlapot' message={error}/>
    }
   
    return (
        <>
        <Fincsi />
        <ul id="meals">
            {loadedMeals.map(meal => <MealElem key={meal.id} meal={meal}/>)}
        </ul>
        </>
    )
}