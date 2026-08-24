"use client"
import { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext();
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const [recProData, setRecPro] = useState([]);

  const [cartItems, setCartItems] = useState(null);

  const getGuestKey = () => localStorage.getItem("guest_key_token");
  useEffect(() => {
    setCartItems(() => {
      try {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
      } catch (err) {
        console.error('Error parsing cart items from localStorage', err);
        return [];
      }
    })
  }, [])
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  
  const addToCart = async (data) => {
    let guestKey = localStorage.getItem("guest_key_token");
    if (!guestKey) {
      guestKey = uuidv4(); 
      localStorage.setItem("guest_key_token", guestKey);
    }
    const newQty = parseInt(data.quantity) || 1;
    try {
      const response = await fetch(`${baseUrl}cart`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: data?.id,
          variation_id: data?.variation_id || null,
          quantity: newQty,
          guest_token: getGuestKey()
        })
      })
      if (!response.ok) {
        throw new Error("Add to cart Failed")
      }

      const result = await response.json();
      if (result.status) {
        fetchCartFromApi();
        return result.status
      }
    } catch (err) {
      console.error('Error adding to API cart', err);
    }

  };

  // ---------------------------
  // Update Quantity
  // ---------------------------
  const updateCartItemQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`${baseUrl}cart/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: quantity,
          guest_token: getGuestKey()
        })
      })

      if (!response.ok) {
        throw new Error("Update Quantity Failed")
      }

      const result = await response.json()

      if (result) {
        fetchCartFromApi();
        return result.status
      }
    } catch (err) {
      console.log(err)
    }
  };


  const removeFromCart = async (id) => {

    try {
      const response = await fetch(`${baseUrl}cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_token: getGuestKey()
        })
      })

      if (!response.ok) {
        throw new Error("Delete Cart UnsuccessFull")
      }

      const result = await response.json()
      if (result.status) {
        fetchCartFromApi();
        return result.status
      }
    } catch (err) {
      console.log(err)
    }
  };

  const fetchCartFromApi = async () => {
    try {
      const response = await fetch(`${baseUrl}cart?guest_token=${getGuestKey()}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      })
      
      if (!response.ok) {
        throw new Error("Get Cart Failed")
      }

      const result = await response.json();

      if (result.status) {
        setCartItems(result.data || []);
        const detailData = await cartDetail();
      }
    } catch (err) {
      console.log(err)
    }
  };


  const cartDetail = async (coupon = null) => {
    try {
      const response = await fetch(`${baseUrl}cart/detail`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_token: getGuestKey(),
          coupon_code: coupon
        }),
      });
      const result = await response.json();
      if (result.status) {
        return result.data
      }
    } catch (err) {
      console.log(err)
    }
  }


  const getCartTotal = () => 
    (Array.isArray(cartItems) ? cartItems : [])
      .reduce((total, item) => total + ((localStorage.getItem("token") ? item.discounted_price : item.price) || 0) * (item.quantity || 0), 0)
      .toFixed(2);
  



  const getTotalItem = () =>
    (Array.isArray(cartItems) ? cartItems : [])
      .reduce((count, item) => count + (item.quantity || 0), 0);


  const recentlyViewed = (data) => {
    const exists = recProData.some(item => item.id === data.id);
    if (!exists) {
      const rec = [...recProData, data];
      setRecPro(rec)
      localStorage.setItem("recentProducts", JSON.stringify(rec));
    }
  }

  const getRecentViewed = () => {
    const recData = localStorage.getItem("recentProducts")
    if (recData) {
      return JSON.parse(recData);
    }
    return null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        cartDetail,
        fetchCartFromApi,
        recentlyViewed,
        getRecentViewed,
        getCartTotal,
        getTotalItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
