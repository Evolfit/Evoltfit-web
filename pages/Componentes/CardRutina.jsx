import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const CardRutina = ({ rutina }) => {
    const router = useRouter();

    const [ejerciciosRutina, setEjerciciosRutina] = useState([])

    useEffect(() => {
        getEjerciciosRutina()
      }, [])

    async function getEjerciciosRutina() {
        const { data, error } = await supabase
        .from('rutinas_ejercicio')
        .select(`
          id,
          ejercicio (
            nombre
          ),
          sets,
          reps,
          orden
        `)
        .eq('rutina', rutina.id)
    
        if (error) {
          console.log('ERROR: Hubo un error al recuperar los ejercicios.')
          console.log(error)
        }
        else{
          console.log(data);
          setEjerciciosRutina(data);
        }
    }

    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md my-2">
            <button onClick={() => {
            router.push({
                pathname: '/editarRutina',
                query: { rutina: rutina.id }
            })
            }} >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{rutina.nombre}</h5>
            </button>
            { ejerciciosRutina.length === 0 ? 
                <p>{'Ups, no hay ejercicios. 🥵'}</p>
                :
                (ejerciciosRutina.map((ejercicio) => (
                    <div key={ejercicio.id}>
                        <p className="font-bold">{ejercicio.ejercicio.nombre}</p>
                        <p>{'Sets: ' + ejercicio.sets}</p>
                        <p className="mb-2">{'Reps: ' + ejercicio.reps}</p>
                    </div>
                ))
                )
            }
            <button onClick={() => {
            router.push({
                pathname: '/editarRutina',
                query: { rutina: rutina.id }
            })
            }} 
            className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Editar
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};

export default CardRutina;