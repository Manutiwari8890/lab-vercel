"use client";

import { OverlayProvider } from '@/context/OverlayContext.jsx';
import { CartProvider } from '@/context/CartContext.jsx';
import { AuthProvider } from '@/context/AuthContext.jsx';
import { LoadingProvider } from '@/context/LoadingContext.jsx';
import { WishListProvider } from '@/context/WishListContext.jsx';
import { ToastProvider } from '@/context/ToastContext.jsx';

export default function Providers({ children }) {
    return (    
        <LoadingProvider>
            <OverlayProvider>
                <ToastProvider>
                    <WishListProvider>
                        <CartProvider>
                            <AuthProvider>
                                {children}
                            </AuthProvider>
                        </CartProvider>
                    </WishListProvider>
                </ToastProvider>
                </OverlayProvider>
        </LoadingProvider>
    );
}