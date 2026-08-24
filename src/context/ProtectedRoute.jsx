"use client"

import React, {useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter()

  const isLoggedIn = !!user;
  if (!isLoggedIn) {
    router.replace("/login")
  }

  return children;
};

export default ProtectedRoute;
