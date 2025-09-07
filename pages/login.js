import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";
import Aviso from "/components/Aviso";

export default function Home() {
  const router = useRouter();

  ////console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  //----------------------------------------------------------------
  const [formInput, setFormInput] = useState({});
  const [errorDatosInput, setErrorDatosInput] = useState({});
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensajeAviso, setMensajeAviso] = useState('');
  const [colorAviso, setColorAviso] = useState('red');

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
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, []);

  //----------------------------------------------------------------
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formInput.correo,
      password: formInput.password,
    });

    if (error) {
      setDatos(null);
      setFetchError("Error en el login.");
      setMensajeAviso('Correo o contraseña incorrectos.');
      setColorAviso('red');
      setMostrarAviso(true)
      //console.log("Login fallido");
      //console.log(error);
    } else {
      setDatos(data);
      setFetchError(null);
      //console.log("Login exitoso");
      router.push('/')
    }
  };

  function incluye(arreglo, buscar) {
    if (arreglo != undefined) {
      var encontrado = false;
      var arreglo_temp = Array.from(arreglo);

      for (let i = 0; i < arreglo_temp.length; i++) {
        if (arreglo_temp[i] == buscar) {
          encontrado = true;
          break;
        }
      }
      return encontrado;
    } else {
      return false;
    }
  }

  return (
    <div className="bg-stone-100" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <br />
      <br />
      <br />
      <br />

      <main>
        <Aviso
          mostrarAviso={mostrarAviso}
          setMostrarAviso={setMostrarAviso}
          color={colorAviso}
          mensaje={mensajeAviso}
        />
        <section className="flex flex-col md:flex-row h-screen items-center">
          <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img
              src="loginimg.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="xl:mb-16 bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full h-100">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Ingresa a tu cuenta
              </h1>
              <div className="mt-6">
                <div>
                  <label className="block text-gray-700">
                    Correo electrónico
                  </label>
                   {/*CAMPO CORREO ------------------------ */}
                  <input
                    name="correo"
                    value={formInput.correo || ""}
                    onChange={handleOnInputChange}
                    type="email"
                    id=""
                    placeholder="Ingresar correo electrónico"
                    className={
                      "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" +
                      (incluye(errorDatosInput.password, "error")
                        ? "input-error"
                        : " ")
                    }
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Contraseña</label>
                  {/*CAMPO CONTRASEÑA ------------------------ */}
                  <input
                    name="password"
                    value={formInput.password || ""}
                    onChange={handleOnInputChange}
                    type="password"
                    placeholder="Ingresar contraseña"
                    minLength="6"
                    className={
                      "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" +
                      (incluye(errorDatosInput.password, "error")
                        ? "input-error"
                        : " ")
                    }
                  />
                </div>

                <div className="text-right mt-2 mb-4">
                  <a
                    onClick={() => router.push("/passwordOlvidada")}
                    className="link link-secondary  text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>


                 {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
                <button
                  className={
                    "w-full block bg-blue-600 hover:bg-blue-500 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 " +
                    (formInput.correo == null
                      ? ""
                      : formInput.correo != "" && formInput.password
                      ? ""
                      : "btn-disabled")
                  }
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </button>
              </div>

              <hr className="my-6 border-gray-300 w-full" />

              {fetchError ? (
                <div className = "grid place-items-center">
                <div
                  id="toast-danger"
                  className="flex items-center p-4 mb-4 w-full max-w-xs bg-red-200 rounded-lg shadow"
                  role="alert"
                >
                  <div className = "inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Icono de error</span>
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    Correo o contraseña incorrectos.
                  </div>
                </div>
                </div>
              ) : (
                ""
              )}

              <p className="mt-8">
                {"¿No tienes una cuenta? "}
                <a
                  onClick={() => router.push("/registro")}
                  className="link link-secondary text-blue-500 hover:text-blue-700 font-semibold"
                >
                  {"Crear cuenta"}
                </a>
              </p>
            </div>
          </div>
        </section>
        
      </main>
     
      <Footer />
    </div>
  );
}
