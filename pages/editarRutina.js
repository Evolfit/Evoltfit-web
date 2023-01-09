import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();
  let rutinaIndex = router.query.rutina;

  const [sesion, setSesion] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [formInput, setFormInput] = useState();
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
      //console.log(data[0])
    }
  }

  async function eliminarRutina() {
    const { error } = await supabase
    .from('rutinas')
    .delete()
    .match({id: rutinaIndex, usuario: sesion.user.id})

    if (error) {
      console.log('ERROR: Error al eliminar la rutina.')
      console.log(error)
    }
    else{
      console.log('Se eliminó ' + rutina.nombre)
      router.push('/rutinas')
    }
  }

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked} = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      //VALIDACIÓN INPUT EQUIPO
      if (name == "equipo"){     
        var temp = equipo;
        
        if (checked == true){
          temp.push(value);
        }
        
        if (checked == false){
          const indice = temp.indexOf(value);
          if (indice > -1) {
            temp.splice(indice, 1);
          }
        }
        
        setEquipo(temp);

        setFormInput({
          ...formInput,
          [name]: temp,
        });
      }

      setPaginacion(1)

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
      //console.log(formInput.equipo)
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
            rutina ? 
            <div className="mx-auto mt-6">
              <div className="flex flex-col w-9/12 mx-auto">
                <div>
                  <h2 className="text-2xl text-secondary">{rutina.nombre}</h2>
                  <br/>
                  <button onClick={() => {}} className="btn text-white btn-secondary rounded-lg btn-md w-fit">Agregar ejercicio</button>
                  <button onClick={eliminarRutina} className="btn text-white btn-error rounded-lg btn-md w-fit">Eliminar Rutina</button>
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
