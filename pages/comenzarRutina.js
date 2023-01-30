import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import CardEjercicio from "/components/CardEjercicio";
import SeleccionarEjercicio from "/components/SeleccionarEjercicio";
import supabase from "../config/supabaseClient";

export default function ComenzarRutina() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [tiempo, setTiempo] = useState(0);
  const [pausaTiempo, setPausaTiempo] = useState(true);
  const [comenzarEntrenamiento, setComenzarEntrenamiento] = useState(false);
  const [formInput, setFormInput] = useState();
  const [ejerciciosRutina, setEjerciciosRutina] = useState([])
  const [ordenEjercicios, setOrdenEjercicios] = useState([])
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(0)

  useEffect(() => {
    //console.log("useEffect")
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
    .select('*')
    .eq('id', rutinaIndex)

    if (error) {
      console.log('ERROR: No se encontró la rutina.')
      console.log(error)
    }
    else{
      setRutina(data[0]);
      setFormInput({
        nombre: data[0].nombre
      })
      
      getEjerciciosRutina();
      //console.log(data[0])
    }
  }

  async function updateRutina(nombre) {
    //console.log(rutinaIndex)
    let temp;

    if (nombre == ''){
      temp = 'Rutina sin nombre'
    }
    else{
      temp = nombre
    }

    const { error } = await supabase
    .from('rutinas')
    .update({ nombre: temp})
    .eq('id', rutinaIndex)

    if (error) {
      console.log('ERROR: No se pudo actualizar la rutina.')
      console.log(error)
    }
    else{
      console.log('Rutina Actualizada.')
      //console.log(data[0])
    }
  }

  async function updateOrdenEjercicios(ordenEjercicios) {
    const { data, error } = await supabase
    .from('rutinas_ejercicio')
    .upsert(ordenEjercicios)

    if (error) {
      console.log('ERROR: No se pudo actualizar el orden de los ejercicios.')
      console.log(error)
    }
    else{
      //console.log('Orden de los ejercicios actualizado.')
      //console.log(data)
    }
  }

  async function eliminarRutina() {
    const { error } = await supabase
    .from('rutinas')
    .delete()
    .match({id: rutina.id, usuario: sesion.user.id})

    if (error) {
      console.log('ERROR: Error al eliminar la rutina.')
      console.log(error)
    }
    else{
      //console.log('Se eliminó ' + rutina.nombre)
      router.push('/rutinas')
    }
  }

  async function getEjerciciosRutina() {
    const { data, error } = await supabase
    .from('rutinas_ejercicio')
    .select(`
      id,
      ejercicio (
        nombre,
        musculo_primario,
        img
      ),
      sets,
      reps,
      orden
    `)
    .eq('rutina', rutinaIndex)
    .order('orden', { ascending: true })

    if (error) {
      console.log('ERROR: Hubo un error al recuperar los ejercicios.')
      console.log(error)
    }
    else{
      console.log(data);
      setEjerciciosRutina(data);
    }
  }

  async function agregarEjercicio(idEjercicio) {
    const { data, error } = await supabase
      .from('rutinas_ejercicio')
      .insert({
        rutina: rutinaIndex, 
        ejercicio: idEjercicio,
        orden: ejerciciosRutina.length,
        })
      .select(`
        id,
        ejercicio (
          nombre,
          musculo_primario,
          img
        ),
        sets,
        reps,
        orden
      `)

    setToggleSeleccionar(false);

    if (error) {
      console.log(error)
      console.log("ERROR: Hubo un error al agregar un nuevo ejercicio.")
    }
    else{
      console.log("Se agregó un nuevo ejercicio.")
      console.log(data[0])
      setEjerciciosRutina(current => [...current, data[0]]);
    }
  }

  async function agregarDescanso() {
    const { data, error } = await supabase
      .from('rutinas_ejercicio')
      .insert({
        rutina: rutinaIndex, 
        ejercicio: 222,
        orden: ejerciciosRutina.length,
        })
      .select(`
        id,
        ejercicio (
          nombre,
          musculo_primario,
          img
        ),
        sets,
        reps,
        orden
      `)

    setToggleSeleccionar(false);

    if (error) {
      console.log(error)
      console.log("ERROR: Hubo un error al agregar el descanso.")
    }
    else{
      console.log("Se agregó el descanso.")
      console.log(data[0])
      setEjerciciosRutina(current => [...current, data[0]]);
    }
  }

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked} = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      updateRutina(value)

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
    },
    [formInput, setFormInput]
  );

  function handleOnDragEnd(result) {
    //console.log(result)

    if (!result.destination) return;

    const items = Array.from(ejerciciosRutina);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    //console.log(items)

    const ordenEjercicios = [];
    for (let index = 0; index < items.length; index++) {
      const element = {
        id: items[index].id,
        rutina: rutinaIndex,
        orden: index
      };
      ordenEjercicios.push(element)
    }
    //console.log(ordenEjercicios)

    updateOrdenEjercicios(ordenEjercicios)
    setEjerciciosRutina(items)
  }

  function ejercicioAnterior() {
    if (ejercicioSeleccionado > 0) {
      setEjercicioSeleccionado(ejercicioSeleccionado - 1)
    }
    else{
      setEjercicioSeleccionado(ejerciciosRutina.length - 1)
    }
  }

  function ejercicioSiguiente() {
    if (ejercicioSeleccionado < (ejerciciosRutina.length - 1)) {
      setEjercicioSeleccionado(ejercicioSeleccionado + 1)
    }
    else{
      setEjercicioSeleccionado(0)
    }
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
                <div className="flex flex-col w-9/12 mx-auto">
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
                              className="bg-white rounded-lg shadow-md my-2 p-4 hover:bg-gray-100 duration-75 active:bg-blue-100 active:pl-3.5"
                              onClick={ejercicioAnterior}
                              >
                                {'<'}
                              </button>
                              <div className="flex-auto bg-white rounded-lg shadow-md my-2 p-4 mx-2">
                                <p className="text-xl font-semibold">{ejerciciosRutina[ejercicioSeleccionado].ejercicio.nombre}</p>
                                <p>{'Sets: ' + ejerciciosRutina[ejercicioSeleccionado].sets}</p>
                                <p>{'Reps: ' + ejerciciosRutina[ejercicioSeleccionado].reps}</p>
                              </div>
                              <button 
                              className="bg-white rounded-lg shadow-md my-2 p-4 hover:bg-gray-100 duration-75 active:bg-blue-100 active:pr-3.5"
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
