import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../config/supabaseClient";

const AsignarMeta = ({ setToggleSeleccionar }) => {

    const router = useRouter();

    const [calorias, setCalorias] = useState();
    const [sesion, setSesion] = useState(null);

    useEffect (() => {
         handleSesion();
    },[])

    const handleSesion = async () => {
        const { data, error } = await supabase.auth.getSession();
    
        if (data.session) {
          setSesion(data.session);
          ////console.log(data);
        } else {
          setSesion(null);
          ////console.log("No hay Sesión " + error);
        }
      };

    const handleSubmit = async (e) => {
    
        e.preventDefault();

        if(calorias >= 0){
        const { data, error } = await supabase
        .from("calorias_metas")
        .select("*")
        .eq("usuario", sesion.user.id)

        if(data.length == 0){
            //console.log("Este usuario no habia fijado meta")
            const { data, error } = await supabase
            .from('calorias_metas')
            .insert({
              usuario: sesion.user.id, 
              cals_meta: calorias
              })
    
              if(error) {
                //console.log(error)
                //console.log("ERROR: Hubo un error al agregar la meta del usuario.")
              }
              else{
                //console.log("Se agregó una meta de calorías")
                //console.log(data)
                setToggleSeleccionar(false);
                router.reload()
              }
        }else{
            const { data, error } = await supabase
            .from("calorias_metas")
            .update({cals_meta: calorias})
            .eq("usuario", sesion.user.id)

            if(error){
                //console.log("ERROR: Hubo un error actualizando la meta del usuario")
                //console.log(error)
            }else{
                //console.log("Meta del usuario actualizada")
                setToggleSeleccionar(false);
                router.reload()
            }
        }
      }else{
        alert("El valor tiene que ser mayor que cero")
      }
          e.target.reset()
      }
    
    return (
        <div className="absolute top-40  left-1/2 transform -translate-x-1/2 mx-auto w-11/12 h-3/6 shadow-lg rounded-lg pt-12 bg-white border-blue-600 border-2 xl:w-5/12 xl:top-32 xl:h-2/3">
            <button onClick={() => {setToggleSeleccionar(false)}} className="absolute btn btn-lg btn-ghost right-6 top-6 text-5xl">
              <ion-icon name='close-outline'></ion-icon>
           </button>
           <br></br>
           <form onSubmit={handleSubmit} className="mt-6">
                      <div className="flex-1">
                        
                        <div className = "grid place-items-center">
                        <label className="mb-2 text-base xl:text-xl font-bold text-gray-600">
                          Ingresa las calorías
                        </label>
                        <input
                          onChange={e => setCalorias(e.target.value)}
                          name = "calorias"
                          type="number"
                          placeholder="2000"
                          className="w-7/12 px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                        />
                         <button className="w-7/12 px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                        Guardar
                      </button>
                        </div>
                      </div>
                    </form>
        </div>
        );
}

export default AsignarMeta;