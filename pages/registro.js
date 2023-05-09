import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
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

      //VALIDACION INPUT NOMBRE
      if (name == "nombre") {
        var error = ["control"];

        if (value == '') {
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
  const handleRegistro = async () => {
    if (
      formInput.correo != undefined &&
      formInput.correo != '' &&
      formInput.nombre != undefined &&
      formInput.nombre != '' &&
      formInput.password != undefined &&
      formInput.password != '' &&
      formInput.confirmarPassword != undefined &&
      formInput.confirmarPassword != ''
      ) 
      {
      
        const avatar = createAvatar(micah, {
          seed: formInput.nombre,
          baseColor: ["f7bba3"],
          earringsProbability: 0,
          eyebrows: ["down","up"],
          facialHairProbability: 0,
          glassesProbability: 0,
          eyes: ["eyes","round","smiling"],
          hair: ["dannyPhantom"],
          hairColor: ["000000","d2eff3", "e0ddff", "f9c9b6", "ffedef", "ffffff","fc909f"],
          mouth: ["laughing", "nervous", "pucker", "smile", "smirk", "surprised"]
        });
        
        const avatarSvg = await avatar.toDataUri();
        //console.log(avatarSvg);

        const { data, error } = await supabase.auth.signUp({
          email: formInput.correo,
          password: formInput.password,
          options: {
            data: {
              nombre: formInput.nombre,
            }
          }
        });

        if (error) {
          setDatos(null);
          setMostrarAviso(true)
          //console.log("Error: " + error);

          setFetchError("Hubo un error, favor de intentarlo mas tarde.");
          setMensajeAviso('Error al conseguir datos');
          setColorAviso('red');
        } 
        else {
          
          
          const { error } = await supabase
          .from('perfiles')
          .insert({
            id: data.user.id, 
            nombre: formInput.nombre,
            avatar: avatarSvg
            })

            if(error) {
              setFetchError("Error al conseguir datos");
              //console.log(error)

              setMensajeAviso('Hubo un error, esta cuenta ya existe.');
              setColorAviso('red');
              setMostrarAviso(true)
            }
            else{
              //console.log("Registro exitoso :)");
              setFetchError(null);
              setDatos(data);


              setMensajeAviso('¡Se envío un correo de verificación!');
              setColorAviso('green');
              setMostrarAviso(true)
            }
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
    <div className="bg-stone-100" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
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
          <div className=" bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full h-100">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Registro
              </h1>

              <div className="mt-6">
                <div>
                  <label className="block text-gray-700">
                    Nombre
                  </label>
                  {/*CAMPO CORREO ---------------------------- */}
                  <input
                    name="nombre"
                    value={formInput.nombre || ""}
                    onChange={handleOnInputChange}
                    type="text"
                    className={
                      "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white " +
                      (incluye(errorDatosInput.nombre, "control")
                        ? incluye(errorDatosInput.nombre, "error")
                          ? "input-error"
                          : "input-success"
                        : " ")
                    }
                    placeholder="Ingresar su nombre"
                  />
                </div>
          
                <div className="mt-8">
                  <label className="block text-gray-700">
                    Correo electrónico
                  </label>
                  {/*CAMPO CORREO ---------------------------- */}
                  <input
                    name="correo"
                    value={formInput.correo || ""}
                    onChange={handleOnInputChange}
                    type="text"
                    className={
                      "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white " +
                      (incluye(errorDatosInput.correo, "control")
                        ? incluye(errorDatosInput.correo, "error")
                          ? "input-error"
                          : "input-success"
                        : " ")
                    }
                    placeholder="Ingresar correo electrónico"
                  />
                </div>
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

                <div className={incluye(errorDatosInput.correo, "error")
                      ? "mt-0"
                      : "mt-4"}>
                  <label className="block text-gray-700">Contraseña</label>
                  {/*CAMPO CONTRASEÑA ------------------------ */}
                  <input
                    name="password"
                    value={formInput.password || ""}
                    onChange={handleOnInputChange}
                    type="password"
                    className={
                      "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white " +
                      (incluye(errorDatosInput.password, "control")
                        ? incluye(errorDatosInput.password, "error")
                          ? "input-error"
                          : "input-success"
                        : " ")
                    }
                    placeholder="Ingresar contraseña"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt">
                    {
                      //(incluye(errorDatosInput.correo, "error")  ? "Use una dirección de correo válida." : "")
                    }
                  </span>
                  <span className="label-text-alt text-sm font-light text-red-500">
                    {incluye(errorDatosInput.password, "error")
                      ? "La contraseña es demasiado corta"
                      : ""}
                  </span>
                </label>

                <div className={incluye(errorDatosInput.password, "error")
                      ? "mt-0"
                      : "mt-4"}>
                  <label className="block text-gray-700">
                    Confirmar contraseña
                  </label>
                  {/*CAMPO CONFIRMAR CONTRASEÑA -------------- */}
                  <input
                  name="confirmarPassword"
                  value={formInput.confirmarPassword || ""}
                  onChange={handleOnInputChange}
                  type="password"
                  className={
                    "w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white " +
                    (incluye(errorDatosInput.confirmarPassword, "control")
                      ? incluye(errorDatosInput.confirmarPassword, "error")
                        ? "input-error"
                        : "input-success"
                      : " ")
                  }
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt">
                  
                  </span>
                  <span className="label-text-alt text-sm font-light text-red-500">
                    {incluye(errorDatosInput.confirmarPassword, "error")
                      ? "Las contraseñas no coinciden."
                      : ""}
                  </span>
                </label>
                <button
                  className={
                    "w-full block btn-secondary hover:bg-blue-500 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 " +
                    (incluye(errorDatosInput.correo, "control")
                      ? incluye(errorDatosInput.correo, "error") ||
                        incluye(errorDatosInput.password, "error") ||
                        incluye(errorDatosInput.confirmarPassword, "error") ||
                        incluye(errorDatosInput.nombre, "error") ||
                        (formInput.confirmarPassword == '' || formInput.confirmarPassword == undefined)
                        ? "btn-disabled"
                        : " "
                      : " ")
                  }
                  onClick={handleRegistro}
                >
                  Registrarse
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
                 Ocurrio un error.
               </div>
             </div>
             </div>
          ) : (
            datos ? (
            <div className = "grid place-items-center">
              <div
                id="toast-danger"
                className="flex items-center p-4 mb-4 w-full max-w-xs bg-green-300 rounded-lg shadow"
                role="alert"
              >
                <div className = "inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-700 bg-green-300 rounded-lg">
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
                  <span className="sr-only">Icono de todo correcto</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  ¡Se envío un correo de verificación!
                </div>
              </div>
            </div>
          )
          :
          ""
          )
          }

              <p className="">
                {"¿Ya tienes una cuenta? " }
                <a
                  onClick={() => router.push("/login")}
                  className="link link-secondary text-blue-500 hover:text-blue-700 font-semibold"
                >
                  {"Inicia sesión"}
                </a>
              </p>
            </div>
          </div>
          <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img
              src="regimg.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>
      <br/>
      <br/>
      <br/>
      <Footer />
    </div>
  );
}
