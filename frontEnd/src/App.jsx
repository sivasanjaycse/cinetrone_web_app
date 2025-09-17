import React, { useState } from "react";
import LoginApp from "./LoginModule/JSX/LoginApp";
import HeroApp from "./HeroPageModule/HeroApp"
import EcommerceApp from "./EcommerceModule/EcommerceApp";
export default function App(){
  return(
    <>
    {/*<LoginApp/>*/}
    {/* <HeroApp/> */}
    <EcommerceApp/>
    </>
  )
}