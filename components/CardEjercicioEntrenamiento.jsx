import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";
import RowSetsComenzar from "/components/RowSetsComenzar";

const CardEjercicioEntrenamiento = ({ ejercicio, updateSet, ejercicioSeleccionado, agregarSet  }) => {
  const router = useRouter();  
  ////console.log(ejercicioSeleccionado);

  return (
    <div className="flex-auto bg-white rounded-lg shadow my-2 p-6">
      <div className="flex flex-row items-start justify-center">
        <div 
        className='relative rounded-full overflow-hidden h-14 w-14 border-2 border-blue-500 hover:border-4 cursor-pointer duration-100'
        onClick={() => {
            router.push({
            pathname: '/detalleEjercicio',
            query: { ejercicio: ejercicio.id }
        })}}
        >
            <Image className='rounded-full' src={ejercicio.ejercicio.img} layout='fill' objectFit="cover"/>
        </div>
        <div className="flex-auto w-2 pl-2">
            <p 
            className="mr-8 text-xl font-bold tracking-tight text-gray-900 cursor-pointer 
            hover:text-blue-800 duration-150
            whitespace-nowrap text-ellipsis overflow-hidden"
            id='nombreEjercicio'
            onClick={() => {
                router.push({
                pathname: '/detalleEjercicio',
                query: { ejercicio: ejercicio.id }
            })}}
            >
                <span>{(ejercicioSeleccionado + 1) + '. ' + ejercicio.ejercicio.nombre}</span>
            </p>
            <p className="font-normal text-lg text-gray-700">{ejercicio.ejercicio.musculo_primario}</p>
        </div>
      </div>
      {/*Tabla de sets*/}
      <div className="relative overflow-x-auto">
        <table className="w-full table-auto text-left mt-4">
            <thead className="border-b-2">
                <tr>
                    <th scope="col" className="text-center text-base pb-1 px-1">Set</th>
                    <th scope="col" className="text-center text-base pb-1 border-l-2 border-r-2">Tipo</th>
                    <th scope="col" className="text-center text-base pb-1 border-l-2 border-r-2">
                        {
                            ejercicio.ejercicio.musculo_primario == 'Cardio' ?
                            'Minutos'
                            :
                            'Reps'
                        }
                    </th>
                    {
                        ejercicio.ejercicio.musculo_primario == 'Cardio' ?
                        ''
                        :
                        <th scope="col" className="text-center text-base pb-1 border-l-2">{'Peso (lbs)'}</th>
                    }
                    <th scope="col" className="text-lg"></th>
                </tr>
            </thead>
            <tbody>
            {ejercicio.rutinas_ejercicio_sets.map((set, index) => (
                <RowSetsComenzar
                    key={set.id}
                    set={set}
                    index={index}
                    updateSet={updateSet}
                    indexEjercicio={ejercicioSeleccionado}
                    cardio={ejercicio.ejercicio.musculo_primario == 'Cardio' ? true : false}
                />
              ))
            }
            <tr>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                
                {
                    ejercicio.ejercicio.musculo_primario == 'Cardio' ?
                    <div className="h-10"></div>
                    :
                    <td 
                    className="text-center"
                    onClick={() => agregarSet(ejercicioSeleccionado)}
                    >
                        <div className="flex items-center justify-center f-full w-full">
                            <div className="flex items-center justify-center p-0.5 text-2xl cursor-pointer text-white rounded-md bg-blue-500
                            hover:bg-blue-600 duration-100 active:scale-95 my-0.5">
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                        </div>
                    </td>
                }
            </tr>
            </tbody>
        </table>
    </div>
    </div>
  );
};

export default CardEjercicioEntrenamiento;