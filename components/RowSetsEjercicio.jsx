import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const RowSetsEjercicio = ({ set, index, getSets, eliminar }) => {
    ////console.log(set);

    const [ejerciciosRutina, setEjerciciosRutina] = useState([])
    const [formInput, setFormInput] = useState({
      reps: set.reps,
      tipo: set.tipo
    });

    const handleOnInputChange = useCallback(
      (event) => {
        const { value, name } = event.target;

        if (name == 'reps'){
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

        updateSet(name, value);
  
      },
      [formInput, setFormInput]
    );
    
    async function updateSet(name, value) {
      ////console.log(rutinaIndex)
      
      const query = supabase.from('rutinas_ejercicio_sets');

      if (name == 'reps'){
          query = query.update({ reps: value}).eq('id', set.id)
      }
      else if (name == 'tipo'){
          query = query.update({ tipo: value}).eq('id', set.id)
      }

      const { error } = await query
  
      if (error) {
        //console.log('ERROR: No se pudo actualizar el set.')
        //console.log(error)
      }
      else{
        //console.log('Set Actualizado.')
        ////console.log(data[0])
      }
    }
    
    async function eliminarSet() {
      const { error } = await supabase
      .from('rutinas_ejercicio_sets')
      .delete()
      .match({id: set.id })
  
      if (error) {
        //console.log('ERROR: Error al eliminar el set.')
        //console.log(error)
      }
      else{
        //console.log('Se eliminó el set')
        getSets()
      }
    }

    return (
      <tr className="border-b-2">
        <th scope="row"  className="text-base text-center">
          {index + 1}
        </th>
        <td className="border-l-2 border-r-2 hover:bg-blue-50 duration-100">
          <select 
          name='tipo' 
          onChange={handleOnInputChange} 
          className="text-base text-center py-1 w-full font-normal border-0 border-blue-500 focus:outline-none focus:border-b-2 rounded-none duration-75 bg-inherit appearance-none cursor-pointer" 
          defaultValue='default'
          >
            <option id="default" value={formInput.tipo} hidden>{formInput.tipo}</option>
            <option id="Calentamiento" value="Calentamiento">Calentamiento</option>
            <option id="Normal" value="Normal">Normal</option>
            <option id="Drop set" value="Drop set">Drop set</option>
            <option id="Al fallo" value="Al fallo">Al fallo</option>
          </select>
        </td>
        <td className="text-center text-base border-l-2 hover:bg-blue-50 duration-100">
          <input 
          name='reps' 
          maxLength={3}
          value={formInput.reps} 
          onChange={handleOnInputChange}
          className="w-16 text-center py-1 font-normal border-0 border-blue-500 focus:outline-none focus:border-b-2 rounded-none duration-75 bg-inherit" 
          />
        </td>
        {eliminar ? 
            <td 
            className="text-center"
            >
            </td>
          :
          <td 
          className="text-center"
          onClick={eliminarSet}
          >
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center p-0.5 m-0.5 text-2xl cursor-pointer text-white rounded-md bg-gray-700
              hover:bg-gray-800 duration-100 active:scale-95">
                  <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>
          </td>
          }
        
        <td className="text-center">
          
        </td>
      </tr>
    );
};

export default RowSetsEjercicio;