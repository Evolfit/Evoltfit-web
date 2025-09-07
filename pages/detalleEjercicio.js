import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, Fragment } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";

export default function DetalleEjercicio() {
  const router = useRouter();
  let ejercicioIndex = router.query.ejercicio;

  const [sesion, setSesion] = useState(null);
  const [ejercicio, setEjercicio] = useState(null);
  const [rutinas, setRutinas] = useState(null);
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    handleSesion()
    getEjercicio()
  }, []);

  const handleSesion = async () => {

    if (!ejercicioIndex) {
      router.push('/biblioteca')
    }

    const { data, error } = await supabase.auth.getSession()

    if(data.session){
      setSesion(data.session);
      getRutinas(data.session)
      //console.log(data.session);
    } 
    else {
      setSesion(null);
      ////console.log("No hay Sesión " + error);
    }
  }

  async function getEjercicio() {
    const { data, error } = await supabase
    .from('ejercicios')
    .select('*')
    .eq('id', ejercicioIndex)

    if (error) {
      //console.log('ERROR: No se encontró el ejercicio.')
      //console.log(error)
      router.push('/biblioteca')
    }
    else{
      setEjercicio(data[0]);
      ////console.log(data[0])
    }
  }

  async function getRutinas(session) {
    const { data, error } = await supabase
    .from('rutinas')
    .select('*')
    .eq('usuario', session.user.id)

    if (error) {
      //console.log('ERROR: Hubo un error al recuperar la rutina.')
      //console.log(error)
    }
    else{
      ////console.log(data);
      setRutinas(data);
    }
  }

  async function nuevaRutina() {
    let query = supabase
    .from('rutinas')
    .select('nombre', { count: 'exact', head: true })
    .eq('usuario', sesion.user.id)

    const count = await query
    ////console.log(count);

    const { data, error } = await supabase
      .from('rutinas')
      .insert({
        usuario: sesion.user.id, 
        nombre: "Nueva rutina " + (count.count + 1)
        })
      .select()

    if (error) {
      //console.log(error)
      //console.log("ERROR: Hubo un error al crear una nueva rutina.")
    }
    else{
      ////console.log(data);
      ////console.log("Se creó una nueva rutina.")
      agregarEjercicio(data[0].id)
    }
  }

  async function agregarEjercicio(idRutina) {
    
    const query = supabase
    .from('rutinas_ejercicio')
    .select('id', { count: 'exact', head: true })
    .eq('rutina', idRutina)

    const count = await query
    
    const { data, error } = await supabase
      .from('rutinas_ejercicio')
      .insert({
        rutina: idRutina, 
        ejercicio: ejercicio.id,
        orden: count.count
      })
      .select(`
        id,
        orden,
        descanso
      `)

    if (error) {
      //console.log(error)
      //console.log("ERROR: Hubo un error al agregar un nuevo ejercicio.")
    }
    else{
      //console.log("Se agregó un nuevo ejercicio.")
      ////console.log(data[0])
      
      const { error } = await supabase
      .from('rutinas_ejercicio_sets')
      .insert({
        ejercicio_rutina: data[0].id, 
        })

      if (error) {
        //console.log(error)
        //console.log("ERROR: Hubo un error al agregar un nuevo set.")
      }
      else{
        //console.log("Se agregó un nuevo set.")
        router.push({
          pathname: '/editarRutina',
          query: { rutina: idRutina }
        })
      }
    }
  }

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked } = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      if(name == 'agregarRutina'){
        if (value == 'Nueva Rutina') {
          if (sesion === null) {
            router.push('/login')
          }
          else{
            nuevaRutina()
          }
        }
        else{
          agregarEjercicio(value)
        }
      }

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
      ////console.log(formInput.equipo)
    },
    [formInput, setFormInput, sesion, ejercicio]
  );

  return (
    <div className="bg-stone-100 w-full z-0" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
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
            ejercicio ? 
              <div className="mx-auto mt-2">
                <div className="w-11/12 md:w-9/12 mx-auto max-w-5xl">
                  <div>
                    <button className="btn btn-ghost m-0 px-2 text-lg" onClick={() => {router.push('/biblioteca')}}>
                      <div className='text-3xl mt-auto'>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                      </div>
                      <span className="ml-2">{"Volver a Biblioteca"}</span>
                    </button>
                    <br/>
                    {/* EJERCICIO */}
                    <div className="mt-6 bg-white rounded-xl p-8 shadow">
                      <h2 className="text-4xl font-medium">{ejercicio.nombre}</h2>
                      <p className="text-2xl font-light">{ejercicio.musculo_primario}</p>                      
                      
                      {/* AGREGAR A RUTINA */}
                      <div className="form-control my-4">
                        <select name="agregarRutina" id="agregarRutina"
                        className="select select-secondary border border-gray-100 bg-slate-50 hover:bg-slate-100 text-base lg:py-4 h-full border-0 font-normal rounded-xl shadow-md shadow-gray-200"
                        onChange={handleOnInputChange}
                        defaultValue='agregar'
                        >
                          <option id="agregar" value="agregar" hidden>Agregar a Rutina</option>
                          { rutinas ? 
                              (rutinas.length !== 0 ? 
                                rutinas.map((rutina) => (
                                  <option key={rutina.id} id={rutina.id} value={rutina.id}>{rutina.nombre}</option>
                              ))
                              :
                                ''
                              )
                              :
                                ''
                          }
                          <option id="Nueva Rutina" value="Nueva Rutina">Crear Nueva Rutina</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-center w-full h-fit">
                        <img className="rounded-3xl" src={`/storage/v1/object/public/img/ejercicios/${ejercicio.img}`} alt={ejercicio.nombre} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="flex-auto w-full p-6 rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 duration-100 hover:scale-[1.01]">
                          <h3 className="text-lg font-medium">Equipo</h3>
                          <p className="text-md font-light">{ejercicio.equipo.join(", ")}</p>
                        </div>
                        <div className="flex-auto w-full p-6 rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 duration-100 hover:scale-[1.01]">
                          <h3 className="text-lg font-medium">Otros musculos activados</h3>
                          <p className="text-md font-light">{ejercicio.musculo_otros.join(", ")}</p>
                        </div>
                        <div className="flex-auto w-full p-6 rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 duration-100 hover:scale-[1.01]">
                          <h3 className="text-lg font-medium">Recomendaciones</h3>
                          <p className="text-md font-light">{ejercicio.recomendaciones}</p>
                        </div>
                        <div className="flex-auto w-full p-6 rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 duration-100 hover:scale-[1.01]">
                          <h3 className="text-lg font-medium">Errores comunes</h3>
                          <p className="text-md font-light">{ejercicio.errores}</p>
                        </div>
                      </div>
                    </div>
                    <br/>
                  </div>
                </div>
              </div>
            : 
            <div className="mt-24">
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