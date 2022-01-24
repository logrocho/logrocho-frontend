import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <NavBar />

      {children}

      <Footer />
    </div>
  );
}
