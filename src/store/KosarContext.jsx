import { createContext, useReducer } from "react";

const KosarContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function kosarReducer(state, action) {

    if (action.type === 'ADD_ELEM') {
        const kosarElemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (kosarElemIndex > -1) {
            const letezoElem = state.items[kosarElemIndex];

            const valtozottElem = {
                ...letezoElem,
                quantity: letezoElem.quantity + 1
            };

            updatedItems[kosarElemIndex] = valtozottElem;
        }
        else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return {...state, items: updatedItems};
    }

    if (action.type === 'TOROL_ELEM') {
        const kosarElemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const letezoElem = state.items[kosarElemIndex];  
        const updatedItems = [...state.items];        
        
        if (letezoElem.quantity === 1) {                      
            updatedItems.splice(kosarElemIndex, 1);            
        }
        else{
            const valtozottElem = {
                ...letezoElem,
                quantity: letezoElem.quantity - 1
            };
            updatedItems[kosarElemIndex] = valtozottElem;
        }
        return {...state, items: updatedItems};
    }

    if (action.type === 'CLEAR_CART') {
       return {...state, items: []};
    }

    return state;
}


export function KosarContextProvider({ children }) {
    const [kosar, dispatchCartAction] = useReducer(kosarReducer, { items: [] });   

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ELEM', item: item})
    }
    
    function removeItem(id) {
        dispatchCartAction({ type: 'TOROL_ELEM', id: id})
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: kosar.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    }

    return <KosarContext.Provider value={cartContext}>{children}</KosarContext.Provider>
};

export default KosarContext;