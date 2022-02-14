import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children, user }: any) {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <NavBar user={user} />

      {children}

      <Footer />
    </div>
  );
}
