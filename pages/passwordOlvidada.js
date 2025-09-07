import Head from "next/head";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();

  ////console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  //----------------------------------------------------------------
  const [formInput, setFormInput] = useState({});
  const [errorDatosInput, setErrorDatosInput] = useState({});

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name } = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      //VALIDACIÓN INPUT CORREO
      if (name == "correo") {
        var error = ["control"];
        var regexCorreo =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!regexCorreo.test(value)) {
          error.push("error");
        }

        setErrorDatosInput({
          ...errorDatosInput,
          [name]: error,
        });
      }

      //VALIDACIÓN INPUT PASSWORD
      if (name == "password") {
        var error = ["control"];
        var regexPass = /^.{6,}$/;

        if (!regexPass.test(value)) {
          error.push("error");
        }

        setErrorDatosInput({
          ...errorDatosInput,
          [name]: error,
        });
      }

      //VALIDACIÓN INPUT PASSWORD
      if (name == "confirmarPassword") {
        var error = ["control"];

        if (formInput.password != value) {
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

  //----------------------------------------------------------------
  const handlePasswordOlvidada = async () => {
    if (formInput.correo != null) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formInput.correo,
        {
          redirectTo: "https://evoltfit-app.vercel.app/recuperarPassword",
        }
      );

      if (error) {
        setDatos(null);
        setFetchError("Error al conseguir datos");
        //console.log("Error: " + error);
      } else {
        setDatos(data);
        setFetchError(null);
        //console.log("Se envió un correo de verificación");
      }
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
    <div className="bg-stone-100 w-full" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="w-8 h-8 mr-2" src="evologo.png" alt="logo" />
            EvoltFit
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Recupera tu cuenta
              </h1>

              <div>
                <label className="block text-gray-700">
                  Correo electrónico
                </label>
                <input
                  name="correo"
                  value={formInput.correo || ""}
                  onChange={handleOnInputChange}
                  type="email"
                  placeholder="Ingresar correo electrónico"
                  className={
                    "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" +
                    (incluye(errorDatosInput.correo, "control")
                      ? incluye(errorDatosInput.correo, "error")
                        ? "input-error"
                        : "input-success"
                      : " ")
                  }
                />
                <label className="label">
                <span className="label-text-alt">
                  {
                    //(incluye(errorDatosInput.correo, "error")  ? "Use una dirección de correo válida." : "")
                  }
                </span>
                <span className="label-text-alt text-sm font-light text-red-500">
                  {incluye(errorDatosInput.correo, "error")
                    ? "Use un correo válido."
                    : ""}
                </span>
              </label>
              </div>
              

              {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
              <button
                className={
                  "w-full block btn-secondary hover:bg-blue-500 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 " +
                  (incluye(errorDatosInput.correo, "error")
                    ? "btn-disabled"
                    : " ")
                }
                onClick={handlePasswordOlvidada}
              >
                Enviar
              </button>
              <hr className="my-6 border-gray-300 w-full" />
              {datos ? (
                <div className="grid place-items-center">
                  <div
                    id="toast-danger"
                    className="flex items-center p-4 mb-4 w-full max-w-xs bg-green-300 rounded-lg shadow"
                    role="alert"
                  >
                    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-700 bg-green-300 rounded-lg">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Icono de error</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                      ¡Se envío un correo de verificación!
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {fetchError ? (
                <div className="grid place-items-center">
                  <div
                    id="toast-danger"
                    className="flex items-center p-4 mb-4 w-full max-w-xs bg-red-200 rounded-lg shadow"
                    role="alert"
                  >
                    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-200 rounded-lg">
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
                      Ocurrió un error.
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <p className="text-sm font-light text-gray-500">
                ¿Ya tienes una cuenta?{" "}
                <a
                  onClick={() => router.push("/login")}
                  className="link link-secondary font-medium text-primary-600 hover:underline"
                >
                  Inicia sesión
                </a>
              </p>
            </div>
          </div>
          <div className="grid place-items-center">
            <button
              onClick={() => router.push("/")}
              className="btn btn-ghost btn-lg mt-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              &nbsp;Volver al Inicio
            </button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
