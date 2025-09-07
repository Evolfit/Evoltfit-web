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
      ////console.log(data);
    } 
    else {
      setSesion(null);
      ////console.log("No hay Sesión " + error);
      router.push('/login')
    }
  }

  const nuevaRutina = async () => {
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
      //console.log('ERROR: Hubo un error al recuperar la rutina.')
      //console.log(error)
    }
    else{
      //console.log(data);
      setRutinas(data);
    }
  }


  return (
    <div className="bg-stone-100 w-full" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="relative min-h-[75vh]">
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <div>          
          {
            rutinas ? 
            <div className="mx-auto">
              <div className="flex flex-col w-11/12 sm:w-9/12 mx-auto max-w-5xl">
                <h2 className="text-2xl sm:text-4xl text-secondary my-2 w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                  {"Mis Rutinas"}
                </h2>
                {rutinas.length === 0 ? <p className="text-lg">{'Aún no tienes rutinas.'}</p> : ''}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2">
                  { rutinas.length === 0 ? 
                      ''
                    :
                          (rutinas.map((rutina) => (
                              <CardRutina key={rutina.id} rutina={rutina}/>
                            ))
                          )
                  }
                  <div 
                  className="flex justify-center hover:text-white hover:bg-blue-500 text-blue-500 items-center bg-white border-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg hover:border-blue-500 duration-100 p-4 cursor-pointer"
                  onClick={nuevaRutina}
                  >
                    <div className="text-9xl">
                      <ion-icon name="add-outline"></ion-icon>
                    </div>
                  </div>
                </div>
                {/*
                <button type="submit" onClick={nuevaRutina} className="btn text-white btn-secondary mx-auto mt-4">Nueva Rutina</button>
                <button onClick={() => {router.push('/progreso')}} className="btn text-white btn-success mx-auto">Ir a Progreso</button>
                */}
              </div>
            </div> 
            : 
            <div className="mt-12">
              <div className="loader mt-6"></div>
            </div>
          }
        </div>
        <br />
        <br />
      </main>
      <Footer/>
    </div>
  );
}
