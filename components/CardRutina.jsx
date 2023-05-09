import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";
import EliminarConfirmar from "/components/EliminarConfirmar";


const CardRutina = ({ rutina }) => {
    const router = useRouter();

    const [ejerciciosRutina, setEjerciciosRutina] = useState([])
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [funcEliminar, setFuncEliminar] = useState('');

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
            nombre,
            musculo_primario
          ),
          rutinas_ejercicio_sets (
            id,
            reps
          ),
          orden
        `)
        .eq('rutina', rutina.id)
        .order('orden', { ascending: true })
    
        if (error) {
          //console.log('ERROR: Hubo un error al recuperar los ejercicios.')
          //console.log(error)
        }
        else{
          //console.log(data);
          setEjerciciosRutina(data);
        }
    }

    async function eliminarRutina() {
      const { error } = await supabase
      .from('rutinas')
      .delete()
      .match({id: rutina.id })
  
      if (error) {
        //console.log('ERROR: Error al eliminar la rutina.')
        //console.log(error)
      }
      else{
        //console.log('Se eliminó ' + rutina.nombre)
        router.reload()
      }
    }

    async function cancelarEntrenamiento() {
      const { error } = await supabase
      .from('rutina_en_progreso')
      .delete()
      .match({rutina: rutina.id })
  
      if (error) {
        //console.log('ERROR: Error al cancelar el entrenamiento.')
        //console.log(error)
      }
      else{
        //console.log('Se canceló el entrenamiento')
        router.reload()
      }
    }
    
    return (
      <div>
        <EliminarConfirmar
          mostrarEliminar={mostrarEliminar}
          setMostrarEliminar={setMostrarEliminar}
          mensaje={mensaje}
          funcEliminar=
          {
            funcEliminar == 'eliminarRutina' ?
            eliminarRutina :
            funcEliminar == 'cancelarEntrenamiento' ?
            cancelarEntrenamiento :
            ''
          }
        />
        <div className={
          (rutina.rutina_en_progreso[0].count !== 1 ?
            'hover:border-blue-500'
            :
            'hover:border-emerald-500'
          )
          +
          " flex flex-col h-full bg-white border-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg duration-100"}>
          <div className="flex flex-col w-full h-full">
            <div 
              className={
                (rutina.rutina_en_progreso[0].count !== 1 ?
                  rutina.esSE == false ?
                    'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                    :
                    'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
                  :
                  'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                )
                +
                " rounded-t-md shadow-md duration-150 "
              }
              onClick={() => {
                (rutina.rutina_en_progreso[0].count !== 1 ?
                  router.push({
                      pathname: '/editarRutina',
                      query: { rutina: rutina.id }
                  })
                :
                  router.push({
                      pathname: '/comenzarRutina',
                      query: { rutina: rutina.id }
                  })
                )
              }
              }
            >
              <div className="flex flex-row w-full my-4 px-4">
                <div className="flex items-center w-10/12">
                  {
                    rutina.esSE == true ?
                    <div className='text-white text-3xl mr-2 translate-y-1'>
                      <ion-icon name="share-social-outline"></ion-icon>
                    </div>
                    :
                    ''
                  }
                  <span className="tracking-wide font-medium text-xl text-white truncate">
                    {rutina.nombre}
                  </span>
                </div>
                <div className="flex justify-end items-center w-2/12 text-3xl text-white">
                  {rutina.rutina_en_progreso[0].count !== 1 ?
                    <ion-icon name="create-outline"></ion-icon>
                  :
                    <div className="h-7 w-9 fill-white">
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Capa 2"
                      viewBox="0 0 62.21 48.88"
                      >
                        <g data-name="Layer 1">
                          <rect
                            width="19.83"
                            height="6.62"
                            x="-0.49"
                            y="15.29"
                            className="cls-1"
                            rx="2.02"
                            ry="2.02"
                            transform="rotate(-45 9.423 18.597)"
                          ></rect>
                          <path
                            d="M9.28 10.11L9 9.83c-.8-.8-2.01-.88-2.71-.18L.48 15.46c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                            className="cls-1"
                          ></path>
                          <rect
                            width="19.83"
                            height="6.62"
                            x="20.37"
                            y="36.15"
                            className="cls-1"
                            rx="2.02"
                            ry="2.02"
                            transform="rotate(-45 30.283 39.456)"
                          ></rect>
                          <path
                            d="M39.06 39.89l-.28-.28c-.8-.8-2.01-.88-2.71-.18l-5.81 5.81c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                            className="cls-1"
                          ></path>
                          <path
                            d="M22.89 28.31L18.56 23.98 14.23 19.65 10.48 23.41 14.81 27.74 19.14 32.07 21.15 34.08 25.48 38.41 29.23 34.65 24.9 30.32 22.89 28.31z"
                            className="cls-1"
                          ></path>
                          <g>
                            <rect
                              width="19.83"
                              height="6.62"
                              x="18.38"
                              y="5.94"
                              className="cls-1"
                              rx="2.02"
                              ry="2.02"
                              transform="rotate(-55.34 28.294 9.244)"
                            ></rect>
                            <path
                              d="M26.63.92L26.3.69c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                              className="cls-1"
                            ></path>
                            <rect
                              width="19.83"
                              height="6.62"
                              x="42.65"
                              y="22.72"
                              className="cls-1"
                              rx="2.02"
                              ry="2.02"
                              transform="rotate(-55.34 52.562 26.028)"
                            ></rect>
                            <path
                              d="M61.27 24.87l-.33-.23c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                              className="cls-1"
                            ></path>
                            <path
                              d="M43.29 16.38L38.25 12.9 33.22 9.42 30.19 13.79 35.23 17.27 40.27 20.75 42.6 22.37 47.64 25.85 50.66 21.48 45.63 18 43.29 16.38z"
                              className="cls-1"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="px-4 pt-3 pb-4">
              { ejerciciosRutina.length === 0 ? 
                  <p className="text-base font-normal py-2">{'Aún no hay ejercicios.'}</p>
                  :
                  (ejerciciosRutina.map((ejercicio) => (
                      <div className="flex flex-row w-full my-0.5" key={ejercicio.id}>
                          <span className="w-9/12 font-normal text-base whitespace-nowrap text-ellipsis overflow-hidden py-0.5">
                            {(ejercicio.orden+1) + '. ' + ejercicio.ejercicio.nombre}
                          </span>
                          <span className="w-3/12 font-light text-base sm:ml-1">
                            {
                              ejercicio.ejercicio.musculo_primario == 'Cardio' ?
                              '| ' + ejercicio.rutinas_ejercicio_sets[0].reps + ' Min.'
                              :
                              (
                                  ejercicio.rutinas_ejercicio_sets.length === 1 ? 
                                  '| ' + ejercicio.rutinas_ejercicio_sets.length + ' Set'
                                :
                                  '| ' + ejercicio.rutinas_ejercicio_sets.length + ' Sets'
                              )
                            }
                            
                          </span>
                      </div>
                  ))
                  )
              }
            </div>
          </div>
          <div className="px-4 pb-4 rounded-b-md">
            {
              rutina.rutina_en_progreso[0].count == 1 ?
                <div className="flex flex-row w-full">
                  <div className="flex flex-row space-x-2">
                    <button 
                      className="flex flex-row items-center justify-center p-2 text-2xl cursor-pointer text-white rounded-md bg-red-500
                      hover:bg-red-600 duration-100 active:scale-95"
                      onClick={()=>{
                        setMostrarEliminar(true)
                        setMensaje('¿Seguro que quieres eliminar el progreso de tu entrenamiento?')
                        setFuncEliminar('cancelarEntrenamiento')
                      }} 
                    >
                      <ion-icon name="ban-outline"></ion-icon>
                    </button>
                  </div>
                  <div className="flex items-end justify-end w-full">
                    <button 
                        className="flex flex-row items-center justify-center cursor-pointer text-white rounded-md bg-emerald-500
                        hover:bg-emerald-600 duration-100 active:scale-95 h-full w-fit px-3 py-2"
                        onClick={() => {
                          router.push({
                              pathname: '/comenzarRutina',
                              query: { rutina: rutina.id }
                          })
                        }}  
                      >
                        <span className="pr-2 text-base font-semibold">CONTINUAR</span>
                        <div className="h-5.5 w-7 fill-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Capa 2"
                            viewBox="0 0 62.21 48.88"
                          >
                            <g data-name="Layer 1">
                              <rect
                                width="19.83"
                                height="6.62"
                                x="-0.49"
                                y="15.29"
                                className="cls-1"
                                rx="2.02"
                                ry="2.02"
                                transform="rotate(-45 9.423 18.597)"
                              ></rect>
                              <path
                                d="M9.28 10.11L9 9.83c-.8-.8-2.01-.88-2.71-.18L.48 15.46c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                                className="cls-1"
                              ></path>
                              <rect
                                width="19.83"
                                height="6.62"
                                x="20.37"
                                y="36.15"
                                className="cls-1"
                                rx="2.02"
                                ry="2.02"
                                transform="rotate(-45 30.283 39.456)"
                              ></rect>
                              <path
                                d="M39.06 39.89l-.28-.28c-.8-.8-2.01-.88-2.71-.18l-5.81 5.81c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                                className="cls-1"
                              ></path>
                              <path
                                d="M22.89 28.31L18.56 23.98 14.23 19.65 10.48 23.41 14.81 27.74 19.14 32.07 21.15 34.08 25.48 38.41 29.23 34.65 24.9 30.32 22.89 28.31z"
                                className="cls-1"
                              ></path>
                              <g>
                                <rect
                                  width="19.83"
                                  height="6.62"
                                  x="18.38"
                                  y="5.94"
                                  className="cls-1"
                                  rx="2.02"
                                  ry="2.02"
                                  transform="rotate(-55.34 28.294 9.244)"
                                ></rect>
                                <path
                                  d="M26.63.92L26.3.69c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                                  className="cls-1"
                                ></path>
                                <rect
                                  width="19.83"
                                  height="6.62"
                                  x="42.65"
                                  y="22.72"
                                  className="cls-1"
                                  rx="2.02"
                                  ry="2.02"
                                  transform="rotate(-55.34 52.562 26.028)"
                                ></rect>
                                <path
                                  d="M61.27 24.87l-.33-.23c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                                  className="cls-1"
                                ></path>
                                <path
                                  d="M43.29 16.38L38.25 12.9 33.22 9.42 30.19 13.79 35.23 17.27 40.27 20.75 42.6 22.37 47.64 25.85 50.66 21.48 45.63 18 43.29 16.38z"
                                  className="cls-1"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </button>
                  </div>
                </div>
              :
                <div className="flex flex-row w-full">
                  <div className="flex flex-row">
                    <button 
                      className="flex items-center justify-center p-2 text-2xl cursor-pointer text-white rounded-md bg-red-500
                      hover:bg-red-600 duration-100 active:scale-95"
                      onClick={()=>{
                        setMostrarEliminar(true)
                        setMensaje('¿Seguro que quieres eliminar ' + rutina.nombre + '?')
                        setFuncEliminar('eliminarRutina')
                      }} 
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </div>
                  <div className="flex items-end justify-end w-full">
                    {
                    ejerciciosRutina.length === 0 ?
                      ''
                    :
                    <button 
                      className={
                        rutina.esSE == true ?
                        "flex flex-row items-center justify-center cursor-pointer text-white rounded-md bg-indigo-500 hover:bg-indigo-600 duration-100 active:scale-95 h-full w-fit px-3"
                        :
                        "flex flex-row items-center justify-center cursor-pointer text-white rounded-md bg-blue-500 hover:bg-blue-600 duration-100 active:scale-95 h-full w-fit px-3"
                      }
                      onClick={() => {
                        router.push({ 
                          pathname: '/comenzarRutina',
                          query: { rutina: rutina.id }
                        })}
                      } 
                    >
                      <span className="pr-2 text-base font-semibold">ENTRENAR</span>
                      <div className="h-5.5 w-7 fill-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Capa 2"
                          viewBox="0 0 62.21 48.88"
                        >
                          <g data-name="Layer 1">
                            <rect
                              width="19.83"
                              height="6.62"
                              x="-0.49"
                              y="15.29"
                              className="cls-1"
                              rx="2.02"
                              ry="2.02"
                              transform="rotate(-45 9.423 18.597)"
                            ></rect>
                            <path
                              d="M9.28 10.11L9 9.83c-.8-.8-2.01-.88-2.71-.18L.48 15.46c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                              className="cls-1"
                            ></path>
                            <rect
                              width="19.83"
                              height="6.62"
                              x="20.37"
                              y="36.15"
                              className="cls-1"
                              rx="2.02"
                              ry="2.02"
                              transform="rotate(-45 30.283 39.456)"
                            ></rect>
                            <path
                              d="M39.06 39.89l-.28-.28c-.8-.8-2.01-.88-2.71-.18l-5.81 5.81c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71z"
                              className="cls-1"
                            ></path>
                            <path
                              d="M22.89 28.31L18.56 23.98 14.23 19.65 10.48 23.41 14.81 27.74 19.14 32.07 21.15 34.08 25.48 38.41 29.23 34.65 24.9 30.32 22.89 28.31z"
                              className="cls-1"
                            ></path>
                            <g>
                              <rect
                                width="19.83"
                                height="6.62"
                                x="18.38"
                                y="5.94"
                                className="cls-1"
                                rx="2.02"
                                ry="2.02"
                                transform="rotate(-55.34 28.294 9.244)"
                              ></rect>
                              <path
                                d="M26.63.92L26.3.69c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                                className="cls-1"
                              ></path>
                              <rect
                                width="19.83"
                                height="6.62"
                                x="42.65"
                                y="22.72"
                                className="cls-1"
                                rx="2.02"
                                ry="2.02"
                                transform="rotate(-55.34 52.562 26.028)"
                              ></rect>
                              <path
                                d="M61.27 24.87l-.33-.23c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63z"
                                className="cls-1"
                              ></path>
                              <path
                                d="M43.29 16.38L38.25 12.9 33.22 9.42 30.19 13.79 35.23 17.27 40.27 20.75 42.6 22.37 47.64 25.85 50.66 21.48 45.63 18 43.29 16.38z"
                                className="cls-1"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </button>
                    }
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
};

export default CardRutina;