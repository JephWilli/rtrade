import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';


export const Context = React.createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const addToCart = (product, quantity) => {
        //check if given product is already in cart
        const checkProductInCart = cartItems.find((item)=> item._id === product._id);

        //updating price and quantities when adding to cart
        setTotalPrice((prevTotalPrice)=> prevTotalPrice+(product.price*quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if (checkProductInCart){
        //updating cart display if product already in cart is added to cart
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            

            setCartItems(updatedCartItems);
        } else{
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart.`);
    }

    const removeFromCart = (product)=> {
        foundProduct = cartItems.find((item)=> item._id === product._id);
        const newCartItems = cartItems.filter((item)=> item._id != product._id);

        //updating price and quantities when removing from cart
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);

    }

    //increasing quantity of items in cart ; identifying items to known array by id
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item)=> item._id === id)
        index = cartItems.findIndex((product)=> product._id===id)
        const newCartItems = cartItems.filter((item)=> item._id != id)
        if(value === 'inc'){

            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

        } else if (value=== 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }

        }
    }

    const increaseQty = () =>{
        setQty((prevQty)=> prevQty +1);
    }
    const decreaseQty = () =>{
        setQty((prevQty)=> {

        if(prevQty-1 < 1) return 1;

        return prevQty -1;
        })
    }


    return(
        <Context.Provider 
        value = {{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setShowCart,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            increaseQty,
            decreaseQty,
            addToCart,
            toggleCartItemQuantity,
            removeFromCart
        }}>
            {children}
        </Context.Provider>
    )


}

export const useStateContext = () => useContext(Context);