"use client";
import React, { useEffect, useState } from "react";
import StoreProvider from "../redux/StoreProvider";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
