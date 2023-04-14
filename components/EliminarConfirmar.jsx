import React, { Fragment } from 'react';
import { useRouter } from "next/router";
import { useState, useEffect} from 'react';
import PerfilDropdown from "./PerfilDropdown";
import supabase from '/config/supabaseClient';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link'

const EliminarConfirmar = ({ mostrarEliminar, setMostrarEliminar, mensaje, funcEliminar }) => {
    let aviso = mensaje || '¿Estás seguro?'
    
    useEffect(() => {
        if (mostrarEliminar){
            document.getElementById(mensaje).scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    }, [mostrarEliminar])

    return (
        <div className={
            "absolute w-full h-full bg-inherit flex items-center left-0 top-0 z-10 justify-center duration-200 backdrop-blur" 
            +
            (!mostrarEliminar ? 
            ' invisible opacity-0'
            :
            ' visible opacity-100')
            }
            data-theme="emerald">
            <div id={mensaje} className='w-11/12 sm:w-fit bg-white rounded-lg p-10 shadow-xl'>
                <p className="text-xl font-semibold mb-4 text-center">
                    {mensaje}
                </p>
                <div className='flex flex-row items-center justify-center space-x-6 mt-4'>
                    <button className="flex items-center justify-center py-3 px-4 font-bold cursor-pointer text-white rounded-md bg-gray-600 hover:scale-95
                        hover:bg-gray-700 duration-100 active:scale-90"
                    onClick={() => {setMostrarEliminar(!mostrarEliminar)}}
                    >
                        CANCELAR
                    </button>
                    <button className="flex items-center justify-center py-3 px-4 font-bold cursor-pointer text-white rounded-md bg-red-500 hover:scale-95
                        hover:bg-red-600 duration-100 active:scale-90"
                    onClick={() => {funcEliminar()}}
                    >
                        ELIMINAR
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default EliminarConfirmar;