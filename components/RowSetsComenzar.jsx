import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const RowSetsEjercicio = ({ set, index, updateSet, indexEjercicio  }) => {
    //console.log(set);

    const [ejerciciosRutina, setEjerciciosRutina] = useState([])
    const [toggleTerminado, setToggleTerminado] = useState(
      set.estado ?
        set.estado == '' ?
          false
        :
          set.estado == 'terminado' ?
            true
          :
            set.estado == 'cancelado' ?
              true
            :
              false
      :
      false
    )
    const [toggleCancelar, setToggleCancelar] = useState(
      set.estado ?
        set.estado == '' ?
          false
        :
          set.estado == 'cancelado' ?
            true
          :
            set.estado == 'terminado' ?
              false
            :
              false
      :
      false
    )
    const [formInput, setFormInput] = useState({
      reps: set.reps,
      tipo: set.tipo || '',
      peso: set.peso || 0
    });

    const handleOnInputChange = useCallback(
      (event) => {
        const { value, name } = event.target;

        if (name == 'reps'){
          let check = value.replace(/\D/g, '');

          if (check < 0){
            check = 1
          }
          else if(check > 99){
            check = 99
          }

          value = check;
        }

        if (name == 'peso'){
          let check = value.replace(/\D/g, '');

          if (check < 0){
            check = 1
          }
          else if(check > 999){
            check = 999
          }

          value = check;
        }

        setFormInput({
          ...formInput,
          [name]: value,
        });

        //updateSet(name, value);
  
      },
      [formInput, setFormInput]
    );

    const fToggleTerminado = () => {
      if (toggleTerminado){
        setToggleTerminado(false)
        setToggleCancelar(false)
        updateSet(index, indexEjercicio, formInput, '')
      }
      else{
        setToggleTerminado(true)
        setToggleCancelar(false)
        updateSet(index, indexEjercicio, formInput, 'terminado')
      }
    }

    const fToggleCancelar = () => {
      if (toggleCancelar){
        setToggleCancelar(false)
        setToggleTerminado(false)
        updateSet(index, indexEjercicio, formInput, '')
      }
      else{
        setToggleCancelar(true)
        setToggleTerminado(true)
        updateSet(index, indexEjercicio, formInput, 'cancelado')
      }
    }
    
    async function updateSet(name, value) {
      //console.log(rutinaIndex)
      
      const query = supabase.from('rutinas_ejercicio_sets');

      if (name == 'reps'){
          query = query.update({ reps: value}).eq('id', set.id)
      }
      else if (name == 'tipo'){
          query = query.update({ tipo: value}).eq('id', set.id)
      }

      const { error } = await query
  
      if (error) {
        console.log('ERROR: No se pudo actualizar el set.')
        console.log(error)
      }
      else{
        console.log('Set Actualizado.')
        //console.log(data[0])
      }
    }
    
    async function eliminarSet() {
      const { error } = await supabase
      .from('rutinas_ejercicio_sets')
      .delete()
      .match({id: set.id })
  
      if (error) {
        console.log('ERROR: Error al eliminar el set.')
        console.log(error)
      }
      else{
        console.log('Se eliminó el set')
        getSets()
      }
    }

    return (
      <tr className={ toggleTerminado ?
        toggleCancelar ?
          "border-b-2 bg-gray-600 duration-75 cursor-not-allowed"
          :
          "border-b-2 bg-green-600 duration-75 cursor-not-allowed"
        :
          "border-b-2 duration-75"
        }>
        <th scope="row"
        className={ toggleTerminado ? 
          "text-lg text-center duration-75 text-gray-200"
          :
          "text-lg text-center duration-75"}
        >
          {index + 1}
        </th>
        <td className={ toggleTerminado ? 
        "border-l-2 border-r-2 duration-75"
        :
        "border-l-2 border-r-2 hover:bg-blue-50 duration-75"
        }>
          <select 
          name='tipo' 
          onChange={handleOnInputChange} 
          defaultValue='default'
          disabled={ toggleTerminado ? "disabled" : '' }
          className={ toggleTerminado ?
            "text-lg text-center h-12 w-full font-normal border-0 border-blue-500 focus:outline-none rounded-none duration-75 bg-inherit appearance-none cursor-not-allowed disabled:text-white" 
            :
            "text-lg text-center h-12 w-full font-normal border-0 border-blue-500 focus:outline-none focus:border-b-2 rounded-none duration-75 bg-inherit appearance-none cursor-pointer" 
          }>
            <option id="default" value={formInput.tipo} hidden>{formInput.tipo}</option>
            <option id="Calentamiento" value="Calentamiento">Calentamiento</option>
            <option id="Normal" value="Normal">Normal</option>
            <option id="Drop set" value="Drop set">Drop set</option>
            <option id="Al fallo" value="Al fallo">Al fallo</option>
          </select>
        </td>
        <td className={ toggleTerminado ?
          "text-center text-lg border-l-2 duration-75"
          :
          "text-center text-lg border-l-2 hover:bg-blue-50 duration-75"
        }>
          <input 
          name='reps' 
          maxLength={2}
          value={formInput.reps} 
          onChange={handleOnInputChange}
          disabled={ toggleTerminado ? "disabled" : '' }
          className={ toggleTerminado ?
            "h-12 w-12 sm:w-full py-3 text-center font-normal border-0 border-blue-500 focus:outline-none rounded-none duration-75 bg-inherit cursor-not-allowed text-gray-200" 
            :
            "h-12 w-12 sm:w-full py-3 text-center font-normal border-0 border-blue-500 focus:outline-none focus:border-b-2 rounded-none duration-75 bg-inherit" 
          }/>
        </td>
        <td className={ toggleTerminado ? 
        "text-center text-lg border-l-2 duration-75"
        :
        "text-center text-lg border-l-2 hover:bg-blue-50 duration-75"
        }>
          <input 
          name='peso' 
          maxLength={3}
          value={formInput.peso} 
          onChange={handleOnInputChange}
          disabled={ toggleTerminado ? "disabled" : '' }
          className={toggleTerminado ? 
            "h-12 w-12 sm:w-full py-3 text-center font-normal border-0 border-blue-500 focus:outline-none rounded-none duration-75 bg-inherit cursor-not-allowed text-gray-200" 
            :
            "h-12 w-12 sm:w-full py-3 text-center font-normal border-0 border-blue-500 focus:outline-none focus:border-b-2 rounded-none duration-75 bg-inherit" 
          }
          />
        </td>
          <td 
          className=""
          onClick={() => {}}
          >
            <div className="flex items-center justify-center f-full w-20 mx-auto">
            {toggleTerminado ?
              toggleCancelar ?
                <div 
                className="flex items-center justify-center p-1.5 text-xl mx-1 lg:mx-0 cursor-pointer text-gray-600 rounded-md bg-white
                hover:bg-gray-100 active:scale-90 duration-75"
                onClick={fToggleTerminado}
                >
                    <ion-icon name="create-outline"></ion-icon>
                </div>
              :
                <div 
                className="flex items-center justify-center p-1.5 text-xl mx-1 lg:mx-0 cursor-pointer text-white rounded-md bg-gray-600
                hover:bg-gray-700 active:scale-90 duration-75"
                onClick={fToggleTerminado}
                >
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            :
            <div className="flex flex-row lg:mx-0">
              <div 
              className="flex items-center justify-center p-1 text-2xl mx-1 cursor-pointer text-white rounded-md bg-green-600
              hover:bg-green-700 active:scale-90 duration-75"
              onClick={fToggleTerminado}
              >
                  <ion-icon name="checkmark-outline"></ion-icon>
              </div>
              <div 
              className="flex items-center justify-center p-1 text-2xl mx-1 cursor-pointer text-white rounded-md bg-gray-600
              hover:bg-gray-700 active:scale-90 duration-75"
              onClick={fToggleCancelar}
              >
                  <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>
            }
            
              
            </div>
          </td>
        
        <td className="text-center">
          
        </td>
      </tr>
    );
};

export default RowSetsEjercicio;