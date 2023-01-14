import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, Fragment } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import CardEjercicio from "/components/CardEjercicio";
import SeleccionarEjercicio from "/components/SeleccionarEjercicio";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [formInput, setFormInput] = useState();
  const [ejerciciosRutina, setEjerciciosRutina] = useState([])
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);
  const [equipo, setEquipo] = useState(["Ninguno","Banda de resistencia","Banda de suspension","Barra","Barra Z","Barras (dominadas, paralelas)","Mancuerna","Mancuernas","Pesa rusa","Placa de peso","Maquinas en GYM","Banco plano","Banco declinado","Banco inclinado","Cuerda"]);

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
      console.log('Se eliminó ' + rutina.nombre)
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
        ejercicio: idEjercicio
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
                    <input name="nombre" id="nombre" type="text" className="input input-secondary input-lg text-2xl text-secondary my-2" value={formInput.nombre || ""} onChange={handleOnInputChange}/>
                    <br/>
                    { ejerciciosRutina.length === 0 ? 
                        <h2>{'Ups, no hay ejercicios. 🥵'}</h2>
                      :
                        (ejerciciosRutina.map((ejercicio) => (
                            <CardEjercicio 
                            key={ejercicio.id}
                            rutinaEjercicio={ejercicio} 
                            getEjerciciosRutina={getEjerciciosRutina}
                            />
                          ))
                        )
                    }
                    <button onClick={() => setToggleSeleccionar(!toggleSeleccionar)} className="btn text-white btn-secondary mx-1 rounded-lg btn-md w-fit">Agregar ejercicio</button>
                    <button onClick={eliminarRutina} className="btn text-white mx-1 btn-error rounded-lg btn-md w-fit">Eliminar Rutina</button>
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
