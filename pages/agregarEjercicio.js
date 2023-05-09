import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from '../config/supabaseClient';

export default function Home() {
  const router = useRouter();

  ////console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  //----------------------------------------------------------------
  const [formInput, setFormInput] = useState({});
  const [errorDatosInput, setErrorDatosInput] = useState({});
  const [otroMusculo, setOtroMusculo] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const [imagenNombre, setImagenNombre] = useState();

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])
  
  const handleSubmit = async (e) => {

    if((formInput.nombre == undefined || formInput.nombre == "") 
    || (formInput.musculo == undefined || formInput.musculo == "") 
    || (formInput.equipo == undefined || formInput.equipo == "")
    || (formInput.recomendaciones == undefined || formInput.recomendaciones == "")
    || (formInput.errores == undefined || formInput.errores == "")
    || (formInput.imagen == undefined || formInput.imagen == "")){
      alert("Llena todos los campos.")
    }
    else{
      var musculoSecundario = [];

      if (formInput.musculoOtro != undefined){
        musculoSecundario = formInput.musculoOtro;
      }

      var nombre = formInput.nombre.toString().split(' ').join('_') + '.' + imagenNombre.toString().split('.').pop()
      nombre = nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "")

      const { data, error } = await supabase.storage
      .from('img')
      .upload('ejercicios/' + nombre, formInput.imagen)

      if (error) {
        ////console.log("Hubo un error al cargar la imagen.")
        alert("ERROR: Hubo un error al cargar la imagen.")
        //console.log(error)
      }

      if (data) {
        ////console.log("Imagen cargada.")
        //console.log(data.path)

        const { error } = await supabase
        .from('ejercicios')
        .insert({
          nombre: formInput.nombre, 
          musculo_primario: formInput.musculo,
          musculo_otros: musculoSecundario,
          equipo: formInput.equipo,
          recomendaciones: formInput.recomendaciones,
          errores: formInput.errores,
          img: 'https://ichwtlkazihzvtpmxbnw.supabase.co/storage/v1/object/public/img/' + data.path
          })

        if (error) {
          alert("ERROR: Hubo un error al generar el registro.")
          //console.log(error)
        }
        else{
          if(!alert(
            "            ⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠛⣿⣿⡄\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣍⣀⣈⣙⣿⣿⣿⣿⡿⠟⣀⣠⣤⣄⡄⠻⣿⣇\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⣿⡿⠛⠛⠛⢻⣿⣿⣧⣾⣏⣀⣀⠀⢁⣠⣼⣿\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⡧\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⢿⣿⣿⣿⣟⣙⢻⣿⣿⣿⡿⠿⠗\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠏⣼⠿⣿⠿⠟⠋⠀⠘⣿⠏⠀⠀⠀⢀⠀⠁\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣴⣿⣶⣷⣶⣶⣶⡆⢠⣿⣷⣾⡟⠀⠈\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⠛⠉⠁⠀⠀⠀⠀⠿⣿⠟⠁\n"
            + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣷⣦⣽⣓⡠⠝⠀⠠⠘⠋\n"
            + "⠀⠀⠀⠀⠀⠀⠀⣠⣤⡀⠀⠀⠀⢹⣿⣿⣿⣤⣍⣀⣀⣀⡴⠁⠀⠀⠀⢀\n"
            + "⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠙⢄⠙⠛⠛⠉⠀⠈\n"
            + "⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠈⠐⠠⠤\n"
            + "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣀⡀⠀⠀⣀⣀⡀\n"
            + "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡄\n"
            + "⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷\n"
            + "⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣴⣿⣿⣟⡉⡁\n"
            + "⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠏\n"
            + "⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠥⡆\n\n"
            + "--- Ejercicio cargado. --- "
            )){window.location.reload();}
        }
      }
    }
  };

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked} = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      //VALIDACIÓN INPUT OTRO MUSCULO
      if (name == "musculoOtro"){     
        var temp = otroMusculo;
        
        if (checked == true){
          temp.push(value);
        }
        
        if (checked == false){
          const indice = temp.indexOf(value);
          if (indice > -1) {
            temp.splice(indice, 1);
          }
        }
        
        setOtroMusculo(temp);

        setFormInput({
          ...formInput,
          [name]: temp,
        });
      }

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

      //VALIDACIÓN INPUT IMAGEN
      if (name == "imagen"){           
        setFormInput({
          ...formInput,
          [name]: event.target.files[0],
        });

        setImagenNombre(value)
      }

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
      ////console.log(formInput.musculoOtro)


    },
    [formInput, setFormInput]
  );

  //----------------------------------------------------------------
  
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
    <div className="bg-stone-100" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      

      <main className='flex flex-col content-center items-center'>
        <div className="form-control py-10 px-16 bg-blue-100 rounded-lg shadow-lg w-3/4">
          <h2 className="text-3xl font-bold mb-10">
            Agregar Ejercicio
          </h2>

          {/*CAMPO Nombre ---------------------------- */}
          <input name="nombre" value={formInput.nombre || ""} onChange={handleOnInputChange} type="text" placeholder="Nombre" className={"input input-lg mt-2 " +  (incluye(errorDatosInput.correo, "control")  ? (incluye(errorDatosInput.correo, "error")  ? "input-error" : "input-success") : " ")}/>
          
          <label className="label">
            <span className="label-text-alt text-red-500">{incluye(errorDatosInput.correo, "error")  ? "Use un correo válido." : ""}</span>
          </label>

          <div className="divider m-0"></div>

          {/* SELECT GRUPO MUSCULAR */}
          <div className="form-control mt-4 mb-4 lg:mb-7">
              <select name="musculo" id="musculo" onChange={handleOnInputChange} className="select select-secondary text-secondary text-xl py-4 h-full border-0 font-normal rounded-xl shadow-md" defaultValue={formInput.musculo}>
                <option id="Todos" value="Todos" hidden>Musculo Primario</option>
                <option id="Cardio" value="Cardio">Cardio</option>
                <option id="Abdomen" value="Abdomen">Abdomen</option>
                <option id="Oblicuos" value="Oblicuos">Oblicuos</option>
                <option id="Antebrazos" value="Antebrazos">Antebrazos</option>
                <option id="Biceps" value="Biceps">Biceps</option>
                <option id="Triceps" value="Triceps">Triceps</option>
                <option id="Hombros" value="Hombros">Hombros</option>
                <option id="Trapecio" value="Trapecio">Trapecio</option>
                <option id="Trapecio Medio" value="Trapecio Medio">Trapecio Medio</option>
                <option id="Pecho" value="Pecho">Pecho</option>
                <option id="Cuadriceps" value="Cuadriceps">Cuadriceps</option>
                <option id="Pantorrillas" value="Pantorrillas">Pantorrillas</option>
                <option id="Isquiotibiales" value="Isquiotibiales">Isquiotibiales</option>
                <option id="Dorsales" value="Dorsales" >Dorsales</option>
                <option id="Gluteos" value="Gluteos">Gluteos</option>
                <option id="Espalda Baja" value="Espalda Baja">Espalda Baja</option>
                <option id="Espalda Superior" value="Espalda Superior">Espalda Superior</option>
              </select>
            </div>

          {/*CAMPO Otros Musculos ---------------------------- */}
          <div className="collapse collapse-arrow bg-base-100 rounded-xl shadow-md mb-7">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl text-lefty">
              Otros Musculos
            </div>
            <div className="collapse-content"> 
            <div className="divider m-0"></div>

              {/* CHECKBOX Otros Musculos */}
              <div className="flex flex-row flex-wrap form-control">
                <div className="w-full lg:w-1/3 lg:m-auto">
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Abdomen</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Abdomen") : false} className="toggle toggle-secondary" value="Abdomen" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Oblicuos</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Oblicuos") : false} className="toggle toggle-secondary" value="Oblicuos" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Antebrazos</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Antebrazos") : false} className="toggle toggle-secondary" value="Antebrazos" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Biceps</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Biceps") : false} className="toggle toggle-secondary" value="Biceps" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Triceps</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Triceps") : false} className="toggle toggle-secondary" value="Triceps" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Hombros</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Hombros") : false} className="toggle toggle-secondary" value="Hombros" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Trapecio</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Trapecio") : false} className="toggle toggle-secondary" value="Trapecio" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Trapecio Medio</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Trapecio Medio") : false} className="toggle toggle-secondary" value="Trapecio Medio" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                </div>
                <div className="w-full lg:w-1/3 lg:m-auto">
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Pecho</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Pecho") : false} className="toggle toggle-secondary" value="Pecho" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Cuadriceps</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Cuadriceps") : false} className="toggle toggle-secondary" value="Cuadriceps" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Pantorrillas</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Pantorrillas") : false} className="toggle toggle-secondary" value="Pantorrillas" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Isquiotibiales</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Isquiotibiales") : false} className="toggle toggle-secondary" value="Isquiotibiales" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Dorsales</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Dorsales") : false} className="toggle toggle-secondary" value="Dorsales" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Gluteos</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Gluteos") : false} className="toggle toggle-secondary" value="Gluteos" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Espalda Baja</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Espalda Baja") : false} className="toggle toggle-secondary" value="Espalda Baja" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Espalda Superior</span> 
                    <input type="checkbox" checked={formInput.musculoOtro ? incluye(formInput.musculoOtro, "Espalda Superior") : false} className="toggle toggle-secondary" value="Espalda Superior" id="musculoOtro" name="musculoOtro" onChange={handleOnInputChange} />
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center mb-3 mt-5">
                <div className="flex flex-row flex-wrap items-center">
                  <button
                  onClick={() => {
                    var temp = ["Abdomen","Oblicuos","Antebrazos","Biceps","Triceps","Hombros","Trapecio","Trapecio Medio","Pecho","Cuadriceps","Pantorrillas","Isquiotibiales","Dorsales","Gluteos","Espalda Baja"]
                    setOtroMusculo(temp);
                    setFormInput({
                      equipo: formInput.equipo,
                      nombre: formInput.nombre,
                      musculo: formInput.musculo,
                      musculoOtro: temp,
                      recomendaciones: formInput.recomendaciones,
                      errores: formInput.errores,
                      imagen: formInput.imagen
                    })}} 
                    className="btn btn-secondary w-3/4 mx-auto mt-2">Activar todos
                  </button>
                  <button
                  onClick={() => {
                    var temp = []
                    setOtroMusculo(temp);
                    setFormInput({
                      equipo: formInput.equipo,
                      nombre: formInput.nombre,
                      musculo: formInput.musculo,
                      musculoOtro: temp,
                      recomendaciones: formInput.recomendaciones,
                      errores: formInput.errores,
                      imagen: formInput.imagen
                    })}} 
                    className="btn mt-4 w-3/4 mx-auto mb-2">Desactivar todos
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*CAMPO equipo ---------------------------- */}
          <div className="collapse collapse-arrow bg-base-100 rounded-xl shadow-md mb-7">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl text-left">
              Equipo
            </div>
            <div className="collapse-content"> 
            <div className="divider m-0"></div>

              {/* CHECKBOX TOGGLE EQUIPO */}
              <div className="flex flex-row flex-wrap form-control">
                <div className="w-full lg:w-1/3 lg:m-auto">
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Ninguno</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Ninguno") : false} className="toggle toggle-secondary" value="Ninguno" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Banda de resistencia</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banda de resistencia") : false} className="toggle toggle-secondary" value="Banda de resistencia" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Banda de suspensión</span>
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banda de suspension") : false} className="toggle toggle-secondary" value="Banda de suspension" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Barra</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barra") : false} className="toggle toggle-secondary" value="Barra" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Barra Z</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barra Z") : false} className="toggle toggle-secondary" value="Barra Z" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Barras (dominadas, paralelas)</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barras (dominadas, paralelas)") : false} className="toggle toggle-secondary" value="Barras (dominadas, paralelas)" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Mancuernas</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Mancuernas") : false} className="toggle toggle-secondary" value="Mancuernas" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                </div>

                <div className="w-full lg:w-1/3 lg:m-auto">
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Pesa rusa</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Pesa rusa") : false} className="toggle toggle-secondary" value="Pesa rusa" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Placa de peso</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Placa de peso") : false} className="toggle toggle-secondary" value="Placa de peso" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Máquinas en GYM</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Maquinas en GYM") : false} className="toggle toggle-secondary" value="Maquinas en GYM" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Banco plano</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco plano") : false} className="toggle toggle-secondary" value="Banco plano" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Banco declinado</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco declinado") : false} className="toggle toggle-secondary" value="Banco declinado" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Banco inclinado</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco inclinado") : false} className="toggle toggle-secondary" value="Banco inclinado" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text mx-4">Cuerda</span> 
                    <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Cuerda") : false} className="toggle toggle-secondary" value="Cuerda" id="equipo" name="equipo" onChange={handleOnInputChange} />
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center mb-3 mt-5">
                <div className="flex flex-row flex-wrap items-center">
                  <button
                  onClick={() => {
                    var temp = ["Ninguno","Banda de resistencia","Banda de suspension","Barra","Barra Z","Barras (dominadas, paralelas)","Mancuerna","Mancuernas","Pesa rusa","Placa de peso","Maquinas en GYM","Banco plano","Banco declinado","Banco inclinado","Cuerda"]
                    setEquipo(temp);
                    setFormInput({
                      equipo: temp,
                      nombre: formInput.nombre,
                      musculo: formInput.musculo,
                      musculoOtro: formInput.musculoOtro,
                      recomendaciones: formInput.recomendaciones,
                      errores: formInput.errores,
                      imagen: formInput.imagen
                    })}} 
                    className="btn btn-secondary w-3/4 mx-auto mt-2">Activar todos
                  </button>
                  <button
                  onClick={() => {
                    var temp = []
                    setEquipo(temp);
                    setFormInput({
                      equipo: temp,
                      nombre: formInput.nombre,
                      musculo: formInput.musculo,
                      musculoOtro: formInput.musculoOtro,
                      recomendaciones: formInput.recomendaciones,
                      errores: formInput.errores,
                      imagen: formInput.imagen
                    })}} 
                    className="btn mt-4 w-3/4 mx-auto mb-2">Desactivar todos
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divider m-0 mb-6"></div>

          {/*CAMPO recomendaciones ---------------------------- */}   
          <textarea name="recomendaciones" value={formInput.recomendaciones || ""} onChange={handleOnInputChange} placeholder="Recomendaciones" className={"textarea textarea-success  rounded-xl shadow-md text-lg border-2 mb-2 " +  (incluye(errorDatosInput.correo, "control")  ? (incluye(errorDatosInput.correo, "error")  ? "input-error" : "input-success") : " ")}></textarea>

          <label className="label">
            <span className="label-text-alt text-red-500">{incluye(errorDatosInput.correo, "error")  ? "Use un correo válido." : ""}</span>
          </label>

          {/*CAMPO errores ---------------------------- */}
          <textarea name="errores" value={formInput.errores || ""} onChange={handleOnInputChange} placeholder="Errores comunes" className={"textarea textarea-warning  rounded-xl shadow-md  text-lg border-2 mb-2 " +  (incluye(errorDatosInput.correo, "control")  ? (incluye(errorDatosInput.correo, "error")  ? "input-error" : "input-success") : " ")}></textarea>

          <label className="label">
            <span className="label-text-alt text-red-500">{incluye(errorDatosInput.correo, "error")  ? "Use un correo válido." : ""}</span>
          </label>

          {/*CAMPO imagen ---------------------------- */}
          <input name="imagen" id="imagen" type="file" accept="image/*" onChange={handleOnInputChange}  className="w-full bg-fuchsia-600  rounded-xl shadow-md text-white p-4 mb-4"/>

          {
            (datos) ? 
            (
              <div className="alert alert-success font-bold text-white">
                <div>
                  <span>
                    ¡Se agregó correctamente!
                  </span>
                </div>
              </div>
            )
            : ""
          }

          {
            (fetchError) ? 
            (
              <div className="alert alert-error font-bold text-white">
                <div>
                  <span> 
                    Ocurrió un error.
                  </span>
                </div>
              </div>
            )
            : ""
          }

          <div className="divider m-0"></div>
          
          {/*BOTÓN ENVIAR FORMULARIO ---------------- */}
          <button className={"btn btn-secondary btn-lg m-6 " + (incluye(errorDatosInput.correo, "control")  ? (incluye(errorDatosInput.correo, "error") || incluye(errorDatosInput.password, "error") || incluye(errorDatosInput.confirmarPassword, "error") ? "btn-disabled" : " ") : " ")} onClick={handleSubmit}>
            Guardar
          </button>
        </div>

        <button
          onClick={() => router.push('/biblioteca')}
          className="btn btn-ghost text-2xl font-normal p-10 mt-10 content-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          &nbsp;Volver a Biblioteca
        </button>
      </main>

      <br/>
      <br/>
      <Footer/>
    </div>
  );
}
