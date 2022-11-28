import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/supabaseClient';

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
      router.push('/login')
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
    <div className={styles.container} data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="form-control p-10 m-2 bg-gray-200 rounded-lg">
          <h2 className="text-3xl font-bold mb-10">
            Ingreso
          </h2>

          {/*CAMPO CORREO ------------------------ */}
          <input name="correo" value={formInput.correo || ""} onChange={handleOnInputChange} type="text" placeholder="Correo" className={"input input-lg mt-2 " + (incluye(errorDatosInput.correo, "error")  ? "input-error" : " ")}/>
          <label className="label">
            <span className="label-text-alt text-red-500 m-0"></span>
          </label>

          {/*CAMPO CONTRASEÑA ------------------------ */}
          <input name="password" value={formInput.password || ""} onChange={handleOnInputChange} type="password" placeholder="Password" className={"input input-lg mt-2 " + (incluye(errorDatosInput.password, "error")  ? "input-error" : " ")}/>
          <label className="label">
            <a className="link link-secondary text-sm no-underline" onClick={() => router.push('/recuperarContraseña')}>¿Olvidaste tu constraseña?</a>
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

          {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
          <button className={"btn btn-secondary btn-lg m-6 " + (formInput.correo == null ? "" : (formInput.correo != "" && formInput.password ?  "" : "btn-disabled"))} onClick={handleLogin}>Iniciar Sesión</button>

          <a className="link link-secondary self-end mt-2 " onClick={() => router.push('/registro')}>¿No tienes cuenta? Registrate</a>
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
