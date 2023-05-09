import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import CardEjercicio from "/components/CardEjercicio";
import SeleccionarEjercicio from "/components/SeleccionarEjercicio";
import EliminarConfirmar from "/components/EliminarConfirmar";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [formInput, setFormInput] = useState();
  const [ejerciciosRutina, setEjerciciosRutina] = useState([])
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

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
      ////console.log(data);
    } 
    else {
      setSesion(null);
      ////console.log("No hay Sesión " + error);
      router.push('/login')
    }
  }

  async function getRutina() {
    ////console.log(rutinaIndex)
    
    const { data, error } = await supabase
    .from('rutinas')
    .select('*')
    .eq('id', rutinaIndex)

    if (error) {
      //console.log('ERROR: No se encontró la rutina.')
      //console.log(error)
    }
    else{
      setRutina(data[0]);
      setFormInput({
        nombre: data[0].nombre
      })
      
      getEjerciciosRutina();
      ////console.log(data[0])
    }
  }

  async function updateRutina(nombre) {
    ////console.log(rutinaIndex)
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
      //console.log('ERROR: No se pudo actualizar la rutina.')
      //console.log(error)
    }
    else{
      //console.log('Rutina Actualizada.')
      ////console.log(data[0])
    }
  }

  async function updateOrdenEjercicios(ordenEjercicios) {
    const { data, error } = await supabase
    .from('rutinas_ejercicio')
    .upsert(ordenEjercicios)

    if (error) {
      //console.log('ERROR: No se pudo actualizar el orden de los ejercicios.')
      //console.log(error)
    }
    else{
      ////console.log('Orden de los ejercicios actualizado.')
      ////console.log(data)
    }
  }

  async function eliminarRutina() {
    const { error } = await supabase
    .from('rutinas')
    .delete()
    .match({id: rutina.id, usuario: sesion.user.id})

    if (error) {
      //console.log('ERROR: Error al eliminar la rutina.')
      //console.log(error)
    }
    else{
      ////console.log('Se eliminó ' + rutina.nombre)
      router.push('/rutinas')
    }
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
      orden,
      descanso
    `)
    .eq('rutina', rutinaIndex)
    .order('orden', { ascending: true })

    if (error) {
      //console.log('ERROR: Hubo un error al recuperar los ejercicios.')
      //console.log(error)
    }
    else{
      //console.log(data);
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
          id,
          nombre,
          musculo_primario,
          img
        ),
        orden,
        descanso
      `)

    setToggleSeleccionar(false);

    if (error) {
      //console.log(error)
      //console.log("ERROR: Hubo un error al agregar un nuevo ejercicio.")
    }
    else{
      //console.log("Se agregó un nuevo ejercicio.")
      //console.log(data[0])

      setEjerciciosRutina(current => [...current, data[0]]);
      
      const { error } = await supabase
      .from('rutinas_ejercicio_sets')
      .insert({
        ejercicio_rutina: data[0].id, 
        reps: data[0].ejercicio.musculo_primario == 'Cardio' ? 60 : 12
        })

      if (error) {
        //console.log(error)
        //console.log("ERROR: Hubo un error al agregar un nuevo set.")
      }
      else{
        //console.log("Se agregó un nuevo set.")
        document.getElementById((data[0].orden + 1) + '.' + data[0].ejercicio.nombre).scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
      });
      }
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

      ////console.log(name + " | " + id + ": " + value + " -> " + checked);
    },
    [formInput, setFormInput]
  );

  function handleOnDragEnd(result) {
    ////console.log(result)

    if (!result.destination) return;

    const items = Array.from(ejerciciosRutina);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    ////console.log(items)

    const ordenEjercicios = [];
    for (let index = 0; index < items.length; index++) {
      const element = {
        id: items[index].id,
        rutina: rutinaIndex,
        orden: index
      };
      ordenEjercicios.push(element)
    }
    ////console.log(ordenEjercicios)

    updateOrdenEjercicios(ordenEjercicios)
    setEjerciciosRutina(items)
  }

  return (
    <div className="bg-stone-100 w-full" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="mt-24 relative min-h-[75vh]">

        <EliminarConfirmar
          mostrarEliminar={mostrarEliminar}
          setMostrarEliminar={setMostrarEliminar}
          mensaje={'¿Seguro que quieres eliminar ' + (formInput ? formInput.nombre : "") + '?'}
          funcEliminar={eliminarRutina}
        />
        
        <SeleccionarEjercicio
            toggleSeleccionar={toggleSeleccionar}
            agregarEjercicio={agregarEjercicio}
            setToggleSeleccionar={setToggleSeleccionar}
          /> 
    
        <div className="py-6">          
          {
            rutina ? 
            <div>
              <div className="flex flex-col w-11/12 md:w-9/12 mx-auto max-w-5xl">
                <div>
                  <button className="btn btn-ghost m-0 px-2 text-lg" onClick={() => {router.push('/rutinas')}}>
                    <div className='text-3xl mt-auto'>
                      <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <span className="ml-2">{"Volver a Rutinas"}</span>
                  </button>
                  <br/>
                  <input 
                    name="nombre" 
                    id="nombre" 
                    type="text" 
                    className="text-2xl py-2 sm:text-4xl px-2 sm:py-4 text-secondary my-2 w-full font-semibold bg-inherit border-b-2
                    outline-none border-blue-500 focus:border-b-4 duration-150  whitespace-nowrap text-ellipsis overflow-hidden text-center" 
                    value={formInput.nombre || ""} 
                    onChange={handleOnInputChange}
                  />
                  <br/>
                  {ejerciciosRutina.length === 0 ?
                    ''
                  :
                  <div className='flex flex-col justify-center items-center lg:flex-row w-full'>
                    <button onClick={() => {
                        setToggleSeleccionar(!toggleSeleccionar)
                        window.scrollTo(0, 0)
                        }
                      } 
                      className="flex-auto uppercase text-sm font-semibold text-white py-4 bg-blue-500 hover:bg-blue-600 rounded-lg mx-1 my-1 w-full lg:my-0 duration-75">
                      Agregar ejercicio
                    </button>
                  </div>
                  }
                  
                  { ejerciciosRutina.length === 0 ? 
                      ''
                    :
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="ejercicios">
                        {(provided) => (
                          <ul className="ejercicios" {...provided.droppableProps} ref={provided.innerRef}>
                            {ejerciciosRutina.map((ejercicio, index) => (
                              <Draggable key={ejercicio.id} draggableId={ejercicio.id.toString()} index={index}>
                                {(provided) => (
                                  <li className="my-2" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                      <CardEjercicio 
                                      rutinaEjercicio={ejercicio} 
                                      getEjerciciosRutina={getEjerciciosRutina}
                                      index={index}
                                      />
                                  </li>
                                )}
                              </Draggable>
                              ))
                            }
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  }
                  <div
                  className={'flex flex-col justify-center items-center lg:flex-row w-full'
                    +
                    (ejerciciosRutina.length === 0 ?
                      ' mb-80'
                      :
                      ' '
                    )  
                    }
                  >
                    <button onClick={() => {
                        setToggleSeleccionar(!toggleSeleccionar)
                        window.scrollTo(0, 0)
                        }
                      } 
                      className="flex-auto uppercase text-sm font-semibold text-white py-4 bg-blue-500 hover:bg-blue-600 rounded-lg mx-1 my-1 w-full lg:my-0 duration-75">
                      Agregar ejercicio
                    </button>
                    <button 
                      onClick={() => {
                        setMostrarEliminar(true)
                      }} 
                      className="flex-auto uppercase text-sm font-semibold text-white py-4 bg-red-500 hover:bg-red-600 rounded-lg mx-1 my-1 w-full lg:my-0 duration-75"
                    >
                      Eliminar Rutina
                    </button>
                  </div>
                  
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
      </main>
      <Footer></Footer>
    </div>
  );
}
