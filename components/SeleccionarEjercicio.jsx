import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import supabase from "/config/supabaseClient";

const SeleccionarEjercicio = ({ agregarEjercicio, setToggleSeleccionar }) => {
  
  const router = useRouter();
  let musculoIndex = router.query.name;
  (musculoIndex ? "" : musculoIndex = "Todos")

  if (!musculoIndex) {
    musculoIndex = "Todos"
  }

  const [paginacion, setPaginacion] = useState(1);
  const [ejercicios, setEjercicios] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [formInput, setFormInput] = useState({musculo: musculoIndex});
  const [equipo, setEquipo] = useState(["Ninguno","Banda de resistencia","Banda de suspension","Barra","Barra Z","Barras (dominadas, paralelas)","Mancuerna","Mancuernas","Pesa rusa","Placa de peso","Maquinas en GYM","Banco plano","Banco declinado","Banco inclinado","Cuerda"]);
  
  useEffect(() => {
    //console.log("useEffect")
    getEjercicios();
  }, [formInput, paginacion]);

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
    
    query = query.order('id', { ascending: false })
    const data = await query

    setEjercicios(data.data);
    console.log(data.data)

    //CONTEO TOTAL DE REGISTROS

    query = supabase
    .from('ejercicios')
    .select('id', { count: 'exact', head: true })

    if (filtrarMusculo)  { query = query.eq('musculo_primario', filtrarMusculo) }
    if (filtrarEquipo)  { query = query.overlaps('equipo', filtrarEquipo) }
    if (filtrarSearch) { query = query.ilike('nombre', filtrarSearch) }

    const count = await query

    setCantidad(count.count);
    console.log(count.count);
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
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 overflow-auto max-h-full h-5/6 shadow-lg rounded-2xl pt-12 w-11/12 sm:w-9/12 mx-auto max-w-5xl" data-theme="emerald"> 
        <div className="relative w-11/12 sm:w-9/12 mx-auto max-w-5xl">
          <div className='flex justify-end sticky top-0 z-20 px-2 h-0'>
            <button onClick={() => {setToggleSeleccionar(false)}} className="btn btn-lg btn-ghost text-5xl bg-white rounded-lg shadow-md p-2">
                  <ion-icon name='close-outline'></ion-icon>
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-3xl text-left text-secondary font-semibold w-9/12">Selecciona un ejercicio</h2>
            <br/>

            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Buscar</label>
            <div className="relative flex flex-row">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input name="search" id="search" onBlur={getEjercicios} className="input input-secondary border-0 block w-full pl-8 rounded-xl shadow-md" value={formInput.search || ""} onChange={handleOnInputChange} placeholder="Buscar ejercicio..."/>
              <button type="submit" onClick={getEjercicios} className="btn text-white absolute right-2 my-2 btn-secondary rounded-lg btn-sm ">BUSCAR</button>
            </div>

            <br/>
            <div className="divider m-0"></div>
            
            {/* SELECT GRUPO MUSCULAR */}
            <div className="form-control mt-4 mb-4">
              <select name="musculo" id="musculo" onChange={handleOnInputChange} className="select select-secondary h-full border-0 font-normal rounded-xl shadow-md" defaultValue={formInput.musculo}>
                <option id="Todos" value="Todos" hidden>Grupo Muscular</option>
                <option id="Todos" value="Todos">Todos</option>
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
                <option id="Dorsales" value="Dorsales">Dorsales</option>
                <option id="Gluteos" value="Gluteos">Gluteos</option>
                <option id="Espalda Baja" value="Espalda Baja">Espalda Baja</option>
              </select>
            </div>

            <div className="collapse collapse-arrow bg-base-100 rounded-xl shadow-md text-sm">
                <input type="checkbox" className="peer"/> 
                <div className="collapse-title text-secondary">
                  Equipo
                </div>
              <div className="collapse-content"> 
              <div className="divider m-0"></div>

                {/* CHECKBOX TOGGLE EQUIPO */}
                <div className="flex flex-row flex-wrap form-control">
                  <div className="w-full">
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Ninguno</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Ninguno") : true} className="toggle toggle-secondary" value="Ninguno" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Banda de resistencia</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banda de resistencia") : true} className="toggle toggle-secondary" value="Banda de resistencia" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Banda de suspensión</span>
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banda de suspension") : true} className="toggle toggle-secondary" value="Banda de suspension" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Barra</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barra") : true} className="toggle toggle-secondary" value="Barra" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Barra Z</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barra Z") : true} className="toggle toggle-secondary" value="Barra Z" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Barras (dominadas, paralelas)</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Barras (dominadas, paralelas)") : true} className="toggle toggle-secondary" value="Barras (dominadas, paralelas)" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Mancuernas</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Mancuernas") : true} className="toggle toggle-secondary" value="Mancuernas" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                  </div>

                  <div className="w-full">
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Pesa rusa</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Pesa rusa") : true} className="toggle toggle-secondary" value="Pesa rusa" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Placa de peso</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Placa de peso") : true} className="toggle toggle-secondary" value="Placa de peso" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Máquinas en GYM</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Maquinas en GYM") : true} className="toggle toggle-secondary" value="Maquinas en GYM" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Banco plano</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco plano") : true} className="toggle toggle-secondary" value="Banco plano" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Banco declinado</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco declinado") : true} className="toggle toggle-secondary" value="Banco declinado" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Banco inclinado</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Banco inclinado") : true} className="toggle toggle-secondary" value="Banco inclinado" id="equipo" name="equipo" onChange={handleOnInputChange} />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mx-4">Cuerda</span> 
                      <input type="checkbox" checked={formInput.equipo ? incluye(formInput.equipo, "Cuerda") : true} className="toggle toggle-secondary" value="Cuerda" id="equipo" name="equipo" onChange={handleOnInputChange} />
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
                        musculo: formInput.musculo,
                        search: formInput.search
                      })}} 
                      className="btn btn-secondary w-3/4 mx-auto mt-2">Activar todos
                    </button>
                    <button
                    onClick={() => {
                      var temp = []
                      setEquipo(temp);
                      setFormInput({
                        equipo: temp,
                        musculo: formInput.musculo,
                        search: formInput.search
                      })}} 
                      className="btn mt-4 w-3/4 mx-auto mb-2">Desactivar todos
                    </button>
                  </div>
                </div>

                <div className="divider m-0"></div>

                <div className="flex flex-col items-center mb-3 mt-5">
                  <button type="submit" onClick={getEjercicios} className="btn btn-lg btn-secondary px-6 w-3/4">FILTRAR</button>
                </div>
              </div>
            </div>
          </div>
          
          {
            ejercicios ? 
            <div className="mx-auto mt-6">
              <div className="flex mx-auto">
                <span className="text-sm lg:text-lg w-1/2 my-auto">{"Mostrando " + Object.keys(ejercicios).length + " de " + cantidad + "."}</span>
                {/* PAGINACIÓN */}
                <div className="flex flex-col my-auto w-3/4 items-end">
                  <div className="btn-group">
                    {(paginacion == 1) ? "" : <button className="btn btn-xs btn-outline btn-secondary" onClick={() => {setPaginacion(paginacion - 1)}}>«</button>}
                    {((paginacion - 2) <= 0) ? "" : <button className="btn btn-outline btn-secondary btn-xs first-letter:btn-xs" onClick={() => {setPaginacion(paginacion - 2)}}>{paginacion - 2}</button>}
                    {((paginacion - 1) <= 0) ? "" : <button className="btn btn-outline btn-secondary btn-xs" onClick={() => {setPaginacion(paginacion - 1)}}>{paginacion - 1}</button>}
                    <button className="btn btn-xs btn-secondary">{paginacion}</button>
                    {(cantidad > (paginacion * 10))? <button className="btn btn-outline btn-secondary btn-xs" onClick={() => {setPaginacion(paginacion + 1)}}>{paginacion + 1}</button> : ""}
                    {(cantidad > ((paginacion+1) * 10))? <button className="btn btn-outline btn-secondary btn-xs" onClick={() => {setPaginacion(paginacion + 2)}}>{paginacion + 2}</button> : ""}
                    {(paginacion >= (cantidad/10))? "" : <button className="btn btn-outline btn-secondary btn-xs" onClick={() => {setPaginacion(paginacion + 1)}}>»</button>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                {/* MOSTRAR EJERCICIOS EN VARIABLE ejercicios */}
                {
                  ejercicios.map((ejercicio) =>(
                  <div 
                    key={ejercicio.id}
                    className="flex flex-row sm:items-center items-start justify-center w-full bg-white hover:border-blue-500 border-2 my-2 rounded-lg shadow-md cursor-pointer duration-100 hover:scale-105 hover:shadow-lg sm:px-0 sm:py-0 py-3 px-3"
                    onClick={() => {agregarEjercicio(ejercicio.id)}}
                  >
                    <img 
                      src={ejercicio.img} 
                      alt={ejercicio.nombre} 
                      className="w-1/2 sm:w-3/12 sm:p-2 md:w-2/12 z-0"
                    />
                    <div className="flex flex-col items-center justify-center pl-1 sm:pl-0 sm:p-4 sm:flex-row w-1/2 sm:w-9/12 md:w-10/12">
                      <div
                        className="w-full sm:w-8/12"
                      >
                        <h3
                        className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden lg:text-xl"
                        >
                          {ejercicio.nombre}</h3>
                        <p
                        className="text-sm lg:text-lg"
                        >{ejercicio.musculo_primario}</p>
                        <p
                        className="lg:text-sm text-xs line-clamp-5 sm:line-clamp-3 md:line-clamp-2"
                        >
                          {ejercicio.recomendaciones + 'Este es un ejercicio compuesto por lo que se utilizan otros músculos de manera simultánea. Para hacerlo de forma segura y controlada es importante incluir la activación del abdomen, los cuádriceps y los glúteos. La respiración al momento de subir o antes de es inhalando y al momento de bajar o antes de es exhalando.'}
                        </p>
                      </div>
                      <div
                      className="w-full sm:w-4/12 flex flex-col sm:mt-0 mt-2 sm:px-4"
                      >
                        <span 
                        className="text-xs lg:text-lg font-semibold"
                        >
                          {'Equipo: '}
                        </span>
                        <span
                          className="lg:text-base text-xs"
                          >
                            {ejercicio.equipo.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
              {/* PAGINACIÓN */}
              <div className="flex flex-col items-center mb-2 mt-4">
                <div className="btn-group">
                  {(paginacion == 1) ? "" : <button className="btn btn-outline btn-secondary text-xl" onClick={() => {setPaginacion(paginacion - 1)}}>«</button>}
                  {((paginacion - 2) <= 0) ? "" : <button className="btn btn-outline btn-secondary" onClick={() => {setPaginacion(paginacion - 2)}}>{paginacion - 2}</button>}
                  {((paginacion - 1) <= 0) ? "" : <button className="btn btn-outline btn-secondary" onClick={() => {setPaginacion(paginacion - 1)}}>{paginacion - 1}</button>}
                  <button className="btn btn-secondary">{paginacion}</button>
                  {(cantidad > (paginacion * 10))? <button className="btn btn-outline btn-secondary" onClick={() => {setPaginacion(paginacion + 1)}}>{paginacion + 1}</button> : ""}
                  {(cantidad > ((paginacion+1) * 10))? <button className="btn btn-outline btn-secondary" onClick={() => {setPaginacion(paginacion + 2)}}>{paginacion + 2}</button> : ""}
                  {(paginacion >= (cantidad/10))? "" : <button className="btn btn-outline btn-secondary text-xl" onClick={() => {setPaginacion(paginacion + 1)}}>»</button>}
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
    </div>
  );
}

export default SeleccionarEjercicio;
