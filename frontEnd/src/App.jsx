import React, { useState } from "react";
import LoginApp from "./LoginModule/JSX/LoginApp";
import HeroApp from "./HeroPageModule/HeroApp"
import EcommerceApp from "./EcommerceModule/EcommerceApp";
import Footer from "./HeroPageModule/components/Footer/Footer";
export default function App(){
  return(
    <>
    <LoginApp/>
    {/* <HeroApp/> */}
    {/* <EcommerceApp/> */}
    <Footer/>
    </>
  )
}