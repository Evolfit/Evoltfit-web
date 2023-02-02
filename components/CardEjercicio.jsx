import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import supabase from "/config/supabaseClient";
import RowSetsEjercicio from "/components/RowSetsEjercicio";


const CardEjercicio = ({ rutinaEjercicio, getEjerciciosRutina, index }) => {
    const ejercicio = rutinaEjercicio.ejercicio;
    let descansoMinutos = Math.floor(rutinaEjercicio.descanso / 60)

    const [setsEjercicio, setSetsEjercicio] = useState([])
    const [eliminarSet, setEliminarSet] = useState(false)
    const [formInput, setFormInput] = useState({
        minutos: descansoMinutos,
        segundos: rutinaEjercicio.descanso - (descansoMinutos * 60)
    });

    console.log(rutinaEjercicio)
    
    useEffect(() => {
        getSets();
    }, [])

    async function getSets() {
        const { data, error } = await supabase
        .from('rutinas_ejercicio_sets')
        .select('*')
        .eq('ejercicio_rutina', rutinaEjercicio.id)
        .order('created_at', { ascending: true })

        if (error) {
            console.log('ERROR: No se consiguieron los sets.')
            console.log(error)
        }
        else{
            console.log(data)
            if(data.length > 1) {
                setEliminarSet(false)
            }
            else{
                setEliminarSet(true)
            }
            setSetsEjercicio(data);
            //setFormInput()
        }
    }

    async function updateEjercicio(name, value) {
        //console.log(rutinaIndex)
        
        const query = supabase.from('rutinas_ejercicio');
        
        if ( name == 'minutos' ){
            let segundos = (value * 60) + parseInt(formInput.segundos);
            query = query.update({ descanso: segundos}).eq('id', rutinaEjercicio.id)
        }
        else if ( name == 'segundos' ){
            let segundos = (formInput.minutos * 60) +  parseInt(value);
            query = query.update({ descanso: segundos}).eq('id', rutinaEjercicio.id)
        }
        else if (name == 'orden'){
            query = query.update({ orden: value}).eq('id', rutinaEjercicio.id)
        }

        const { error } = await query
    
        if (error) {
          console.log('ERROR: No se pudo actualizar el ejercicio.')
          console.log(error)
        }
        else{
          console.log('Ejercicio Actualizado.')
          //console.log(data[0])
        }
    }

    async function eliminarEjercicio() {
        const { error } = await supabase
        .from('rutinas_ejercicio')
        .delete()
        .match({id: rutinaEjercicio.id})
    
        if (error) {
            console.log('ERROR: Error al eliminar el ejercicio.')
            console.log(error)
        }
        else{
            console.log('Se eliminó el ejercicio')
            getEjerciciosRutina()
        }
    }

    async function agregarSet() {
        
        const { data, error } = await supabase
        .from('rutinas_ejercicio_sets')
        .insert({
            ejercicio_rutina: rutinaEjercicio.id, 
        })
        .select('*')

        if (error) {
            console.log(error)
            console.log("ERROR: Hubo un error al agregar un nuevo set.")
        }
        else{
            console.log("Se agregó un nuevo set.")
            setEliminarSet(false)
            setSetsEjercicio(current => [...current, data[0]]);
        }
    
    }

    const handleOnInputChange = useCallback(
        (event) => {
          const { value, name } = event.target;

          if (name == 'minutos' || name == 'segundos'){
            let check = value.replace(/\D/g, '');

            if (check < 0){
                check = 0
            }
            else if(check > 60){
                check = 60
            }

            value = check;
          }

          setFormInput({
            ...formInput,
            [name]: value,
          });

          updateEjercicio(name, value);
    
          //console.log(name + " | " + id + ": " + value + " -> " + checked);
        },
        [formInput, setFormInput]
      );

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        {ejercicio === null ? 
            "Selecciona un ejercicio"
        : 
        <div className="relative">
            <div className='absolute text-3xl sm:text-4xl right-0'>
                <ion-icon name="reorder-three-outline"></ion-icon>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center">
                <div className='relative rounded-full overflow-hidden h-16 w-16 sm:h-20 sm:w-20 border-2 mb-2 border-blue-400'>
                    <Image className='rounded-full' src={ejercicio.img} layout='fill' objectFit="cover"/>
                </div>
                <div className="flex-auto sm:w-0 ml-0 sm:ml-4">
                    <p className="mr-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden">
                        {(index+1) + ' - ' + ejercicio.nombre}
                    </p>
                    <p className="mb-2 font-normal text-lg sm:text-xl text-gray-700">{ejercicio.musculo_primario}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-start">
                <span className="font-semibold text-xl mr-2">
                    {'Descanso: '}
                </span>
                <div className="flex flex-row items-center justify-center text-xl w-fit py-2 px-2 text-secondary my-2 font-semibold bg-inherit border-b
                outline-none border-blue-500 focus:border-b-2 duration-75">
                    <input 
                        name='minutos'
                        maxLength={2}
                        onChange={handleOnInputChange}
                        className='text-center w-6 outline-none'
                        value={
                            formInput.minutos.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            })}
                    />
                    <span>{':'}</span>
                    <input 
                        name='segundos'
                        maxLength={2}
                        onChange={handleOnInputChange}
                        className='text-center w-6 outline-none'
                        value={
                            formInput.segundos.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            })}
                    />
                    <span className="pl-2">{' Min.'}</span>
                </div>
            </div>
            

            {
                setsEjercicio ?
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left mt-4">
                        <thead className="border-b-2">
                            <tr>
                                <th scope="col" className="text-center text-lg p-2">Set</th>
                                <th scope="col" className="text-center text-lg p-2 border-l-2 border-r-2">Tipo</th>
                                <th scope="col" className="text-center text-lg p-2 border-l-2">Reps</th>
                                <th scope="col" className="text-lg p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {setsEjercicio.map((set, index) => (
                            <RowSetsEjercicio
                                key={set.id}
                                set={set}
                                index={index}
                                getSets={getSets}
                                eliminar={eliminarSet}
                            />
                        ))
                        }
                        <tr>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td 
                            className="text-center py-2"
                            onClick={agregarSet}
                            >
                                <div className="flex items-center justify-center f-full w-full">
                                    <div className="flex items-center justify-center p-1 text-2xl cursor-pointer text-white rounded-md bg-blue-500
                                    hover:bg-blue-600 duration-100">
                                        <ion-icon name="add-outline"></ion-icon>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                :
                <div className="loader"></div>
            }
            <button onClick={eliminarEjercicio} className="inline-flex items-center my-2 mx-1 px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
                Eliminar
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>   
        </div>
        }
        
        </div>  
    );
};

export default CardEjercicio;
