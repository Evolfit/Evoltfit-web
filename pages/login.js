import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import supabase from '../config/supabaseClient';
import Image from 'next/image'

export default function Home() {
  const router = useRouter();

  //console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  //----------------------------------------------------------------
  const [formInput, setFormInput] = useState({});
  const [errorDatosInput, setErrorDatosInput] = useState({});

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name } = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

    },
    [formInput, setFormInput]
  );
  
  useEffect(() => {

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Cambió la sesión: " + event)
      if (session) {
        router.push('/')
      }
    })

  }, [])

  //----------------------------------------------------------------
  const handleLogin = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formInput.correo,
      password: formInput.password,
    })

    if(error){
      setDatos(null);
      setFetchError('Error en el login.');
      console.log("Login fallido");
      console.log(error);
    } 
    else {
      setDatos(data);
      setFetchError(null);
      console.log("Login exitoso");
      console.log(data);
      //router.push('/')
    }
  }

  function incluye(arreglo, buscar) {
    if (arreglo != undefined){
      var encontrado = false;
      var arreglo_temp = Array.from(arreglo);

      for (let i = 0; i < arreglo_temp.length; i++) {
        if (arreglo_temp[i] == buscar){
          encontrado = true;
          break;
        }
      }  
      return encontrado;
    }
    else{
      return false;
    }
  }

  //console.log(datos);
  //console.log(fetchError);

  return (
    <div className="bg-stone-100" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>

      <main>
        <div className='relative overflow-hidden mt-20 pb-10'>
          <br/>
          <br/>
          <Image className="opacity-80 blur-sm object-cover z-10 shadow-xl" src="/bcprice.jpg" width={1} height={1} layout='fill'/>
          <div className='flex justify-center items-center'>
            <div className="form-control p-8 w-80 lg:py-12 lg:px-12 bg-white rounded-2xl shadow-lg lg:w-1/2 z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-10">
                Ingreso
              </h2>

              {/*CAMPO CORREO ------------------------ */}
              <input name="correo" value={formInput.correo || ""} onChange={handleOnInputChange} type="text" placeholder="Correo" className={"input input-lg input-secondary border-0 text-xl py-6 h-full font-normal rounded-xl shadow-md mb-4 " + (incluye(errorDatosInput.correo, "error")  ? "input-error" : " ")}/>
              <label className="label">
                <span className="label-text-alt text-red-500 m-0"></span>
              </label>

              {/*CAMPO CONTRASEÑA ------------------------ */}
              <input name="password" value={formInput.password || ""} onChange={handleOnInputChange} type="password" placeholder="Contraseña" className={"input input-lg input-secondary border-0 text-xl py-6 h-full font-normal rounded-xl shadow-md " + (incluye(errorDatosInput.password, "error")  ? "input-error" : " ")}/>
              <label className="label">
                <a className="link link-secondary text-lg font-light no-underline mt-2 mb-4" onClick={() => router.push('/passwordOlvidada')}>¿Olvidaste tu constraseña?</a>
              </label>

              {
                (datos) ? 
                (
                  <div className="alert alert-success font-bold text-white">
                    <div>
                      <span>
                        {"¡Login existoso!"}
                        {datos.user.email}
                      </span>
                    </div>
                  </div>
                )
                : ""
              }

              {
                (fetchError) ? 
                (
                  <div className="alert alert-error font-bold text-white">
                    <div>
                      <span>
                        Correo o contraseña incorrectos.
                      </span>
                    </div>
                  </div>
                )
                : ""
              }
                
              <div className="divider mb-8 mt-2"></div>
                {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
                <button className={"btn btn-secondary btn-lg " + (formInput.correo == null ? "" : (formInput.correo != "" && formInput.password ?  "" : "btn-disabled"))} onClick={handleLogin}>Iniciar Sesión</button>
                <a className="link link-secondary self-end mt-8 text-xl font-light" onClick={() => router.push('/registro')}>¿No tienes cuenta? Registrate</a>
              </div>
            </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
