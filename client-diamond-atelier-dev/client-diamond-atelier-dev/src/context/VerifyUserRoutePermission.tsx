"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

const rolePermissions: Record<string, string[]> = {
  SUPERADMIN: ["/client-list", "/approve-login", "/admin-seller", "/kyc-pending", "/kyc-approval", "/client-hold-list","/client-cart-list",'/client-memo-list'],
  SELLERADMIN: ["/client-list", "/kyc-pending", "/kyc-approval","/client-hold-list","/client-cart-list",'/client-memo-list'],
  SELLER: ["/client-list","/client-hold-list","/client-cart-list"],
  BUYER: [],
};

export const VerifyUserRoutePermission: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    const type = localStorage.getItem("userType") || "";
    if (type && !rolePermissions[type]?.includes(pathname)) {
      router.back();
    }
  }, [pathname]);

  return <>{children}</>;
};



