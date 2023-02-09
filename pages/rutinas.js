import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import CardRutina from "/components/CardRutina";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();
  let musculoIndex = router.query.name;
  (musculoIndex ? "" : musculoIndex = "Todos")

  if (!musculoIndex) {
    musculoIndex = "Todos"
  }

  const [sesion, setSesion] = useState(null);
  const [paginacion, setPaginacion] = useState(1);
  const [rutinas, setRutinas] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [formInput, setFormInput] = useState({musculo: musculoIndex});
  const [equipo, setEquipo] = useState(["Ninguno","Banda de resistencia","Banda de suspension","Barra","Barra Z","Barras (dominadas, paralelas)","Mancuerna","Mancuernas","Pesa rusa","Placa de peso","Maquinas en GYM","Banco plano","Banco declinado","Banco inclinado","Cuerda"]);
  
  useEffect(() => {
    handleSesion()
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  const handleSesion = async () => {

    const { data, error } = await supabase.auth.getSession()

    if(data.session){
      setSesion(data.session);
      getRutinas(data.session);
      //console.log(data);
    } 
    else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      router.push('/login')
    }
  }

  const nuevaRutina = async () => {
    let query = supabase
    .from('rutinas')
    .select('nombre', { count: 'exact', head: true })
    .eq('usuario', sesion.user.id)

    const count = await query
    //console.log(count);

    const { data, error } = await supabase
      .from('rutinas')
      .insert({
        usuario: sesion.user.id, 
        nombre: "Nueva rutina " + (count.count + 1)
        })
      .select()

    if (error) {
      console.log(error)
      console.log("ERROR: Hubo un error al crear una nueva rutina.")
    }
    else{
      //console.log(data);
      //console.log("Se creó una nueva rutina.")
      router.push({
        pathname: '/editarRutina',
        query: { rutina: data[0].id }
      })
    }
  }

  async function getRutinas(session) {
    const { data, error } = await supabase
    .from('rutinas')
    .select(`
    *,
    rutina_en_progreso(count)
    `)
    .eq('usuario', session.user.id)

    if (error) {
      console.log('ERROR: Hubo un error al recuperar la rutina.')
      console.log(error)
    }
    else{
      console.log(data);
      setRutinas(data);
    }
  }


  return (
    <div className="bg-stone-100 w-full" data-theme="emerald">
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
            rutinas ? 
            <div className="mx-auto mt-6">
              <div className="flex flex-col w-11/12 sm:w-9/12 mx-auto max-w-5xl">
                <h2 className="text-3xl sm:text-4xl p-2 text-secondary my-2 w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                  {"Rutinas de " + sesion.user.user_metadata.nombre}
                </h2>
                { rutinas.length === 0 ? 
                    <h2>{'Ups, aquí no hay rutinas. 🥵'}</h2>
                  :
                    (rutinas.map((rutina) => (
                        <CardRutina key={rutina.id} rutina={rutina}/>
                      ))
                    )
                }
                <button type="submit" onClick={nuevaRutina} className="btn text-white btn-secondary rounded-lg btn-lg w-fit mx-auto my-4">Nueva Rutina</button>
              </div>
              {/* PAGINACIÓN */}
              <div className="flex flex-col items-center mb-2 mt-4">
                <div className="btn-group">
                  {(paginacion == 1) ? "" : <button className="btn btn-outline btn-secondary text-xl lg:btn-lg" onClick={() => {setPaginacion(paginacion - 1)}}>«</button>}
                  {((paginacion - 2) <= 0) ? "" : <button className="btn btn-outline btn-secondary lg:btn-lg" onClick={() => {setPaginacion(paginacion - 2)}}>{paginacion - 2}</button>}
                  {((paginacion - 1) <= 0) ? "" : <button className="btn btn-outline btn-secondary lg:btn-lg" onClick={() => {setPaginacion(paginacion - 1)}}>{paginacion - 1}</button>}
                  <button className="btn lg:btn-lg btn-secondary">{paginacion}</button>
                  {(cantidad > (paginacion * 10))? <button className="btn btn-outline btn-secondary lg:btn-lg" onClick={() => {setPaginacion(paginacion + 1)}}>{paginacion + 1}</button> : ""}
                  {(cantidad > ((paginacion+1) * 10))? <button className="btn btn-outline btn-secondary lg:btn-lg" onClick={() => {setPaginacion(paginacion + 2)}}>{paginacion + 2}</button> : ""}
                  {(paginacion >= (cantidad/10))? "" : <button className="btn btn-outline btn-secondary text-xl lg:btn-lg" onClick={() => {setPaginacion(paginacion + 1)}}>»</button>}
                </div>
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
