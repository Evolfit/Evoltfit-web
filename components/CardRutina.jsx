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
          orden
        `)
        .eq('rutina', rutina.id)
        .order('orden', { ascending: true })
    
        if (error) {
          console.log('ERROR: Hubo un error al recuperar los ejercicios.')
          console.log(error)
        }
        else{
          console.log(data);
          setEjerciciosRutina(data);
        }
    }

    async function eliminarRutina() {
        const { error } = await supabase
        .from('rutinas')
        .delete()
        .match({id: rutina.id })
    
        if (error) {
          console.log('ERROR: Error al eliminar la rutina.')
          console.log(error)
        }
        else{
          console.log('Se eliminó ' + rutina.nombre)
          router.reload()
        }
      }
    

    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md my-2">
          <h5 className="mb-2 text-2xl font-bold text-gray-900 cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
          onClick={() => {
            router.push({
                pathname: '/editarRutina',
                query: { rutina: rutina.id }
            })
            }}
          >
            {rutina.nombre}
          </h5>
            { ejerciciosRutina.length === 0 ? 
                <p>{'Ups, no hay ejercicios. 🥵'}</p>
                :
                (ejerciciosRutina.map((ejercicio) => (
                    <div key={ejercicio.id}>
                        <p className="font-bold">
                          {(ejercicio.orden+1) + ' - ' + ejercicio.ejercicio.nombre}
                        </p>
                          <p>{'Sets: ' + ejercicio.sets}</p>
                    </div>
                ))
                )
            }
            {
              ejerciciosRutina.length === 0 ?
                ''
              :
              <button onClick={() => {
                router.push({
                    pathname: '/comenzarRutina',
                    query: { rutina: rutina.id }
                })
                }} 
                className="inline-flex mx-1 items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                    Comenzar Entrenamiento
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            }
            
            <button onClick={() => {
            router.push({
                pathname: '/editarRutina',
                query: { rutina: rutina.id }
            })
            }} 
            className="inline-flex mx-1 items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Editar
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <button onClick={() => {eliminarRutina()}} 
            className="inline-flex mx-1 items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                Eliminar
            </button>
        </div>
    );
};

export default CardRutina;