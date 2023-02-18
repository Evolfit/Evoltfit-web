import React, { Fragment } from 'react';
import { useRouter } from "next/router";
import { useState, useEffect} from 'react';
import PerfilDropdown from "./PerfilDropdown";
import supabase from '/config/supabaseClient';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link'

const Aviso = ({ mostrarAviso, setMostrarAviso, mensaje, color }) => {
    let aviso = mensaje || 'Mensaje en el aviso.'
    let bg = color || 'red';
    
    return (
        <div className={
            "fixed flex items-center justify-center top-24 w-full bg-inherit duration-200 z-10 opacity-100 cursor-pointer " 
            +
            (!mostrarAviso ? 
            '-translate-y-20 opacity-0'
            :
            '')
            }
            onClick={() => {setMostrarAviso(!mostrarAviso)}} 
            data-theme="emerald">
            <div 
            className={
                'flex items-center justify-center w-full flex-row rounded-md shadow-md hover:shadow-lg px-2 py-1 hover:py-2 mx-4 mt-4 hover:mt-3 hover:px-3 duration-150 '
                +
                (
                    bg == 'red' ?
                    'bg-red-300'
                    :
                        bg == 'green' ?
                        'bg-green-300'
                        :
                        'bg-blue-300'
                )
                }>
                <p
                className='w-full whitespace-nowrap text-ellipsis text-lg overflow-hidden px-1'
                >{aviso}</p>
                <div onClick={() => {setMostrarAviso(!mostrarAviso)}} className={'flex items-center justify-center text-3xl rounded-md hover:shadow-md duration-100 active:scale-90 cursor-pointer p-1'}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

export default Aviso;