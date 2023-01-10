import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import supabase from "/config/supabaseClient";

const CardEjercicio = ({ rutinaEjercicio, getEjerciciosRutina }) => {
    const ejercicio = rutinaEjercicio.ejercicio;
    const [formInput, setFormInput] = useState({
            orden: rutinaEjercicio.orden,
            reps: rutinaEjercicio.reps,
            sets: rutinaEjercicio.sets
        });

    async function eliminarEjercicio() {
        const { error } = await supabase
        .from('rutinas_ejercicio')
        .delete()
        .match({id: rutinaEjercicio.id})
    
        if (error) {
            console.log('ERROR: Error al eliminar el ejercicio.')
            console.log(error)
        }
        else{
            console.log('Se eliminó el ejercicio')
            getEjerciciosRutina()
        }
    }

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md my-2">
        {ejercicio === null ? 
            "Selecciona un ejercicio"
        : 
        <div>
            <button onClick={() => {}} >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{ejercicio.nombre}</h5>
            </button>
            <p className="mb-3 font-normal text-gray-700">{ejercicio.musculo_primario}</p>
            <button onClick={() => {}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Hacer algo
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <button onClick={eliminarEjercicio} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
                Eliminar
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <img src={ejercicio.img} alt="" classname='w-4 h-4'/>    
                </div>
            }
        
        </div>  
    );
};

export default CardEjercicio;
