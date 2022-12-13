import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import supabase from '/config/supabaseClient';
import Script from 'next/script';
import Head from 'next/head';


const Navbar = () => {
    const [sesion, setSesion] = useState(null);

    useEffect(() => {
        handleSesion()
    
    }, [])

    const handleSesion = async () => {

        const { data, error } = await supabase.auth.getSession()

        if(data.session){
            setSesion(data.session);
            console.log(data);
        } 
        else {
            setSesion(null);
            console.log("No hay Sesión " + error);
            console.log(data);
        }
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        
        if(error){
        console.log(error);
        }
        else{
        router.reload(window.location.pathname);
        }
    }

    let Links = [
        {name:"Inicio", link:"../"},
        {name:"Herramientas", link:"../herramientas"},
        {name:"Nosotros", link:"/"},
        {name:"Ayuda", link:"/"},
        {name:"Precios", link:"../precios"},
    ];

    let [open, setOpen] = useState(false);

    const router = useRouter();

    return (

        <div className = "shadow-md w-full fixed top-0 left-0 z-40"  data-theme="emerald">
              <Head>
                <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
              </Head>

            <div className = "md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
                <div>
                    <img  src = "evologo.png" className='h-16 ml-6'/>
                </div>
                <div onClick={() => setOpen(!open)} className = "text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                    <ion-icon name={open ? 'close':'menu'}></ion-icon>
                </div>
                <ul className = {`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100':'top-[-490px]'}`}>
                {
                    Links.map((link) =>(
                        <li key = {link.name} className = "md:ml-8 text-x1 md:my-0 my-7"> 
                            <a href = {link.link} className = "text-gray-800 hover:text-blue-500 duration-500 text-xl">{link.name}</a>
                        </li>
                    ))
                }
                    {sesion ? 
                        <div className="mx-6">
                            <span className="font-medium text-secondary">{sesion.user.email}</span>
                            <button className="btn btn-error btn-sm mx-6" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                     : 
                        <div>
                            <button onClick={() => router.push("../login")} className='bg-white text-black border-blue-800 border-2 font-family:Fira-Sans py-2 px-6 rounded-3xl md:ml-8 hover:bg-blue-800 hover:text-white
                            duration-500'>Ingresa</button>
                        </div>
                    }
                    
                        
                </ul>
            </div>
        </div>
    )
}

export default Navbar;