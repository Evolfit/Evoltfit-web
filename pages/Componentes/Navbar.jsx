import React from 'react';
import Reacto, { useState } from 'react'
import { useRouter } from "next/router";

const Navbar = () => {
    let Links = [
        {name:"Inicio", link:"../"},
        {name:"Herramientas", link:"../herramientas"},
        {name:"Nosotros", link:"/"},
        {name:"Ayuda", link:"/"},
        {name:"Precios", link:"../precios"},
    ];

    const router = useRouter();

    return (
        <div className = "shadow-md w-full fixed top-0 left-0">
            <div className = "md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
                <div>
                    <img  src = "evologo.png" className='h-16 ml-6'/>
                </div>
                <div className = "text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                
                </div>
                <ul className = "md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in">
                    {
                        Links.map((link) =>(
                            <li key = {link.name} className = "md:ml-8 text-x1 md:my-0 my-7"> 
                                <a href = {link.link} className = "text-gray-800 hover:text-blue-500 duration-500 text-xl">{link.name}</a>
                            </li>
                        ))
                        }
                        
                        <button onClick={() => router.push("../registro")} className='bg-white text-black border-blue-800 border-2 font-family:Fira-Sans py-2 px-6 rounded-3xl md:ml-8 hover:bg-blue-800 hover:text-white
                        duration-500'>Únete</button>
                        <button onClick={() => router.push("../login")} className='bg-blue-800 text-white border-blue-800 border-2 rounded-3xl font-family:Fira-Sans py-2 px-6 rounded md:ml-8 hover:bg-white hover:text-black
                        duration-500'>Ingresa</button>
                        
                </ul>
            </div>
        </div>
    )
}

export default Navbar;