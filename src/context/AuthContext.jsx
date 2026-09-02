"use client";

import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from './CartContext';

export const AuthContext = createContext();
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const AuthProvider = ({ children }) => {
  const { fetchCartFromApi } = useContext(CartContext)
  const router = useRouter();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    } 
  }, [])


  const login = async (requestOptions, redirect) => {
    let serverCart = [];

  try {
    const response = await fetch(`${baseUrl}login`, requestOptions);
    const data = await response.json();
      serverCart = data.data?.cart ? JSON.parse(data.data.cart) : [];

    if (response.status === 200 && data.data?.access_token) {

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.access_token);
      setUser(data.data);
      fetchCartFromApi();
      if(redirect){
        router.push(`/`);
      }
      return data || "success"; 
    } else {
      return data || "Login failed.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred during login.";
  }
};

 const logout = () => {
  
  const getOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        //cartItem:getFormattedCartForOrder()
      })
  };

  fetch(`${baseUrl}logout`, getOptions)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(result => {
        fetchCartFromApi();
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
};

  const isLoggedIn = !!user;
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
