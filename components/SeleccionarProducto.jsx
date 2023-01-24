import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import supabase from "/config/supabaseClient";


const SeleccionarEjercicio = ({ agregarProducto, setToggleSeleccionar }) => {

    const router = useRouter();
    let musculoIndex = router.query.name;
    (musculoIndex ? "" : musculoIndex = "Todos")
  
    if (!musculoIndex) {
      musculoIndex = "Todos"
    }

    const [paginacion, setPaginacion] = useState(1);
    const [productos, setProductos] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [formInput, setFormInput] = useState({musculo: musculoIndex});

  useEffect(() => {
    getProductos();
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

    },
    [formInput, setFormInput]
  );

  async function getProductos() {
    var rango = paginacion*10;
   
    let filtrarClasificacion = null;
    let filtrarSearch = null;

    if(formInput.clasificacion != undefined && formInput.clasificacion != "Todos"){
      filtrarClasificacion = formInput.clasificacion
    }
    
    if(formInput.search != undefined && formInput.search != ""){
      filtrarSearch = "%" + formInput.search + "%"
    }

    let query = supabase
    .from('calorias_productos')
    .select('*')
    .range(rango-10, rango-1)
  
    if (filtrarClasificacion)  { query = query.eq('tipo', filtrarClasificacion) }

    if (filtrarSearch) { query = query.ilike('nombre', filtrarSearch) }
    
    const data = await query

    setProductos(data.data);
    console.log(data.data)

    //CONTEO TOTAL DE REGISTROS

    query = supabase
    .from('calorias_productos')
    .select('id', { count: 'exact', head: true })

    if (filtrarClasificacion)  { query = query.eq('tipo', filtrarClasificacion) }
    if (filtrarSearch) { query = query.ilike('nombre', filtrarSearch) }

    const count = await query

    setCantidad(count.count);
    console.log(count.count);
  }

  return (

    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 mx-auto w-9/12 h-full overflow-auto h-2/3 shadow-lg rounded-2xl pt-12" data-theme="emerald">
        <div className="w-9/12 mx-auto">
        <button onClick={() => {setToggleSeleccionar(false)}} className="absolute btn btn-lg btn-ghost right-6 top-6 text-5xl">
              <ion-icon name='close-outline'></ion-icon>
           </button>
            <h2 className="text-2xl lg:text-5xl text-left text-secondary text-blue-600 font-semibold lg:my-4">Selecciona un producto</h2>
            <br/>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Buscar</label>
            <div className="relative flex flex-row">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-3 h-3  lg:w-5 lg:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input name="search" id="search" onBlur={getProductos} className="input input-secondary border-0 block w-full pl-8 lg:p-8 lg:pl-11 text-sm lg:text-lg rounded-xl shadow-md" value={formInput.search || ""} onChange={handleOnInputChange} placeholder="Buscar producto..."/>
              <button type="submit" onClick={getProductos} className="btn text-white absolute right-2 lg:right-3 lg:bottom-2 btn-secondary rounded-lg btn-sm lg:btn-md top-2 lg:px-6 lg:py-2">BUSCAR</button>
            </div>

            <br/>
            <div className="divider m-0"></div>
            
            {/* SELECT GRUPO */}
            <div className="form-control mt-4 mb-4">
              <select name="clasificacion" id="clasificacion" onChange={handleOnInputChange} className="select select-secondary lg:text-xl lg:py-4 h-full border-0 font-normal rounded-xl shadow-md" defaultValue={formInput.musculo}>
                <option id="Todos" value="Todos" hidden>Clasificación</option>
                <option id="Todos" value="Todos">Todos</option>
                <option id="Leches" value="Leches">Leches</option>
                <option id="Quesos" value="Quesos">Quesos</option>
                <option id="Huevos" value="Huevos">Huevos</option>
                <option id="Embutidos" value="Embutidos">Embutidos</option>
                <option id="Carne de Ave" value="Carne de Ave">Carne de Ave</option>
              </select>
            </div>
          </div>
          {
            productos ? 
            <div className="mx-auto mt-6">
              <div className="flex w-9/12 mx-auto">
                <span className="text-sm lg:text-lg w-1/4 my-auto">{"Mostrando " + Object.keys(productos).length + " de " + cantidad + "."}</span>
                {/* PAGINACIÓN */}
                <div className="flex flex-col my-auto w-3/4 items-end">
                  <div className="btn-group">
                    {(paginacion == 1) ? "" : <button className="btn btn-xs btn-outline btn-secondary lg:btn-sm" onClick={() => {setPaginacion(paginacion - 1)}}>«</button>}
                    {((paginacion - 2) <= 0) ? "" : <button className="btn btn-outline btn-secondary btn-xs first-letter:btn-xs lg:btn-sm" onClick={() => {setPaginacion(paginacion - 2)}}>{paginacion - 2}</button>}
                    {((paginacion - 1) <= 0) ? "" : <button className="btn btn-outline btn-secondary btn-xs lg:btn-sm" onClick={() => {setPaginacion(paginacion - 1)}}>{paginacion - 1}</button>}
                    <button className="btn btn-xs lg:btn-sm btn-secondary">{paginacion}</button>
                    {(cantidad > (paginacion * 10))? <button className="btn btn-outline btn-secondary btn-xs lg:btn-sm" onClick={() => {setPaginacion(paginacion + 1)}}>{paginacion + 1}</button> : ""}
                    {(cantidad > ((paginacion+1) * 10))? <button className="btn btn-outline btn-secondary btn-xs lg:btn-sm" onClick={() => {setPaginacion(paginacion + 2)}}>{paginacion + 2}</button> : ""}
                    {(paginacion >= (cantidad/10))? "" : <button className="btn btn-outline btn-secondary btn-xs lg:btn-sm" onClick={() => {setPaginacion(paginacion + 1)}}>»</button>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                {/* MOSTRAR productos EN VARIABLE productos */}
                {
                  productos.map((producto) =>(
                  <div key={producto.id} className="w-9/12 lg:flex drop-shadow-md my-6">
                    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                    style={{backgroundImage: 'url("'+producto.img+'")'}}
                    >
                    </div>
                    <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                      <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                          <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                          </svg>
                          {producto.cantidad}
                        </p>
                        <p className="text-blue-600 font-bold text-xl mb-2 cursor-pointer"
                        >{producto.nombre}</p>
                         <p className="text-gray-800 font-bold text-xl mb-2"
                        >Grupo: </p><span className = "text-gray-900 text-base">{producto.tipo}</span>
                      </div>
                      
                      <div className="flex">
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Calorías:</p>
                          <p className="text-gray-600">{producto.calorias}</p>
                        </div>
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Proteínas:</p>
                          <p className="text-gray-600">{producto.proteinas}</p>
                        </div>
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Grasas:</p>
                          <p className="text-gray-600">{producto.grasas}</p>
                        </div>
                        <button onClick={() => {agregarProducto(producto.id)}} className="btn btn-secondary btn-sm">
                            Registrar producto
                        </button>
                      </div>
                    </div>
                  </div>
                ))
                }
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
    

    );
}

export default SeleccionarEjercicio;