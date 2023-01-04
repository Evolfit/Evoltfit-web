import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
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
  const [ejercicios, setEjercicios] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [formInput, setFormInput] = useState({musculo: musculoIndex});
  const [equipo, setEquipo] = useState(["Ninguno","Banda de resistencia","Banda de suspension","Barra","Barra Z","Barras (dominadas, paralelas)","Mancuerna","Mancuernas","Pesa rusa","Placa de peso","Maquinas en GYM","Banco plano","Banco declinado","Banco inclinado","Cuerda"]);
  
  useEffect(() => {
    handleSesion()
  }, [])

  const handleSesion = async () => {

    const { data, error } = await supabase.auth.getSession()

    if(data.session){
      setSesion(data.session);
      console.log(data);
    } 
    else {
      setSesion(null);
      console.log("No hay Sesión " + error);
      console.log(data);
      router.push('/login')
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if(error){
      console.log(error);
    }
    else{
      router.reload(window.location.pathname);
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

  async function getEjercicios() {
    var rango = paginacion*10;
   
    let filtrarMusculo = null;
    let filtrarEquipo = null;
    let filtrarSearch = null;

    if(formInput.musculo != undefined && formInput.musculo != "Todos"){
      filtrarMusculo = formInput.musculo
    }

    if (formInput.equipo != undefined && formInput.musculo != []){
      filtrarEquipo = formInput.equipo
    }
    
    if(formInput.search != undefined && formInput.search != ""){
      filtrarSearch = "%" + formInput.search + "%"
    }

    let query = supabase
    .from('ejercicios')
    .select('*')
    .range(rango-10, rango-1)
  
    if (filtrarMusculo)  { query = query.eq('musculo_primario', filtrarMusculo) }
    //if (filtrarMusculo) { console.log("Filtro musculo: " + filtrarMusculo)}

    if (filtrarEquipo)  { query = query.overlaps('equipo', filtrarEquipo) }
    //if (filtrarEquipo) { console.log("Filtro equipo: " + filtrarEquipo)}

    if (filtrarSearch) { query = query.ilike('nombre', filtrarSearch) }
    //if (filtrarSearch) { console.log("Filtro search: " + filtrarSearch) }
    
    const data = await query

    setEjercicios(data.data);
    console.log(ejercicios)

    //CONTEO TOTAL DE REGISTROS

    query = supabase
    .from('ejercicios')
    .select('id', { count: 'exact', head: true })

    if (filtrarMusculo)  { query = query.eq('musculo_primario', filtrarMusculo) }
    if (filtrarEquipo)  { query = query.overlaps('equipo', filtrarEquipo) }
    if (filtrarSearch) { query = query.ilike('nombre', filtrarSearch) }

    const count = await query

    setCantidad(count.count);
    console.log(cantidad);
  }

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
            sesion ? 
            <div className="mx-auto mt-6">
              <div className="flex w-9/12 mx-auto">
                <h2 className="text-2xl text-secondary">{"Rutinas de " + sesion.user.email}</h2>
              </div>
              <div className="flex flex-col items-center w-full">
                {/* Aqui se muestran las rutinas */}
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