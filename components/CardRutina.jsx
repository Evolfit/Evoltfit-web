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
      //const { data, error } = await supabase.rpc('getEjerciciosRutina', { rutina_id: rutina.id })
      const { data, error } = await supabase
        .from('rutinas_ejercicio')
        .select(`
          id,
          ejercicio(
            nombre
          ),
          rutinas_ejercicio_sets (
            id
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

    async function cancelarEntrenamiento() {
      const { error } = await supabase
      .from('rutina_en_progreso')
      .delete()
      .match({rutina: rutina.id })
  
      if (error) {
        console.log('ERROR: Error al cancelar el entrenamiento.')
        console.log(error)
      }
      else{
        console.log('Se canceló el entrenamiento')
        router.reload()
      }
    }
    
    return (
        <div className="flex flex-col bg-white border-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg hover:border-blue-500 duration-100 p-4">
          <div className="flex flex-col w-full h-full">
            <div className="">
              <h5 className="text-xl font-bold text-gray-900 cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
              onClick={() => {
                router.push({
                    pathname: '/editarRutina',
                    query: { rutina: rutina.id }
                })
                }}
              >
                {rutina.nombre}
              </h5>
            </div>
            <div className="mt-2 mb-4">
              { ejerciciosRutina.length === 0 ? 
                  <p className="text-sm">{'Aún no hay ejercicios.'}</p>
                  :
                  (ejerciciosRutina.map((ejercicio) => (
                      <div className="flex flex-row w-full my-1" key={ejercicio.id}>
                          <span className="w-9/12 font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                            {(ejercicio.orden+1) + ' - ' + ejercicio.ejercicio.nombre}
                          </span>
                          <span className="w-3/12 font-normal text-sm sm:ml-1">
                            {ejercicio.rutinas_ejercicio_sets.length === 1 ? 
                              '| ' + ejercicio.rutinas_ejercicio_sets.length + ' Set'
                            :
                              '| ' + ejercicio.rutinas_ejercicio_sets.length + ' Sets'
                            }
                            
                          </span>
                      </div>
                  ))
                  )
              }
            </div>
            </div>
            <div className="">
              {
                rutina.rutina_en_progreso[0].count == 1 ?
                  <div>
                    <button onClick={() => {
                      router.push({
                          pathname: '/comenzarRutina',
                          query: { rutina: rutina.id }
                      })
                      }} 
                      className="inline-flex mx-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                          Reanudar Entrenamiento
                          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <button onClick={() => {cancelarEntrenamiento()}} 
                    className="inline-flex mx-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        Cancelar Entrenamiento
                    </button>
                  </div>
                :
                  <div className="flex flex-row w-full">
                    <div className="flex flex-row space-x-2">
                      {
                      ejerciciosRutina.length === 0 ?
                        ''
                      :
                      <button 
                        className="flex flex-row items-center justify-center cursor-pointer text-white rounded-md bg-green-500
                        hover:bg-green-600 duration-100 active:scale-95"
                        onClick={() => {
                          router.push({
                            pathname: '/comenzarRutina',
                            query: { rutina: rutina.id }
                          })}
                        } 
                      >
                        <span className="text-sm font-semibold pb-1.5 ml-2">COMENZAR</span>
                        <div className="text-2xl mx-2">
                          <ion-icon name="barbell-outline"></ion-icon>
                        </div>
                      </button>
                      }
                      <button 
                        className="flex items-center justify-center p-2 text-2xl cursor-pointer text-white rounded-md bg-blue-500
                        hover:bg-blue-600 duration-100 active:scale-95"
                        onClick={() => {
                          router.push({
                              pathname: '/editarRutina',
                              query: { rutina: rutina.id }
                          })}
                        } 
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                    </div>
                    <div className="flex items-end justify-end w-full">
                      <button 
                        className="flex items-center justify-center p-2 text-2xl cursor-pointer text-white rounded-md bg-red-500
                        hover:bg-red-600 duration-100 active:scale-95"
                        onClick={() => {eliminarRutina()}} 
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
              }
            </div>
        </div>
    );
};

export default CardRutina;