import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const PerfilDropdown = ({ sesion, perfil }) => {
    const router = useRouter();

    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if(error){
            //console.log(error);
        }
        else{
            router.reload(window.location.pathname);
        }
    }

    return (
        <div className="">
            <img src={perfil.avatar} className='hidden md:inline w-16 bg-blue-500 rounded-full border-blue-700 cursor-pointer hover:border-2 duration-75' alt="avatar" onClick={() => {setToggleDropdown(!toggleDropdown)}}/>
            <div className="flex flex-row md:hidden">
                <img src={perfil.avatar} className='md: w-12 bg-blue-500 rounded-full border-blue-700 cursor-pointer hover:border-2 duration-75' alt="avatar" onClick={() => {router.push('/perfil')}}/>
                <span className="my-auto ml-3 text-secondary text-xl cursor-pointer hover:underline whitespace-nowrap text-ellipsis overflow-hidden w-36" onClick={() => {router.push('/perfil')}}>{perfil.nombre}</span>
            </div>
            
            {toggleDropdown ? 
                <div className="absolute flex flex-col bg-white mt-2 rounded-md shadow-lg md:right-6 border border-gray-200">
                    <div className="flex flex-row p-3">
                        <img src={perfil.avatar} className='w-16 bg-blue-500 rounded-full border-blue-700 cursor-pointer hover:border-2 duration-75' alt="avatar" onClick={() => {router.push('/perfil')}}/>
                        <div className="flex flex-col ml-4 my-auto">
                            <span className="font-medium text-lg whitespace-nowrap text-ellipsis overflow-hidden w-60 cursor-pointer hover:underline" onClick={() => {router.push('/perfil')}}>{perfil.nombre}</span>
                            <span className="text-sm whitespace-nowrap text-ellipsis overflow-hidden w-60">{sesion.user.email}</span>
                        </div>  
                    </div>
                    <div className="py-2 px-3 hover:bg-gray-200 border-t-2 border-gray-200 duration-150 cursor-pointer" onClick={() => {router.push('/perfil')}}>
                        <span className="text-base">Mi Perfil</span>
                    </div>
                    <div className="py-2 px-3 hover:bg-gray-200 duration-150 cursor-pointer" onClick={() => {router.push("/rutinas")}}>
                        <span className="text-base" >Mis Rutinas</span>
                    </div>
                    <div className="py-2 px-3 hover:bg-gray-200 border-t-2 border-gray-200 duration-150 cursor-pointer" onClick={handleLogout}>
                        <span className="text-base" >Cerrar Sesion</span>
                    </div>
                </div>
            : ''}
        </div>
    );
};

export default PerfilDropdown;