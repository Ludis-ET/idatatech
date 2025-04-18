"use client";

import { type ReactNode, useEffect, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalProviderProps {
  children: ReactNode;
}

export function PayPalProvider({ children }: PayPalProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error(
      "PayPal Client ID is missing. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your .env file."
    );
    return <>{children}</>; 
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
