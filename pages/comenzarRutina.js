import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";
import CardEjercicioEntrenamiento from "/components/CardEjercicioEntrenamiento";
import Cronometro from "/components/Cronometro";

export default function ComenzarRutina() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [tiempo, setTiempo] = useState(0);
  const [pausaTiempo, setPausaTiempo] = useState(true);
  const [comenzarEntrenamiento, setComenzarEntrenamiento] = useState(false);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([])
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(0)

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    handleSesion()
  }, [])

  const handleSesion = async () => {

    if (!rutinaIndex) {
      router.push('/rutinas')
    }

    const { data, error } = await supabase.auth.getSession()

    if(data.session){
      setSesion(data.session);
      getRutina();
      //console.log(data);
    } 
    else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      router.push('/login')
    }
  }

  async function getRutina() {
    //console.log(rutinaIndex)
    
    const { data, error } = await supabase
    .from('rutinas')
    .select(`
    *,
    rutina_en_progreso(*)
    `)
    .eq('id', rutinaIndex)

    if (error) {
      console.log('ERROR: No se encontró la rutina.')
      console.log(error)
    }
    else{
      setRutina(data[0]);
      //console.log(data[0])

      if (data[0].rutina_en_progreso.length === 0) {
        getEjerciciosRutina();
      }
      else{
        setEjerciciosRutina(data[0].rutina_en_progreso[0].ejerciciosRutina);
        setTiempo(data[0].rutina_en_progreso[0].tiempo)
        setEjercicioSeleccionado(data[0].rutina_en_progreso[0].ejercicioSeleccionado)
        setComenzarEntrenamiento(true)
      }
    } 
  }
  
  async function agregarSet(indexEjercicio) {
    let cantSets = ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets.length;

    let temp = {
      id: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[cantSets-1].id + 1,
      ejercicio_rutina: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].ejercicio_rutina,
      reps: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].reps,
      tipo: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].tipo,
      estado: ''
    }
    console.log(temp.id)

    let newState = [...ejerciciosRutina];
    let array = newState[indexEjercicio].rutinas_ejercicio_sets;
    array.push(temp);

    newState[indexEjercicio] = {... newState[indexEjercicio],
      rutinas_ejercicio_sets: array
    }

    updateRutinaEnProgreso()
  }

  function updateSet(indexSet, indexEjercicio, set, estado) {
    let newState = [...ejerciciosRutina];
    let array = newState[indexEjercicio].rutinas_ejercicio_sets;
    
    array[indexSet].reps = set.reps;
    array[indexSet].tipo = set.tipo;
    array[indexSet].peso = set.peso;
    array[indexSet].estado = estado;

    newState[indexEjercicio] = {... newState[indexEjercicio],
      rutinas_ejercicio_sets: array
    }

    updateRutinaEnProgreso()
    console.log(newState);
  }

  async function getEjerciciosRutina() {
    const { data, error } = await supabase
    .from('rutinas_ejercicio')
    .select(`
      id,
      ejercicio (
        id,
        nombre,
        musculo_primario,
        img
      ),
      rutinas_ejercicio_sets (
        *
      ),
      orden,
      descanso
    `)
    .eq('rutina', rutinaIndex)
    .order('id', { foreignTable: 'rutinas_ejercicio_sets', ascending: true })

    if (error) {
      console.log('ERROR: Hubo un error al recuperar los ejercicios.')
      console.log(error)
    }
    else{
      //console.log(data);
      setEjerciciosRutina(data);
    }
  }

  async function updateRutinaEnProgreso() {
    const { data, error } = await supabase
    .from('rutina_en_progreso')
    .upsert({ 
      rutina: rutinaIndex, 
      ejerciciosRutina: ejerciciosRutina, 
      tiempo: tiempo,
      ejercicioSeleccionado: ejercicioSeleccionado,
      last_update: ((new Date()).toISOString())
    })

    if (error) {
      console.log('ERROR: No se pudo actualizar la rutina en progreso.')
      console.log(error)
    }
    else{
      console.log('Se actualizó la rutina en progreso.')
      //console.log(data)
    }
  }

  function ejercicioAnterior() {
    if (ejercicioSeleccionado > 0) {
      setEjercicioSeleccionado(ejercicioSeleccionado - 1)
    }
    else{
      setEjercicioSeleccionado(ejerciciosRutina.length - 1)
    }
    updateRutinaEnProgreso()
  }

  function ejercicioSiguiente() {
    if (ejercicioSeleccionado < (ejerciciosRutina.length - 1)) {
      setEjercicioSeleccionado(ejercicioSeleccionado + 1)
    }
    else{
      setEjercicioSeleccionado(0)
    }
    updateRutinaEnProgreso()
  }

  return (
    <div className="bg-stone-100 w-full z-0" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <div>          
          {
            rutina ? 
            <div className={"mx-auto mt-2 "}>
              <div className="flex flex-col w-11/12 xl:w-9/12 mx-auto">
                <div>
                  <button className="btn btn-ghost m-0 px-2 text-lg" onClick={() => {router.push('/rutinas')}}>
                    <div className='text-3xl mt-auto'>
                      <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <span className="ml-2">{"Volver a Rutinas"}</span>
                  </button>
                  <br/>
                  <div className="flex flex-row items-center justify-center">
                    <h2 className="flex-auto text-3xl text-gray-900">{rutina.nombre}</h2>
                    <div className="w-28">
                      <span>Tiempo: </span>
                      <Cronometro
                        pausaTiempo={pausaTiempo}
                        setTiempo={setTiempo}
                        tiempo={tiempo}
                      />
                    </div>
                  </div>
                  { ejerciciosRutina.length === 0 ? 
                      ''
                    :
                      !pausaTiempo ? 
                        <div className="my-12">
                          <div className="flex flex-row my-2">
                            <button 
                            className="bg-white rounded-lg shadow-md my-2 p-4 hover:bg-gray-50 duration-75 active:bg-blue-50 active:p-3.5"
                            onClick={ejercicioAnterior}
                            >
                              {'<'}
                            </button>
                              <CardEjercicioEntrenamiento
                                key={ejerciciosRutina[ejercicioSeleccionado].id}
                                ejercicio={ejerciciosRutina[ejercicioSeleccionado]}
                                updateSet={updateSet}
                                ejercicioSeleccionado={ejercicioSeleccionado}
                                agregarSet={agregarSet}
                              />
                            <button 
                            className="bg-white rounded-lg shadow-md my-2 p-4 hover:bg-gray-50 duration-75 active:bg-blue-50 active:p-3.5"
                            onClick={ejercicioSiguiente}
                            >
                              {'>'}
                            </button>
                          </div>
                          <div className='flex flex-col justify-center items-center lg:flex-row w-full'>
                            <button onClick={() => {setPausaTiempo(!pausaTiempo)}} className="flex-auto btn text-white btn-secondary rounded-lg btn-md mx-1 my-1 w-full duration-75 lg:my-0 active:bg-blue-800">
                              {
                              pausaTiempo ?
                              'Reanudar Entrenamiento'
                              :
                              'Pausar Entrenamiento'
                              }
                            </button>
                            <button onClick={() => {}} className="flex-auto  btn text-white btn-success rounded-lg btn-md mx-1 my-1 w-full lg:my-0">Finalizar</button>
                          </div>  
                        </div>
                      :
                        <div className="flex items-center justify-center my-12">
                          <button onClick={() => {
                            setPausaTiempo(!pausaTiempo)
                            setComenzarEntrenamiento(true)
                            }} 
                            className="flex-auto btn text-white btn-secondary rounded-lg btn-md mx-1 my-1 w-full duration-75 lg:my-0 active:bg-blue-800 text-2xl h-20"
                          >
                              {
                              pausaTiempo ?
                                comenzarEntrenamiento ?
                                'Reanudar Entrenamiento'
                                :
                                'Comenzar Entrenamiento'
                              :
                              'Comenzar Entrenamiento'
                              }
                            </button>
                        </div>
                  }             
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                {/* Aqui se muestran las rutinas */}
              </div>
            </div> 
            : 
            <div className="mt-12">
              <div className="loader mt-6"></div>
            </div>
          }
        </div>
        <br />
      </main>

      <br />

      <Footer></Footer>
    </div>
  );
}
