import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const RowSetsEjercicio = ({ set, index, getSets }) => {
    //console.log(set);

    const [ejerciciosRutina, setEjerciciosRutina] = useState([])
    const [formInput, setFormInput] = useState({
      reps: set.reps,
      tipo: set.tipo
    });

    const handleOnInputChange = useCallback(
      (event) => {
        const { value, name } = event.target;

        if (name == 'reps'){
          if (value < 0){
            value = 1
          }
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
      <tr className="border-b-2">
        <td className="p-2">
          <input type="text" name='tipo' value={formInput.tipo} onChange={handleOnInputChange}/>
        </td>
        <td className="p-2 border-l-2 border-r-2">
          {index + 1}
        </td>
        <td className="p-2 border-l-2 border-r-2">
          <input type="number" name='reps' value={formInput.reps} onChange={handleOnInputChange}/>
        </td>
        <td className="p-2">
          {index == 0 ? 
            ''
          :
            <button 
            className="btn btn-xs"
            onClick={eliminarSet}
            >
              X
            </button>
          }
        </td>
      </tr>
    );
};

export default RowSetsEjercicio;