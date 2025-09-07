import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from '../config/supabaseClient';

export default function Home() {
  const router = useRouter();

  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  //----------------------------------------------------------------
  const [formInput, setFormInput] = useState({});
  const [imagenNombre, setImagenNombre] = useState();

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])
  
  const handleSubmit = async (e) => {

    if((formInput.nombre == undefined || formInput.nombre == "") 
    || (formInput.caloriasGramos == undefined || formInput.caloriasGramos == "") 
    || (formInput.proteinasGramos == undefined || formInput.proteinasGramos == "")
    || (formInput.grasasGramos == undefined || formInput.grasasGramos == "")
    || (formInput.caloriasPieza == undefined || formInput.caloriasPieza == "")
    || (formInput.proteinasPieza == undefined || formInput.proteinasPieza == "") 
    || (formInput.grasasPieza == undefined || formInput.grasasPieza == "")
    || (formInput.clasificacion == undefined || formInput.clasificacion == "")
    || (formInput.imagen == undefined || formInput.imagen == "")){
      alert("Llena todos los campos.")
    }
    else{

      var nombre = formInput.nombre.toString().split(' ').join('_') + '.' + imagenNombre.toString().split('.').pop()

      const { data, error } = await supabase.storage
      .from('img')
      .upload('productos/' + nombre, formInput.imagen)

      if (error) {
        alert("ERROR: Hubo un error al cargar la imagen.")
        //console.log(error)
      }

      if (data) {
        ////console.log("Imagen cargada.")
        //console.log(data.path)

        const { error } = await supabase
        .from('calorias_productos')
        .insert({
          nombre: formInput.nombre, 
          calorias_gramos: formInput.caloriasGramos, 
          proteinas_gramos: formInput.proteinasGramos,
          grasas_gramos: formInput.grasasGramos,
          calorias_pieza: formInput.caloriasPieza,
          proteinas_pieza: formInput.proteinasPieza,
          grasas_pieza: formInput.grasasPieza,
          tipo: formInput.clasificacion,
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

      //VALIDACIÓN INPUT IMAGEN
      if (name == "imagen"){           
        setFormInput({
          ...formInput,
          [name]: event.target.files[0],
        });

        setImagenNombre(value)
      }

      //console.log(name + " | " + id + ": " + value + " -> " + checked);
    },
    [formInput, setFormInput]
  );

  return (
    <div className="bg-stone-100" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
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
            Agregar Producto
          </h2>

          {/*CAMPO Nombre ---------------------------- */}
          <input name="nombre" value={formInput.nombre || ""} onChange={handleOnInputChange} type="text" placeholder="Nombre" className="input input-lg mt-2 "/>

          <div className="divider m-0"></div>

           {/*CAMPO Calorias por 100 gramos ---------------------------- */}
          <input name="caloriasGramos" value={formInput.caloriasGramos || ""} onChange={handleOnInputChange} type="text" placeholder="Calorias por 100 gramos" className="input input-lg mt-2 "/>

          {/*CAMPO Proteinas por 100 gramos---------------------------- */}
          <input name="proteinasGramos" value={formInput.proteinasGramos || ""} onChange={handleOnInputChange} type="text" placeholder="Proteinas por 100 gramos" className="input input-lg mt-2"/>

          {/*CAMPO Grasas por 100 gramos---------------------------- */}
          <input name="grasasGramos" value={formInput.grasasGramos || ""} onChange={handleOnInputChange} type="text" placeholder="Grasas por 100 gramos" className="input input-lg mt-2"/>

          {/*CAMPO Calorias por una pieza ---------------------------- */}
          <input name="caloriasPieza" value={formInput.caloriasPieza || ""} onChange={handleOnInputChange} type="text" placeholder="Calorias por una pieza" className="input input-lg mt-2 "/>

          {/*CAMPO Proteinas por una pieza---------------------------- */}
          <input name="proteinasPieza" value={formInput.proteinasPieza || ""} onChange={handleOnInputChange} type="text" placeholder="Proteinas por una pieza" className="input input-lg mt-2"/>

          {/*CAMPO Grasas por una pieza---------------------------- */}
          <input name="grasasPieza" value={formInput.grasasPieza || ""} onChange={handleOnInputChange} type="text" placeholder="Grasas por una pieza" className="input input-lg mt-2"/>

          {/* SELECT Clasifiación */}
          <div className="form-control mt-4 mb-4 lg:mb-7">
              <select name="clasificacion" id="clasificacion" onChange={handleOnInputChange} className="select select-secondary text-secondary text-xl py-4 h-full border-0 font-normal rounded-xl shadow-md" defaultValue={formInput.clasificacion}>
                <option id="Todos" value="Todos" hidden>Clasificación</option>
                <option id="Leches" value="Leches">Leches</option>
                <option id="Quesos" value="Quesos">Quesos</option>
                <option id="Huevos" value="Huevos">Huevos</option>
                <option id="Embutidos" value="Embutidos">Embutidos</option>
                <option id="Carne de Ave" value="Carne de Ave">Carne de Ave</option>
                <option id="Yoghurt" value="Yoghurt">Yoghurt</option>
              </select>
            </div>

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
          <button className="btn btn-secondary btn-lg m-6" onClick={handleSubmit}>
            Guardar
          </button>
        </div>

        <button
          onClick={() => router.push('/visualizadorCalorias')}
          className="btn btn-ghost text-2xl font-normal p-10 mt-10 content-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          &nbsp;Volver a visualizar los registros
        </button>
      </main>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}
