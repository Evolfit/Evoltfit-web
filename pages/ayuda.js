import Head from "next/head";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";
import {useEffect, useState} from 'react';
import { useRouter} from "next/router";

export default function Home() {

  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    localStorage.setItem('bandera', 'false');
  }, [])

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const { data, error }  = await supabase
    .from("formulario")
    .insert({
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    })

    if(error){
      //console.log("ERROR: Hubo un error al registrar algo del formulario")
      //console.log(error)
    }else{
      //console.log("Se envío el formulario de ayuda correctamente")
      alert("Enviado correctamente")
      e.target.reset()
    }

  };

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Ayuda</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <br />
        <br />
        <br />
        <br />

        <section className="bg-white">
          <div className="container px-6 py-12 mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
                Preguntas frecuentes.
              </h1>
            
            <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
              <div>
                
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                
                <div>
                  
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Cómo puedo obtener una rutina de entrenamiento personalizada?
                    </h1>
                  

                  
                    <p className="mt-2 text-sm text-gray-500">
                    Al registrarte y responder algunas preguntas sobre tus objetivos de acondicionamiento físico, nivel de condición física actual y preferencias de entrenamiento, nuestro sistema experto generará una rutina de ejercicios personalizada para ti.
                    </p>
                  
                </div>
              </div>

              <div>
                
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                

                <div>
                 
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Cómo puedo hacer un seguimiento de mi consumo de calorías diarias?
                    </h1>
                 

                  
                    <p className="mt-2 text-sm text-gray-500">
                    Nuestro sistema contador de calorías te permitirá registrar tus comidas y hacer un seguimiento de tu consumo diario de calorías.
                    </p>
                 
                </div>
              </div>

              <div>
                
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                

                <div>
                  
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Puedo personalizar mi propia rutina de entrenamiento?
                    </h1>
                  
                  
                    <p className="mt-2 text-sm text-gray-500">
                    Sí, en nuestra sección de personalización de rutinas, puedes crear y personalizar tu propia rutina de entrenamiento según tus preferencias.
                    </p>
                  
                </div>
              </div>

              <div>
               
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
               

                <div>
                  
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Cómo puedo utilizar la biblioteca de ejercicios en la página web?
                    </h1>
                  
                  
                    <p className="mt-2 text-sm text-gray-500">
                    Puedes utilizar nuestra biblioteca de ejercicios para buscar y aprender más sobre diferentes ejercicios de entrenamiento de fuerza y acondicionamiento físico.
                    </p>
                  
                </div>
              </div>

              <div>
               
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
               

                <div>
                 
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Es seguro proporcionar mi información personal en la página web?
                    </h1>
                 
                 
                    <p className="mt-2 text-sm text-gray-500">
                    Sí, tomamos muy en serio la privacidad y seguridad de la información de nuestros usuarios y utilizamos medidas de seguridad para proteger sus datos personales.
                    </p>
                 
                </div>
              </div>

              <div>
              
                  <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                

                <div>
                  
                    <h1 className="text-xl font-semibold text-gray-700">
                    ¿Qué ventajas ofrece la suscripción en tu página web?
                    </h1>
                  
                  
                    <p className="mt-2 text-sm text-gray-500">
                    La suscripción en nuestra página web ofrece ventajas adicionales que te ayudarán a alcanzar tus objetivos de acondicionamiento físico de manera más fácil y eficiente, incluyendo una experiencia de usuario mejorada y mayor comodidad. Obtén el máximo provecho de nuestra plataforma y el apoyo que necesitas para alcanzar tus objetivos de acondicionamiento físico con una suscripción. Explora nuestras opciones de suscripción para obtener más información.
                    </p>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />

        <section className="min-h-screen bg-cover bg-internal-img2">
          <div className="flex flex-col min-h-screen bg-black/60">
            <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
              <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
                <div className="text-white lg:w-1/2 lg:mx-6">
                  <h1 className="text-3xl font-semibold capitalize lg:text-4xl">
                    Contáctanos
                  </h1>

                  <p className="max-w-xl mt-6">
                    Ayúdanos a mejorar la plataforma dándonos tu opinión sobre tu experiencia al usarla.
                    Siéntete libre de expresar tu opinión, de esta manera nos ayudas a seguir creciendo
                    como desarrolladores y poder darte la mejor experiencia posible.
                  </p>

                  <div className="mt-6 md:mt-8">
                    <h3 className="text-gray-300 ">Síguenos</h3>

                    <div className="flex mt-4 -mx-1.5 ">
                      <a
                        className="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      <a
                        className="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      <a
                        className="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="w-10 h-10 fill-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                        </svg>
                      </a>

                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:w-1/2 lg:mx-6">
                  <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl lg:max-w-xl">
                    <h1 className="text-2xl font-medium text-gray-700">
                      Formulario de contacto
                    </h1>

                    <p className="mt-4 text-gray-500">
                      Pregúntanos y recomiéndanos lo que quieras.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6">
                      <div className="flex-1">
                        <label className="block mb-2 text-sm text-gray-600">
                          Nombre completo
                        </label>
                        <input
                          onChange={e => setNombre(e.target.value)}
                          name = "nombre"
                          type="text"
                          placeholder="John Doe"
                          className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="flex-1 mt-6">
                        <label className="block mb-2 text-sm text-gray-6000">
                          Dirección de correo
                        </label>
                        <input
                          onChange={e => setCorreo(e.target.value)}
                          name = "correo"
                          type="email"
                          placeholder="johndoe@ejemplo.com"
                          className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="w-full mt-6">
                        <label className="block mb-2 text-sm text-gray-600">
                          Mensaje
                        </label>
                        <textarea
                          onChange={e => setMensaje(e.target.value)}
                          name = "mensaje"
                          className="block w-full h-32 px-5 py-3 mt-2 textform text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                          placeholder="Mensaje"
                        ></textarea>
                      </div>

                      <button onClick={() => {router.push("/ayuda")}} className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                        Enviar
                      </button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
