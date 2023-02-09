import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";
import RowSetsComenzar from "/components/RowSetsComenzar";

const CardEjercicioEntrenamiento = ({ ejercicio, updateSet, ejercicioSeleccionado, agregarSet  }) => {
    console.log(ejercicioSeleccionado);

    return (
      <div className="flex-auto bg-white rounded-lg shadow-md my-2 p-6 mx-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center">
          <div 
          className='relative rounded-full overflow-hidden h-16 w-16 sm:h-20 sm:w-20 border-2 mb-2 border-blue-500 hover:border-4 cursor-pointer duration-100'
          onClick={() => {
              router.push({
              pathname: '/detalleEjercicio',
              query: { ejercicio: ejercicio.ejercicio.id }
            })}}
          >
              <Image className='rounded-full' src={ejercicio.ejercicio.img} layout='fill' objectFit="cover"/>
          </div>
          <div className="flex-auto sm:w-0 ml-0 sm:ml-4 w-full">
              <p 
              className="mr-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer 
              hover:text-blue-800 duration-150
              whitespace-nowrap text-ellipsis overflow-hidden"
              onClick={() => {
                  router.push({
                  pathname: '/detalleEjercicio',
                  query: { ejercicio: ejercicio.ejercicio.id }
                })}}
              >
                  {(ejercicioSeleccionado + 1) + ' - ' + ejercicio.ejercicio.nombre}
              </p>
              <p className="mb-2 font-normal text-lg sm:text-xl text-gray-700">{ejercicio.ejercicio.musculo_primario}</p>
          </div>
        </div>
          {/*Tabla de sets*/}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left my-4">
                <thead className="border-b-2">
                    <tr>
                        <th scope="col" className="text-center text-lg p-2">Set</th>
                        <th scope="col" className="text-center text-lg p-2 border-l-2 border-r-2">Tipo</th>
                        <th scope="col" className="text-center text-lg p-2 border-l-2 border-r-2">Reps</th>
                        <th scope="col" className="text-center text-lg p-2 border-l-2">{'Peso (lbs)'}</th>
                        <th scope="col" className="text-lg p-2"></th>
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
                    />
                ))
                }
                <tr>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td 
                  className="text-center py-2"
                  onClick={() => agregarSet(ejercicioSeleccionado)}
                  >
                      <div className="flex items-center justify-center f-full w-20 mx-auto">
                          <div className="flex items-center justify-center p-1 text-2xl cursor-pointer text-white rounded-md bg-blue-500
                          hover:bg-blue-600 duration-100 active:scale-95">
                              <ion-icon name="add-outline"></ion-icon>
                          </div>
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    );
};

export default CardEjercicioEntrenamiento;