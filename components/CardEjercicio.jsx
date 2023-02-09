import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import supabase from "/config/supabaseClient";
import RowSetsEjercicio from "/components/RowSetsEjercicio";


const CardEjercicio = ({ rutinaEjercicio, getEjerciciosRutina, index }) => {
    const router = useRouter();
    const ejercicio = rutinaEjercicio.ejercicio;

    const [setsEjercicio, setSetsEjercicio] = useState([])
    const [eliminarSet, setEliminarSet] = useState(false)

    let descansoMinutos = Math.floor(rutinaEjercicio.descanso / 60)
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
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md duration-150">
        {ejercicio === null ? 
            "Selecciona un ejercicio"
        : 
        <div className="relative">
            <div className='absolute text-3xl sm:text-4xl right-0'>
                <ion-icon name="reorder-three-outline"></ion-icon>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center">
                <div 
                className='relative rounded-full overflow-hidden h-16 w-16 sm:h-20 sm:w-20 border-2 mb-2 border-blue-500 hover:border-4 cursor-pointer duration-100'
                onClick={() => {
                    router.push({
                    pathname: '/detalleEjercicio',
                    query: { ejercicio: ejercicio.id }
                  })}}
                >
                    <Image className='rounded-full' src={ejercicio.img} layout='fill' objectFit="cover"/>
                </div>
                <div className="flex-auto sm:w-0 ml-0 sm:ml-4 w-full">
                    <p 
                    className="mr-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer 
                    hover:text-blue-800 duration-150
                    whitespace-nowrap text-ellipsis overflow-hidden"
                    onClick={() => {
                        router.push({
                        pathname: '/detalleEjercicio',
                        query: { ejercicio: ejercicio.id }
                      })}}
                    >
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
                                    hover:bg-blue-600 duration-100 active:scale-95">
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
            <button onClick={eliminarEjercicio} className="inline-flex items-center p-2 text-2xl font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 outline-none duration-75 active:scale-95">
                <ion-icon name="trash-outline"></ion-icon>
            </button>   
        </div>
        }
        
        </div>  
    );
};

export default CardEjercicio;
