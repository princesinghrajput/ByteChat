"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

import React from 'react'

const SessionProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  )
}

export default SessionProvider