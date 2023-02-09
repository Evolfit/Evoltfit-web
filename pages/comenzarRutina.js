import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";
import RowSetsComenzar from "/components/RowSetsComenzar";

export default function ComenzarRutina() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [tiempo, setTiempo] = useState(0);
  const [pausaTiempo, setPausaTiempo] = useState(true);
  const [comenzarEntrenamiento, setComenzarEntrenamiento] = useState(false);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([])
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);
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
      console.log(data[0])
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
    let query = supabase
    .from('rutinas_ejercicio_sets')
    .select('id')
    .order('id', { ascending: false })
    .limit(1)

    const count = await query
    
    let temp = {
      id: (count.data[0].id * indexEjercicio) + ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets.length,
      ejercicio_rutina: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].ejercicio_rutina,
      reps: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].reps,
      tipo: ejerciciosRutina[indexEjercicio].rutinas_ejercicio_sets[0].tipo,
      estado: ''
    }

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
      console.log(data);
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

  const Cronometro = () => {
    useEffect(() => {
      let interval;
      if (!pausaTiempo) {
        interval = setInterval(() => {
          setTiempo((prevTime) => prevTime + 10);
        }, 10);
      } else if (!pausaTiempo) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [pausaTiempo]);
    return (
      <div className="stopwatch">
        <div className="numbers text-2xl">
          <span>{("0" + Math.floor((tiempo / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((tiempo / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((tiempo / 10) % 100)).slice(-2)}</span>
        </div>
        {/*
        <div className="buttons">
          <button onClick={() => setPausaTiempo(true)}>Start</button>
          <button onClick={() => setPausaTiempo(false)}>Stop</button>
          <button onClick={() => setTiempo(0)}>Reset</button>       
        </div>
        */}
      </div>
    );
  };

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
            <Fragment>
              <div className={"mx-auto mt-2 " + (toggleSeleccionar ? 'blur-sm' : '')}>
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
                              <div className="flex-auto bg-white rounded-lg shadow-md my-2 p-6 mx-2">
                                
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center">
                                <div 
                                className='relative rounded-full overflow-hidden h-16 w-16 sm:h-20 sm:w-20 border-2 mb-2 border-blue-500 hover:border-4 cursor-pointer duration-100'
                                onClick={() => {
                                    router.push({
                                    pathname: '/detalleEjercicio',
                                    query: { ejercicio: ejerciciosRutina[ejercicioSeleccionado].ejercicio.id }
                                  })}}
                                >
                                    <Image className='rounded-full' src={ejerciciosRutina[ejercicioSeleccionado].ejercicio.img} layout='fill' objectFit="cover"/>
                                </div>
                                <div className="flex-auto sm:w-0 ml-0 sm:ml-4 w-full">
                                    <p 
                                    className="mr-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer 
                                    hover:text-blue-800 duration-150
                                    whitespace-nowrap text-ellipsis overflow-hidden"
                                    onClick={() => {
                                        router.push({
                                        pathname: '/detalleEjercicio',
                                        query: { ejercicio: ejerciciosRutina[ejercicioSeleccionado].ejercicio.id }
                                      })}}
                                    >
                                        {(ejercicioSeleccionado + 1) + ' - ' + ejerciciosRutina[ejercicioSeleccionado].ejercicio.nombre}
                                    </p>
                                    <p className="mb-2 font-normal text-lg sm:text-xl text-gray-700">{ejerciciosRutina[ejercicioSeleccionado].ejercicio.musculo_primario}</p>
                                </div>
                              </div>
                                {/*Tabla de sets*/}
                                <div className="relative overflow-x-auto">
                                  <table className="w-full text-sm text-left my-4">
                                      <thead className="border-b-2">
                                          <tr>
                                              <th scope="col" className="text-center text-lg p-2">Set</th>
                                              <th scope="col" className="text-center text-lg p-2 border-l-2 border-r-2">Tipo</th>
                                              <th scope="col" className="text-center text-lg p-2 border-l-2 border-r-2">Reps</th>
                                              <th scope="col" className="text-center text-lg p-2 border-l-2">{'Peso (lbs)'}</th>
                                              <th scope="col" className="text-lg p-2"></th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                      {ejerciciosRutina[ejercicioSeleccionado].rutinas_ejercicio_sets.map((set, index) => (
                                          <RowSetsComenzar
                                              key={set.id}
                                              set={set}
                                              index={index}
                                              updateSet={updateSet}
                                              indexEjercicio={ejercicioSeleccionado}
                                          />
                                      ))
                                      }
                                      <tr>
                                        <td className="p-2"></td>
                                        <td className="p-2"></td>
                                        <td className="p-2"></td>
                                        <td className="p-2"></td>
                                        <td 
                                        className="text-center py-2"
                                        onClick={() => agregarSet(ejercicioSeleccionado)}
                                        >
                                            <div className="flex items-center justify-center f-full w-full">
                                                <div className="flex items-center justify-center p-1 text-2xl cursor-pointer text-white rounded-md bg-blue-500
                                                hover:bg-blue-600 duration-100 active:scale-95">
                                                    <ion-icon name="add-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </div>
                              </div>
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
              { 
                toggleSeleccionar ? 
                <SeleccionarEjercicio
                agregarEjercicio={agregarEjercicio}
                setToggleSeleccionar={setToggleSeleccionar}
                /> 
                : '' }
            </Fragment>
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
