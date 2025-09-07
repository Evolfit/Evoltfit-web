import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/supabaseClient';

export default function Home() {
  const router = useRouter();

  ////console.log(supabase);
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

      //VALIDACIÓN INPUT PASSWORD
      if (name == "password"){
        var error = ['control'];
        var regexPass = /^.{6,}$/;

        if (!regexPass.test(value)){
          error.push("error");
        }

        setErrorDatosInput({
          ...errorDatosInput,
          [name]: error,
        });
      }

      //VALIDACIÓN INPUT PASSWORD
      if (name == "confirmarPassword"){
        var error = ['control'];       

        if (formInput.password != value){
          error.push("error");
        }
    
        setErrorDatosInput({
          ...errorDatosInput,
          [name]: error,
        });
      }
    },
    [formInput, setFormInput]
  );

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event != "PASSWORD_RECOVERY") {
        router.push('/')
      }
      else{
        
      }
    })
  }, [])

  const handleRecuperarPassword = async () => {

    if(formInput.password != null){

      const { data, error } = await supabase.auth.updateUser({ 
        password: formInput.password
      })

      if(error){
        setDatos(null);
        setFetchError('Error al actualizar contraseña.');
        //console.log("Error: " + error);
      } 
      else {
        setDatos(data);
        setFetchError(null);
        //console.log("Contraseña actualizada: " + data);
        //router.push('/login')
      }
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

  ////console.log(datos);
  ////console.log(fetchError);

  return (
    <div className="bg-stone-100 w-full h-screen" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className="form-control py-10 px-16 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-10">
            Restablecer Contraseña
          </h2>

          {/*CAMPO CONTRASEÑA ------------------------ */}
          <input name="password" value={formInput.password || ""} onChange={handleOnInputChange} type="password" placeholder="Contraseña" className={"input input-lg mt-2 " +  (incluye(errorDatosInput.password, "control")  ? (incluye(errorDatosInput.password, "error")  ? "input-error" : "input-success") : " ")}/>
          
          <label className="label">
            <span className="label-text-alt">
              {
                //(incluye(errorDatosInput.correo, "error")  ? "Use una dirección de correo válida." : "")
              }
            </span>
            <span className="label-text-alt text-red-500">{incluye(errorDatosInput.password, "error")  ? "La contraseña es demasiado corta" : ""}</span>
          </label>

          {/*CAMPO CONFIRMAR CONTRASEÑA -------------- */}
          <input name="confirmarPassword" value={formInput.confirmarPassword || ""} onChange={handleOnInputChange} type="password" placeholder="Confirmar Contraseña" className={"input input-lg mt-2 " + (incluye(errorDatosInput.confirmarPassword, "control")  ? (incluye(errorDatosInput.confirmarPassword, "error")  ? "input-error" : "input-success") : " ")}/>
        
          <label className="label">
            <span className="label-text-alt">
              {
                //(incluye(errorDatosInput.correo, "error")  ? "Use una dirección de correo válida." : "")
              }
            </span>
            <span className="label-text-alt text-red-500">{incluye(errorDatosInput.confirmarPassword, "error")  ? "Las contraseñas no coinciden." : ""}</span>
          </label>
              
          {
            (datos) ? 
            (
              <div className="alert alert-success font-bold text-white">
                <div>
                  <span>
                    ¡Contraseña actualizada!
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
                    Ocurrió un error.
                  </span>
                </div>
              </div>
            )
            : ""
          }
          
          {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
          <button className={"btn btn-secondary btn-lg m-6 " + (incluye(errorDatosInput.password, "control")  ? (incluye(errorDatosInput.correo, "error") || incluye(errorDatosInput.password, "error") || incluye(errorDatosInput.confirmarPassword, "error") ? "btn-disabled" : " ") : " ")} onClick={handleRecuperarPassword}>Enviar</button>
        </div>

        <button
          onClick={() => router.push('/')}
          className="btn btn-ghost btn-lg mt-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          &nbsp;Volver al Inicio
        </button>

      </main>

      <footer className={styles.footer}>
        <p className="font-light">
          {'Powered by '}
          <span className="animate-pulse font-bold text-fuchsia-500">
            {'Evoltfit'}
          </span>
        </p>
      </footer>
    </div>
  );
}
