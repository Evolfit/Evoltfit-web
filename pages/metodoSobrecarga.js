import Head from "next/head";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import Typed from "react-typed";

export default function MetodoSobrecarga() {
  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Sobrecarga progresiva</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <br />
      <br />
      <main>
        <section className="h-full bg-cover bg-internal-img5">
          <div className="flex flex-col min-h-screen bg-blue-600/30">
            <div className=" mt-32 lg:mt-0 container flex flex-col flex-1 px-6 py-12 mx-auto">
              <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
                <div className="text-white lg:w-1/2 lg:mx-6">
                  <p className="text-7xl xl:text-9xl font-bebas tracking-widest">
                    Inside the Gym:
                  </p>
                </div>
                <div className="lg:w-1/2 lg:mx-6">
                  <Typed
                    strings={["Sobrecarga progresiva"]}
                    typeSpeed={150}
                    backSpeed={100}
                    className="text-6xl xl:text-8xl font-bebas animate-pulse tracking-widest text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <h1 className="text-center mb-12 text-zinc-700 font-catamaran  xl:mb-14 text-3xl xl:text-5xl ">
         {" Conoce el método de sobrecarga progresiva"}
        </h1>
        <div className="grid place-items-center">
          <div className="w-9/12">
            <p className="text-center font-heebo text-base xl:text-lg">
              {"El entrenamiento de sobrecarga progresiva trata de cargar más peso o incluir más series en tu entrenamiento de manera gradual, para desafiar los límites de tu cuerpo. Si hablamos de entrenamiento de fuerza, utilizaríamos cada vez más peso para obligar a nuestro músculos a fortalecerse y ser más resistentes. Este principio puede aplicarse a cualquier tipo de ejercicio, aunque normalmente se utiliza en los entrenamientos de musculación o resistencia."}
            </p>
          </div>
        </div>
        <br></br>
        <section className = "-mb-14">
          <div className="container px-6 py-12 mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div>
              <svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
						  </svg>
                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                 {" Aumenta la resistencia"}
                </h1>

                <p className="mt-2 text-gray-500 font-heebo">
                {"Al añadir más estrés a los músculos, provocamos que las fibras musculares se rompan y se reconstruyan, y por consecuencia, se fortalezcan. No obstante, antes de aumentar el peso en los ejercicios, asegúrate de que puedas levantar ese peso de manera cómoda durante al menos unas 10 o 12 repeticiones."}
                </p>
              </div>

              <div>
              <svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
						  </svg>
                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                {"Añade más repeticiones"}
                </h1>

                <p className="mt-2 text-gray-500 font-heebo">
                {" Aumentar el peso no es la única manera de entrenar con sobrecarga progresiva. También podemos lograrlo aumentando la cantidad de repeticiones; de esta manera, a los músculos se les exige cada vez más y pueden volverse más fuertes con el tiempo y la práctica. "}
                </p>
              </div>

              <div>
              <svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
						  </svg>

                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                 {"Aumenta el volumen"}
                </h1>

                <p className="mt-2 text-gray-500 font-heebo">
               {"Además de incrementar la cantidad de repeticiones, también puedes hacerlo con el número de series que realizas. Si haces tres series de 10 repeticiones de un ejercicio, prueba a pasar a cuatro series de 10 repeticiones. "}
                </p>
              </div>
            </div>
          </div>
        </section>
       
        <section>
          <div className="container px-6 py-12 mx-auto ">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              <div>
              <svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
						  </svg>

                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                 {" Reduce el tiempo de descanso"}
                </h1>

                <p className="mt-2 text-gray-500 font-heebo">
                {"El tiempo de descanso puede variar según tus objetivos. Al reducirlo, aumentamos la intensidad de nuestros entrenamientos, lo que puede ayudarnos a obtener resultados más rápido. No obstante, si vas a disminuir el tiempo de descanso, hazlo empleando menos peso y a un ritmo más rápido."}
                </p>
              </div>

              <div>
              <svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
						  </svg>

                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                 {" Aumenta la frecuencia"}
                </h1>

                <p className="mt-2 text-gray-500 font-heebo">
                {"Por último, quizás la manera más sencilla de aplicar la sobrecarga progresiva es aumentando la frecuencia de nuestros entrenamientos. Si te acostumbras a saltarte días de entrenamiento o entrenas pocos días a la semana, puede que en algún momento tu rendimiento se vea estancado."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto py-2 flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center text-center px-16 w-2/2 lg:w-1/2">
              <h2 className="text-3xl font-bold mb-5">{"¿Cuál es un buen momento para intensificar los ejercicios?"}</h2>
              <p className = "font-heebo">
              {"Antes de aumentar el nivel de dificultad, asegúrate de que tu cuerpo está bien preparado para añadir más repeticiones y más peso en las series. Si aumentas el nivel de dificultad demasiado rápido, afectará negativamente al ejercicio. La ejecución correcta del ejercicio debe estar siempre en primer plano; si no, aumenta el riesgo de lesión, algo que no será beneficioso ni para ti ni para tus músculos."}
              </p>
            </div>

            <div className="w-0 lg:w-1/2">
              <img
                className="skew-y-6 invisible lg:w-full xl:visible"
                src="preguntasSobrecarga.jpg"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto py-2 flex flex-col lg:flex-row">
            <div className="w-0 lg:w-1/2">
              <img
                className="-skew-y-6 invisible lg:w-full lg:visible"
                src="preguntasSobrecarga2.jpg"
              />
            </div>

            <div className="flex flex-col justify-center text-center px-16 w-2/2 lg:w-1/2">
              <h2 className="text-3xl font-bold mb-5">{"¿Cuál es la prioridad: más peso o más repeticiones?"}</h2>
              <p className = "font-heebo">
              {"Para los principiantes, el número de repeticiones prima sobre la intensidad. Si eres principiante, aumenta el rango de repeticiones o la frecuencia de los entrenamientos antes de aumentar el peso. Si tu nivel es más bien avanzado, generalmente no es posible aumentar el volumen de repeticiones, por lo que conviene aumentar la intensidad del entrenamiento."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
