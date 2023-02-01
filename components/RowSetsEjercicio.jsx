import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const RowSetsEjercicio = ({ set, index, getSets }) => {
    const [ejerciciosRutina, setEjerciciosRutina] = useState([])
    const [formInput, setFormInput] = useState({
      
    });

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
          <input type="text" placeholder={set.tipo}/>
        </td>
        <td className="p-2 border-l-2 border-r-2">
          {index + 1}
        </td>
        <td className="p-2 border-l-2 border-r-2">
          <input type="text" placeholder={set.reps}/>
        </td>
        <td className="p-2">
          <button 
            className="btn btn-xs"
            onClick={eliminarSet}
          >
            X
          </button>
        </td>
      </tr>
    );
};

export default RowSetsEjercicio;