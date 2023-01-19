import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Navbar from "/components/Navbar";
import supabase from "../config/supabaseClient";
import Footer from "/components/Footer";
import Link from "next/link";

export default function Perfil() {
  const router = useRouter();
  const [sesion, setSesion] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [formInput, setFormInput] = useState({
    nombre: '',
    email: ''
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  const [updateSucess, setUpdateSuccess] = useState(false);
  const [correoVerificacion, setCorreoVerificacion] = useState(false);
  
  useEffect(() => {
      handleSesion()
  }, [])

  const handleSesion = async () => {

        const { data, error } = await supabase.auth.getSession()

        if(data.session){
            //console.log(data.session)
            setSesion(data.session);
            getPerfil(data.session.user.id);
        } 
        else {
            setSesion(null);
            //console.log("No hay Sesión " + error);
            router.push('/')
        }
  }

  const getPerfil = async (idUsuario) => {
      //console.log(idUsuario)

      const { data, error } = await supabase
          .from('perfiles')
          .select('*')
          .eq('id', idUsuario)

          if(error){
              console.log('ERROR: No se pudo conseguir el perfil.')
          }
          else{
              //console.log(data[0])
              setPerfil(data[0])
          }
  }

  const handleToggleEdit = () => {
    if (toggleEdit == true) {
        setToggleEdit(false)
    } else{
        setUpdateSuccess(false)

        setFormInput({
            nombre: perfil.nombre,
            email: sesion.user.email
        })

        setToggleEdit(true)
    }
  }
  

  const handleLogout = async () => {
      const { error } = await supabase.auth.signOut()
      
      if(error){
        console.log(error);
      }
      else{
        router.reload(window.location.pathname);
      }
  }

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked} = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
      //console.log(formInput.equipo)
    },
    [formInput, setFormInput]
  );

    const handleUpdateUsuario = async () => {
        if (formInput.email !== sesion.user.email) {
            const { data, error } = await supabase.auth.updateUser({email: formInput.email})

            if (error) {
                console.log('ERROR: No se pudo actualizar el correo del usuario.')
                console.log(error)
            }
            else{
                console.log('Se envió un correo de verificación.')
                console.log(data)
                setCorreoVerificacion(true)
                setUpdateSuccess(true)
            }
        }

        if (formInput.nombre !== perfil.nombre) {
            const { error } = await supabase
            .from('perfiles')
            .update({ nombre: formInput.nombre})
            .eq('id', sesion.user.id)

            if (error) {
                console.log('ERROR: No se pudo actualizar el perfil.')
                console.log(error)
            }
            else{
                console.log('Perfil actualizado.')
                setPerfil({
                    nombre: formInput.nombre,
                    avatar: perfil.avatar,
                    id: perfil.id,
                    sexo: perfil.sexo,
                })
                setUpdateSuccess(true)
            }
        }

        setToggleEdit(false)
    }

  return (
    <div className="bg-stone-100 w-full" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <br/>
        <br/>
        <br/>
        <br/>
        {
            perfil ?  
            <div className="flex flex-col justify-center items-center lg:mx-12 my-6 bg-white rounded-xl py-8">
                <img src={perfil.avatar} className='w-36 bg-blue-500 rounded-full border-blue-700 cursor-pointer hover:border-4 duration-75' alt="avatar" />
                <h2 className="font-semibold text-2xl mt-4">{perfil.nombre}</h2>
                <h3 className="font-light text-lg">{sesion.user.email}</h3>

                {updateSucess ? 
                        <p className="text-lg text-green-600 mt-2">¡Se guardaron los cambios!</p>
                :
                    ''
                }

                <div className="my-6 border border-gray-300 rounded-lg w-9/12">
                    <div className="flex flex-row px-4 py-3">
                        <div className="w-full">
                            <p className="text-lg font-semibold">Nombre</p>
                            { toggleEdit ? 
                                <input name="nombre" id="nombre" className="text-base border-b-2 border-blue-500" value={formInput.nombre || ""} onChange={handleOnInputChange} placeholder="Nombre"/>
                            :
                                <p className="text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">{perfil.nombre}</p>
                            }
                        </div>
                        { !toggleEdit ? 
                                <div className="w-fit my-auto">
                                    <button className="btn btn-sm" onClick={handleToggleEdit}>Editar</button>
                                </div>
                            :
                            ''
                        }
                        
                    </div>
                    <div className="flex flex-row px-4 py-3 border-t border-gray-300">
                        <div className="w-full">
                            <p className="text-lg font-semibold">Correo</p>
                            { toggleEdit ? 
                                <input name="email" id="email" className="text-base border-b-2 border-blue-500" value={formInput.email || ""} onChange={handleOnInputChange} placeholder="Email"/>
                            :
                                <p className="text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">{sesion.user.email}</p>
                            }
                        </div>
                        { !toggleEdit ? 
                            (
                                correoVerificacion ? 
                                <div className="w-fit my-auto">
                                    <p className="text-lg text-green-600">{'¡Se envió un correo de verificación a ' + sesion.user.email + '!'}</p>
                                </div>
                                :
                                <div className="w-fit my-auto">
                                    <button className="btn btn-sm" onClick={handleToggleEdit}>Editar</button>
                                </div>
                            )
                                
                            :
                            ''
                        }
                    </div>
                    <div className="flex flex-row px-4 py-3 border-t border-gray-300">
                        <div className="w-full">
                            <p className="text-lg font-semibold">Contraseña</p>
                            <p className="text-base font-normal">**********</p>
                        </div>
                        <div className="w-fit my-auto">
                            <button className="btn btn-sm">Cambiar Contraseña</button>
                        </div>
                    </div>
                    <div className="flex flex-row px-4 py-3 border-t border-gray-300">
                        <div className="w-full">
                            <p className="text-lg font-semibold">Plan</p>
                            <p className="text-base font-normal">EvoltFit Basic | Ayuda chats</p>
                        </div>
                        <div className="w-fit my-auto">
                            <button className="btn btn-sm btn-secondary">Cambiar Plan</button>
                        </div>
                    </div>
                    <div className="flex flex-row px-4 py-3 border-t border-gray-300">
                        <div className="w-full">
                            <p className="text-lg font-semibold">Fecha de Creación</p>
                            <p className="text-base font-normal">{sesion.user.created_at.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center w-9/12">
                    {toggleEdit ? 
                        <div className="flex flex-col lg:flex-row w-full">
                            <button className="btn border-none bg-green-600 hover:bg-green-500 m-1" onClick={handleUpdateUsuario} >Guardar Cambios</button>
                            <button className="btn border-none bg-red-600 hover:bg-red-500 m-1" onClick={() => {setToggleEdit(false)}}>Cancelar</button>
                        </div>
                    :
                        <button onClick={handleLogout} className="btn border-none bg-red-600 hover:bg-red-500 w-full lg:w-fit">Cerrar Sesión</button>
                    }
                </div>
            </div>
            : 
            <div className="my-12">
              <div className="loader mt-6"></div>
            </div>
        }
      </main>

      <Footer />
    </div>
  );
}
