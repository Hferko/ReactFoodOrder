import { createContext, useState } from "react";


const ModalContext = createContext({
    progress: '', // 'kosár', 'pénztár'
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
});

export function ModalContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }
    
    const userProgressCtx = {
        progress: userProgress,
        showCart: showCart,
        hideCart: hideCart,
        showCheckout: showCheckout,
        hideCheckout: hideCheckout        
    };

    return (
        <ModalContext.Provider value={userProgressCtx}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;