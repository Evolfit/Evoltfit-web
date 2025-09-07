import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "/components/Navbar";
import supabase from "../config/supabaseClient";
import Footer from "/components/Footer";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import { subDays, format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function VisualizadorProgreso() {
  const router = useRouter();
  let rutinaId = router.query.rutinaId;
  
  const [sesion, setSesion] = useState(null);
  const [opCal, setOpCal] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [metaCalorias, setMetaCalorias] = useState(null);
  const [sumatoriaCalorias, setSumatoriaCalorias] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [userID, serUserID] = useState("");
  const [volumenTotal, setVolumenTotal] = useState(0);
  const [volumenEjercicio, setVolumenEjercicio] = useState([]);
  const [volumenDiario, setVolumenDiario] = useState([]);
  const handleSelectChange = (event) => {
    setOpCal(event.target.value);
  };
  const [graphicData, setGraphicData] = useState([]);
  const [graphicData2, setGraphicData2] = useState([]);
  const [graphicData3, setGraphicData3] = useState([]);

  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- -----------Seccion Modelo--------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  const [modelocarga, setModelocarga] = useState(true);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(rutinaId);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
  const [abdomen, setAbdomen] = useState(255);
  const [oblicuos, setOblicuos] = useState(255);
  const [antebrazos, setAntebrazos] = useState(255);
  const [biceps, setBiceps] = useState(255);
  const [triceps, setTriceps] = useState(255);
  const [hombros, setHombros] = useState(255);
  const [trapecio, setTrapecio] = useState(255);
  const [pecho, setPecho] = useState(255);
  const [cuadriceps, setCuadriceps] = useState(255);
  const [pantorrillas, setPantorrillas] = useState(255);
  const [isquiotibiales, setIsquiotibiales] = useState(255);
  const [dorsales, setDorsales] = useState(255);
  const [gluteos, setGluteos] = useState(255);
  const [espaldaBaja, setEspaldaBaja] = useState(255);
  

  //Para cargar La rutina
  useEffect(() => {
    if (userID) {
      // solo cargar las rutinas si userID tiene un valor válido
      cargar_rutinas();
    }
  }, [userID]);
  //Para cargar La rutina
  useEffect(() => {
    if (rutinas) {
      // solo cargar las rutinas si userID tiene un valor válido
      //console.log("carga ejercicios");
      cargar_ejercicios();
    }
  }, [rutinas]);
  //Para cargar los Ejercicios

  //Carga La rutina
  async function cargar_rutinas() {
    let query = supabase
      .from("rutinas")
      .select("id,nombre")
      .eq("usuario", userID);
    const data2 = await query;
    //console.log("Rutinas")
    //console.log(data2.data);
    if (data2.data.length === 0) {
      setModelocarga(false);
    } else {
      setRutinas(data2.data);
    }
  }
  async function cargar_ejercicios() {
    if (rutinas.length > 0) {
      const ejerciciosPorRutina = {};
      for (let i = 0; i < rutinas.length; i++) {
        const { data, error } = await supabase
          .from("rutinas_ejercicio")
          .select(
            `
            id,
            ejercicio(
              nombre,
              musculo_primario,
              musculo_otros
            )
          `
          )
          .eq("rutina", rutinas[i].id);
        if (error) {
          //console.log(`ERROR: Hubo un error al recuperar los ejercicios de la rutina ${rutinas[i].id}.`);
          //console.log(error);
        } else {
          //console.log(`Ejercicios de la rutina ${rutinas[i].id}:`);
          //console.log(data);
          ejerciciosPorRutina[rutinas[i].id] = data;
        }
      }
      //console.log('Ejercicios por rutina:');
      //console.log(ejerciciosPorRutina);
      setEjerciciosRutina(ejerciciosPorRutina);
      setModelocarga(false);
      //console.log("%%%%%%%%%%%%%% RutinaIndex: " + rutinaId)
      if (!rutinaId) {
        rutinaId = "Ninguna"
      }
      else{
        opcion_rutina({
          target:{
            value: rutinaId
          }
        }, ejerciciosPorRutina)
      }
    }
  }

  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------Logica Pintar Mono------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  const musculos = {
    Abdomen: 0,
    Oblicuos: 0,
    Antebrazos: 0,
    Biceps: 0,
    Triceps: 0,
    Hombros: 0,
    Trapecio: 0,
    Pecho: 0,
    Cuadriceps: 0,
    Pantorrillas: 0,
    Isquiotibiales: 0,
    Dorsales: 0,
    Gluteos: 0,
    "Espalda Baja": 0,
  };
  function opcion_rutina(event, ejerciciosRutina) {
    restaurarMusculos();
    //Variables
    const opcionSeleccionada = event.target.value;
    //console.log(opcionSeleccionada);
    setOpcionSeleccionada(opcionSeleccionada);

    if (opcionSeleccionada !== "Ninguna") {
      const contenidoArray = Object.values(
        ejerciciosRutina[opcionSeleccionada]
      );
      // Iteramos sobre el array de objetos "contenidoArray"
      // Iteramos sobre el array de objetos "contenidoArray"
      contenidoArray.forEach((ejercicio) => {
        const musculoPrimario = ejercicio.ejercicio.musculo_primario;
        // Sumamos 20 al músculo primario y ajustamos a 255 si supera este valor
        musculos[musculoPrimario] += 60;
        if (musculos[musculoPrimario] > 255) musculos[musculoPrimario] = 255;

        ejercicio.ejercicio.musculo_otros.forEach((musculoSecundario) => {
          // Sumamos 5 al músculo secundario y ajustamos a 255 si supera este valor
          musculos[musculoSecundario] += 30;
          if (musculos[musculoSecundario] > 255)
            musculos[musculoSecundario] = 255;
        });
      });
      //console.log(contenidoArray);
      //console.log(musculos);

      // Restar valores
      setAbdomen((prevVal) => prevVal - musculos.Abdomen);
      setOblicuos((prevVal) => prevVal - musculos.Oblicuos);
      setAntebrazos((prevVal) => prevVal - musculos.Antebrazos);
      setBiceps((prevVal) => prevVal - musculos.Biceps);
      setTriceps((prevVal) => prevVal - musculos.Triceps);
      setHombros((prevVal) => prevVal - musculos.Hombros);
      setTrapecio((prevVal) => prevVal - musculos.Trapecio);
      setPecho((prevVal) => prevVal - musculos.Pecho);
      setCuadriceps((prevVal) => prevVal - musculos.Cuadriceps);
      setPantorrillas((prevVal) => prevVal - musculos.Pantorrillas);
      setIsquiotibiales((prevVal) => prevVal - musculos.Isquiotibiales);
      setDorsales((prevVal) => prevVal - musculos.Dorsales);
      setGluteos((prevVal) => prevVal - musculos.Gluteos);
      setEspaldaBaja((prevVal) => prevVal - musculos["Espalda Baja"]);
    } else {
      //console.log("No se seleccionó ninguna opcion")
      restaurarMusculos();
    }
  }
  function restaurarMusculos() {
    setAbdomen(255);
    setOblicuos(255);
    setAntebrazos(255);
    setBiceps(255);
    setTriceps(255);
    setHombros(255);
    setTrapecio(255);
    setPecho(255);
    setCuadriceps(255);
    setPantorrillas(255);
    setIsquiotibiales(255);
    setDorsales(255);
    setGluteos(255);
    setEspaldaBaja(255);
  }
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- -----------Seccion Modelo--------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  var today = new Date();

  // getDate() Regresa el día del mes (Desde 1 a 31)
  var day = today.getDate();
  // getMonth() Regresa el mes (Desde 0 a 11)
  var month = today.getMonth() + 1;
  // getFullYear() Regresa el año actual
  var year = today.getFullYear();

  // Formatos de las fechas
  // console.log(`${year}-${month}-${day}`);
  // console.log(`${day}/${month}/${year}`)

  var fecha_Visual = `${day}/${month}/${year}`;

  var sumC = 0
  var sumP = 0
  var sumG = 0
  const fechasAnteriores = [];

  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, []);

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      serUserID(data.session.user.id);
      obtenerPerfil(data.session.user.id);
      getSetsVolumen(data.session.user.id)
      calcularFechas();
      obtenerRegistrosCaloricos(data.session, fechasAnteriores);
      obtenerMeta(data.session);
    } else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      router.push('/login')
    }
  };

  function calcularFechas() {
    for (let i = 0; i <= 4; i++) {
      const fecha = subDays(today, i); // Restar días a la fecha actual
      const fechaFormateada = format(fecha, "yyyy-MM-dd");
      fechasAnteriores.push(fechaFormateada); // Agregar la fecha formateada al array de fechas anteriores
    }

    //console.log(fechasAnteriores)
  }

  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB

  async function getSetsVolumen(userId) {
    let haceSieteDias = String(format(subDays(today, 7), "MM/dd/yyyy"))
    //console.log(haceSieteDias)

    let query = supabase
    .from('progreso_sets')
    .select(`
      id,
      usuario,
      ejercicio (
        id,
        musculo_primario
      ),
      tipo_set,
      reps,
      peso,
      created_at
    `)
    .eq('usuario', userId)
    .gt('created_at', haceSieteDias)
    .order('created_at', { ascending: true })

    const data = await query
    
    //console.log(data.data)
    calcularVolumen(data.data)
  }

  async function calcularVolumen(sets) {
    //console.log(sets)
    let volumenTotal = 0
    let ejercicios = []
    let volumen = []

    let dia = []
    let volumenDia = []

    for (let index = 0; index < sets.length; index++) {
      if (sets[index].ejercicio.musculo_primario !== 'Cardio') {
        volumenTotal += (sets[index].reps * sets[index].peso)

        //console.log(format(new Date(sets[index].created_at), "dd/MM/yy"))
        //Volumen por Día
        if(!dia.includes(format(new Date(sets[index].created_at), "dd/MM/yy"))){
          dia.push(format(new Date(sets[index].created_at), "dd/MM/yy"))
          volumenDia.push(sets[index].reps * sets[index].peso)
        }
        else{
          let indexDia = dia.indexOf(format(new Date(sets[index].created_at), "dd/MM/yy"))
          volumenDia[indexDia] += sets[index].reps * sets[index].peso
        }
      }
      
      //Volumen Por Ejercicio
      if (!ejercicios.includes(sets[index].ejercicio.id)) {
        ejercicios.push(sets[index].ejercicio.id)
        volumen.push(sets[index].reps * sets[index].peso)
      }
      else{
        let indexEjercicio = ejercicios.indexOf(sets[index].ejercicio.id)
        volumen[indexEjercicio] += sets[index].reps * sets[index].peso
      }
    }

    let volumenEjercicios = []

    for (let index = 0; index < ejercicios.length; index++) {
      const { data, error } = await supabase
      .from('ejercicios')
      .select('*')
      .eq('id', ejercicios[index])

      if (error) {
        //console.log('ERROR: No se encontró el ejercicio.')
        //console.log(error)
      }
      else{
        volumenEjercicios.push({
          ejercicio: data[0],
          volumen: volumen[index]
        })
      }
    }

    let volumenDiario = []

    for (let index = 0; index < dia.length; index++) {
      volumenDiario.push({
        dia: dia[index],
        volumen: volumenDia[index]
      })
    }

    //console.log(volumenTotal + ' lbs')
    //console.log('Volumen por Ejercicio:')
    //console.log(volumenEjercicios)
    //console.log('Volumen por Dia:')
    //console.log(volumenDiario)

    if (volumenEjercicios.length == 0){
      volumenEjercicios = null
    }
    if (volumenDiario.length == 0){
      volumenDiario = null
    }

    setVolumenTotal(volumenTotal)
    setVolumenEjercicio(volumenEjercicios)
    setVolumenDiario(volumenDiario)
  }

  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB
  //AKJEFBNAOIHJSEBFAHUOSEBFUHASEBFAUISOHEBFIAUSEHBFASEIUHFBASEUHFB

  async function obtenerRegistrosCaloricos(session, fechasAnteriores) {
    var sumatoriaCal = []
    var sumatoriaPro = []
    var sumatoriaGra = []

    var ejecutar = true;
    if (ejecutar == true) {
      let { data: res, err } = await supabase
        .from("calorias_productos_totales")
        .select("*")
        .match({
          usuario: session.user.id,
          fecha_agregadoFormat: fechasAnteriores[0],
        });

      if (err) {
        //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
        //console.log(err);
      } else {
        //console.log(res);
        if (res != undefined || res != 0) {
          for (var i = 0; i <= res.length - 1; i++) {
            sumC = sumC + res[i].calorias;
            sumP = sumP + res[i].proteinas;
            sumG = sumG + res[i].grasas;
          }
          setSumatoriaCalorias(sumC)
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
          sumC = 0;
          sumP = 0;
          sumG = 0;
          //console.log(sumatoriaCal[0])
        } else {
          sumC = 0
          sumP = 0
          sumG = 0
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
        }
      }
    }

    if (ejecutar == true) {
      let { data: res, err } = await supabase
        .from("calorias_productos_totales")
        .select("*")
        .match({
          usuario: session.user.id,
          fecha_agregadoFormat: fechasAnteriores[1],
        });

      if (err) {
        //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
        //console.log(err);
      } else {
        //console.log(res);
        if (res != undefined || res != 0) {
          for (var i = 0; i <= res.length - 1; i++) {
            sumC = sumC + res[i].calorias;
            sumP = sumP + res[i].proteinas;
            sumG = sumG + res[i].grasas;
          }
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
          sumC = 0;
          sumP = 0;
          sumG = 0;
          //console.log(sumatoriaCal[0])
        } else {
          sumC = 0
          sumP = 0
          sumG = 0
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
        }
      }
    }

    if (ejecutar == true) {
      let { data: res, err } = await supabase
        .from("calorias_productos_totales")
        .select("*")
        .match({
          usuario: session.user.id,
          fecha_agregadoFormat: fechasAnteriores[2],
        });

      if (err) {
        //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
        //console.log(err);
      } else {
        //console.log(res);
        if (res != undefined || res != 0) {
          for (var i = 0; i <= res.length - 1; i++) {
            sumC = sumC + res[i].calorias;
            sumP = sumP + res[i].proteinas;
            sumG = sumG + res[i].grasas;
          }
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
          sumC = 0;
          sumP = 0;
          sumG = 0;
          //console.log(sumatoriaCal[0])
        } else {
          sumC = 0
          sumP = 0
          sumG = 0
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
        }
      }
    }

    if (ejecutar == true) {
      let { data: res, err } = await supabase
        .from("calorias_productos_totales")
        .select("*")
        .match({
          usuario: session.user.id,
          fecha_agregadoFormat: fechasAnteriores[3],
        });

      if (err) {
        //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
        //console.log(err);
      } else {
        //console.log(res);
        if (res != undefined || res != 0) {
          for (var i = 0; i <= res.length - 1; i++) {
            sumC = sumC + res[i].calorias;
            sumP = sumP + res[i].proteinas;
            sumG = sumG + res[i].grasas;
          }
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
          sumC = 0;
          sumP = 0;
          sumG = 0;
          //console.log(sumatoriaCal[0])
        } else {
          sumC = 0
          sumP = 0
          sumG = 0
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
        }
      }
    }

    if (ejecutar == true) {
      let { data: res, err } = await supabase
        .from("calorias_productos_totales")
        .select("*")
        .match({
          usuario: session.user.id,
          fecha_agregadoFormat: fechasAnteriores[4],
        });

      if (err) {
        //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
        //console.log(err);
      } else {
        //console.log(res);
        if (res != undefined || res != 0) {
          for (var i = 0; i <= res.length - 1; i++) {
            sumC = sumC + res[i].calorias;
            sumP = sumP + res[i].proteinas;
            sumG = sumG + res[i].grasas;
          }
          
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
          sumC = 0;
          sumP = 0;
          sumG = 0;
        } else {
          sumC = 0
          sumP = 0
          sumG = 0
          sumatoriaCal.push(sumC);
          sumatoriaPro.push(sumP);
          sumatoriaGra.push(sumG);
        }
      }
    }

    construirDatos(sumatoriaCal, sumatoriaPro, sumatoriaGra);
  }

  function construirDatos(sumatoriaCal, sumatoriaPro, sumatoriaGra) {
    //console.log(sumatoriaCal);

    const DatosGrafica = [
      {
        fecha: fechasAnteriores[4],
        TotalCaloríasAlDía: sumatoriaCal[4],
      },

      {
        fecha: fechasAnteriores[3],
        TotalCaloríasAlDía: sumatoriaCal[3],
      },

      {
        fecha: fechasAnteriores[2],
        TotalCaloríasAlDía: sumatoriaCal[2],
      },

      {
        fecha: fechasAnteriores[1],
        TotalCaloríasAlDía: sumatoriaCal[1],
      },

      {
        fecha: fechasAnteriores[0],
        TotalCaloríasAlDía: sumatoriaCal[0],
      },
    ];

    const DatosGrafica2 = [
      {
        fecha: fechasAnteriores[4],
        TotalProteinasAlDía: sumatoriaPro[4],
      },

      {
        fecha: fechasAnteriores[3],
        TotalProteinasAlDía: sumatoriaPro[3],
      },

      {
        fecha: fechasAnteriores[2],
        TotalProteinasAlDía: sumatoriaPro[2],
      },

      {
        fecha: fechasAnteriores[1],
        TotalProteinasAlDía: sumatoriaPro[1],
      },

      {
        fecha: fechasAnteriores[0],
        TotalProteinasAlDía: sumatoriaPro[0],
      },
    ];

    const DatosGrafica3 = [
      {
        fecha: fechasAnteriores[4],
        TotalGrasasAlDía: sumatoriaGra[4],
      },

      {
        fecha: fechasAnteriores[3],
        TotalGrasasAlDía: sumatoriaGra[3],
      },

      {
        fecha: fechasAnteriores[2],
        TotalGrasasAlDía: sumatoriaGra[2],
      },

      {
        fecha: fechasAnteriores[1],
        TotalGrasasAlDía: sumatoriaGra[1],
      },

      {
        fecha: fechasAnteriores[0],
        TotalGrasasAlDía: sumatoriaGra[0],
      },
    ];


    //console.log(DatosGrafica3);
    setGraphicData(DatosGrafica);
    setGraphicData2(DatosGrafica2);
    setGraphicData3(DatosGrafica3);
  }

 

  async function obtenerMeta(session) {
    let { data: res, err } = await supabase
      .from("calorias_metas")
      .select("cals_meta")
      .eq("usuario", session.user.id);

    if (err) {
      //console.log("ERROR: Hubo un error obteniendo la meta del ususario");
      //console.log(err);
    } else {
      if (res.length == 0) {
        //console.log("El usuario no tiene una meta establecida");
        //console.log(res);
      } else {
        //console.log("Meta obtenida exitosamente");
        //console.log(res)
        setMetaCalorias(res[0].cals_meta);
      }
    }
  }

  const obtenerPerfil = async (idUsuario) => {
    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", idUsuario);

    if (error) {
      //console.log("ERROR: No se pudo conseguir el perfil.");
    } else {
      //console.log(data[0])
      setPerfil(data[0]);
      //console.log(data[0]);
    }
  };

  return (
    <div className="bg-stone-100 w-full" data-theme="emerald">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="relative min-h-[75vh] flex flex-col items-center w-11/12 xs:w-9/12 mx-auto">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="w-full">
          <h2 className="text-center text-3xl font-semibold text-blue-600 lg:text-4xl">
            Sigue tu progreso
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-16 mt-16 xl:grid-cols-2 place-items-center w-full">
          {/* Musculos trabajados */}

          <div className="bg-white flex flex-col bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
            <div className="w-full px-2">
              <h2 className="text-xl text-blue-500 xl:text-2xl font-semibold">
                ¿Cuánto trabaja tu rutina? - <span className="text-green-600">EvoltFit Plus</span>
              </h2>
              <div className="divider my-0"></div>
              <select
                id="opciones"
                className="select select-secondary w-full text-base border-0 font-normal rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 shadow-gray-200"
                onChange={() => {opcion_rutina(event, ejerciciosRutina)}}
                value={opcionSeleccionada}
                defaultValue={opcionSeleccionada}
              >
                <option value="Ninguna" id="Ninguna" hidden>Selecciona una Rutina</option>
                {rutinas.length !== 0 ? (
                  rutinas.map((rutina, index) => (
                    <option key={index} id={rutina.id} value={rutina.id}>
                      {rutina.nombre}
                    </option>
                  ))
                ) : (
                  <option value="Ninguna">No hay rutinas</option>
                )}
              </select>
            </div>
            {rutinas.length !== 0 ? 
            (
            <div className="h-full w-full">
              {modelocarga ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "39vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="loader"></div>
                </div>
                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Cargando...
                </p>
              </div>
            ) : (
              <div className="flex h-full w-full">
                {""}
                {/* Loading */}
                <div className="body-map2 flex-auto h-full w-full" id="body-map2">
                  <div id="male-body-maps" className="flex items-center scale-[1.35] sm:scale-125 body-map__container2 h-full w-full">
                    <div className="body-map__body2">
                      <svg
                        height="100%"
                        viewBox="0 0 673 1200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${abdomen}, ${Math.round(
                              80 + (abdomen / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Abdomen"
                        >
                          <path
                            d="M384.32 490.61C386.41 457.79 388.65 408.87 388.74 397.67C388.79 392.09 388.67 389.6 388.58 387.74L388.56 387.35C388.5 385.83 388.44 384.62 388.54 382.23C388.56 381.7 388.59 381.18 388.62 380.71C388.64 380.58 388.64 380.45 388.64 380.34C388.68 379.72 388.71 379.12 388.76 378.55L388.81 378.04C388.83 377.82 388.84 377.62 388.88 377.39C389.59 370 391.12 365.02 392.36 361.01L392.47 360.64C393.98 355.77 394.81 353.08 393.26 349.6C391.24 345.04 385.88 341.08 376.39 337.12C376.36 337.11 376.32 337.1 376.29 337.09C376.29 337.09 376.29 337.09 376.26 337.07C374.72 336.53 373.1 335.9 371.46 335.19C371.42 335.17 371.39 335.16 371.33 335.14C360.54 331.16 346.9 328.38 340.97 332.51C338.84 334 337.8 336.3 337.8 339.54C337.8 340.28 337.2 340.88 336.42 340.89C336.33 340.86 336.19 340.85 336.1 340.89C335.36 340.89 334.76 340.29 334.76 339.55C334.76 336.32 333.72 334.02 331.57 332.52C329.69 331.21 321.97 327.54 301.28 335.13L301.18 335.17L301.1 335.2C299.5 335.9 297.87 336.54 296.23 337.1H296.21C296.21 337.1 296.17 337.12 296.16 337.13C286.67 341.09 281.31 345.05 279.31 349.61C277.75 353.12 278.59 355.82 280.11 360.73C281.31 364.54 282.95 369.77 283.7 377.43C283.83 378.3 283.91 379.28 283.93 380.4C283.94 380.48 283.94 380.57 283.94 380.7C283.98 381.21 284.01 381.72 284.03 382.25C284.13 384.82 284.09 386.01 283.99 387.8C283.9 389.62 283.78 392.11 283.83 397.69C283.94 409.23 286.19 458.22 288.25 490.63C291.6 543.3 323.93 583.5 336.14 583.49C336.19 583.51 336.25 583.51 336.31 583.51C336.36 583.51 336.41 583.51 336.45 583.49C348.6 583.49 380.92 543.3 384.28 490.62L384.32 490.61ZM291.68 377.57C291.08 377.57 290.56 377.18 290.39 376.6C290.18 375.9 290.59 375.16 291.3 374.94C305.76 370.74 315.58 368.2 330 368.49C334.47 368.47 334.8 361.56 334.8 351.03C334.8 350.29 335.4 349.69 336.18 349.69C336.27 349.72 336.41 349.73 336.49 349.69C337.23 349.69 337.83 350.29 337.83 351.03C337.83 361.57 338.17 368.47 342.66 368.49C357.04 368.2 366.87 370.74 381.31 374.93C381.66 375.04 381.94 375.27 382.12 375.58C382.29 375.89 382.33 376.25 382.23 376.59C382.04 377.3 381.26 377.71 380.57 377.51C367.11 373.59 357.74 371.15 344.95 371.15C344.21 371.15 343.46 371.15 342.7 371.17C339.84 371.15 337.89 369.72 336.73 366.78C336.6 366.45 336.05 366.45 335.92 366.78C334.74 369.76 332.86 371.16 330 371.17C315.97 370.87 306.3 373.36 292.05 377.51C291.95 377.54 291.83 377.56 291.69 377.56L291.68 377.57ZM369.88 378.6C369.79 378.95 369.56 379.25 369.25 379.43C368.95 379.6 368.59 379.65 368.25 379.55L366.97 379.22C361.69 377.83 352.87 375.5 345.68 376.72C339.05 377.85 337.84 381.39 337.84 387.95C337.84 388.69 337.24 389.29 336.46 389.29C336.41 389.27 336.35 389.27 336.29 389.27C336.24 389.27 336.19 389.27 336.15 389.29C335.4 389.29 334.81 388.7 334.81 387.95C334.81 381.39 333.59 377.86 326.95 376.72C319.75 375.5 310.9 377.84 305.62 379.23L304.37 379.55C304.03 379.64 303.68 379.6 303.37 379.43C303.06 379.25 302.83 378.96 302.74 378.6C302.55 377.87 302.98 377.15 303.71 376.96L304.92 376.64C310.41 375.18 319.59 372.73 327.41 374.07C331.62 374.78 334.41 376.51 335.94 379.35C336.09 379.63 336.56 379.63 336.71 379.35C338.24 376.51 341.03 374.78 345.24 374.07C353.03 372.73 362.22 375.18 367.71 376.64L368.93 376.96C369.65 377.15 370.07 377.87 369.88 378.59V378.6ZM293.5 423.27C293.25 423.01 293.12 422.67 293.12 422.31C293.12 421.93 293.28 421.57 293.55 421.33C293.8 421.1 294.13 420.98 294.47 421L295.96 421.02C310.93 421.27 325.07 421.51 332.23 417.45C334.4 416.23 334.82 413.46 334.95 410.87C334.88 409.36 334.92 407.73 334.97 406.17L334.92 404.53C334.83 402.44 334.79 400.7 334.79 399.06C334.79 398.32 335.39 397.72 336.17 397.72C336.26 397.75 336.39 397.75 336.48 397.72C337.22 397.72 337.82 398.32 337.82 399.06C337.82 401.02 337.74 402.97 337.68 404.58C337.66 405.03 337.65 405.46 337.65 405.91C337.7 407.59 337.74 409.37 337.65 411.07C337.85 414.58 338.67 416.48 340.37 417.44C347.53 421.5 361.67 421.26 376.63 421.01L378.15 420.99C378.48 420.97 378.79 421.08 379.04 421.31C379.32 421.56 379.48 421.93 379.49 422.29C379.49 423.03 378.89 423.65 378.16 423.67L376.69 423.69C373.67 423.75 369.73 423.81 365.99 423.81C355.71 423.81 345.32 423.32 339.04 419.77C338.05 419.2 337.25 418.45 336.65 417.55C336.57 417.43 336.43 417.35 336.29 417.35C336.14 417.35 336 417.43 335.93 417.55C335.36 418.45 334.59 419.18 333.56 419.77C327.29 423.33 316.9 423.82 306.61 423.82C302.86 423.82 298.93 423.75 295.93 423.7L294.44 423.68C294.09 423.68 293.75 423.53 293.5 423.27ZM369.92 427.61C369.87 427.98 369.68 428.31 369.39 428.53C369.12 428.74 368.78 428.82 368.43 428.77L368.25 428.75C362.71 428.11 353.43 427.04 345.29 427.17C338.96 427.24 337.83 430.51 337.83 439.66C337.83 440.4 337.23 441 336.45 441C336.4 440.98 336.34 440.97 336.28 440.97C336.23 440.97 336.18 440.97 336.14 440.99C335.4 440.99 334.8 440.39 334.8 439.65C334.8 430.5 333.67 427.23 327.32 427.16C319.22 427.04 309.97 428.1 304.44 428.73L304.17 428.76C303.44 428.85 302.78 428.33 302.69 427.6C302.61 426.86 303.14 426.19 303.87 426.11C309.51 425.45 318.94 424.36 327.36 424.48C331.61 424.54 334.41 426 335.93 428.93C336.08 429.22 336.55 429.22 336.7 428.93C338.22 426 341.02 424.54 345.27 424.48C353.81 424.37 363.52 425.5 368.75 426.11C369.48 426.19 370.01 426.86 369.93 427.59L369.92 427.61ZM295 470.9C294.76 470.64 294.63 470.3 294.64 469.95C294.65 469.58 294.82 469.23 295.09 468.98C295.34 468.75 295.68 468.64 296.02 468.66C301.12 468.84 304.81 469.09 308.07 469.3L309.04 469.36C314.3 469.75 318.85 470.08 327.57 469.82C333.52 469.39 334.79 467.8 334.79 451.93C334.79 451.19 335.39 450.59 336.17 450.58C336.26 450.61 336.4 450.62 336.49 450.58C337.23 450.58 337.83 451.18 337.83 451.92C337.83 468.54 339.46 469.4 345.14 469.83C353.76 470.07 358.3 469.73 363.56 469.35L364.53 469.28C367.79 469.06 371.48 468.81 376.6 468.63C376.92 468.6 377.24 468.71 377.5 468.94C377.79 469.19 377.96 469.55 377.97 469.92C377.98 470.27 377.85 470.61 377.61 470.87C377.36 471.13 377.03 471.28 376.67 471.3C371.13 471.51 367.25 471.78 363.75 472.03C359.57 472.32 355.97 472.58 350.66 472.58C348.59 472.58 346.79 472.55 344.99 472.49C340.44 472.15 338.04 470.74 336.73 467.64C336.66 467.48 336.5 467.37 336.33 467.37C336.16 467.37 336 467.47 335.93 467.63C334.6 470.73 332.21 472.14 327.7 472.48C325.86 472.54 324.02 472.57 321.93 472.57C316.61 472.57 312.84 472.3 308.86 472.02C305.36 471.77 301.47 471.5 295.94 471.29C295.58 471.28 295.25 471.13 295.01 470.87L295 470.9ZM337.83 570.5C337.83 571.24 337.23 571.84 336.49 571.84H336.14C335.4 571.84 334.8 571.24 334.8 570.5V503.38C334.8 502.63 335.39 502.04 336.14 502.04H336.49C337.23 502.04 337.83 502.64 337.83 503.38V570.5ZM337.66 488.3C337.64 488.38 337.64 488.47 337.66 488.56C337.71 489.72 337.71 490.89 337.71 492.02V492.8C337.71 493.54 337.11 494.14 336.37 494.14H336.25C335.51 494.14 334.91 493.54 334.91 492.8V492.02C334.91 490.87 334.91 489.69 334.96 488.49V488.38C334.78 483.98 334.01 480.91 330.82 480.18C325.59 479 311.19 477.57 304.86 477.57C304.57 477.57 304.3 477.57 304.04 477.57C303.73 477.6 303.41 477.48 303.15 477.25C302.87 476.99 302.7 476.63 302.7 476.26C302.7 475.9 302.83 475.56 303.07 475.3C303.32 475.04 303.65 474.9 304.01 474.89C310.18 474.76 325.81 476.29 331.41 477.56C333.44 478.03 334.93 479.08 335.95 480.77C336.03 480.9 336.17 480.98 336.32 480.98C336.47 480.98 336.62 480.9 336.69 480.77C337.69 479.08 339.16 478.04 341.2 477.56C346.75 476.3 362.39 474.78 368.62 474.89C368.98 474.89 369.31 475.04 369.56 475.3C369.8 475.56 369.93 475.89 369.92 476.25C369.92 476.62 369.75 476.97 369.48 477.22C369.24 477.44 368.94 477.56 368.63 477.56C368.6 477.56 368.58 477.56 368.55 477.56C362.8 477.41 347.33 478.91 341.81 480.16C338.63 480.89 337.84 483.93 337.66 488.29V488.3Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${oblicuos}, ${Math.round(
                              80 + (oblicuos / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Oblicuos"
                        >
                          <path
                            d="M278.25 405.1L278.22 405.27L278.23 405.26L278.2 405.42L278.181 405.528C275.415 420.952 272.286 438.408 274.68 454.63C279.61 488.3 267.94 503.64 262.69 508.67C257.5 513.64 249.36 516.54 241.25 516.54C239.37 516.54 237.5 516.38 235.66 516.06C235.43 516.02 235.27 515.81 235.3 515.58C236.6 505.04 237.65 495.4 238.26 488.43C238.68 483.48 239.34 478.52 240.05 473.27L240.08 473.02L240.082 473.006C242.671 453.691 245.348 433.726 235.63 414.4C215.71 376.03 210.63 351.86 209.81 347.41V347.31C209.81 347.26 209.81 347.22 209.83 347.17C210.97 343.85 211.84 340.34 212.44 336.75C213.35 331.07 215.45 317.93 211.12 308.04C211.04 307.85 211.1 307.63 211.27 307.51C211.44 307.39 211.67 307.41 211.82 307.55C214.24 309.84 216.37 312.33 218.14 314.46C219.35 315.91 220.38 317.07 221.37 318.09C221.384 318.104 221.398 318.12 221.413 318.137C221.43 318.157 221.449 318.179 221.47 318.2C221.47 318.21 221.54 318.28 221.54 318.28C231.955 329.911 244.178 340.439 254.971 349.736L255.08 349.83L255.22 349.96L255.238 349.975C268.64 361.529 280.21 371.503 281.06 377.77C281.088 377.911 281.108 378.106 281.127 378.295L281.13 378.33V378.45C281.15 378.5 281.17 378.65 281.17 378.82C281.21 379.09 281.23 379.41 281.25 379.75L281.28 380.33C281.3 380.41 281.3 380.49 281.3 380.56C281.51 386.9 280 395.33 278.25 405.1Z"
                            fill="currentColor"
                          />
                          <path
                            d="M460.77 307.59C460.92 307.45 461.15 307.43 461.32 307.55L461.33 307.56C461.5 307.68 461.56 307.9 461.48 308.09C457.17 317.96 459.26 331.07 460.16 336.67L460.18 336.77C460.78 340.36 461.65 343.87 462.79 347.19C462.81 347.23 462.81 347.28 462.81 347.33V347.43C461.66 353.7 456.4 377.07 436.99 414.44C427.27 433.74 429.95 453.72 432.56 473.03V473.13C433.34 478.83 433.97 483.58 434.39 488.44C434.96 495.23 436.01 504.88 437.33 515.59C437.36 515.82 437.2 516.03 436.97 516.07C435.14 516.39 433.26 516.54 431.39 516.54C423.28 516.54 415.13 513.64 409.94 508.67C404.69 503.63 393.02 488.29 397.95 454.63C400.36 438.26 397.2 420.73 394.4 405.27L394.37 405.08C392.62 395.32 391.11 386.89 391.32 380.55C391.32 380.51 391.32 380.44 391.34 380.36C391.34 380.29 391.35 380.2 391.37 380.11C391.41 379.35 391.48 378.57 391.55 377.8C391.55 377.78 391.55 377.72 391.58 377.63C392.6 371.342 404.153 361.386 417.528 349.861L417.676 349.733C428.442 340.462 440.614 329.981 451.07 318.29L451.14 318.21C451.17 318.17 451.21 318.13 451.24 318.1C452.33 316.97 453.41 315.75 454.46 314.47C456.35 312.19 458.42 309.78 460.77 307.59Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${antebrazos}, ${Math.round(
                              80 + (antebrazos / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Antebrazos"
                        >
                          <path
                            d="M135.05 418.55C141.32 418.55 148.19 416.1 154.92 411.47V411.46C155.1 411.34 155.33 411.37 155.48 411.52C155.63 411.67 155.65 411.91 155.52 412.08C151.51 417.52 146.59 424.21 144.16 427.73C139.457 435.289 136.843 440.787 134.543 445.625L134.46 445.8L134.457 445.806C130.428 454.264 126.627 462.244 113.47 478.7C101.33 493.83 93.04 500.16 84.26 506.86L84.199 506.906C77.9179 511.692 71.4135 516.648 63.23 525.21C63.21 525.23 63.19 525.25 63.16 525.27C61.56 527.38 58.6 531.44 56.45 535.48C56.4 535.57 56.33 535.64 56.23 535.68C53.2 536.91 50.19 537.52 47.41 537.52C44.92 537.52 42.61 537.03 40.63 536.04C35.84 533.67 32.13 527.92 30.95 521.04C30.94 520.95 30.95 520.86 30.99 520.78C31.81 519.04 32.73 517.24 33.72 515.43C37.33 507.63 41.56 497.2 46.32 485.38L46.43 485.1C57.43 457.87 71.12 423.99 84.49 407.9C92.4 398.38 98.13 392.38 102.32 388L102.5 387.81C108.4 381.64 111.64 378.25 114.13 372.23C114.229 371.995 114.327 371.761 114.425 371.528C114.593 371.127 114.759 370.728 114.93 370.33L115.04 370.08C115.13 369.87 115.36 369.77 115.58 369.84C115.8 369.91 115.92 370.14 115.87 370.36C108.45 400.78 117.14 412.23 125.73 416.48C128.51 417.85 131.64 418.55 135.05 418.55Z"
                            fill="currentColor"
                          />
                          <path
                            d="M638.96 515.58C640.01 517.47 640.88 519.19 641.61 520.78C641.64 520.86 641.65 520.94 641.64 521.03C640.5 527.9 636.8 533.65 631.99 536.05C630.02 537.04 627.7 537.53 625.21 537.53C622.42 537.53 619.4 536.92 616.38 535.7C616.29 535.66 616.21 535.59 616.16 535.5C614.01 531.46 611.05 527.39 609.47 525.33C609.46 525.32 609.443 525.298 609.425 525.275C609.407 525.252 609.39 525.23 609.38 525.22C601.16 516.63 594.65 511.67 588.351 506.871L588.291 506.825C579.533 500.132 571.243 493.796 559.15 478.7C545.92 462.19 542.15 454.23 538.16 445.8L538.02 445.5L538.012 445.484C535.585 440.399 533.075 435.142 528.39 427.63C526.32 424.65 522.31 419.13 517.12 412.09C517 411.92 517.01 411.68 517.16 411.53C517.31 411.37 517.55 411.35 517.72 411.47C524.43 416.1 531.29 418.55 537.57 418.55C540.97 418.55 544.11 417.85 546.89 416.48C555.48 412.24 564.16 400.82 556.8 370.45C556.74 370.23 556.87 370 557.09 369.93C557.31 369.85 557.55 369.97 557.63 370.18L557.633 370.188C557.792 370.575 557.951 370.963 558.12 371.35C558.25 371.64 558.37 371.93 558.49 372.22C561.01 378.3 564.24 381.68 570.12 387.82L570.48 388.2L570.625 388.352C574.773 392.699 580.44 398.639 588.14 407.91C601.55 424.05 615.27 458.06 626.29 485.38L626.52 485.95C631.01 497.07 635.25 507.57 638.96 515.58Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${biceps}, ${Math.round(
                              80 + (biceps / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Biceps"
                        >
                          <path
                            d="M207.71 345.02C207.68 345.12 207.61 345.21 207.52 345.26V345.25C207.32 345.37 207.15 345.57 207.04 345.84C202.959 355.849 196 362.113 191.389 366.264L191.36 366.29C190.73 366.85 190.16 367.36 189.67 367.84C187.7 369.66 179.78 379.71 167.95 395.4C155.59 410.5 143.93 415.86 135.1 415.86C131.98 415.86 129.22 415.19 126.91 414.05C117.4 409.37 105.33 392.91 131.34 335.25C131.34 335.24 131.42 335.08 131.42 335.08C140.01 318.85 144.88 313.74 147.79 310.69L148.08 310.39C148.53 309.92 148.94 309.48 149.32 309.03C149.35 309 149.38 308.97 149.41 308.95C152.39 306.96 155.59 305.18 158.94 303.68C161.66 302.46 164.46 301.43 167.25 300.62C167.39 300.59 167.47 300.57 167.53 300.54C170.77 299.61 174.06 298.94 177.38 298.53C177.54 298.53 177.65 298.52 177.76 298.49C179.544 298.291 180.92 298.24 181.741 298.21L181.75 298.21C190.1 297.96 197.98 297.73 203.74 302.43C213.92 310.71 210.92 329.3 209.79 336.29L209.36 336.24L209.79 336.31C209.32 339.25 208.62 342.18 207.71 345.02Z"
                            fill="currentColor"
                          />
                          <path
                            d="M541.2 335.1C567.3 392.89 555.23 409.38 545.71 414.07L545.73 414.08C543.41 415.23 540.64 415.9 537.52 415.9C528.73 415.9 517.12 410.57 504.8 395.57C504.77 395.54 504.75 395.51 504.74 395.48C492.87 379.77 484.95 369.71 482.96 367.86C482.46 367.4 481.9 366.89 481.28 366.34C476.66 362.2 469.7 355.93 465.59 345.87C465.48 345.61 465.3 345.39 465.08 345.25C464.99 345.2 464.93 345.12 464.9 345.02C463.99 342.17 463.29 339.25 462.83 336.34L462.828 336.326C461.696 329.296 458.707 310.725 468.88 302.45C474.656 297.743 482.529 297.98 490.852 298.23L490.87 298.23C491.7 298.26 493.08 298.32 494.81 298.5C494.931 298.524 495.029 298.53 495.117 298.535C495.175 298.539 495.228 298.542 495.28 298.55C498.49 298.94 501.77 299.61 505.04 300.53C505.19 300.59 505.25 300.61 505.32 300.62C508.17 301.44 510.97 302.47 513.69 303.69C517.04 305.19 520.25 306.97 523.22 308.96L523.235 308.971C523.268 308.995 523.293 309.014 523.31 309.04C523.61 309.39 523.92 309.73 524.25 310.08C524.44 310.28 524.639 310.499 524.839 310.719L524.84 310.72L524.862 310.743C527.755 313.766 532.612 318.841 541.2 335.1Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${hombros}, ${Math.round(
                              80 + (hombros / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Hombros"
                        >
                          <path
                            d="M152.89 303.71C152.83 303.75 152.75 303.77 152.68 303.77H152.66C152.56 303.77 152.47 303.74 152.39 303.68C152.26 303.57 152.19 303.39 152.24 303.22C157.74 282.4 160.82 274.86 162.86 269.87L162.897 269.778C163.919 267.242 164.719 265.259 165.46 262.65C171.07 244.34 184.75 221.38 218.1 216C218.85 215.87 219.39 215.77 219.69 215.7L220.14 215.58C220.467 215.498 220.837 215.404 221.242 215.301C221.728 215.178 222.262 215.042 222.83 214.9C223.469 214.73 224.088 214.571 224.706 214.411L224.71 214.41L225.77 214.14C225.81 214.13 225.84 214.13 225.88 214.13C243.5 210.59 262.01 215.16 271.47 218.2C271.64 218.25 271.77 218.42 271.77 218.6C271.78 218.79 271.66 218.95 271.49 219.02C267.45 220.55 261.53 223.08 256.28 226.42C245.175 233.477 240.444 239.724 233.899 248.368L233.89 248.38C230.84 252.44 227.43 256.97 222.68 262.54L222.658 262.566C217.699 268.376 207.4 280.443 194.34 289.32C190.84 291.69 184.95 293.94 177.31 295.83H177.29C177.24 295.85 177.18 295.86 177.14 295.86C173.74 296.25 170.23 296.96 166.75 297.97C166.733 297.974 166.717 297.977 166.703 297.981C166.604 298.003 166.551 298.015 166.49 298.05C163.47 298.93 160.58 299.99 157.83 301.22C156.1 302.01 154.44 302.84 152.89 303.71Z"
                            fill="currentColor"
                          />
                          <path
                            d="M400.85 218.61C400.85 218.43 400.97 218.27 401.15 218.21L401.14 218.23C410.58 215.19 429.07 210.61 446.76 214.17C447.006 214.234 447.249 214.295 447.49 214.357C447.858 214.451 448.222 214.544 448.59 214.64L449.77 214.94L450.317 215.078C451.36 215.34 452.27 215.569 452.91 215.74C453.2 215.8 453.74 215.91 454.49 216.03C487.82 221.4 501.51 244.33 507.13 262.62C507.872 265.301 508.673 267.288 509.678 269.78L509.71 269.86C511.77 274.9 514.86 282.46 520.36 303.24C520.41 303.41 520.35 303.59 520.21 303.7C520.13 303.76 520.03 303.79 519.94 303.79C519.87 303.79 519.8 303.77 519.73 303.73C518.16 302.85 516.5 302.01 514.78 301.24C507.02 297.76 499.95 296.39 495.38 295.86C487.71 293.99 481.81 291.74 478.26 289.32C465.161 280.424 454.873 268.349 449.914 262.528L449.89 262.5C445.03 256.78 441.4 251.97 438.76 248.45L438.65 248.31C432.13 239.69 427.42 233.47 416.34 226.43C411.09 223.11 405.17 220.57 401.13 219.03C400.96 218.96 400.85 218.79 400.85 218.61Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${trapecio}, ${Math.round(
                              80 + (trapecio / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Trapecio"
                        >
                          <path
                            d="M395.89 217.17C395.84 217.17 395.75 217.15 395.75 217.15V217.14C384.68 213.38 379.06 209.6 379.06 199.34V178.65C379.06 178.48 379.16 178.32 379.32 178.25C379.48 178.18 379.66 178.21 379.79 178.33C382.83 181.15 388.48 186.15 392.19 188.01C395.081 189.475 402.834 192.729 409.776 195.641L410.13 195.79L412.34 196.72C412.95 196.977 413.555 197.233 414.15 197.484C417.946 199.085 421.335 200.515 422.96 201.25C425.92 202.61 430.04 205.78 433.67 208.64L433.91 208.83C434.02 208.918 434.128 209.002 434.233 209.084C434.367 209.188 434.497 209.289 434.62 209.39C434.75 209.51 434.81 209.71 434.75 209.88C434.69 210.06 434.52 210.17 434.34 210.17C433.89 210.16 433.451 210.16 433.001 210.16C415.031 210.16 399.12 215.95 396.05 217.14C396 217.17 395.94 217.17 395.89 217.17Z"
                            fill="currentColor"
                          />
                          <path
                            d="M276.58 217.15C273.44 215.93 256.81 209.87 238.27 210.18V210.19C238.07 210.19 237.91 210.08 237.85 209.9C237.79 209.72 237.85 209.53 237.99 209.41C238.029 209.378 238.07 209.345 238.111 209.312C238.287 209.169 238.477 209.014 238.68 208.86L238.93 208.66L238.933 208.658C241.963 206.278 246.531 202.69 249.64 201.27C251.51 200.43 255.73 198.65 260.2 196.77L262.48 195.81L262.846 195.657C269.784 192.745 277.531 189.494 280.44 188.03C283.94 186.28 289.1 181.8 292.82 178.35C292.95 178.23 293.13 178.2 293.29 178.27C293.45 178.34 293.55 178.5 293.55 178.67V199.36C293.55 209.61 287.93 213.39 276.88 217.16C276.84 217.18 276.79 217.18 276.74 217.18C276.68 217.18 276.63 217.17 276.58 217.15Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${pecho}, ${Math.round(
                              80 + (pecho / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Pecho"
                        >
                          <path
                            d="M277.532 219.782C277.578 219.768 277.624 219.754 277.67 219.74H277.66L277.85 219.68C282.69 218.25 291.6 215.63 307.32 217.12C334.48 219.71 334.79 236.91 334.79 237.64V287.27C334.79 297.21 331.34 306.75 325.08 314.13C318.19 322.23 309.8 328.48 300.15 332.7C300.141 332.703 300.129 332.708 300.115 332.713C300.082 332.727 300.036 332.746 299.98 332.76C298.18 333.44 296.71 334.01 295.37 334.57C295.35 334.58 295.32 334.6 295.32 334.6H295.29C288.29 337.01 281.02 338.18 273.77 338.18C255.58 338.18 237.53 330.82 224.21 317.22C224.14 317.16 224.08 317.1 224.03 317.03L223.98 316.98C223.932 316.928 223.885 316.876 223.838 316.825C223.679 316.653 223.527 316.488 223.38 316.31C223.32 316.23 223.26 316.18 223.21 316.14C223.16 316.11 223.12 316.08 223.09 316.05C222.13 315.02 221.16 313.92 220.2 312.75C213.51 304.62 205.11 295.9 190.2 295.44C190 295.43 189.83 295.28 189.79 295.08C189.75 294.88 189.86 294.68 190.05 294.6C192.28 293.66 194.23 292.63 195.85 291.53C209.29 282.42 219.75 270.14 224.78 264.23C229.196 259.042 232.486 254.704 235.386 250.879L235.59 250.61L236 250.06L236.02 250.034C242.629 241.268 246.991 235.483 257.72 228.68C264.15 224.59 271.91 221.64 275.96 220.25C276 220.23 276.05 220.22 276.11 220.2L276.69 220.02C276.75 219.99 276.79 219.97 276.85 219.97C276.869 219.964 276.887 219.958 276.906 219.954C276.917 219.951 276.929 219.95 276.94 219.95C276.953 219.947 276.967 219.941 276.982 219.936C277.013 219.924 277.049 219.91 277.09 219.91C277.236 219.872 277.382 219.827 277.532 219.782Z"
                            fill="currentColor"
                          />
                          <path
                            d="M372.63 332.76C372.54 332.74 372.44 332.69 372.44 332.69H372.42C362.8 328.48 354.41 322.23 347.51 314.13C341.26 306.77 337.82 297.23 337.82 287.27V237.61C337.81 237.61 337.77 232.46 342.02 227.28C346.71 221.57 354.54 218.15 365.29 217.13C380.986 215.63 389.895 218.259 394.676 219.669L394.68 219.67L394.95 219.75C395.15 219.82 395.35 219.88 395.54 219.93C395.58 219.93 395.63 219.95 395.69 219.97C395.7 219.97 395.79 220 395.79 220C395.83 220.01 395.87 220.02 395.92 220.04C395.94 220.05 396.03 220.08 396.05 220.08C396.16 220.12 396.26 220.15 396.37 220.18L396.51 220.23C396.547 220.241 396.582 220.253 396.616 220.265C396.677 220.287 396.737 220.307 396.8 220.32C400.85 221.72 408.53 224.66 414.88 228.7C425.617 235.498 429.988 241.297 436.595 250.063L436.6 250.07L437.03 250.64C439.98 254.53 443.32 258.93 447.88 264.29C452.95 270.24 463.4 282.49 476.75 291.54C478.37 292.64 480.32 293.67 482.55 294.61C482.74 294.69 482.85 294.89 482.81 295.09C482.78 295.3 482.6 295.45 482.4 295.45C467.48 295.9 459.09 304.62 452.39 312.76C451.52 313.84 450.6 314.86 449.5 316.06C449.5 316.07 449.48 316.09 449.48 316.09C449.47 316.1 449.455 316.112 449.44 316.125C449.425 316.137 449.41 316.15 449.4 316.16C449.34 316.2 449.3 316.23 449.25 316.3L449.03 316.55C448.98 316.603 448.931 316.657 448.882 316.71C448.784 316.817 448.687 316.923 448.58 317.03C448.59 317.04 448.51 317.12 448.44 317.19C435.13 330.8 417.05 338.17 398.85 338.17C391.6 338.17 384.32 337 377.32 334.58H377.28C377.276 334.576 377.271 334.574 377.266 334.572C377.257 334.57 377.246 334.57 377.24 334.57C375.57 333.88 373.9 333.24 372.63 332.76Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${cuadriceps}, ${Math.round(
                              80 + (cuadriceps / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Cuadriceps"
                        >
                          <path
                            d="M458.96 792.3L458.82 793.02L458.79 793.01C455.7 808.78 452.78 823.66 445.26 827.39C442.18 828.92 438.37 828.54 433.62 826.22C431.52 825.19 429.7 825.03 428.21 825.74C425.2 827.18 424.21 831.51 422.96 837L422.956 837.018C420.807 846.414 418.372 857.06 405.71 857.28H405.44C382.64 857.28 375.34 806.56 375.27 806.05C375.26 805.98 375.25 805.92 375.23 805.87C375.2 805.81 375.2 805.76 375.2 805.7C374.55 800.89 373.79 796.12 372.95 791.53V791.38L372.91 791.22C372.88 791.05 372.85 790.88 372.8 790.71C372.43 788.68 372.02 786.51 371.48 783.85L371.42 783.55C371.35 783.23 371.28 782.88 371.22 782.54C365.63 751.25 368.5 747.76 374.79 740.12L374.795 740.114C381.265 732.274 391.032 720.439 399.45 674.95C401.737 662.572 403.351 647.89 405.06 632.351L405.09 632.08L405.118 631.827C409.996 587.785 415.522 537.892 437.54 522.52C437.67 522.43 437.83 522.42 437.97 522.48C438.11 522.54 438.21 522.67 438.23 522.82C441.22 545.99 444.31 565.51 446.09 572.56L446.19 572.92C446.314 573.364 446.463 573.935 446.634 574.597L446.7 574.85C455.6 608.45 474.81 695.9 461.05 782.05V782.07C460.31 785.48 459.62 788.95 458.96 792.3Z"
                            fill="currentColor"
                          />
                          <path
                            d="M267.5 632.08C269.12 646.92 270.81 662.26 273.14 674.95H273.13C281.55 720.45 291.32 732.28 297.79 740.11L297.797 740.118C304.082 747.742 306.958 751.231 301.36 782.54C301.31 782.87 301.24 783.2 301.17 783.53C301.16 783.64 301.14 783.72 301.12 783.79C300.72 785.77 300.33 787.75 299.99 789.7L299.83 790.45C299.77 790.74 299.71 791.04 299.65 791.34C299.64 791.42 299.62 791.52 299.62 791.61C298.77 796.32 298.02 801.04 297.38 805.7C297.38 805.737 297.376 805.774 297.368 805.809C297.364 805.831 297.358 805.851 297.35 805.87C297.343 805.9 297.335 805.94 297.324 805.996C297.32 806.015 297.315 806.037 297.31 806.06C297.3 806.18 295.46 819.01 290.79 831.76C284.68 848.46 276.5 857.28 267.14 857.28H266.89C254.226 857.06 251.792 846.43 249.643 837.044L249.64 837.03L249.6 836.85C248.35 831.44 247.36 827.16 244.37 825.74C242.85 825.03 241.03 825.19 238.96 826.22C234.2 828.54 230.39 828.92 227.31 827.39C219.791 823.661 216.871 808.785 213.782 793.048L213.78 793.04L213.71 792.69L213.601 792.139C212.925 788.731 212.229 785.223 211.48 781.76C197.85 695.79 217.02 608.42 225.89 574.84C226.06 574.22 226.2 573.68 226.32 573.23L226.5 572.55C228.28 565.52 231.37 546.01 234.36 522.84C234.38 522.69 234.48 522.56 234.62 522.5C234.76 522.44 234.93 522.45 235.05 522.54C257.069 537.892 262.594 587.78 267.473 631.824L267.48 631.89L267.5 632.08Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${pantorrillas}, ${Math.round(
                              80 + (pantorrillas / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                          id="Pantorrillas"
                        >
                          <path
                            d="M213.13 880.79C213.65 879.35 214.06 878.18 214.36 877.22C219.58 878.81 222.24 881.96 226.36 889.29C225.671 901.305 223.421 919.666 221.458 935.675C220.998 939.426 220.554 943.049 220.15 946.43C218.66 958.9 213.28 974.49 201.61 983.81C201.488 983.915 201.362 984.013 201.237 984.104C201.147 984.169 201.058 984.231 200.97 984.29C196.03 928.87 208.12 894.82 213.13 880.79Z"
                            fill="currentColor"
                          />
                          <path
                            d="M446.26 889.29C450.38 881.96 453.04 878.82 458.26 877.22C458.57 878.18 458.97 879.35 459.49 880.79C464.49 894.82 476.59 928.87 471.65 984.29C471.44 984.15 471.22 983.99 471.01 983.81C459.34 974.48 453.96 958.9 452.47 946.43C452.066 943.049 451.622 939.427 451.162 935.676C449.199 919.667 446.949 901.305 446.26 889.29Z"
                            fill="currentColor"
                          />
                          <path
                            d="M419.322 902.906C418.618 902.747 417.894 902.558 417.19 902.32V902.3C412.25 900.74 407.39 897.7 402.91 893.4C403.53 898.32 402.73 906.81 400.35 927.92C394.241 972.272 398.539 978.278 402.688 984.077L402.69 984.08L402.759 984.178C404.278 986.317 405.847 988.527 406.95 992.28C406.99 992.4 407.02 992.53 407.07 992.65L407.819 992.047C418.013 983.845 426.766 976.803 425.38 954.81C424.524 941.224 422.33 925.11 420.55 912.034L420.546 912.01C420.104 908.758 419.687 905.695 419.322 902.906Z"
                            fill="currentColor"
                          />
                          <path
                            d="M269.71 893.41C265.24 897.71 260.37 900.74 255.43 902.31V902.33C254.72 902.56 253.99 902.76 253.28 902.92C252.915 905.717 252.496 908.791 252.052 912.054L252.05 912.065C250.27 925.14 248.076 941.255 247.22 954.84C245.834 976.833 254.587 983.875 264.781 992.077C265.03 992.277 265.28 992.478 265.53 992.68C265.54 992.656 265.55 992.631 265.559 992.606C265.573 992.569 265.586 992.531 265.598 992.494C265.618 992.432 265.635 992.37 265.65 992.31C266.758 988.53 268.337 986.317 269.862 984.178L269.91 984.11C274.07 978.3 278.36 972.3 272.25 927.95C269.87 906.84 269.07 898.35 269.69 893.43L269.71 893.41Z"
                            fill="currentColor"
                          />
                        </g>

                        <g className="body-map__model2">
                          <path
                            d="M342.66 368.05C357.13 367.77 366.96 370.31 381.44 374.53H381.43C382.37 374.8 382.91 375.79 382.64 376.73C382.42 377.51 381.71 378.01 380.94 378.01C380.77 378.01 380.6 377.99 380.44 377.94C366.28 373.82 356.65 371.33 342.68 371.61C339.38 371.59 337.44 369.79 336.31 366.96C335.18 369.79 333.26 371.6 329.97 371.61C315.96 371.33 306.33 373.82 292.17 377.94C292 377.99 291.83 378.01 291.67 378.01C290.9 378.01 290.2 377.51 289.97 376.73C289.7 375.79 290.24 374.8 291.18 374.53C305.66 370.31 315.49 367.77 330 368.05C334.04 368.04 334.35 361.3 334.35 351.03C334.35 350.05 335.15 349.25 336.13 349.25C336.151 349.25 336.172 349.252 336.193 349.256L336.219 349.26L336.224 349.261C336.236 349.263 336.248 349.265 336.261 349.266C336.277 349.268 336.294 349.27 336.31 349.27C336.37 349.26 336.43 349.25 336.49 349.25C337.48 349.25 338.27 350.05 338.27 351.03C338.27 361.3 338.57 368.04 342.66 368.05Z"
                            fill="currentColor"
                          />
                          <path
                            d="M305.74 379.65L304.48 379.98H304.51C303.57 380.23 302.59 379.66 302.35 378.71C302.1 377.77 302.67 376.8 303.62 376.55L304.86 376.22C310.39 374.76 319.64 372.32 327.5 373.66C332.33 374.48 334.94 376.55 336.34 379.17C337.74 376.55 340.35 374.48 345.18 373.66C353.049 372.32 362.288 374.759 367.818 376.219L367.82 376.22L369.06 376.55C370.01 376.79 370.57 377.76 370.33 378.71C370.09 379.66 369.11 380.22 368.17 379.98L366.91 379.65C361.66 378.26 352.87 375.94 345.77 377.15C339.4 378.24 338.28 381.5 338.28 387.94C338.28 388.92 337.48 389.72 336.5 389.72C336.44 389.72 336.38 389.7 336.32 389.7C336.26 389.71 336.2 389.72 336.14 389.72C335.15 389.72 334.36 388.92 334.36 387.94C334.36 381.49 333.24 378.23 326.88 377.15C319.77 375.94 310.99 378.26 305.74 379.65Z"
                            fill="currentColor"
                          />
                          <path
                            d="M327.31 427.61C319.13 427.51 309.8 428.58 304.23 429.22H304.25C303.26 429.35 302.39 428.63 302.28 427.66C302.17 426.68 302.87 425.8 303.84 425.69C309.49 425.04 318.99 423.96 327.37 424.06C332.3 424.13 334.92 426.03 336.32 428.75C337.72 426.03 340.34 424.13 345.27 424.06C353.68 423.96 363.14 425.04 368.8 425.69C369.77 425.8 370.47 426.69 370.36 427.66C370.25 428.63 369.38 429.35 368.39 429.22L368.331 429.213L368.329 429.213C362.752 428.572 353.51 427.51 345.31 427.61C339.29 427.69 338.27 430.69 338.27 439.67C338.27 440.65 337.47 441.45 336.49 441.45C336.46 441.45 336.43 441.445 336.4 441.44C336.386 441.438 336.372 441.435 336.359 441.434C336.342 441.431 336.326 441.43 336.31 441.43C336.25 441.44 336.19 441.45 336.13 441.45C335.14 441.45 334.35 440.65 334.35 439.67C334.35 430.69 333.34 427.69 327.31 427.61Z"
                            fill="currentColor"
                          />
                          <path
                            d="M336.49 501.6H336.13C335.15 501.6 334.35 502.4 334.35 503.38V570.51C334.35 571.49 335.14 572.29 336.13 572.29H336.49C337.47 572.29 338.27 571.49 338.27 570.51V503.38C338.27 502.4 337.48 501.6 336.49 501.6Z"
                            fill="currentColor"
                          />
                          <path
                            d="M378.16 420.56H378.13L376.66 420.58L376.512 420.582C361.637 420.822 347.627 421.047 340.59 417.06C338.87 416.09 338.25 414.03 338.09 410.93C338.17 409.41 338.14 407.78 338.09 406.08C338.099 405.632 338.116 405.185 338.134 404.715L338.14 404.55L338.156 404.073C338.212 402.468 338.27 400.798 338.27 399.07C338.27 398.09 337.48 397.29 336.49 397.29C336.43 397.29 336.37 397.3 336.31 397.31C336.293 397.31 336.275 397.308 336.258 397.306C336.25 397.305 336.242 397.304 336.235 397.302L336.22 397.3C336.19 397.295 336.16 397.29 336.13 397.29C335.15 397.29 334.35 398.09 334.35 399.07C334.35 400.97 334.41 402.8 334.48 404.55L334.485 404.67C334.503 405.157 334.521 405.627 334.53 406.08C334.48 407.78 334.45 409.41 334.53 410.93C334.36 414.03 333.74 416.09 332.03 417.06C324.97 421.06 310.88 420.83 295.96 420.58L294.49 420.56H294.46C293.49 420.56 292.7 421.34 292.68 422.31C292.66 423.29 293.45 424.1 294.43 424.11L295.9 424.13L296.265 424.136H296.271C299.849 424.194 303.314 424.25 306.62 424.25C318.07 424.25 327.7 423.59 333.78 420.15C334.87 419.53 335.69 418.73 336.31 417.78C336.93 418.73 337.75 419.54 338.84 420.15C344.92 423.59 354.55 424.25 366 424.25C369.327 424.25 372.804 424.194 376.386 424.135L376.72 424.13L378.19 424.11C379.17 424.09 379.95 423.29 379.94 422.31C379.92 421.34 379.13 420.56 378.16 420.56Z"
                            fill="currentColor"
                          />
                          <path
                            d="M363.955 468.911C367.324 468.678 371.163 468.412 376.57 468.22L376.56 468.23C377.56 468.2 378.37 468.96 378.4 469.94C378.44 470.92 377.67 471.74 376.69 471.78C371.336 471.972 367.524 472.238 364.181 472.472L364.18 472.472L363.78 472.5C359.5 472.81 355.9 473.06 350.66 473.06C348.96 473.06 347.09 473.03 344.96 472.97C340.25 472.62 337.69 471.12 336.3 467.84C334.92 471.12 332.37 472.61 327.71 472.96C325.54 473.02 323.64 473.05 321.91 473.05C316.67 473.05 313.08 472.8 308.81 472.5C305.37 472.25 301.47 471.98 295.9 471.78C294.92 471.74 294.15 470.92 294.19 469.94C294.23 468.96 295.08 468.19 296.03 468.23C301.66 468.43 305.59 468.7 309.06 468.95L309.083 468.952C314.642 469.341 319.052 469.65 327.53 469.41C332.91 469.01 334.34 468.23 334.34 451.95C334.34 450.97 335.14 450.17 336.12 450.17C336.18 450.17 336.24 450.19 336.3 450.19L336.326 450.186L336.349 450.182C336.367 450.179 336.386 450.177 336.405 450.174C336.43 450.172 336.455 450.17 336.48 450.17C337.47 450.17 338.26 450.97 338.26 451.95C338.26 468.22 339.69 469 345.15 469.41C353.535 469.639 357.934 469.332 363.49 468.943L363.955 468.911Z"
                            fill="currentColor"
                          />
                          <path
                            d="M368.62 474.46C362.43 474.34 346.75 475.86 341.11 477.14C338.79 477.67 337.29 478.92 336.31 480.57C335.33 478.92 333.83 477.67 331.51 477.14C325.88 475.86 310.18 474.34 304 474.46C303.02 474.48 302.24 475.29 302.26 476.27C302.28 477.25 303.11 478.04 304.07 478.01C309.99 477.88 325.39 479.39 330.72 480.6C333.57 481.25 334.34 484.02 334.53 488.27C334.48 489.54 334.48 490.81 334.48 492.03V492.81C334.48 493.79 335.28 494.59 336.26 494.59H336.38C337.36 494.59 338.16 493.79 338.16 492.81V492.03C338.16 490.82 338.16 489.55 338.11 488.27C338.3 484.02 339.07 481.25 341.92 480.61C347.26 479.4 362.71 477.88 368.57 478.02C369.5 478.04 370.36 477.26 370.38 476.28C370.4 475.3 369.62 474.49 368.64 474.47L368.62 474.46Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M664.702 571.051C669.891 581.221 670.001 581.437 670.24 586.61L670.16 586.58C670.25 588.64 670.39 591.46 670.97 596.31C672.95 612.74 672.58 618.5 672.34 621.95V622.17C672.12 625.58 667.67 641.16 667.16 642.92C666.96 643.63 666.35 644.13 665.62 644.2C665.41 644.22 660.52 644.62 657.29 641.1C656.15 639.87 655.4 638.32 654.99 636.5C653.37 636.42 650.93 635.97 649.22 634.2C647.59 632.5 647.01 630.1 647.51 627.04C648.29 622.242 648.03 619.772 647.7 616.633L647.7 616.63C647.47 614.49 647.22 612.07 647.29 608.59C647.349 605.725 646.514 604.039 645.467 601.924L645.44 601.87C643.78 598.54 641.74 594.4 642.63 584.75C642.2 584.21 641.76 583.76 641.34 583.41C641.66 589.34 641.68 601.22 637.21 606.28C635.79 607.89 634.04 608.73 632 608.77C622.216 608.94 621.822 599.818 621.364 589.204L621.36 589.12C621.25 586.43 621.13 583.64 620.87 580.74C619.79 572.3 618.49 568.04 616.08 565.09C612.68 560.94 609.78 551.8 615.72 543.63C616.1 542.91 615.27 540.6 613.69 537.62C613.65 537.56 613.62 537.49 613.59 537.43C611.97 534.4 609.61 530.71 606.99 527.27C599.041 518.971 592.612 514.062 586.393 509.312L586.39 509.31L586.365 509.291C577.434 502.468 568.988 496.016 556.65 480.62C543.24 463.87 539.37 455.74 535.28 447.12L535.275 447.109C532.857 442.023 530.357 436.765 525.74 429.33C517.71 417.83 484.85 373.9 480.77 370.11C480.366 369.731 479.921 369.331 479.441 368.899C479.339 368.808 479.235 368.715 479.13 368.62L479.113 368.604C475.312 365.184 469.383 359.848 464.99 351.92C462.82 361.44 456.54 383.35 439.68 415.81C430.39 434.27 433.02 453.79 435.57 472.66L435.624 473.06C436.297 478.045 436.991 483.182 437.41 488.13C438.07 495.9 439.2 506.02 440.52 516.58C440.52 516.59 440.54 516.61 440.54 516.61V516.65C440.56 516.7 440.56 516.76 440.56 516.82C440.57 516.87 440.58 516.93 440.58 516.98V517.02C440.635 517.44 440.688 517.86 440.74 518.28C440.792 518.7 440.845 519.12 440.9 519.54C440.92 519.61 440.93 519.69 440.93 519.77C443.7 541.49 447.17 564.25 449.07 571.75C449.2 572.29 449.4 573.05 449.66 574.02C459.28 610.38 477.6 696.15 464.25 781.5C464.25 781.63 464.24 781.77 464.21 781.9C464.188 781.988 464.169 782.078 464.15 782.17C464.134 782.246 464.118 782.323 464.1 782.4C462 795.6 459.14 808.79 455.37 821.78C455.62 841.779 456.937 846.39 458.096 850.447L458.1 850.46C458.48 851.77 458.87 853.14 459.19 854.92C459.815 858.324 459.928 861.245 460.038 864.065L460.04 864.13C460.16 867.26 460.29 870.5 461.11 874.45C461.31 875.39 461.96 877.23 462.79 879.56L462.791 879.563C468.652 896.046 484.219 939.825 471.4 1012.83C470.719 1020.43 469.762 1028.44 468.836 1036.2L468.76 1036.84C466.31 1057.35 464 1076.72 466.26 1088.92C468.02 1099.42 468.76 1103.98 468.95 1109.6C470.36 1113.85 477.33 1124.93 481.53 1131.59L482.045 1132.41C483.197 1134.23 484.158 1135.76 484.76 1136.77C485.69 1138.34 486.19 1139.5 486.59 1140.43C487.45 1142.44 487.93 1143.55 492.58 1147.31C493.48 1148.04 494.42 1148.78 495.39 1149.54L495.455 1149.59C501.994 1154.75 510.115 1161.16 514.52 1170.91C516.97 1176.81 516.1 1180.15 514.94 1181.92C514.01 1183.34 512.58 1184.27 510.82 1184.64C510.6 1185.58 510.14 1186.77 509.17 1187.72C508.58 1188.3 507.6 1188.97 506.14 1189.19C505.62 1190.43 504.57 1192.27 502.65 1193.39C501.24 1194.21 499.64 1194.5 497.88 1194.23C496.79 1195.41 494.61 1197.32 491.71 1197.65C489.73 1197.89 487.79 1197.36 485.94 1196.09C484.11 1197.53 480.37 1199.93 475.66 1199.93C475.08 1199.93 474.49 1199.9 473.88 1199.82C468.26 1199.1 463.21 1194.99 458.85 1187.62C455.6 1186.47 442.47 1180.93 443.61 1166.95C443.71 1163.79 440.45 1161.77 434.17 1158.2L433.18 1157.64C425.64 1153.34 421.23 1149.53 425.22 1126.47C425.89 1121.12 425.15 1115.29 424.85 1113.34C423.17 1111.82 420.19 1107.09 421.45 1092.98C422.96 1076.06 424.38 1060.08 403.5 993.29C402.52 990 401.17 988.1 399.74 986.1C395.18 979.73 390.47 973.14 396.76 927.39C400.519 893.919 400.24 893.45 396.843 887.735L396.84 887.73L396.819 887.695C396.093 886.471 395.19 884.951 394.17 882.9C393.71 881.98 393.21 881.05 392.69 880.12L392.56 879.9C392.55 879.89 392.55 879.87 392.55 879.87C391.74 878.43 390.88 876.97 389.99 875.46L389.984 875.45C383.855 865.082 376.229 852.181 374.19 825.81C373.29 814.16 371.74 802.45 369.58 790.74C369.11 788.42 368.68 786.2 368.29 784.07C366.11 773.45 363.42 762.84 360.23 752.31C359.142 748.707 357.317 743.68 355.203 737.856L355.19 737.82C348.47 719.31 338.32 691.33 336.91 668.36C336.8 664.7 336.73 661.49 336.67 658.66L336.669 658.601C336.569 653.944 336.479 649.719 336.23 647.06C335.981 649.709 335.891 653.925 335.791 658.572L335.79 658.63C335.73 661.46 335.66 664.68 335.55 668.3C334.131 691.307 324.001 719.253 317.29 737.763L317.258 737.853C315.143 743.679 313.318 748.707 312.23 752.31C309.04 762.83 306.36 773.42 304.18 784.03C303.79 786.19 303.35 788.45 302.87 790.8C300.71 802.49 299.17 814.18 298.27 825.81C296.231 852.181 288.605 865.082 282.476 875.45L282.47 875.46C282.319 875.718 282.168 875.974 282.019 876.229C281.289 877.472 280.584 878.675 279.92 879.87C279.91 879.88 279.91 879.9 279.91 879.9L279.71 880.25C279.21 881.14 278.74 882.02 278.3 882.9C277.28 884.951 276.377 886.471 275.651 887.695L275.63 887.73C272.23 893.44 271.95 893.91 275.72 927.43C282 973.13 277.29 979.72 272.73 986.1L272.703 986.137C271.283 988.123 269.934 990.01 268.98 993.26C248.09 1060.06 249.51 1076.05 251.02 1092.97C252.28 1107.08 249.3 1111.81 247.62 1113.33C247.33 1115.29 246.59 1121.14 247.27 1126.54C251.25 1149.51 246.84 1153.32 239.3 1157.63L238.31 1158.19C232.04 1161.76 228.77 1163.78 228.88 1167.02C230.02 1180.92 216.89 1186.45 213.64 1187.6C209.28 1194.97 204.23 1199.08 198.61 1199.8C198 1199.87 197.41 1199.91 196.83 1199.91C192.11 1199.91 188.37 1197.51 186.55 1196.07C184.7 1197.33 182.75 1197.86 180.78 1197.63C177.88 1197.3 175.7 1195.39 174.61 1194.21C172.85 1194.48 171.26 1194.2 169.84 1193.37C167.92 1192.24 166.87 1190.41 166.35 1189.17C164.89 1188.95 163.92 1188.29 163.32 1187.7C162.35 1186.75 161.89 1185.57 161.67 1184.62C159.91 1184.26 158.48 1183.32 157.55 1181.9C156.4 1180.13 155.53 1176.79 157.95 1170.94C162.382 1161.13 170.521 1154.71 177.076 1149.55L177.11 1149.52C178.08 1148.76 179.02 1148.02 179.92 1147.29C184.554 1143.54 185.037 1142.43 185.901 1140.43L185.91 1140.41L185.948 1140.32C186.341 1139.41 186.829 1138.27 187.74 1136.75C188.44 1135.58 189.59 1133.75 190.97 1131.56C195.17 1124.9 202.15 1113.83 203.55 1109.58C203.74 1103.97 204.48 1099.4 206.24 1088.93C208.5 1076.7 206.19 1057.33 203.74 1036.82L203.636 1035.95C202.718 1028.25 201.774 1020.33 201.08 1012.66C188.29 939.81 203.85 896.02 209.71 879.54L209.784 879.333C210.579 877.101 211.206 875.342 211.39 874.43C212.21 870.48 212.34 867.24 212.46 864.11C212.57 861.27 212.69 858.33 213.31 854.9C213.63 853.12 214.02 851.76 214.4 850.44L214.405 850.421C215.564 846.366 216.88 841.759 217.13 821.76C213.35 808.77 210.5 795.58 208.4 782.38C208.36 782.22 208.33 782.05 208.29 781.88C208.25 781.75 208.25 781.61 208.25 781.48C194.9 696.14 213.23 610.36 222.84 574C223.09 573.03 223.29 572.27 223.43 571.73C225.33 564.23 228.8 541.48 231.57 519.76C231.57 519.67 231.58 519.59 231.6 519.5C231.71 518.66 231.82 517.82 231.92 516.99V516.95C231.92 516.9 231.94 516.84 231.94 516.79C231.95 516.74 231.95 516.68 231.97 516.62V516.58C231.98 516.56 231.98 516.55 231.98 516.54C233.3 505.98 234.43 495.86 235.09 488.1C235.53 483.02 236.24 477.74 236.93 472.63C239.48 453.76 242.11 434.24 232.81 415.76C215.96 383.31 209.68 361.41 207.51 351.89C203.11 359.84 197.17 365.18 193.37 368.59L193.161 368.777C192.648 369.238 192.162 369.675 191.73 370.08C187.65 373.87 154.79 417.8 146.71 429.38C142.144 436.744 139.644 442.002 137.226 447.088L137.22 447.1C133.13 455.72 129.26 463.86 115.85 480.6C103.51 496.01 95.06 502.46 86.11 509.29L86.1075 509.292C79.8882 514.041 73.4589 518.951 65.51 527.25C60.22 534.18 56.01 542.14 56.82 543.67C62.71 551.78 59.82 560.92 56.42 565.07C54.01 568.02 52.71 572.28 51.63 580.79C51.3884 583.534 51.2682 586.232 51.1521 588.838L51.14 589.11L51.1338 589.254C50.6766 599.842 50.2856 608.899 40.5 608.76C38.47 608.72 36.71 607.88 35.29 606.27C30.82 601.21 30.84 589.33 31.16 583.4C30.74 583.76 30.3 584.2 29.87 584.74C30.7594 594.394 28.7126 598.525 27.0631 601.854L27.06 601.86C25.99 604 25.15 605.69 25.21 608.59C25.2782 611.984 25.0327 614.369 24.8164 616.47L24.7997 616.633C24.4698 619.772 24.2102 622.242 24.99 627.04C25.49 630.1 24.91 632.51 23.28 634.2C21.57 635.97 19.14 636.42 17.51 636.5C17.11 638.32 16.35 639.86 15.22 641.1C11.99 644.62 7.08999 644.22 6.88999 644.2C6.15999 644.13 5.54999 643.62 5.34999 642.92C4.83999 641.16 0.379989 625.59 0.149989 622.17V621.95L0.149774 621.947C-0.0702519 618.506 -0.439367 612.735 1.52999 596.31C2.10903 591.55 2.245 588.746 2.34438 586.696L2.34999 586.58C2.59968 581.396 2.69974 581.201 7.93058 570.958L7.94999 570.92L8.12999 570.57C14.9657 557.668 17.9962 548.132 20.9245 538.917L20.93 538.9C23.53 530.68 26 522.93 30.92 514.02C34.5167 506.273 38.7578 495.763 43.2574 484.613L43.42 484.21C54.53 456.67 68.36 422.41 82.08 405.9C90.1787 396.162 95.9981 390.082 100.248 385.642L100.25 385.64C106.06 379.58 108.98 376.53 111.26 371.02C131.486 323.28 140.616 313.684 145.517 308.533L145.52 308.53L145.619 308.424C146.205 307.802 146.694 307.282 147.12 306.78C147.13 306.76 147.15 306.74 147.17 306.72C147.98 305.73 148.53 304.81 148.98 303.36C154.609 281.87 157.826 273.949 159.946 268.728L159.97 268.67L159.99 268.62C160.981 266.194 161.765 264.273 162.47 261.75C168.35 242.55 182.68 218.54 217.6 212.9L217.757 212.874C218.286 212.788 218.671 212.725 218.89 212.67C219.364 212.545 219.978 212.389 220.687 212.21C221.114 212.101 221.575 211.984 222.06 211.86L222.074 211.856C222.911 211.647 223.906 211.398 224.96 211.13C225.04 211.1 225.13 211.08 225.22 211.06C228.72 210.17 232.74 209.12 233.55 208.75C233.959 208.555 235.504 207.348 236.895 206.26L237.01 206.17C240.35 203.55 244.93 199.97 248.34 198.41C250.156 197.586 253.869 196.025 258.279 194.172C258.849 193.932 259.43 193.688 260.02 193.44L260.794 193.115C268.086 190.059 276.104 186.698 279.03 185.23C283.25 183.12 290.69 176.09 292.62 174.23C293.23 166.349 293.511 140.703 293.558 136.413L293.56 136.22C291.46 131.76 290.6 125.47 290.28 122.33C287.51 122.55 285.24 121.95 283.35 120.52C279.42 117.54 277.19 110.85 276.33 99.47C275.74 91.6 277.16 86.25 280.55 83.58C281.74 82.65 283.01 82.18 284.17 81.97C284.06 81.82 283.96 81.64 283.9 81.45L283.889 81.4155C283.579 80.4404 279.154 66.5074 278.05 54.75C277 43.49 280.93 23.29 288.51 17.47C288.66 16.82 288.79 15.6 287.9 14.81C286.7 13.75 286.33 12.26 286.9 10.83C287.94 8.24 291.78 6.56 296.3 6.7C296.65 6.71 296.89 6.68 297.01 6.66C297.021 6.58774 297.032 6.50003 297.043 6.41233C297.052 6.34226 297.061 6.27218 297.07 6.21L297.072 6.19697C297.172 5.36562 297.337 3.99505 298.63 3.05C300.15 1.95 302.69 1.84 307.11 2.7C309.368 2.80802 310.354 2.135 311.402 1.41949L311.46 1.38C312.74 0.490003 314.34 -0.599997 317.22 0.380003C320.83 0.290003 348.59 -0.0999975 365.88 9.96C383.09 19.99 397.69 32.86 387.33 79.46C387.12 80.42 386.17 81.02 385.22 80.81C385.37 81.28 385.52 81.63 385.64 81.89C387.21 81.71 389.78 81.79 392.07 83.59C395.46 86.26 396.88 91.6 396.29 99.48C395.43 110.86 393.2 117.54 389.27 120.53C387.38 121.97 385.11 122.56 382.34 122.34C382.02 125.47 381.16 131.77 379.06 136.23L379.062 136.423C379.109 140.713 379.39 166.359 380 174.24C381.93 176.1 389.36 183.13 393.59 185.24C396.58 186.74 404.894 190.226 412.31 193.334L412.61 193.46C413.505 193.837 414.379 194.205 415.223 194.56C419.237 196.249 422.576 197.653 424.27 198.43C427.68 199.99 432.26 203.57 435.6 206.19C437.03 207.31 438.64 208.57 439.07 208.78C439.87 209.14 443.87 210.19 447.35 211.08H447.37C447.385 211.08 447.398 211.085 447.41 211.09C447.422 211.095 447.435 211.1 447.45 211.1C447.815 211.193 448.175 211.285 448.523 211.374C449.263 211.563 449.955 211.741 450.56 211.89C451.85 212.22 452.97 212.5 453.73 212.7C453.913 212.753 454.212 212.801 454.615 212.865C454.74 212.885 454.875 212.906 455.02 212.93C489.94 218.57 504.27 242.59 510.14 261.74C510.87 264.32 511.65 266.25 512.65 268.7C514.78 273.93 517.99 281.83 523.67 303.47C524.1 304.87 524.64 305.77 525.45 306.74C525.48 306.77 525.5 306.79 525.52 306.82C525.96 307.35 526.48 307.9 527.11 308.56L527.113 308.563C532.014 313.714 541.144 323.31 561.36 371.03C563.632 376.541 566.54 379.58 572.311 385.609L572.37 385.67C576.62 390.11 582.44 396.2 590.53 405.93C604.231 422.407 618.031 456.604 629.133 484.114L629.18 484.23C633.73 495.53 638.04 506.2 641.73 514.16C646.584 522.921 649.044 530.659 651.644 538.839L651.67 538.92C654.6 548.14 657.63 557.67 664.46 570.57L664.65 570.95L664.702 571.051ZM446.725 214.594L446.59 214.56H446.57C428.68 210.99 409.79 215.88 401.26 218.63C405.32 220.18 411.29 222.73 416.55 226.07C427.76 233.19 432.51 239.48 439.09 248.2L439.406 248.617C442.358 252.515 445.701 256.93 450.21 262.23L450.213 262.233C455.184 268.064 465.462 280.122 478.51 288.97C482.01 291.35 487.87 293.58 495.47 295.45C500.19 296 507.21 297.38 514.97 300.85C516.66 301.61 518.32 302.45 519.94 303.34C514.489 282.724 511.4 275.115 509.35 270.065L509.34 270.04C508.3 267.49 507.48 265.47 506.71 262.74C501.15 244.59 487.55 221.79 454.43 216.44L454.241 216.408C453.57 216.295 453.085 216.213 452.81 216.14C452.06 215.94 450.95 215.66 449.67 215.34C448.658 215.082 447.674 214.834 446.725 214.594ZM388.31 397.66C388.36 392.04 388.24 389.56 388.15 387.75L388.13 387.76L388.128 387.714C388.049 386.038 387.991 384.807 388.1 382.23C388.13 381.6 388.16 380.99 388.2 380.39C388.24 379.35 388.31 378.37 388.44 377.43C389.19 369.78 390.8 364.57 392.04 360.59C393.54 355.79 394.36 353.14 392.87 349.77C390.46 344.34 383.07 340.35 375.76 337.34C374.25 336.81 372.75 336.24 371.27 335.59C360.57 331.62 347.06 328.82 341.25 332.87C339.24 334.27 338.26 336.46 338.26 339.55C338.26 340.53 337.46 341.33 336.48 341.33C336.45 341.33 336.42 341.325 336.39 341.32C336.36 341.315 336.33 341.31 336.3 341.31C336.24 341.32 336.18 341.33 336.12 341.33C335.13 341.33 334.34 340.53 334.34 339.55C334.34 336.46 333.36 334.27 331.35 332.87C325.54 328.82 312.02 331.62 301.31 335.59C299.84 336.23 298.35 336.8 296.85 337.33C289.53 340.34 282.14 344.33 279.73 349.77C278.24 353.13 279.06 355.78 280.56 360.59C281.8 364.56 283.41 369.76 284.16 377.38C284.29 378.33 284.36 379.34 284.4 380.39C284.44 380.99 284.47 381.59 284.5 382.22C284.609 384.801 284.551 386.023 284.473 387.694L284.47 387.75C284.38 389.56 284.26 392.04 284.31 397.66C284.41 409.01 286.65 457.95 288.73 490.59C292.07 543.03 324.09 583.05 336.13 583.05C336.19 583.05 336.25 583.07 336.31 583.07C336.37 583.06 336.43 583.05 336.49 583.05C348.53 583.05 380.55 543.03 383.89 490.59C385.97 457.97 388.21 409.03 388.31 397.66ZM324.76 313.85C330.95 306.57 334.36 297.13 334.36 287.26V237.65C334.36 236.92 334.17 220.12 307.28 217.57C291.6 216.08 282.75 218.7 278 220.11C277.67 220.21 277.37 220.3 277.08 220.38C275.83 220.78 265.88 224.04 257.96 229.07C247.301 235.833 242.949 241.598 236.37 250.314L236.35 250.34C233.31 254.38 229.85 258.96 225.11 264.53L225.099 264.542C220.015 270.507 209.541 282.796 196.1 291.91C194.49 293 192.51 294.03 190.17 295.02C205.25 295.46 213.75 304.24 220.55 312.48C221.53 313.67 222.55 314.81 223.6 315.92C223.64 315.95 223.68 315.98 223.71 316.02L224.43 316.8C242.98 335.82 270.84 342.64 295.36 334.1C296.92 333.46 298.48 332.85 300.03 332.28C309.59 328.1 317.91 321.9 324.76 313.85ZM345.16 316.16C341 311.27 338 305.49 336.31 299.26L336.3 299.25C334.61 305.48 331.61 311.26 327.45 316.15C323.53 320.76 319.14 324.79 314.34 328.22C321.29 326.92 328.72 326.7 333.39 329.95C334.62 330.81 335.58 331.86 336.31 333.09C337.04 331.86 338 330.8 339.23 329.95C343.9 326.7 351.33 326.92 358.27 328.22C353.47 324.8 349.08 320.77 345.16 316.16ZM283.1 340.65C280 341.06 276.89 341.29 273.78 341.29L273.76 341.3C262.5 341.3 251.29 338.59 241.13 333.44C246.53 338.38 251.97 343.07 257.09 347.48C266.16 355.29 274.04 362.08 278.94 367.89C278.373 365.574 277.76 363.591 277.225 361.86L277.151 361.621C275.586 356.566 274.454 352.911 276.48 348.33C277.8 345.36 280.15 342.84 283.1 340.65ZM396.12 348.32C398.16 352.91 397.02 356.57 395.44 361.64H395.43L395.365 361.85C394.83 363.581 394.217 365.564 393.65 367.88C398.55 362.06 406.43 355.27 415.5 347.46C420.62 343.05 426.06 338.36 431.46 333.42C421.31 338.58 410.1 341.28 398.83 341.28C395.72 341.28 392.61 341.06 389.51 340.64C392.45 342.83 394.8 345.35 396.12 348.32ZM372.6 332.28C374.15 332.86 375.71 333.46 377.26 334.1C401.77 342.64 429.62 335.82 448.17 316.81C448.302 316.655 448.441 316.507 448.58 316.357C448.684 316.246 448.788 316.135 448.89 316.02C448.906 316.004 448.923 315.989 448.939 315.975C448.963 315.954 448.986 315.934 449.01 315.91C450.06 314.8 451.08 313.66 452.06 312.47C458.86 304.23 467.36 295.46 482.44 295.01C480.1 294.03 478.11 292.99 476.51 291.9C463.089 282.793 452.609 270.504 447.561 264.585L447.54 264.56C442.825 259.027 439.405 254.495 436.385 250.496L436.26 250.33C429.67 241.6 425.31 235.83 414.65 229.06C406.73 224.02 396.8 220.77 395.54 220.37C395.25 220.29 394.95 220.2 394.62 220.1C389.87 218.69 381.03 216.07 365.34 217.56C338.45 220.11 338.26 236.91 338.26 237.62V287.26C338.26 297.13 341.67 306.57 347.86 313.85C354.72 321.9 363.04 328.1 372.6 332.28ZM391.98 188.43C388.26 186.56 382.68 181.64 379.49 178.67V199.35C379.49 209.29 384.79 212.96 395.89 216.73C399.32 215.4 415.82 209.43 434.37 209.74C434.196 209.607 434.016 209.467 433.827 209.32C433.689 209.214 433.547 209.104 433.4 208.99L433.133 208.782C429.95 206.303 425.727 203.012 422.78 201.67C420.78 200.76 416.14 198.81 411.22 196.75C403.67 193.59 395.12 190 391.98 188.43ZM291.01 20.06C284.88 24.11 280.51 42.86 281.59 54.43V54.44C282.38 62.86 285.02 72.71 286.41 77.49C286.51 72.32 286.57 64.95 286.25 59.42C285.8 51.64 289.75 40.06 296.13 35.88C299.23 33.86 302.63 33.69 305.98 35.38C316.52 40.71 345.63 38.38 364.75 30.67C366.86 30.03 368.89 30.39 370.76 31.65C376.86 35.77 381.11 49.44 382.15 60.81C382.87 68.66 383.6 73.68 384.23 76.9C393.32 34.09 380.49 22.62 364.07 13.05C346.86 3.02 317.29 3.95 317 3.96C316.74 3.97 316.52 3.93 316.3 3.84C314.936 3.31224 314.593 3.54799 313.484 4.31027L313.455 4.3303C312.146 5.22943 310.356 6.45924 306.79 6.26C306.71 6.26 306.63 6.25 306.55 6.23C301.57 5.25 300.75 5.91 300.72 5.94C300.676 6.01945 300.64 6.31709 300.611 6.55089C300.607 6.58194 300.604 6.61187 300.6 6.64L300.596 6.67158C300.465 7.80914 300.163 10.4185 296.17 10.26C292.28 10.1 290.3 11.68 290.19 12.19C292.74 14.38 292.32 17.65 291.68 19.24C291.54 19.58 291.31 19.86 291.01 20.06ZM291.55 118.58C292.05 118.48 292.57 118.61 292.98 118.92L292.99 118.93C293.4 119.24 293.65 119.72 293.68 120.23C293.68 120.33 294.27 129.71 296.94 135.06C297.07 135.31 297.13 135.59 297.13 135.87C297.13 135.906 297.129 135.971 297.128 136.06C297.125 136.265 297.12 136.601 297.12 137.04C300.36 141.88 311.91 156.37 336.29 160.74H336.33C360.73 156.37 372.26 141.89 375.5 137.05C375.49 136.41 375.49 136 375.49 135.87C375.49 135.59 375.56 135.31 375.68 135.06C378.35 129.71 378.94 120.32 378.94 120.23C378.97 119.72 379.22 119.24 379.63 118.93C380.03 118.61 380.56 118.49 381.06 118.59C383.74 119.12 385.61 118.85 387.11 117.71C390.14 115.42 391.98 109.37 392.74 99.22C393.35 91.01 391.53 87.72 389.89 86.41C387.91 84.8224 385.46 85.511 385.259 85.5674L385.25 85.57C384.35 85.84 383.41 85.37 383.08 84.51C381.71 82.64 380.15 77.77 378.62 61.12C377.54 49.23 373.21 37.57 368.78 34.58C367.78 33.9 366.88 33.72 365.94 34C345.85 42.11 315.87 44.34 304.39 38.54C302.18 37.42 300.12 37.52 298.09 38.85C292.96 42.2 289.42 52.55 289.8 59.21C290.302 68.1099 289.87 81.6196 289.807 83.5884C289.803 83.7367 289.8 83.8195 289.8 83.83C289.78 84.37 289.51 84.84 289.12 85.15C288.67 85.58 288 85.77 287.36 85.56C287.18 85.5 284.71 84.81 282.72 86.4C281.08 87.71 279.25 91 279.87 99.21C280.64 109.36 282.48 115.41 285.5 117.7C287.01 118.85 288.87 119.12 291.55 118.58ZM296.67 162.51V199.36H296.68C296.68 206.32 294.18 210.78 290.34 213.95C294.96 213.48 300.64 213.36 307.62 214.02C326.54 215.81 333.65 224.52 336.31 230.85C338.98 224.53 346.08 215.82 365.01 214.02C371.99 213.36 377.67 213.48 382.29 213.95C378.45 210.78 375.95 206.32 375.95 199.36V162.49C375.73 154.51 375.6 145.2 375.54 139.96C370.79 146.19 358.9 158.45 336.64 162.44C336.59 162.45 336.54 162.45 336.49 162.45C336.45 162.45 336.41 162.441 336.37 162.432C336.35 162.428 336.33 162.423 336.31 162.42C336.29 162.423 336.27 162.428 336.25 162.432C336.21 162.441 336.17 162.45 336.13 162.45C336.08 162.45 336.03 162.44 335.98 162.44C320.24 159.62 309.84 152.67 303.88 147.34C300.8 144.58 298.58 142 297.08 140.01C297.01 145.26 296.88 154.55 296.67 162.51ZM249.83 201.66C246.8 203.05 242.41 206.48 239.21 208.99L239.2 209C239.053 209.113 238.911 209.223 238.774 209.33C238.585 209.477 238.404 209.617 238.23 209.75C256.77 209.44 273.27 215.41 276.71 216.74C287.81 212.97 293.11 209.3 293.11 199.36V178.67C289.92 181.63 284.34 186.56 280.62 188.42C277.48 189.99 268.94 193.57 261.4 196.73C256.48 198.79 251.83 200.74 249.83 201.66ZM165.89 262.77C165.14 265.46 164.32 267.48 163.28 270.03H163.27C161.21 275.09 158.12 282.7 152.67 303.33C154.29 302.44 155.95 301.6 157.64 300.84C165.4 297.37 172.43 295.99 177.14 295.44C184.74 293.57 190.6 291.33 194.09 288.96C207.13 280.12 217.41 268.06 222.35 262.26C226.994 256.808 230.384 252.317 233.373 248.359L233.532 248.148C240.095 239.46 244.848 233.169 256.04 226.06C261.31 222.71 267.27 220.16 271.33 218.62C262.8 215.87 243.91 210.99 226.02 214.55L225.897 214.581C224.945 214.821 223.956 215.071 222.94 215.33C221.66 215.65 220.55 215.93 219.8 216.13C219.5 216.21 218.95 216.31 218.18 216.43C185.06 221.78 171.46 244.58 165.89 262.77ZM23.9111 600.328L23.92 600.31H23.91L23.9217 600.287C24.8985 598.323 25.9617 596.186 26.38 592.64C24.98 595.6 23.58 597.32 22.38 598.79L22.3685 598.804C20.8944 600.617 19.8281 601.928 19.1 605.03C18.44 609.6 17.74 612.45 17.22 614.53L17.2122 614.562C16.2082 618.637 15.8642 620.033 17.5 629.1C17.74 630.47 17.87 631.75 17.89 632.94C18.89 632.83 20.04 632.51 20.77 631.75C21.58 630.9 21.84 629.52 21.53 627.63C20.67 622.36 20.98 619.41 21.31 616.28C21.54 614.15 21.77 611.94 21.7 608.69C21.6202 604.93 22.7838 602.592 23.9111 600.328ZM48.15 580.45C49.33 571.15 50.84 566.4 53.72 562.87L53.73 562.86C56.33 559.69 58.69 552.23 53.97 545.74C53.02 544.33 53.25 542.15 54.1 539.7C51.82 540.33 49.58 540.64 47.43 540.64C44.46 540.64 41.68 540.04 39.26 538.84C34.66 536.55 31.07 532.02 29.1 526.27C27.2653 530.827 25.8587 535.248 24.4099 539.802L24.3352 540.036C21.4989 548.965 18.2879 559.073 11.32 572.23L11.15 572.56C7.81666 579.087 6.07999 583.827 5.93999 586.78C5.83999 588.9 5.69999 591.79 5.09999 596.77C3.15999 612.87 3.51999 618.44 3.74999 621.76V621.98C3.88999 624.13 6.49999 633.86 8.42999 640.66C9.59999 640.54 11.4 640.11 12.67 638.71C14.31 636.9 14.77 633.88 14.02 629.73C12.25 619.89 12.7 618.07 13.79 613.67C14.32 611.55 14.97 608.91 15.64 604.36C16.58 600.3 18.07 598.47 19.65 596.54C21.37 594.43 23.32 592.03 25.19 585.74C25.2199 585.65 25.2598 585.56 25.2997 585.471C28.0648 579.811 32.5491 578.641 32.8139 578.572L32.82 578.57C33.38 578.43 33.97 578.58 34.4 578.96C34.84 579.34 35.06 579.91 35 580.48C34.48 585.47 34.02 599.44 38.01 603.95C38.77 604.81 39.6 605.22 40.63 605.24H40.84C46.42 605.24 47.14 600.73 47.65 588.99C47.76 586.26 47.88 583.44 48.15 580.45ZM134.138 445.477C136.577 440.351 139.114 435.02 143.8 427.48L143.79 427.46C146 424.29 150.19 418.53 155.17 411.78C147.77 416.9 140.89 418.96 135.04 418.96C131.43 418.96 128.21 418.18 125.52 416.85C117.53 412.91 107.77 401.77 115.4 370.35C115.11 371.02 114.82 371.7 114.53 372.39C112.014 378.477 108.766 381.873 102.907 387.999L102.704 388.211C98.5029 392.601 92.7529 398.611 84.81 408.17C71.4626 424.245 57.7658 458.176 46.7511 485.463L46.72 485.54C42.15 496.88 37.83 507.59 34.1 515.63C33.1 517.45 32.21 519.22 31.39 520.95C32.54 527.7 36.12 533.31 40.82 535.65C44.92 537.69 50.44 537.54 56.07 535.27C58.32 531.07 61.35 526.93 62.79 525.05C62.83 525 62.87 524.95 62.92 524.9C71.0704 516.38 77.6285 511.374 83.9545 506.545L84 506.51C92.77 499.82 101.05 493.49 113.13 478.42C126.286 462.004 130.068 454.044 134.067 445.627L134.07 445.62L134.138 445.477ZM206.64 345.68C206.78 345.34 207.02 345.06 207.31 344.87L207.29 344.86C208.17 342.03 208.87 339.14 209.35 336.23C210.47 329.31 213.45 310.89 203.45 302.75C197.834 298.173 190.031 298.4 181.768 298.639L181.75 298.64C179.35 298.7 174.09 299.09 167.52 300.99C167.508 300.994 167.496 300.998 167.484 301.002C167.439 301.018 167.398 301.032 167.35 301.04C164.77 301.79 161.99 302.77 159.09 304.07C155.79 305.56 152.6 307.33 149.62 309.33C149.15 309.87 148.64 310.41 148.09 310.99L148.07 311.011C145.208 314.023 140.32 319.167 131.79 335.31C105.87 392.72 117.72 409.05 127.1 413.67C135.82 417.97 151.03 415.37 167.58 395.16C167.587 395.146 167.599 395.137 167.609 395.129C167.613 395.126 167.617 395.123 167.62 395.12C177.52 381.99 187.05 369.69 189.37 367.53C189.767 367.164 190.201 366.773 190.662 366.359C190.792 366.241 190.925 366.122 191.06 366L191.121 365.945C195.701 361.815 202.598 355.596 206.64 345.68ZM240.51 473.16C239.79 478.46 239.12 483.47 238.69 488.46V488.47C238.08 495.55 237.01 505.25 235.73 515.62C245.31 517.29 256.06 514.41 262.38 508.35C267.58 503.37 279.14 488.15 274.24 454.7C271.833 438.329 274.993 420.75 277.78 405.243L277.79 405.19C279.53 395.5 281.06 386.97 280.86 380.63C280.8 379.64 280.72 378.69 280.63 377.78C279.73 371.63 268.17 361.67 254.79 350.15C244.18 341.01 232.2 330.67 221.92 319.3C220.49 317.85 219.12 316.32 217.81 314.73C215.85 312.36 213.8 310 211.53 307.85C215.92 317.889 213.8 331.038 212.87 336.808L212.87 336.81C212.29 340.36 211.4 343.9 210.25 347.33C211.26 352.81 216.47 376.53 236.03 414.2C245.839 433.679 243.13 453.747 240.511 473.156L240.51 473.16ZM265.65 992.3C266.78 988.49 268.37 986.26 269.91 984.1L269.88 984.08C274.03 978.27 278.32 972.26 272.23 927.91C269.85 906.74 269.04 898.27 269.67 893.37C262.89 899.91 255.21 903.55 247.7 903.55H247.34C238.79 903.42 231.53 898.71 226.89 890.29C222.44 882.24 219.77 878.89 214.33 877.2C214.02 878.17 213.61 879.34 213.09 880.79L213.085 880.805C207.31 897.067 191.994 940.203 204.64 1012.26C205.38 1020.31 206.36 1028.52 207.31 1036.46L207.326 1036.59C209.8 1057.33 212.135 1076.91 209.78 1089.61C208.03 1100.04 207.31 1104.5 207.14 1110C207.14 1110.16 207.11 1110.31 207.07 1110.46C205.701 1115 198.689 1126.13 194.039 1133.51L194.03 1133.52L193.552 1134.28C192.404 1136.1 191.449 1137.62 190.85 1138.63C190.055 1139.96 189.636 1140.93 189.265 1141.79L189.23 1141.87C188.12 1144.45 187.3 1145.99 182.21 1150.11C181.3 1150.85 180.35 1151.6 179.37 1152.37L179.36 1152.38C172.783 1157.56 165.328 1163.42 161.27 1172.41C159.37 1177.01 160.03 1179.15 160.59 1180.01C161.26 1181.05 162.46 1181.28 163.35 1181.3C164.33 1181.32 165.11 1182.13 165.09 1183.11C165.09 1183.49 165.24 1184.63 165.88 1185.25C166.28 1185.63 166.85 1185.81 167.64 1185.77C168.55 1185.73 169.23 1186.31 169.43 1187.12C169.43 1187.14 170.04 1189.42 171.72 1190.39C172.59 1190.89 173.63 1190.97 174.88 1190.62C175.6 1190.42 176.37 1190.7 176.8 1191.31L176.812 1191.33C176.98 1191.54 178.808 1193.91 181.27 1194.19C182.68 1194.35 184.06 1193.8 185.5 1192.52C186.2 1191.89 187.28 1191.93 187.94 1192.6C187.98 1192.64 192.49 1197.1 198.24 1196.34C202.83 1195.74 207.11 1192.03 210.95 1185.31C211.18 1184.9 211.56 1184.61 212.01 1184.48C212.6 1184.32 226.45 1180.21 225.39 1167.29C225.19 1161.67 230.23 1158.8 236.61 1155.17L237.59 1154.61C243.61 1151.18 247.59 1148.9 243.82 1127.13C242.91 1119.93 244.24 1112.41 244.3 1112.09C244.41 1111.53 244.78 1111.04 245.3 1110.8C245.299 1110.8 245.303 1110.8 245.313 1110.79C245.55 1110.57 248.817 1107.55 247.55 1093.36C246.01 1076.08 244.56 1059.75 265.65 992.3ZM276.77 878.42C277.63 876.88 278.54 875.33 279.49 873.72H279.48C284.94 864.48 291.62 853.17 294.21 831.58C289.22 845.65 280.75 860.4 267.16 860.4H266.84C251.73 860.15 248.76 847.17 246.6 837.7L246.596 837.682C245.657 833.588 244.688 829.359 243.04 828.57C242.44 828.29 241.54 828.44 240.35 829.02C234.67 831.8 229.96 832.18 225.94 830.19C223.89 829.17 222.16 827.6 220.67 825.57C220.3 842.97 219.02 847.48 217.87 851.48L217.87 851.482C217.5 852.771 217.15 853.991 216.86 855.6C216.29 858.79 216.18 861.47 216.07 864.32C215.96 867.21 215.84 870.19 215.21 873.76C222 875.8 225.29 880 230.04 888.59C234.04 895.85 240.22 899.91 247.43 900.02C257.77 900.12 268.56 892.32 276.44 879.01C276.472 878.955 276.511 878.884 276.554 878.806C276.604 878.715 276.661 878.612 276.72 878.51L276.77 878.42ZM300.78 783.42C300.83 783.1 300.89 782.78 300.95 782.47L300.96 782.49C306.519 751.383 303.681 747.941 297.472 740.412L297.47 740.41L297.458 740.396C290.968 732.516 281.165 720.613 272.73 675.04C270.45 662.69 268.81 647.85 267.08 632.14L267.08 632.138C262.21 588.019 256.71 538.19 234.82 522.9C232.15 543.52 228.9 564.96 226.95 572.67L226.859 573.02C226.728 573.528 226.558 574.185 226.35 574.97C216.77 611.2 198.48 696.83 211.96 781.75C212.77 785.48 213.52 789.27 214.24 792.94L214.253 793.006C217.318 808.632 220.21 823.375 227.54 827.01C230.5 828.48 234.19 828.09 238.8 825.83C241.01 824.74 242.96 824.58 244.59 825.36C247.79 826.89 248.8 831.309 250.08 836.908L250.08 836.91L250.08 836.911C252.19 846.161 254.581 856.64 266.91 856.85H267.16C289.56 856.85 296.84 806.51 296.91 806C296.91 805.985 296.915 805.97 296.92 805.955C296.925 805.94 296.93 805.925 296.93 805.91C297.58 801.13 298.35 796.34 299.21 791.56C299.21 791.46 299.22 791.37 299.24 791.27C299.28 791.08 299.317 790.893 299.355 790.705C299.392 790.518 299.43 790.33 299.47 790.14C299.89 787.9 300.32 785.66 300.78 783.42ZM332.09 668.19C332.19 664.65 332.26 661.43 332.32 658.61H332.31L332.315 658.397C332.462 651.52 332.556 647.143 333.1 644.52C318.01 642.44 311.03 623.96 298.7 582.26C285.03 536.01 249.84 522.81 235.9 519.34C259.895 534.897 265.568 586.257 270.587 631.7L270.618 631.981C272.337 647.528 273.962 662.215 276.21 674.37C284.48 719.06 293.94 730.53 300.2 738.12C304.46 743.28 307.29 746.72 307.49 756.16C307.96 754.55 308.43 752.94 308.92 751.33C309.98 747.827 311.695 743.087 313.682 737.594L314.061 736.548C320.701 718.227 330.713 690.604 332.09 668.19ZM336.31 641.2C336.37 641.19 336.43 641.18 336.49 641.18C350.54 641.18 357 626.96 370.51 581.26C382.03 542.28 408.36 525.9 425.63 519.18C418.77 518.12 412.28 515.24 407.78 510.92C402.18 505.55 389.72 489.27 394.87 454.19C397.12 438.9 394.28 422.23 391.61 407.35C390.96 426.43 389.14 464.1 387.44 490.82C384.1 543.24 351.65 586.6 336.49 586.6C336.46 586.6 336.43 586.595 336.4 586.59C336.37 586.585 336.34 586.58 336.31 586.58C336.25 586.59 336.19 586.6 336.13 586.6C320.97 586.6 288.52 543.24 285.18 490.82C283.48 464.08 281.67 426.42 281.01 407.35C278.34 422.23 275.51 438.9 277.75 454.19C282.9 489.27 270.44 505.55 264.84 510.92C260.34 515.24 253.85 518.12 246.99 519.18C264.26 525.89 290.59 542.28 302.11 581.26C315.62 626.95 322.08 641.18 336.13 641.18C336.16 641.18 336.19 641.185 336.22 641.19C336.25 641.195 336.28 641.2 336.31 641.2ZM365.131 756.137C364.674 754.538 364.197 752.929 363.71 751.33C362.62 747.728 360.838 742.81 358.779 737.128L358.61 736.66C351.96 718.34 341.92 690.65 340.54 668.25C340.43 664.66 340.36 661.45 340.3 658.63L340.295 658.412C340.148 651.528 340.054 647.142 339.51 644.52C354.61 642.44 361.58 623.96 373.91 582.26C387.58 536.01 422.77 522.81 436.71 519.35C412.715 534.906 407.042 586.267 402.023 631.71L402.02 631.74L402.004 631.882C400.28 647.479 398.653 662.197 396.4 674.38C388.132 719.067 378.675 730.533 372.415 738.123L372.41 738.13C368.165 743.274 365.337 746.722 365.131 756.137ZM459.218 879.962C458.838 878.885 458.519 877.98 458.27 877.21L458.24 877.2C452.8 878.9 450.13 882.25 445.68 890.3C441.04 898.72 433.78 903.43 425.24 903.56H424.88C417.37 903.56 409.69 899.92 402.91 893.39C403.53 898.29 402.72 906.75 400.35 927.88C394.251 972.262 398.548 978.278 402.698 984.087L402.7 984.09L402.708 984.101C404.245 986.248 405.842 988.476 406.97 992.31C428.056 1059.73 426.601 1076.05 425.061 1093.33L425.06 1093.34C423.73 1108.22 427.38 1110.82 427.42 1110.84C427.95 1111.08 428.21 1111.5 428.31 1112.07L428.319 1112.12C428.444 1112.86 429.671 1120.14 428.8 1127.03C425.02 1148.88 428.99 1151.15 435.01 1154.59L435.99 1155.15C442.37 1158.78 447.41 1161.65 447.22 1167.19C446.15 1180.25 460.45 1184.43 460.59 1184.47C461.04 1184.6 461.42 1184.9 461.65 1185.3C465.49 1192.01 469.77 1195.72 474.36 1196.33C480.12 1197.09 484.62 1192.63 484.67 1192.58C485.33 1191.91 486.41 1191.88 487.11 1192.5C488.56 1193.78 489.92 1194.33 491.34 1194.17C493.91 1193.89 495.79 1191.32 495.81 1191.29C496.25 1190.69 497.01 1190.41 497.73 1190.61C498.98 1190.96 500.02 1190.88 500.89 1190.38C502.57 1189.41 503.18 1187.13 503.18 1187.11C503.39 1186.3 504.06 1185.75 504.97 1185.77C505.76 1185.81 506.34 1185.63 506.73 1185.25C507.38 1184.63 507.52 1183.49 507.52 1183.1C507.52 1182.13 508.29 1181.33 509.26 1181.31C510.14 1181.29 511.34 1181.05 512.02 1180.02C512.59 1179.16 513.25 1177.02 511.32 1172.37C507.28 1163.44 499.83 1157.56 493.25 1152.38C492.968 1152.16 492.686 1151.93 492.406 1151.71C491.725 1151.17 491.055 1150.64 490.41 1150.12C485.32 1146 484.5 1144.46 483.39 1141.88C483.02 1141.01 482.59 1140.01 481.77 1138.64C481.172 1137.63 480.217 1136.11 479.07 1134.29L478.59 1133.53C473.94 1126.16 466.92 1115.01 465.55 1110.47C465.5 1110.32 465.47 1110.17 465.47 1110.01C465.3 1104.51 464.58 1100.05 462.82 1089.59C460.464 1076.9 462.801 1057.32 465.276 1036.59L465.29 1036.47C466.24 1028.53 467.22 1020.32 467.94 1012.41C480.616 940.194 465.29 897.058 459.516 880.806L459.51 880.79C459.409 880.503 459.312 880.227 459.218 879.962ZM456.557 864.251C456.448 861.426 456.345 858.754 455.77 855.6C455.48 853.99 455.13 852.771 454.76 851.481L454.757 851.468C453.617 847.471 452.33 842.952 451.96 825.57C450.47 827.6 448.74 829.17 446.69 830.19C442.67 832.19 437.95 831.8 432.28 829.02C431.09 828.44 430.18 828.29 429.58 828.57C427.935 829.348 426.966 833.575 426.028 837.663L426.014 837.727C423.844 847.195 420.876 860.15 405.78 860.4H405.46C391.87 860.4 383.4 845.67 378.41 831.59C380.99 853.17 387.67 864.48 393.13 873.71L393.2 873.83C394.135 875.416 395.031 876.938 395.88 878.46L395.9 878.5C395.94 878.572 395.979 878.643 396.018 878.713C396.088 878.837 396.156 878.958 396.22 879.08C403.99 892.19 414.7 900.02 424.89 900.02H425.2C432.41 899.91 438.59 895.86 442.59 888.6C447.34 880.01 450.64 875.81 457.42 873.76C456.79 870.19 456.67 867.21 456.56 864.32L456.557 864.251ZM445.69 572.66C443.74 564.94 440.49 543.51 437.82 522.88L437.83 522.87C415.94 538.17 410.44 587.99 405.57 632.12C403.84 647.83 402.2 662.67 399.92 675.02C391.492 720.6 381.674 732.505 375.184 740.375L375.18 740.38L375.179 740.381C368.97 747.91 366.14 751.341 371.7 782.46L371.88 783.45C372.33 785.65 372.75 787.86 373.16 790.06L373.4 791.26C373.42 791.36 373.43 791.47 373.43 791.57C374.29 796.35 375.05 801.13 375.71 805.9C375.71 805.915 375.715 805.93 375.72 805.945C375.725 805.96 375.73 805.975 375.73 805.99C375.8 806.5 383.1 856.84 405.48 856.84H405.73C418.05 856.63 420.45 846.15 422.56 836.9L422.56 836.898C423.84 831.299 424.85 826.88 428.05 825.35C429.68 824.57 431.63 824.73 433.84 825.82C438.45 828.09 442.14 828.47 445.1 827C452.43 823.365 455.322 808.622 458.387 792.996L458.481 792.518C459.175 788.977 459.891 785.331 460.68 781.74C474.16 696.82 455.87 611.2 446.29 574.96C446.03 573.98 445.83 573.21 445.69 572.66ZM432.113 473.107C429.505 453.714 426.809 433.662 436.59 414.22V414.23C456.16 376.54 461.37 352.82 462.38 347.34C461.23 343.9 460.34 340.37 459.76 336.82L459.76 336.818C458.83 331.048 456.71 317.899 461.1 307.86C458.83 310.01 456.78 312.36 454.82 314.74C453.51 316.33 452.14 317.85 450.72 319.31C440.43 330.68 428.45 341.02 417.84 350.16L417.764 350.226C404.416 361.728 392.888 371.662 392 377.79C391.91 378.71 391.83 379.65 391.77 380.64C391.57 386.97 393.1 395.51 394.84 405.19C397.63 420.71 400.79 438.31 398.39 454.69C393.49 488.14 405.05 503.35 410.25 508.34C416.56 514.4 427.31 517.28 436.9 515.61C435.62 505.24 434.55 495.54 433.94 488.46C433.51 483.47 432.84 478.46 432.12 473.16L432.113 473.107ZM505.02 395.13L505.05 395.16C521.6 415.36 536.81 417.97 545.53 413.67C554.91 409.04 566.77 392.71 540.83 335.29C532.29 319.13 527.41 314 524.54 310.99C523.99 310.41 523.48 309.87 523.01 309.33C520.03 307.33 516.84 305.56 513.53 304.07C510.63 302.77 507.85 301.79 505.27 301.04C505.21 301.03 505.16 301.01 505.11 300.99C498.54 299.1 493.28 298.71 490.87 298.64L490.855 298.64C482.601 298.4 474.787 298.173 469.17 302.75C459.173 310.888 462.148 329.3 463.269 336.234L463.27 336.24C463.75 339.14 464.45 342.04 465.33 344.87C465.62 345.07 465.86 345.34 466 345.68C470.06 355.65 476.99 361.88 481.58 366C481.715 366.122 481.849 366.242 481.98 366.36C482.44 366.774 482.873 367.164 483.27 367.53C485.59 369.69 495.13 382 505.02 395.13ZM609.7 524.9C609.75 524.95 609.79 525 609.83 525.05H609.82C611.26 526.94 614.3 531.08 616.55 535.28C622.17 537.54 627.69 537.69 631.79 535.65C636.49 533.31 640.07 527.7 641.22 520.95C640.42 519.25 639.54 517.52 638.56 515.75C634.823 507.683 630.558 497.123 626.036 485.926L625.88 485.54C614.87 458.24 601.16 424.26 587.79 408.18C579.78 398.54 574.01 392.51 569.79 388.11L569.745 388.064C563.854 381.903 560.604 378.505 558.07 372.39C557.78 371.7 557.49 371.02 557.2 370.35C564.84 401.78 555.08 412.92 547.09 416.86C544.39 418.19 541.18 418.97 537.57 418.97C531.72 418.97 524.84 416.91 517.44 411.8C522.4 418.52 526.57 424.26 528.76 427.4C533.54 435.09 536.09 440.44 538.55 445.62L538.554 445.628C542.562 454.055 546.344 462.005 559.49 478.42C571.57 493.49 579.85 499.82 588.62 506.51C594.97 511.35 601.53 516.36 609.7 524.9ZM654.74 632.92C654.76 631.73 654.88 630.45 655.13 629.09H655.11C656.75 620 656.41 618.61 655.39 614.51L655.355 614.367C654.848 612.3 654.154 609.473 653.48 604.86C652.78 601.9 651.71 600.58 650.23 598.77C649.03 597.29 647.64 595.57 646.24 592.62C646.67 596.18 647.73 598.32 648.71 600.29L648.719 600.308C649.846 602.572 651.01 604.91 650.93 608.67C650.87 611.905 651.098 614.11 651.317 616.231L651.325 616.309C651.643 619.421 651.945 622.377 651.1 627.61C650.8 629.5 651.05 630.89 651.86 631.73C652.59 632.49 653.74 632.81 654.74 632.92ZM668.9 621.96V621.74L668.89 621.72C669.11 618.4 669.47 612.83 667.53 596.73C666.94 591.75 666.8 588.85 666.7 586.74C666.56 583.793 664.823 579.057 661.49 572.53L661.31 572.17C654.369 559.074 651.157 548.974 648.325 540.071L648.29 539.96C646.82 535.33 645.39 530.85 643.54 526.24C641.57 531.99 637.98 536.52 633.38 538.81C630.97 540.01 628.18 540.61 625.21 540.61C623.07 540.61 620.83 540.3 618.56 539.68C619.4 542.11 619.64 544.27 618.71 545.66C613.95 552.21 616.31 559.67 618.91 562.84C621.8 566.37 623.3 571.12 624.48 580.36C624.742 583.317 624.863 586.068 624.979 588.721L624.99 588.97C625.5 600.7 626.22 605.22 631.8 605.22H632.01C633.04 605.2 633.87 604.79 634.63 603.93C638.62 599.42 638.16 585.46 637.64 580.46C637.58 579.89 637.81 579.32 638.24 578.94C638.67 578.56 639.26 578.42 639.82 578.55C640.02 578.6 644.55 579.74 647.34 585.45C647.384 585.521 647.413 585.608 647.44 585.69L647.45 585.72C649.308 592.003 651.266 594.405 652.984 596.513L652.99 596.52L653.006 596.54C654.58 598.472 656.063 600.293 656.98 604.19C657.67 608.89 658.32 611.53 658.85 613.65C659.94 618.05 660.39 619.88 658.62 629.71C657.88 633.86 658.33 636.88 659.97 638.69C661.24 640.09 663.04 640.52 664.21 640.64C666.14 633.85 668.75 624.11 668.9 621.96Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </div>

                    {/*Parte de atras del cuerpo */}

                    <div className="body-map__body2">
                      <svg
                        height="100%"
                        viewBox="0 0 652 1200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Isquiotibiales"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${isquiotibiales}, ${Math.round(
                              80 + (isquiotibiales / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M445.184 807.888C446.787 801.789 448.155 795.533 449.322 789.172L449.314 789.164C465.006 703.905 443.772 599.686 435.564 575.803C431.113 562.86 431.356 559.172 431.634 554.931L431.635 554.927C431.641 554.821 431.647 554.715 431.654 554.609C431.719 553.54 431.787 552.428 431.739 551.049V550.997C430.38 539.609 417.432 527.898 403.996 519.743C409.562 527.112 412.133 536.561 415.172 547.736L415.175 547.747L415.363 548.427C416.558 552.771 417.791 557.25 419.314 562.019C427.627 587.984 426.773 608.53 416.814 623.099C404.85 640.569 383.416 643.679 374.764 644.219C373.509 644.289 372.245 644.376 371.008 644.464C370.834 644.481 370.642 644.498 370.468 644.498C370.113 644.534 369.758 644.553 369.397 644.573C369.227 644.582 369.056 644.592 368.882 644.603C367.201 644.725 365.536 644.829 363.881 644.917H363.741C360.352 645.23 357.163 645.927 355.464 647.853C354.279 649.186 353.808 651.103 354 653.726C355.307 670.633 351.554 677.779 347.922 684.695L347.913 684.71C343.332 693.446 339.007 701.693 345.766 730.951C347.108 735.909 348.458 740.718 349.8 745.484C353.852 759.896 357.764 773.855 361.171 790.227C361.572 790.488 361.851 790.906 361.92 791.394C369.135 840.38 376.863 860.368 388.6 860.368C401.827 860.368 402.576 837.165 403.012 823.311C403.291 814.275 403.413 810.537 406.088 810.067C408.423 809.683 410.296 811.452 417.458 829.497C423.226 844.039 427.557 845.799 429.604 845.538C435.294 844.858 440.592 830.569 444.434 814.807C444.469 812.376 444.713 810.075 445.184 807.888Z"
                            fill="currentColor"
                          />
                          <path
                            d="M305.441 730.959C305.441 730.925 305.459 730.855 305.459 730.855L305.45 730.864C312.159 701.683 307.855 693.44 303.28 684.719L303.277 684.712C299.645 677.796 295.892 670.65 297.181 653.743C297.382 651.12 296.902 649.212 295.717 647.87C294.01 645.945 290.847 645.265 287.475 644.951C287.37 644.934 287.283 644.934 287.178 644.934C285.61 644.847 284.016 644.742 282.412 644.62H282.273C281.445 644.568 280.626 644.533 279.842 644.464C279.797 644.464 279.756 644.459 279.716 644.454C279.678 644.45 279.64 644.446 279.598 644.446C279.24 644.423 278.882 644.397 278.525 644.372C277.823 644.322 277.122 644.272 276.418 644.237C267.757 643.697 246.322 640.586 234.385 623.116C224.409 608.548 223.555 588.002 231.867 562.037C233.488 557.009 234.769 552.321 236.006 547.764L236.024 547.696C239.075 536.547 241.654 527.117 247.202 519.76C233.679 527.968 220.662 539.748 219.425 551.206V551.258C219.409 552.525 219.476 553.566 219.54 554.563C219.548 554.691 219.556 554.818 219.564 554.944L219.567 554.985C219.827 559.211 220.055 562.915 215.634 575.821C206.825 601.49 182.96 719.911 206.006 807.827C206.494 810.049 206.738 812.367 206.773 814.815C210.616 830.578 215.922 844.867 221.585 845.547C223.65 845.808 227.964 844.057 233.732 829.506C240.894 811.47 242.793 809.692 245.102 810.075C247.777 810.546 247.899 814.282 248.195 823.314L248.196 823.319C248.631 837.173 249.363 860.377 262.59 860.377C274.318 860.377 282.055 840.389 289.287 791.403C289.357 790.915 289.636 790.497 290.019 790.253C293.443 773.863 297.355 759.922 301.407 745.493C302.749 740.727 304.099 735.917 305.441 730.959Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Espalda Baja"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${espaldaBaja}, ${Math.round(
                              80 + (espaldaBaja / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M378.772 505.052C366.957 502.464 351.674 502.97 340.251 511.465C332.897 516.937 327.982 524.988 325.595 535.522C323.216 524.988 318.311 516.946 310.957 511.465C299.534 502.961 284.26 502.464 272.436 505.052C278.465 497.576 278.012 486.885 277.542 475.75C277.036 463.856 276.479 450.351 283.101 437.717C303.472 398.873 312.891 375.574 311.471 351.9C316.237 364.656 319.557 370.581 325.586 370.581C331.616 370.581 334.936 364.656 339.684 351.918C338.29 375.591 347.718 398.864 368.072 437.717C374.694 450.351 374.136 463.856 373.631 475.75C373.178 486.894 372.725 497.585 378.754 505.052H378.772Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Gluteos"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${gluteos}, ${Math.round(
                              80 + (gluteos / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M323.861 612.416V552.278H323.852C323.852 534.442 318.807 521.651 308.866 514.245C297.12 505.497 280.731 506.019 269.325 509.444C267.539 509.975 265.875 510.568 264.324 511.195C264.306 511.212 264.289 511.212 264.271 511.23C263.688 511.474 263.113 511.718 262.555 511.979C262.513 511.993 262.471 512.01 262.43 512.028C262.367 512.056 262.304 512.087 262.241 512.119C247.46 519.096 244.128 531.268 239.391 548.575L239.146 549.472C237.961 553.809 236.736 558.295 235.196 563.082C227.232 587.976 227.929 607.493 237.261 621.138C248.344 637.336 268.489 640.238 276.627 640.743C277.106 640.778 277.583 640.808 278.06 640.839C278.537 640.869 279.014 640.9 279.493 640.935H279.737C280.609 641.022 281.541 641.074 282.5 641.126H282.569C282.7 641.134 282.835 641.142 282.971 641.149C283.143 641.159 283.318 641.169 283.493 641.179L283.671 641.187C285.028 641.254 286.438 641.324 287.841 641.457C287.893 641.457 287.963 641.475 288.015 641.475C299.647 642.12 310.147 641.823 316.594 635.794C321.5 631.219 323.861 623.578 323.861 612.416Z"
                            fill="currentColor"
                          />
                          <path
                            d="M374.572 640.743C382.719 640.238 402.864 637.336 413.956 621.138H413.947C423.279 607.493 423.976 587.976 416.012 563.082C414.386 558.023 413.095 553.317 411.849 548.774L411.821 548.671C407.098 531.305 403.761 519.107 388.949 512.119C388.844 512.066 388.74 512.014 388.635 511.979C388.086 511.718 387.511 511.474 386.919 511.23C386.901 511.212 386.884 511.212 386.866 511.195C385.324 510.576 383.651 509.984 381.865 509.444C370.468 506.019 354.087 505.505 342.324 514.245C332.374 521.651 327.338 534.442 327.338 552.278V612.416C327.338 623.578 329.716 631.219 334.604 635.794C341.087 641.858 351.682 642.12 363.384 641.458C363.419 641.458 363.454 641.453 363.489 641.449C363.524 641.444 363.558 641.44 363.593 641.44C364.929 641.323 366.257 641.254 367.546 641.187L368.708 641.126C368.874 641.118 369.039 641.105 369.205 641.091C369.37 641.078 369.536 641.065 369.701 641.057C369.953 641.039 370.195 641.025 370.441 641.012C370.671 640.999 370.903 640.986 371.148 640.97C371.215 640.961 371.283 640.957 371.348 640.953C371.418 640.948 371.486 640.944 371.548 640.935H371.705C372.185 640.9 372.663 640.869 373.141 640.839C373.617 640.808 374.094 640.778 374.572 640.743Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Dorsales"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${dorsales}, ${Math.round(
                              80 + (dorsales / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M454.007 309.662L454.036 309.519L454.028 309.502L454.04 309.443C456.729 296.531 459.508 283.182 453.627 279.328H453.609C449.07 277.219 444.591 274.51 440.4 270.998C433.569 265.282 426.947 260.141 420.517 255.166L420.163 254.892C410.325 247.256 400.986 240.007 391.902 231.388L391.676 231.649C371.514 269.107 359.228 298.619 351.09 320.263C349.887 323.513 348.763 326.571 347.718 329.472C347.648 329.647 347.596 329.804 347.544 329.978C337.009 362.469 344.485 385.22 371.148 436.079C378.223 449.549 377.63 463.543 377.107 475.88L377.107 475.901C376.515 490.495 376.042 502.153 388.199 507.971H388.217C388.905 508.267 389.567 508.546 390.212 508.86L390.578 509.017C402.89 514.009 420.517 524.683 429.517 537.282C424.115 514.41 420.412 471.994 420.621 459.116C420.626 458.736 420.63 458.345 420.633 457.943C420.64 456.943 420.644 455.872 420.656 454.716C420.708 440.313 420.83 413.494 432.41 395.083C443.781 377.012 451.527 343.501 452.607 338.578C449.301 332.278 451.587 321.294 454.007 309.662Z"
                            fill="currentColor"
                          />
                          <path
                            d="M274.079 475.804C273.574 463.489 273.003 449.532 280.042 436.096L280.051 436.113C306.714 385.254 314.207 362.495 303.655 330.013C303.603 329.838 303.551 329.682 303.481 329.507C302.435 326.606 301.311 323.547 300.109 320.297C291.971 298.671 279.703 269.16 259.558 231.719L259.296 231.423C250.185 240.076 240.808 247.348 230.918 255.018L230.682 255.201C224.269 260.168 217.63 265.317 210.816 271.033C206.608 274.562 202.094 277.298 197.537 279.398C197.52 279.398 197.502 279.415 197.485 279.432C191.734 283.362 194.496 296.657 197.171 309.535L197.171 309.537C199.611 321.212 201.92 332.269 198.6 338.595C199.698 343.509 207.444 377.02 218.815 395.1C230.361 413.462 230.49 440.205 230.56 454.639L230.56 454.733C230.56 456.354 230.578 457.809 230.595 459.134C230.787 472.012 227.084 514.428 221.681 537.3C230.804 524.552 248.745 513.765 261.048 508.842C261.089 508.822 261.13 508.801 261.175 508.784C261.206 508.773 261.238 508.762 261.274 508.755C261.806 508.494 262.363 508.25 262.938 508.023C262.938 508.023 262.944 508.018 262.951 508.013C262.958 508.009 262.965 508.006 262.973 508.006C275.18 502.168 274.694 490.536 274.085 475.962L274.079 475.804Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Trapecio Medio"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${trapecio}, ${Math.round(
                              80 + (trapecio / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M384.871 237.078C366.843 271.303 355.568 298.575 347.918 318.929C347.901 318.947 347.901 318.982 347.883 318.999C346.646 322.04 345.557 324.994 344.599 327.878V327.895C343.048 332.191 341.662 336.086 340.425 339.597C333.96 357.921 330.727 367.113 325.595 367.113C320.463 367.113 317.23 357.921 310.765 339.597C309.476 335.946 308.055 331.895 306.435 327.434C306.435 327.416 306.417 327.381 306.4 327.364C305.581 324.915 304.666 322.389 303.638 319.818C303.586 319.696 303.533 319.574 303.481 319.452C303.429 319.295 303.376 319.156 303.307 318.999C295.674 298.645 284.382 271.355 266.354 237.095C268.802 238.263 271.312 238.716 274.109 238.716C277.69 238.716 281.742 237.984 286.656 237.095C295.395 235.509 307.393 233.34 325.586 233.34C343.78 233.34 355.778 235.509 364.534 237.095C369.457 237.984 373.483 238.716 377.064 238.716C379.861 238.716 382.396 238.263 384.854 237.078H384.871Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Trapecio"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${trapecio}, ${Math.round(
                              80 + (trapecio / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M420.952 210.328C405.051 212.672 395.736 222.047 390.569 227.728C390.186 228.129 389.855 228.495 389.524 228.861L389.036 229.401C389.036 229.401 388.984 229.471 388.966 229.488C382.362 236.79 377.317 235.884 365.153 233.679C356.274 232.059 344.102 229.872 325.595 229.872C307.088 229.872 294.916 232.059 286.037 233.679C273.873 235.884 268.846 236.79 262.241 229.488C262.224 229.471 262.189 229.436 262.172 229.401L261.666 228.861C261.353 228.513 261.021 228.147 260.673 227.763L260.638 227.728L260.534 227.624C255.358 221.925 246.07 212.637 230.255 210.328L230.412 210.224C233.575 208.263 237.905 205.579 240.946 204.177C242.889 203.288 247.446 201.397 252.247 199.358C257.188 197.293 262.555 195.045 266.502 193.329C266.519 193.329 266.519 193.311 266.537 193.311C266.572 193.311 266.589 193.311 266.624 193.294C285.88 188.031 306.426 189.068 317.466 189.608C318.651 189.678 319.705 189.73 320.663 189.765C323.931 189.904 327.268 189.904 330.553 189.765C331.494 189.73 332.566 189.678 333.751 189.608C344.773 189.068 365.319 188.022 384.592 193.294H384.662C388.609 195.01 393.994 197.293 398.951 199.358C403.77 201.388 408.301 203.288 410.27 204.177C413.311 205.588 417.641 208.263 420.787 210.224C420.839 210.258 420.909 210.293 420.961 210.328H420.952Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Hombros"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${hombros}, ${Math.round(
                              80 + (hombros / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M229.447 251.746C239.028 244.299 248.146 237.211 256.961 228.852C250.914 222.405 239.857 212.689 220.862 213.299C220.858 213.299 220.848 213.3 220.835 213.302C220.796 213.307 220.721 213.317 220.618 213.317C216.462 213.77 159.678 221.211 146.852 288.25C150.033 286.194 154.982 283.624 160.096 283.345C160.551 283.33 161.071 283.304 161.631 283.276C161.748 283.27 161.867 283.264 161.987 283.258C171.092 282.857 192.422 281.898 208.568 268.358C215.451 262.59 222.108 257.423 228.556 252.439L229.447 251.746Z"
                            fill="currentColor"
                          />
                          <path
                            d="M491.111 283.345C496.234 283.624 501.175 286.203 504.373 288.25C491.564 221.333 434.972 213.805 430.607 213.317C430.45 213.317 430.345 213.299 430.345 213.299H430.328C411.333 212.724 400.311 222.439 394.264 228.852C403.267 237.381 412.551 244.587 422.362 252.201L422.669 252.439C429.117 257.423 435.774 262.59 442.64 268.358C446.595 271.66 450.856 274.239 455.169 276.217C468.5 282.334 482.354 282.961 489.22 283.258C489.377 283.265 489.53 283.273 489.679 283.281C490.201 283.307 490.677 283.331 491.111 283.345Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Pantorrillas"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${pantorrillas}, ${Math.round(
                              80 + (pantorrillas / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M450.943 1016.66C463.752 1015.89 466.915 989.158 468.309 963.036L468.317 963.027C467.899 937.576 462.619 919.766 457.835 904.884C457.801 904.788 457.77 904.696 457.74 904.605C457.709 904.513 457.679 904.422 457.644 904.326C457.563 904.067 457.48 903.807 457.396 903.547C457.262 903.133 457.127 902.72 456.999 902.313C456.197 900.17 455.073 898.192 453.505 897.774C450.203 896.868 444.461 902.427 439.424 907.35L439.406 907.367C431.691 914.874 422.959 923.369 415.437 917.779C410.314 913.972 404.371 913.057 399.535 915.348C394.081 917.936 390.744 924.314 390.36 932.836C390.308 933.672 389.698 934.352 388.896 934.474C384.583 975.931 384.88 989.21 387.799 998.786C387.816 998.821 387.816 998.838 387.816 998.873C396.814 1022.4 406.325 1020.43 409.465 1019.79L409.477 1019.78C417.458 1018.11 418.565 1007.21 419.454 998.455C420.159 991.38 420.735 985.803 424.908 985.455C428.187 985.161 430.435 989.771 433.835 996.744L433.909 996.895C437.961 1005.25 443.502 1016.66 450.56 1016.66H450.943Z"
                            fill="currentColor"
                          />
                          <path
                            d="M263.496 998.655C263.496 998.62 263.531 998.568 263.531 998.568L263.54 998.577C266.354 989.001 266.633 975.618 262.337 934.491C261.536 934.387 260.908 933.707 260.873 932.853C260.49 924.332 257.135 917.954 251.681 915.366C246.854 913.065 240.903 913.989 235.797 917.797C228.286 923.378 219.569 914.916 211.844 907.418L211.792 907.367L211.729 907.306C206.7 902.407 201.017 896.871 197.711 897.791C196.248 898.192 195.158 899.97 194.357 901.965L194.305 902.122C194.043 902.941 193.764 903.768 193.485 904.622C188.667 919.557 183.317 937.445 182.899 963.027V963.149C184.31 989.236 187.491 1015.9 200.264 1016.67C207.514 1017.08 213.177 1005.43 217.316 996.904L217.404 996.722C220.779 989.766 223.026 985.135 226.317 985.464C230.463 985.81 231.034 991.337 231.761 998.366L231.771 998.464L231.777 998.517C232.665 1007.27 233.765 1018.13 241.73 1019.79L241.746 1019.8C244.907 1020.44 254.423 1022.4 263.409 998.812C263.416 998.798 263.42 998.786 263.425 998.776C263.432 998.76 263.441 998.746 263.461 998.725C263.461 998.708 263.479 998.69 263.479 998.69L263.496 998.655Z"
                            fill="currentColor"
                          />
                        </g>

                        <g
                          id="Triceps"
                          className={"body-map__muscle2"}
                          style={{
                            color: `rgb(${triceps}, ${Math.round(
                              80 + (triceps / 255) * (255 - 80)
                            )}, 255)`,
                          }}
                        >
                          <path
                            d="M542.641 384.976C545.908 385.951 549.629 387.032 550.814 385.812H550.805C551.52 385.063 552.225 382.771 550.492 375.801C549.564 373.453 548.981 371.145 548.428 368.955L548.357 368.673C548.339 368.621 548.322 368.551 548.322 368.499C548.292 368.424 548.275 368.336 548.259 368.257L548.252 368.22C547.555 365.414 546.867 362.757 545.49 360.343C541.534 353.434 536.023 341.446 535.046 339.322C534.971 339.158 534.922 339.053 534.904 339.013C534.869 338.944 534.834 338.857 534.817 338.769C527.419 312.865 506.472 294.167 505.688 293.469H505.671L505.584 293.382L505.575 293.375C504.632 292.632 497.737 287.195 490.911 286.813C490.6 286.792 490.256 286.778 489.888 286.762C489.627 286.751 489.354 286.74 489.072 286.725L488.989 286.722C482.834 286.442 471.391 285.922 459.491 281.698C461.944 288.605 459.673 299.515 457.454 310.171L457.443 310.225L457.44 310.242C455.175 321.102 452.836 332.324 455.892 337.358L455.927 337.393V337.41L456.415 338.159C464.091 350.28 484.533 382.449 492.479 390.604C494.44 392.617 496.086 394.377 497.707 396.163C513.321 410.244 519.699 411.917 522.322 410.854C525.293 409.643 525.659 403.413 525.973 397.941C526.304 392.051 526.635 386.483 529.989 384.4C533.449 382.266 538.119 383.634 542.641 384.976Z"
                            fill="currentColor"
                          />
                          <path
                            d="M195.254 337.454L195.289 337.401H195.28C198.373 332.374 196.021 321.117 193.747 310.234C191.525 299.561 189.251 288.625 191.717 281.707C179.816 285.931 168.374 286.451 162.219 286.73L162.135 286.734C161.847 286.749 161.573 286.76 161.311 286.771C160.946 286.787 160.604 286.801 160.279 286.821C153.413 287.205 146.512 292.677 145.624 293.391L145.537 293.478H145.519C144.761 294.14 123.78 312.865 116.374 338.778C116.356 338.865 116.321 338.952 116.286 339.022C116.042 339.58 109.961 352.911 105.717 360.352C104.332 362.774 103.635 365.432 102.938 368.229L102.93 368.266C102.915 368.345 102.898 368.433 102.868 368.508C102.868 368.56 102.851 368.63 102.833 368.682L102.806 368.79C102.266 370.98 101.694 373.295 100.751 375.652L100.733 375.687C98.9558 382.762 99.6703 385.054 100.385 385.821C101.587 387.032 105.29 385.96 108.558 384.984C113.071 383.642 117.75 382.274 121.227 384.409C124.565 386.482 124.892 392.006 125.238 397.864L125.244 397.949L125.246 397.995C125.559 403.456 125.914 409.646 128.894 410.862C131.508 411.934 137.886 410.235 153.492 396.172C155.104 394.386 156.759 392.626 158.72 390.613C166.675 382.457 187.099 350.28 194.784 338.168L195.254 337.454Z"
                            fill="currentColor"
                          />
                        </g>

                        <svg>
                          <g
                            id="Antebrazos"
                            className={"body-map__muscle2"}
                            style={{
                              color: `rgb(${antebrazos}, ${Math.round(
                                80 + (antebrazos / 255) * (255 - 80)
                              )}, 255)`,
                            }}
                          >
                            <path
                              d="M622.044 548.592C626.462 546.884 630.339 541.622 632.265 534.755L632.256 534.738C631.786 534.041 631.333 533.283 630.914 532.29C630.183 530.547 628.649 525.79 626.34 518.575L626.117 517.882C621.416 503.25 613.707 479.261 604.47 455.187C590.285 418.199 564.772 392.617 557.297 385.664C556.451 384.871 555.685 384.087 555.022 383.285C554.944 385.498 554.369 387.11 553.306 388.208C550.657 390.97 546.074 389.62 541.656 388.313C538.04 387.232 533.954 386.03 531.802 387.354C529.998 388.476 529.707 393.512 529.448 398.001L529.44 398.132L529.437 398.188C529.037 405.001 528.625 412.027 523.637 414.069C522.801 414.417 521.869 414.592 520.858 414.592C517.573 414.592 513.312 412.753 507.823 408.911C510.855 412.98 514.611 418.138 519.664 425.091L520.1 425.666C526.426 434.379 531.767 443.676 537.413 453.531L537.46 453.613C546.385 469.167 555.621 485.263 569.242 499.145C591.261 521.755 601.15 536.289 605.376 545.394C611.458 549.097 617.662 550.282 622.044 548.592Z"
                              fill="currentColor"
                            />
                            <path
                              d="M131.543 425.091C136.582 418.159 140.33 413.01 143.332 408.947C137.873 412.777 133.638 414.609 130.341 414.609C129.339 414.609 128.415 414.435 127.579 414.086C122.577 412.039 122.159 404.981 121.776 398.15C121.514 393.628 121.218 388.504 119.397 387.372C117.262 386.056 113.176 387.25 109.56 388.33L109.55 388.333C105.118 389.639 100.549 390.986 97.8929 388.226C96.856 387.128 96.2635 385.524 96.1764 383.337C95.5054 384.113 94.7561 384.897 93.9196 385.681C86.4263 392.634 60.914 418.216 46.7289 455.204C37.4945 479.294 29.7732 503.308 25.072 517.929L24.8588 518.593C22.5585 525.807 21.0337 530.573 20.3018 532.307C19.8835 533.292 19.413 534.058 18.9425 534.755C20.8681 541.622 24.7455 546.893 29.1805 548.592C33.5458 550.282 39.7671 549.097 45.8489 545.394C50.0661 536.272 59.9556 521.755 81.9651 499.145C95.6215 485.244 104.873 469.116 113.8 453.551L113.812 453.531C119.458 443.676 124.799 434.371 131.125 425.666L131.543 425.091Z"
                              fill="currentColor"
                            />
                          </g>

                          <g id="body" className="body-map__model2">
                            <path
                              d="M143.332 408.947C143.341 408.935 143.349 408.923 143.358 408.911V408.928C143.349 408.934 143.341 408.941 143.332 408.947Z"
                              fill="currentColor"
                            />
                            <path
                              d="M651.077 602.745C650.563 597.656 648.106 589.718 645.509 581.31C642.73 572.318 639.854 563.021 639.828 558.394C640.307 540.14 637.807 536.664 635.602 533.588C635.001 532.76 634.487 532.046 634.069 531.026C633.398 529.423 631.803 524.465 629.607 517.608C624.928 503.013 617.095 478.582 607.685 454.028C593.23 416.334 567.238 390.282 559.623 383.189C556.643 380.419 554.927 377.595 553.768 374.764C553.227 372.62 552.504 370.224 551.598 367.523C550.866 364.569 550.073 361.528 548.453 358.688C544.488 351.752 538.694 339.109 538.075 337.759C530.8 312.438 511.735 294.367 508.372 291.335C496.112 215.939 431.225 209.945 430.572 209.892C430.563 209.892 430.546 209.892 430.537 209.892C430.519 209.892 430.511 209.892 430.493 209.892C429.195 209.849 427.94 209.858 426.712 209.892C426.555 209.718 426.363 209.57 426.137 209.465C425.684 209.256 424.176 208.324 422.582 207.331C419.34 205.318 414.905 202.565 411.655 201.075C409.643 200.16 405.286 198.33 400.232 196.213C392.905 193.137 384.592 189.652 381.621 188.17C377.482 186.105 370.189 179.204 368.316 177.392C367.784 171.58 367.514 167.224 367.427 165.777C368.037 165.359 368.56 164.941 368.978 164.54C372.742 160.558 375.426 152.011 377.325 141.311C380.427 137.852 382.501 131.055 384 119.414C385.054 111.189 385.376 103.443 381.185 101.361C382.318 75.9007 381.612 52.3141 381.551 50.3536C380.575 19.474 371.871 14.978 360.857 9.27084C360.169 8.9136 359.472 8.55636 358.766 8.18169C351.787 4.48729 348.458 4.85325 344.938 5.23663C342.263 5.53288 339.501 5.82913 334.361 4.39145C311.846 -6.27352 298.227 4.57442 287.283 13.2963L286.935 13.5752C284.87 15.222 282.944 16.2153 281.079 17.1824C272.497 21.6349 268.018 25.6168 268.079 61.3148C267.827 77.504 268.166 91.2534 268.881 102.92C266.624 105.7 266.049 111.111 267.121 119.406C268.349 128.921 270.458 135.821 273.386 139.925C277.158 158.371 281.576 164.035 281.916 164.444C282.064 164.619 282.238 164.767 282.43 164.871C282.857 165.098 283.284 165.307 283.711 165.533C283.65 166.666 283.371 171.197 282.805 177.383C280.922 179.196 273.638 186.088 269.499 188.162C266.528 189.652 258.207 193.137 250.871 196.213C245.826 198.33 241.469 200.151 239.465 201.075C236.224 202.556 231.789 205.309 228.547 207.322C226.953 208.315 225.437 209.256 224.984 209.457C224.757 209.561 224.565 209.709 224.409 209.884C223.18 209.84 221.925 209.831 220.627 209.884C220.61 209.884 220.601 209.884 220.583 209.884C220.575 209.884 220.557 209.884 220.549 209.884C219.895 209.936 155.008 215.931 142.748 291.326C139.394 294.358 120.329 312.429 113.045 337.75C112.426 339.101 106.632 351.743 102.668 358.679C101.047 361.52 100.254 364.56 99.5222 367.523C98.6161 370.215 97.9016 372.611 97.3614 374.746C96.2025 377.578 94.4773 380.41 91.4974 383.172C83.8733 390.264 57.8905 416.326 43.4353 454.01C34.0251 478.547 26.1919 502.97 21.5216 517.564C19.3172 524.439 17.7227 529.406 17.0518 531.009C16.6248 532.02 16.1107 532.743 15.5182 533.571C13.3138 536.646 10.8044 540.123 11.2923 558.316C11.2575 562.995 8.39083 572.292 5.61132 581.293C3.01478 589.692 0.566371 597.63 0.0435791 602.719C0.0435791 602.779 0.0435791 602.832 0.0435791 602.893C0.0435791 608.016 1.68166 614.429 3.26746 620.624C4.26948 624.528 5.29764 628.562 5.88143 632.152C6.9183 638.495 10.9787 641.466 15.6838 644.908C18.5853 647.034 21.8702 649.439 24.9721 653.055C25.5907 653.778 26.6711 653.865 27.403 653.255C27.5512 653.133 31.1062 650.118 31.2368 645.3C31.2456 644.969 31.2194 644.629 31.202 644.298C32.5177 643.235 34.8615 640.952 35.5499 637.659C36.1162 634.957 35.4715 632.213 33.6243 629.503C33.145 628.806 32.7181 628.187 32.326 627.63C29.1805 623.151 29.1195 623.064 31.0452 615.684C31.8729 612.521 32.1256 609.689 32.3434 607.188C32.6135 604.139 32.8662 601.481 34.0425 598.981C34.94 598.388 35.9071 597.717 36.9789 596.924C37.2054 602.78 38.434 613.741 44.2805 616.912C47.2866 618.542 50.9113 617.914 55.05 615.048C55.4247 614.786 55.6774 614.394 55.7645 613.95C55.8604 613.462 56.5748 608.644 52.6452 589.84C52.2008 587.113 52.6278 584.525 53.0809 581.798C54.1264 575.507 55.3027 568.371 46.5547 557.419C46.2236 556.539 42.8254 544.366 84.431 501.637C98.3982 487.417 107.747 471.097 116.801 455.326C122.394 445.558 127.692 436.34 133.913 427.783L134.331 427.208C150.599 404.842 153.1 401.4 161.194 393.105C168.879 385.228 186.768 357.328 195.969 342.856C198.435 353.242 205.588 380.715 215.844 397.017C226.883 414.583 226.996 439.773 227.057 454.829C227.057 456.441 227.075 457.923 227.092 459.247C227.293 472.134 223.537 514.942 218.092 537.361C215.582 547.695 215.844 551.703 216.07 555.232C216.323 559.109 216.541 562.455 212.323 574.749C204.063 598.832 182.664 703.835 198.408 789.695C198.408 789.704 198.408 789.713 198.408 789.73C198.757 792.283 200.378 803.48 203.279 815.469C203.331 821.002 202.416 827.371 201.345 834.83C200.012 844.074 198.365 855.576 198.086 869.316C197.877 879.798 194.697 889.601 191.02 900.945C190.697 901.791 190.392 902.714 190.122 903.725C185.225 918.894 179.806 937.07 179.396 963.097C179.283 970.398 179.553 978.301 180.346 986.945C182.228 1007.39 184.04 1025.61 185.644 1041.67C189.077 1076.19 191.351 1098.98 190.627 1106.95C189.782 1116.22 188.606 1122.37 187.36 1128.87C187.038 1130.53 186.715 1132.21 186.393 1133.98C184.868 1136.02 176.129 1147.5 168.269 1152.64C166.788 1152.7 163.207 1153.24 159.974 1157.15C157.901 1157.23 153.03 1157.96 149.397 1162.85C148.499 1163.67 144.343 1167.78 145.362 1172.29C146.12 1175.66 149.466 1178.18 155.452 1179.82C160.184 1180.63 166.884 1182.7 173.977 1184.87C175.815 1185.44 177.671 1186.02 179.492 1186.56C181.479 1189.12 191.107 1200 210.685 1200C218.527 1200 224.47 1197.77 228.364 1193.38C233.697 1187.36 233.915 1178.78 233.165 1172.65C232.059 1163.61 231.919 1149.66 233.801 1140.45C234.742 1135.84 234.42 1133.47 234.037 1130.73C233.584 1127.45 233.017 1123.36 234.281 1113.12C236.424 1095.76 246.244 1055.37 257.449 1022.89C259.453 1017.07 261.292 1013 262.912 1009.4C270.188 993.279 272.383 988.417 261.64 897.591C261.841 888.529 264.812 884.992 268.933 880.112C274.945 872.976 283.17 863.2 286.943 831.092C291.239 794.531 297.782 771.206 304.718 746.504C306.06 741.712 307.428 736.85 308.787 731.831C308.787 731.822 308.787 731.813 308.787 731.805V731.779C310.661 724.886 312.534 717.715 314.338 710.022C321.273 680.44 322.484 666.116 323.896 649.535C324.366 643.949 324.854 638.251 325.569 631.69C326.283 638.251 326.771 643.949 327.242 649.535C328.645 666.125 329.865 680.449 336.8 710.03C338.604 717.724 340.468 724.886 342.342 731.779V731.813C342.342 731.813 342.359 731.839 342.359 731.848C343.719 736.85 345.078 741.712 346.42 746.495C353.355 771.197 359.899 794.522 364.195 831.092C367.967 863.2 376.193 872.976 382.205 880.112C386.317 885 389.297 888.529 389.498 897.591C378.763 988.417 380.959 993.288 388.226 1009.41C389.846 1013.01 391.685 1017.08 393.689 1022.9C404.903 1055.38 414.722 1095.77 416.857 1113.13C418.121 1123.37 417.554 1127.45 417.101 1130.74C416.726 1133.47 416.395 1135.84 417.336 1140.46C419.21 1149.67 419.079 1163.63 417.972 1172.66C417.223 1178.79 417.45 1187.37 422.773 1193.39C426.659 1197.78 432.611 1200.01 440.444 1200.01C460.031 1200.01 469.65 1189.13 471.646 1186.57C473.467 1186.02 475.314 1185.46 477.152 1184.89C484.245 1182.7 490.946 1180.65 495.851 1179.79C501.68 1178.19 505.017 1175.67 505.775 1172.3C506.795 1167.79 502.639 1163.67 501.75 1162.86C498.116 1157.97 493.246 1157.24 491.172 1157.16C487.939 1153.26 484.35 1152.7 482.877 1152.65C475.018 1147.51 466.278 1136.03 464.754 1133.99C464.431 1132.22 464.109 1130.53 463.786 1128.86C462.541 1122.36 461.364 1116.22 460.519 1106.96C459.796 1098.99 462.061 1076.17 465.503 1041.63C467.106 1025.57 468.91 1007.38 470.792 986.962C471.585 978.319 471.864 970.416 471.742 963.114C471.323 937.088 465.904 918.912 461.016 903.742C460.737 902.732 460.441 901.799 460.109 900.954C456.433 889.609 453.252 879.807 453.043 869.325C452.773 855.593 451.117 844.083 449.784 834.838C448.713 827.371 447.798 821.01 447.841 815.504C450.743 803.506 452.363 792.3 452.712 789.747C452.712 789.73 452.712 789.713 452.712 789.695C468.439 703.792 447.057 598.841 438.797 574.767C434.58 562.472 434.798 559.126 435.05 555.249C435.286 551.711 435.547 547.712 433.029 537.378C427.583 514.977 423.836 472.16 424.028 459.264C424.046 457.94 424.054 456.459 424.063 454.847C424.124 439.799 424.229 414.6 435.277 397.043C445.532 380.732 452.695 353.259 455.152 342.882C464.353 357.355 482.241 385.254 489.926 393.131C498.012 401.417 500.513 404.85 516.745 427.174L517.207 427.81C523.428 436.366 528.717 445.593 534.32 455.352C543.364 471.132 552.722 487.443 566.681 501.663C608.295 544.401 604.897 556.573 604.566 557.453C595.818 568.406 596.994 575.542 598.039 581.833C598.493 584.569 598.92 587.148 598.484 589.806C594.537 608.687 595.251 613.505 595.347 613.985C595.434 614.429 595.687 614.821 596.062 615.083C600.192 617.949 603.816 618.577 606.831 616.947C612.678 613.784 613.906 602.823 614.133 596.959C615.205 597.752 616.172 598.432 617.069 599.015C618.254 601.525 618.498 604.174 618.768 607.223C618.995 609.724 619.247 612.556 620.067 615.719C621.992 623.099 621.931 623.177 618.786 627.664C618.394 628.222 617.958 628.841 617.479 629.538C615.631 632.248 614.987 634.992 615.553 637.693C616.241 640.987 618.585 643.27 619.901 644.333C619.875 644.664 619.857 645.004 619.866 645.335C619.997 650.153 623.552 653.168 623.7 653.29C624.432 653.9 625.512 653.804 626.131 653.09C629.233 649.474 632.518 647.069 635.419 644.943C640.124 641.501 644.185 638.53 645.221 632.187C645.805 628.597 646.842 624.563 647.836 620.659C649.421 614.464 651.059 608.051 651.059 602.928C651.059 602.867 651.059 602.814 651.059 602.753L651.077 602.745ZM430.328 213.386C431.966 213.534 491.146 219.616 504.294 288.329C501.105 286.272 496.165 283.711 491.05 283.432C490.492 283.406 489.865 283.371 489.168 283.345C480.063 282.944 458.733 281.994 442.579 268.445C435.704 262.677 429.047 257.519 422.599 252.526C412.684 244.841 403.299 237.548 394.212 228.931C400.276 222.492 411.333 212.768 430.336 213.386H430.328ZM347.84 319.043C347.84 319.043 347.822 319.069 347.822 319.078C346.611 322.075 345.548 324.985 344.599 327.826C343.021 332.173 341.627 336.129 340.373 339.693C333.907 358.008 330.666 367.201 325.543 367.201C320.419 367.201 317.178 358.008 310.713 339.693C309.458 336.129 308.055 332.165 306.478 327.817C305.529 324.976 304.474 322.075 303.263 319.078C303.263 319.06 303.246 319.051 303.246 319.043C295.595 298.689 284.303 271.408 266.276 237.165C268.724 238.341 271.251 238.803 274.065 238.803C277.646 238.803 281.68 238.071 286.603 237.182C295.36 235.596 307.358 233.427 325.551 233.427C343.745 233.427 355.734 235.596 364.491 237.182C369.414 238.071 373.448 238.803 377.029 238.803C379.843 238.803 382.37 238.341 384.819 237.165C366.791 271.408 355.499 298.689 347.849 319.043H347.84ZM378.728 505.148C366.896 502.552 351.621 503.039 340.198 511.544C332.844 517.015 327.956 525.075 325.551 535.592C323.147 525.075 318.259 517.015 310.905 511.544C299.482 503.039 284.207 502.543 272.375 505.139C278.413 497.655 277.977 486.972 277.507 475.837C277.01 463.935 276.444 450.438 283.075 437.795C303.446 398.934 312.848 375.644 311.436 351.961C316.193 364.735 319.513 370.677 325.551 370.677C331.59 370.677 334.909 364.735 339.667 351.97C338.255 375.644 347.657 398.943 368.028 437.804C374.659 450.447 374.093 463.943 373.596 475.846C373.134 486.981 372.69 497.672 378.737 505.148H378.728ZM388.531 512.04C403.648 519.002 407.003 531.262 411.777 548.758C413.032 553.341 414.322 558.081 415.951 563.178C423.915 588.054 423.218 607.589 413.877 621.234C402.794 637.432 382.649 640.333 374.502 640.83C373.509 640.891 372.516 640.961 371.531 641.022C371.514 641.022 371.496 641.022 371.479 641.022C371.365 641.031 371.235 641.039 371.113 641.048C370.616 641.083 370.12 641.109 369.632 641.144C369.292 641.17 368.961 641.187 368.621 641.213C368.29 641.231 367.976 641.248 367.645 641.266C366.216 641.335 364.726 641.405 363.262 641.553C351.595 642.198 341.017 641.928 334.544 635.881C329.655 631.315 327.285 623.674 327.285 612.512V552.374C327.285 534.538 332.33 521.747 342.272 514.341C354.026 505.592 370.407 506.115 381.804 509.531C383.616 510.071 385.289 510.672 386.858 511.317C387.398 511.57 387.947 511.814 388.531 512.049V512.04ZM287.815 641.553C286.351 641.414 284.87 641.344 283.441 641.274C283.109 641.257 282.796 641.24 282.473 641.222C282.134 641.196 281.794 641.179 281.454 641.153C280.957 641.118 280.452 641.091 279.955 641.057C279.842 641.048 279.711 641.039 279.598 641.031C279.581 641.031 279.563 641.031 279.546 641.031C278.552 640.961 277.568 640.9 276.575 640.839C268.428 640.342 248.283 637.441 237.2 621.243C227.868 607.598 227.171 588.072 235.135 563.187C236.764 558.089 238.062 553.35 239.308 548.766C244.083 531.279 247.438 519.019 262.529 512.058C263.121 511.822 263.688 511.57 264.228 511.317C265.788 510.672 267.461 510.08 269.273 509.531C280.678 506.115 297.051 505.584 308.813 514.341C318.755 521.747 323.8 534.538 323.8 552.374V612.512C323.8 623.674 321.421 631.315 316.542 635.881C310.068 641.937 299.482 642.198 287.806 641.553H287.815ZM380.532 119.005C380.183 121.732 379.791 124.189 379.373 126.394C380.035 120.129 380.532 113.577 380.889 107.042C381.36 109.464 381.246 113.481 380.532 119.014V119.005ZM271.538 61.3845C271.469 26.1135 275.921 23.8045 282.656 20.3192C283.667 19.7964 284.748 19.23 285.88 18.5504C278.152 29.6772 279.929 41.5533 279.955 41.7101C280.095 42.564 280.835 43.1652 281.672 43.1652C281.759 43.1652 281.855 43.1652 281.951 43.1391C282.9 42.9909 283.545 42.0935 283.388 41.1525C283.266 40.4031 280.687 22.6543 298.297 11.5276C299.107 11.0135 299.351 9.94176 298.837 9.13143C307.367 3.74667 317.605 0.670909 332.008 7.1971C299.159 13.0524 283.266 45.2912 283.101 45.6398C282.683 46.5024 283.048 47.5392 283.911 47.9575C284.155 48.0707 284.408 48.1317 284.66 48.1317C285.305 48.1317 285.933 47.7658 286.229 47.1471C286.403 46.7899 303.864 11.3359 339.937 9.81106C340.529 9.78492 341.035 9.46253 341.331 9.00073C342.821 9.00073 344.093 8.87004 345.296 8.73934C348.528 8.39081 351.081 8.11199 357.119 11.301C357.834 11.6757 358.54 12.0416 359.237 12.4076C360.805 13.2179 362.312 14.0021 363.741 14.8386C357.485 12.8868 351.918 14.1067 351.822 14.1241C350.889 14.3419 350.306 15.2655 350.524 16.2066C350.733 17.1389 351.665 17.7227 352.606 17.5135C353.155 17.3828 366.129 14.6207 373.108 26.6188C373.422 27.1503 373.971 27.4553 374.546 27.4727C376.489 32.6484 377.726 39.8803 378.066 50.5017C378.502 64.2076 378.571 83.4899 377.7 102.293C377.7 102.319 377.683 102.345 377.683 102.371C377.656 102.52 377.665 102.659 377.683 102.798C377.055 116.121 375.94 129.165 374.145 139.769C373.997 140.065 373.945 140.396 373.979 140.718C372.202 150.86 369.771 158.659 366.495 162.127C365.51 163.068 363.524 164.244 360.735 165.438C364.116 161.447 367.174 154.293 367.697 141.485C367.732 140.527 366.991 139.716 366.033 139.681C365.04 139.629 364.264 140.387 364.229 141.346C363.384 161.97 355.76 165.995 352.667 166.771C356.135 163.686 358.914 159.251 359.132 152.908C359.167 151.95 358.409 151.148 357.451 151.113C356.518 151.078 355.69 151.836 355.656 152.795C355.168 167.442 338.281 169.951 337.558 170.047C336.818 170.151 336.26 170.7 336.103 171.38C326.127 172.408 314.608 172.112 302.871 169.141C302.845 168.513 302.488 167.921 301.869 167.633C294.097 164.026 291.64 147.427 291.352 141.337C291.309 140.378 290.472 139.647 289.531 139.681C288.573 139.725 287.832 140.535 287.876 141.502C287.91 142.269 288.66 156.576 294.393 165.263C286.455 161.43 283.772 138.296 283.406 129.557C283.362 128.598 282.473 127.858 281.602 127.892C280.644 127.936 279.894 128.738 279.938 129.696C280.06 132.554 281.158 153.683 288.015 163.834C286.813 163.268 285.61 162.667 284.408 162.031C282.778 159.582 270.327 138.313 271.538 61.3758V61.3845ZM350.454 168.513C350.445 168.627 350.445 168.731 350.454 168.844C350.184 168.914 349.914 168.984 349.635 169.054C349.905 168.879 350.175 168.705 350.445 168.513H350.454ZM285.671 179.457C285.967 179.17 286.142 178.786 286.185 178.377C286.647 173.375 286.926 169.376 287.065 167.215C299.909 173.088 313.458 175.24 325.813 175.24C342.107 175.24 356.309 171.519 364.038 167.729C364.186 169.977 364.456 173.75 364.892 178.377C364.926 178.786 365.109 179.17 365.406 179.457C365.676 179.719 370.198 184.162 374.685 187.691C358.409 184.981 342.708 185.766 333.507 186.227C332.339 186.288 331.285 186.341 330.344 186.375C327.155 186.506 323.922 186.506 320.742 186.375C319.801 186.332 318.746 186.28 317.579 186.227C308.378 185.766 292.668 184.981 276.392 187.691C280.879 184.162 285.41 179.719 285.671 179.457ZM230.351 210.302C233.514 208.341 237.836 205.658 240.877 204.264C242.837 203.366 247.377 201.467 252.186 199.445C257.135 197.372 262.511 195.115 266.459 193.39C266.493 193.39 266.52 193.39 266.554 193.372C285.819 188.109 306.365 189.146 317.396 189.695C318.572 189.756 319.644 189.808 320.585 189.843C323.87 189.983 327.198 189.983 330.483 189.843C331.424 189.8 332.496 189.747 333.672 189.695C344.703 189.138 365.249 188.109 384.514 193.372C384.54 193.372 384.575 193.372 384.601 193.381C388.539 195.106 393.924 197.363 398.864 199.437C403.683 201.458 408.231 203.366 410.183 204.255C413.224 205.649 417.554 208.333 420.717 210.302C420.787 210.345 420.839 210.38 420.909 210.424C403.857 212.933 394.394 223.459 389.454 228.939L388.888 229.567C382.283 236.86 377.256 235.954 365.083 233.749C356.196 232.137 344.023 229.933 325.517 229.933C307.01 229.933 294.837 232.137 285.95 233.749C273.786 235.954 268.75 236.86 262.154 229.567L261.597 228.939C256.656 223.45 247.176 212.942 230.133 210.424C230.203 210.38 230.273 210.337 230.342 210.293L230.351 210.302ZM220.749 213.378C239.753 212.715 250.81 222.474 256.874 228.922C247.786 237.531 238.402 244.824 228.478 252.517C222.039 257.51 215.373 262.677 208.498 268.436C192.335 281.994 171.014 282.935 161.909 283.336C161.212 283.371 160.584 283.397 160.027 283.423C154.912 283.702 149.972 286.264 146.783 288.32C159.931 219.66 219.163 213.517 220.749 213.378ZM29.4332 629.66C29.8166 630.209 30.2435 630.819 30.7053 631.498C31.9862 633.389 32.4654 635.228 32.1082 636.961C31.8032 638.434 30.9667 639.645 30.1564 640.516C29.3199 638.678 27.9955 636.874 26.1396 635.106C25.4513 633.685 22.5062 627.725 20.2756 625.016C19.84 624.493 19.9184 624.048 20.8943 621.408C21.966 618.507 23.7522 613.662 24.5538 605.359C24.7019 604.574 24.9111 603.442 25.0679 602.954C25.1637 602.936 25.2596 602.919 25.3729 602.893C26.2268 602.727 27.5163 602.475 29.5204 601.551C29.1544 603.302 28.9888 605.071 28.8233 606.901C28.6055 609.384 28.3702 611.946 27.6209 614.83C25.3816 623.43 25.7562 624.432 29.4245 629.651L29.4332 629.66ZM49.6043 581.258C49.1251 584.151 48.6284 587.139 49.1861 590.511C52.2357 605.097 52.4187 610.892 52.3577 612.669C49.7001 614.359 47.5218 614.769 45.9012 613.889C40.9956 611.24 40.255 598.257 40.3857 593.483C40.4031 592.803 40.0285 592.176 39.4186 591.879C38.8086 591.583 38.0854 591.661 37.5539 592.088C29.5291 598.58 26.2877 599.207 24.7368 599.503C22.027 600.026 21.8005 601.22 21.1295 604.897C20.3453 612.896 18.7247 617.304 17.6443 620.223C16.5987 623.055 15.8493 625.103 17.6094 627.246C19.8226 629.939 23.1249 636.848 23.1597 636.918C23.2556 637.118 23.3863 637.293 23.5431 637.441C26.3749 640.072 27.7777 642.686 27.7254 645.222C27.6906 646.982 26.9325 648.419 26.2529 649.378C23.3165 646.267 20.3541 644.098 17.7052 642.154C13.2876 638.922 10.0899 636.578 9.27958 631.638C8.66965 627.891 7.61535 623.787 6.59591 619.805C5.0711 613.854 3.50272 607.702 3.47658 603.023C3.98195 598.266 6.47392 590.18 8.89619 582.356C11.8761 572.693 14.6992 563.57 14.734 558.325C14.4291 546.736 15.3178 541.639 16.5028 538.737C18.9687 545.246 23.0552 550.056 27.8561 551.921C29.5465 552.574 31.4285 552.896 33.4413 552.896C36.6913 552.896 40.2724 552.043 43.8623 550.422C41.9715 556.486 43.3046 558.943 43.6967 559.492C51.5909 569.312 50.6237 575.115 49.613 581.267L49.6043 581.258ZM131.474 425.187L131.055 425.762C124.721 434.467 119.388 443.772 113.742 453.618C104.802 469.206 95.5577 485.326 81.9041 499.232C59.9033 521.834 50.0225 536.359 45.7966 545.481C39.7061 549.176 33.4849 550.37 29.1108 548.679C24.6932 546.963 20.8159 541.691 18.8815 534.825C19.352 534.137 19.8226 533.379 20.2321 532.394C20.964 530.652 22.4975 525.877 24.8065 518.662C29.4768 504.102 37.2838 479.74 46.6592 455.291C60.8443 418.304 86.3566 392.713 93.8412 385.751C94.6864 384.967 95.427 384.183 96.1067 383.39C96.1938 385.603 96.7689 387.206 97.8232 388.304C100.472 391.057 105.055 389.707 109.481 388.4C113.089 387.337 117.175 386.126 119.319 387.45C121.14 388.583 121.436 393.706 121.697 398.228C122.089 405.051 122.499 412.108 127.5 414.165C128.337 414.513 129.26 414.688 130.271 414.688C133.565 414.688 137.825 412.823 143.315 408.989C140.291 413.058 136.536 418.216 131.465 425.196L131.474 425.187ZM158.659 390.7C156.716 392.695 155.069 394.438 153.474 396.224C137.834 410.34 131.43 412.021 128.825 410.95C125.845 409.73 125.488 403.517 125.174 398.037C124.834 392.146 124.512 386.587 121.157 384.505C117.689 382.353 113.019 383.738 108.497 385.071C105.221 386.039 101.509 387.136 100.324 385.899C99.6094 385.15 98.9036 382.858 100.646 375.853C101.622 373.413 102.215 371.026 102.772 368.76C103.504 365.789 104.201 362.983 105.656 360.439C109.908 353.007 115.981 339.676 116.234 339.109C116.269 339.031 116.304 338.952 116.321 338.865C123.771 312.795 144.927 294.045 145.45 293.574C145.519 293.504 152.891 287.3 160.21 286.908C160.759 286.882 161.377 286.847 162.057 286.821C168.191 286.551 179.666 286.037 191.63 281.811C189.19 288.729 191.464 299.665 193.686 310.321C195.96 321.212 198.304 332.478 195.193 337.506L194.714 338.255C187.029 350.367 166.596 382.536 158.641 390.691L158.659 390.7ZM230.525 459.212C230.508 457.905 230.499 456.433 230.49 454.829C230.429 440.418 230.316 413.59 218.745 395.187C207.366 377.09 199.62 343.562 198.53 338.665C201.833 332.33 199.55 321.291 197.11 309.615C194.409 296.65 191.621 283.258 197.554 279.415C202.085 277.324 206.573 274.623 210.755 271.111C217.577 265.387 224.208 260.246 230.63 255.271C240.598 247.542 250.043 240.206 259.244 231.492L259.471 231.745C282.665 274.806 295.412 307.393 303.437 329.568C314.224 362.321 306.801 385.045 279.999 436.174C272.941 449.645 273.525 463.638 274.039 475.976C274.649 490.623 275.128 502.308 262.834 508.119C262.241 508.363 261.666 508.616 261.109 508.869C248.797 513.774 230.795 524.579 221.638 537.352C227.04 514.489 230.734 472.073 230.543 459.195L230.525 459.212ZM230.787 1112.71C229.471 1123.39 230.063 1127.73 230.551 1131.22C230.917 1133.84 231.17 1135.74 230.351 1139.77C228.399 1149.34 228.53 1163.78 229.671 1173.09C230.212 1177.53 230.429 1185.77 225.716 1191.1C222.518 1194.71 217.447 1196.54 210.642 1196.54C190.837 1196.54 182.28 1184.59 181.923 1184.09C181.696 1183.77 181.365 1183.52 180.991 1183.41C178.995 1182.81 176.965 1182.19 174.944 1181.56C167.738 1179.35 160.942 1177.25 156.149 1176.44C151.723 1175.23 149.153 1173.53 148.7 1171.54C148.151 1169.12 150.73 1166.24 151.767 1165.34C151.871 1165.25 151.958 1165.15 152.037 1165.04C155.487 1160.29 160.393 1160.61 160.593 1160.62C161.194 1160.68 161.787 1160.42 162.144 1159.93C165.141 1155.89 168.409 1156.1 168.522 1156.11C168.905 1156.16 169.298 1156.06 169.629 1155.86C178.908 1150.04 188.946 1136.29 189.373 1135.71C189.53 1135.5 189.625 1135.25 189.678 1134.99C190.026 1133.09 190.366 1131.29 190.706 1129.51C191.969 1122.92 193.163 1116.69 194.026 1107.26C194.775 1098.96 192.501 1076.03 189.042 1041.32C187.961 1030.45 186.776 1018.59 185.548 1005.73C188.597 1014.27 193.119 1019.78 199.977 1020.19C209.553 1020.77 215.539 1008.41 220.357 998.481C222.23 994.63 224.792 989.35 225.933 988.984C227.24 989.097 227.859 995.222 228.234 998.882C229.183 1008.24 230.482 1021.07 240.946 1023.25C242.123 1023.5 243.264 1023.62 244.388 1023.62C248.204 1023.62 251.724 1022.18 254.975 1019.31C254.687 1020.09 254.399 1020.9 254.103 1021.75C242.82 1054.44 232.93 1095.16 230.769 1112.68L230.787 1112.71ZM263.33 998.96C254.33 1022.51 244.806 1020.53 241.678 1019.87C233.697 1018.2 232.599 1007.31 231.71 998.551C230.996 991.484 230.429 985.899 226.256 985.542C222.91 985.246 220.679 989.925 217.255 996.982C213.116 1005.5 207.488 1017.17 200.212 1016.74C187.404 1015.98 184.241 989.219 182.847 963.088C183.3 936.033 189.26 917.588 194.27 902.13C195.063 900.109 196.169 898.279 197.659 897.87C200.979 896.955 206.695 902.531 211.74 907.445C219.459 914.965 228.208 923.486 235.727 917.884C240.85 914.067 246.793 913.153 251.629 915.453C257.083 918.041 260.429 924.419 260.812 932.94C260.847 933.777 261.475 934.448 262.276 934.578C266.598 976.132 266.284 989.376 263.339 998.96H263.33ZM266.241 877.89C261.997 882.926 258.329 887.283 258.129 897.66C258.129 897.739 258.129 897.817 258.137 897.896C259.052 905.668 259.88 912.787 260.612 919.339C258.739 916.193 256.212 913.771 253.11 912.307C247.089 909.449 239.814 910.495 233.645 915.096C228.513 918.921 221.211 911.828 214.162 904.953C207.897 898.845 201.972 893.077 196.735 894.515C196.718 894.515 196.701 894.524 196.683 894.532C199.341 885.941 201.353 877.96 201.528 869.395C201.798 855.872 203.366 844.963 204.752 835.335C205.24 831.937 205.693 828.765 206.05 825.768C209.744 837.783 214.763 848.309 221.124 849.084C226.665 849.755 231.789 843.787 236.921 830.865C240.885 820.871 243.029 816.532 244.17 814.693C244.449 816.715 244.562 820.27 244.667 823.502C245.146 838.62 245.948 863.923 262.546 863.923C270.353 863.923 276.339 858.033 281.419 844.057C277.428 864.585 271.312 871.852 266.241 877.882V877.89ZM301.337 745.589C297.295 760.001 293.382 773.95 289.958 790.314C289.575 790.575 289.296 790.993 289.217 791.49C281.994 840.476 274.266 860.455 262.538 860.455C249.302 860.455 248.57 837.261 248.126 823.398C247.838 814.362 247.716 810.624 245.041 810.154C242.724 809.753 240.842 811.548 233.679 829.584C227.903 844.135 223.563 845.869 221.533 845.634C215.852 844.946 210.555 830.656 206.703 814.903C206.651 812.454 206.425 810.136 205.945 807.906C182.89 719.99 206.764 601.568 215.573 575.899C220.017 562.951 219.773 559.283 219.494 555.031C219.425 553.907 219.346 552.731 219.372 551.284C220.61 539.818 233.662 528.02 247.176 519.804C241.6 527.193 239.003 536.664 235.954 547.86C234.708 552.409 233.427 557.114 231.824 562.132C223.52 588.089 224.365 608.635 234.333 623.212C246.279 640.673 267.713 643.793 276.365 644.315C277.472 644.385 278.57 644.455 279.668 644.533C280.504 644.603 281.384 644.664 282.29 644.707C284.051 644.829 285.793 644.934 287.518 645.03C290.855 645.352 293.975 646.041 295.656 647.949C296.841 649.291 297.321 651.216 297.12 653.83C295.831 670.734 299.586 677.896 303.22 684.814C307.794 693.536 312.116 701.77 305.389 730.986C304.039 735.978 302.679 740.823 301.337 745.589ZM312.255 703.452C311.837 693.754 309.04 688.422 306.295 683.185C302.74 676.406 299.377 669.993 300.588 654.083C300.858 650.528 300.083 647.687 298.27 645.64C298.148 645.5 298.009 645.37 297.878 645.239C306.199 644.995 313.562 643.427 318.921 638.417C319.931 637.467 320.846 636.413 321.674 635.254C321.169 640.246 320.785 644.786 320.402 649.256C319.104 664.582 317.962 677.966 312.255 703.443V703.452ZM330.684 649.256C330.309 644.795 329.917 640.255 329.411 635.262C330.239 636.421 331.154 637.476 332.165 638.425C337.523 643.427 344.886 645.004 353.207 645.248C353.076 645.378 352.937 645.509 352.815 645.648C351.003 647.705 350.227 650.545 350.497 654.092C351.717 670.002 348.354 676.406 344.79 683.194C342.046 688.422 339.249 693.763 338.83 703.461C333.115 677.974 331.982 664.591 330.684 649.265V649.256ZM388.818 934.578C389.611 934.448 390.238 933.785 390.282 932.94C390.665 924.41 394.011 918.041 399.466 915.453C404.293 913.161 410.235 914.067 415.358 917.884C422.887 923.486 431.626 914.965 439.346 907.445C444.391 902.531 450.124 896.955 453.426 897.87C454.925 898.279 456.04 900.126 456.825 902.156C461.835 917.605 467.795 936.051 468.239 963.088C466.845 989.219 463.673 1015.98 450.874 1016.74C450.743 1016.74 450.612 1016.75 450.481 1016.75C443.424 1016.75 437.891 1005.35 433.83 996.982C430.406 989.925 428.167 985.237 424.83 985.542C420.656 985.899 420.09 991.484 419.375 998.551C418.486 1007.31 417.38 1018.2 409.407 1019.87C406.279 1020.53 396.747 1022.52 387.746 998.943C384.81 989.358 384.496 976.097 388.818 934.578ZM462.026 1041.29C458.567 1076.03 456.284 1098.98 457.034 1107.27C457.888 1116.71 459.081 1122.92 460.345 1129.51C460.685 1131.29 461.033 1133.1 461.382 1135C461.425 1135.26 461.53 1135.5 461.687 1135.71C462.114 1136.3 472.151 1150.05 481.431 1155.87C481.744 1156.07 482.154 1156.16 482.52 1156.13C482.659 1156.11 485.927 1155.91 488.924 1159.94C489.281 1160.42 489.874 1160.68 490.466 1160.63C490.675 1160.62 495.581 1160.29 499.031 1165.05C499.11 1165.16 499.197 1165.26 499.301 1165.35C500.338 1166.25 502.926 1169.14 502.369 1171.55C501.915 1173.54 499.336 1175.24 495.076 1176.41C490.118 1177.27 483.313 1179.36 476.107 1181.58C474.094 1182.2 472.064 1182.83 470.069 1183.42C469.694 1183.53 469.363 1183.78 469.136 1184.09C468.779 1184.59 460.223 1196.54 440.418 1196.54C433.613 1196.54 428.55 1194.71 425.344 1191.1C420.639 1185.78 420.848 1177.54 421.388 1173.09C422.529 1163.79 422.66 1149.36 420.708 1139.77C419.889 1135.74 420.151 1133.85 420.508 1131.23C420.987 1127.74 421.588 1123.4 420.273 1112.72C418.112 1095.2 408.222 1054.46 396.939 1021.78C396.643 1020.93 396.355 1020.12 396.067 1019.35C399.317 1022.22 402.838 1023.65 406.645 1023.65C407.769 1023.65 408.919 1023.53 410.087 1023.29C420.552 1021.09 421.859 1008.27 422.808 998.917C423.183 995.257 423.802 989.132 425.013 989.01C426.25 989.384 428.812 994.665 430.685 998.516C435.503 1008.44 441.481 1020.79 451.065 1020.23C457.922 1019.82 462.445 1014.3 465.494 1005.77C464.266 1018.6 463.089 1030.44 462.009 1041.3L462.026 1041.29ZM446.334 835.344C447.719 844.972 449.288 855.881 449.558 869.404C449.732 877.969 451.745 885.941 454.402 894.541C454.385 894.541 454.368 894.532 454.359 894.524C449.131 893.086 443.206 898.854 436.932 904.962C429.883 911.828 422.582 918.938 417.441 915.104C411.263 910.504 403.988 909.467 397.976 912.316C394.874 913.789 392.338 916.202 390.474 919.348C391.205 912.787 392.025 905.668 392.948 897.904C392.948 897.826 392.966 897.748 392.957 897.669C392.756 887.292 389.088 882.935 384.845 877.899C379.774 871.878 373.657 864.603 369.666 844.074C374.755 858.05 380.732 863.94 388.548 863.94C405.147 863.94 405.948 838.637 406.427 823.52C406.532 820.287 406.645 816.732 406.924 814.711C408.066 816.549 410.2 820.88 414.165 830.883C419.297 843.804 424.446 849.781 429.962 849.102C436.322 848.335 441.341 837.81 445.036 825.794C445.384 828.783 445.846 831.963 446.334 835.352V835.344ZM435.503 575.908C444.312 601.577 468.178 720.007 445.114 807.993C444.644 810.197 444.417 812.506 444.373 814.937C440.531 830.682 435.233 844.954 429.552 845.643C427.496 845.895 423.183 844.144 417.406 829.593C410.244 811.539 408.344 809.77 406.044 810.163C403.36 810.633 403.247 814.371 402.96 823.407C402.524 837.269 401.783 860.464 388.548 860.464C376.82 860.464 369.083 840.484 361.868 791.499C361.798 791.002 361.511 790.593 361.127 790.323C357.712 773.95 353.791 760.001 349.748 745.589C348.406 740.814 347.047 735.961 345.688 730.968C338.97 701.77 343.292 693.536 347.866 684.814C351.499 677.896 355.255 670.743 353.965 653.83C353.765 651.216 354.244 649.291 355.429 647.949C357.111 646.041 360.23 645.352 363.567 645.03C365.292 644.934 367.044 644.821 368.804 644.699C369.701 644.655 370.573 644.603 371.409 644.525C372.516 644.455 373.614 644.376 374.729 644.307C383.39 643.775 404.815 640.665 416.761 623.203C426.729 608.626 427.574 588.08 419.271 562.124C417.667 557.105 416.378 552.4 415.141 547.852C412.082 536.655 409.494 527.184 403.909 519.795C417.432 528.012 430.485 539.827 431.713 551.293C431.739 552.731 431.661 553.907 431.591 555.031C431.312 559.283 431.077 562.951 435.512 575.899L435.503 575.908ZM432.341 395.205C420.769 413.607 420.656 440.435 420.595 454.847C420.595 456.45 420.578 457.922 420.56 459.229C420.36 472.108 424.063 514.532 429.465 537.387C420.299 524.605 402.289 513.8 389.977 508.895C389.428 508.642 388.862 508.398 388.278 508.154C375.975 502.342 376.454 490.658 377.064 476.002C377.578 463.656 378.162 449.671 371.104 436.2C344.302 385.071 336.879 362.347 347.666 329.594C355.69 307.419 368.438 274.832 391.632 231.771L391.859 231.519C401.06 240.232 410.496 247.56 420.473 255.288C426.886 260.263 433.525 265.404 440.348 271.129C444.53 274.631 449.009 277.333 453.54 279.432C459.473 283.266 456.685 296.667 453.984 309.632C451.553 321.308 449.262 332.348 452.564 338.682C451.475 343.579 443.729 377.108 432.349 395.205H432.341ZM456.345 338.281L455.866 337.532C452.756 332.505 455.108 321.238 457.374 310.347C459.595 299.691 461.87 288.756 459.43 281.837C471.393 286.063 482.868 286.577 489.002 286.847C489.691 286.882 490.309 286.908 490.85 286.935C498.125 287.327 505.505 293.513 505.61 293.6C506.002 293.94 527.271 312.699 534.747 338.891C534.773 338.97 534.799 339.057 534.834 339.135C535.087 339.702 541.16 353.033 545.412 360.465C546.867 363.01 547.555 365.815 548.296 368.786C548.853 371.043 549.446 373.431 550.422 375.87C552.165 382.876 551.459 385.167 550.744 385.917C549.559 387.145 545.847 386.056 542.571 385.089C538.049 383.756 533.379 382.37 529.911 384.522C526.556 386.605 526.234 392.164 525.894 398.054C525.58 403.535 525.223 409.747 522.243 410.967C519.629 412.039 513.225 410.348 497.594 396.25C495.999 394.455 494.352 392.713 492.409 390.718C484.454 382.562 464.022 350.393 456.337 338.281H456.345ZM537.343 453.636C531.697 443.79 526.365 434.484 520.03 425.779L519.568 425.143C514.523 418.208 510.785 413.058 507.762 409.007C513.251 412.849 517.512 414.705 520.806 414.705C521.816 414.705 522.74 414.531 523.576 414.182C528.578 412.126 528.987 405.068 529.379 398.246C529.641 393.724 529.937 388.6 531.758 387.467C533.902 386.143 537.988 387.346 541.595 388.417C546.022 389.724 550.605 391.075 553.254 388.321C554.317 387.224 554.883 385.62 554.97 383.407C555.65 384.2 556.399 384.984 557.236 385.768C564.72 392.73 590.232 418.312 604.418 455.309C613.793 479.766 621.609 504.137 626.279 518.706C628.588 525.912 630.113 530.669 630.845 532.412C631.254 533.396 631.725 534.154 632.195 534.843C630.252 541.709 626.375 546.98 621.957 548.688C617.575 550.378 611.371 549.185 605.289 545.499C601.063 536.385 591.182 521.851 569.164 499.232C555.51 485.326 546.266 469.215 537.335 453.627L537.343 453.636ZM618.969 636.979C618.611 635.245 619.082 633.406 620.371 631.516C620.833 630.836 621.26 630.226 621.644 629.677C625.303 624.458 625.687 623.465 623.439 614.856C622.689 611.972 622.454 609.41 622.236 606.927C622.071 605.097 621.905 603.32 621.539 601.568C623.543 602.492 624.833 602.745 625.687 602.91C625.8 602.936 625.904 602.945 626 602.971C626.157 603.459 626.366 604.574 626.488 605.237C627.316 613.68 629.102 618.533 630.174 621.426C631.15 624.066 631.219 624.502 630.792 625.033C628.562 627.743 625.617 633.703 624.928 635.123C623.081 636.883 621.748 638.695 620.912 640.534C620.101 639.654 619.265 638.443 618.96 636.979H618.969ZM644.49 619.814C643.47 623.787 642.425 627.9 641.806 631.638C640.996 636.578 637.807 638.913 633.38 642.146C630.731 644.089 627.769 646.258 624.833 649.369C624.153 648.419 623.404 646.99 623.36 645.256C623.29 642.721 624.693 640.089 627.542 637.441C627.708 637.293 627.83 637.11 627.926 636.918C627.961 636.848 631.254 629.939 633.476 627.246C635.236 625.103 634.487 623.064 633.441 620.232C632.369 617.313 630.74 612.904 629.939 604.757C629.285 601.22 629.067 600.026 626.357 599.503C624.798 599.207 621.565 598.58 613.54 592.088C613.018 591.661 612.286 591.583 611.676 591.879C611.066 592.176 610.691 592.803 610.709 593.483C610.839 598.257 610.09 611.24 605.193 613.889C603.564 614.769 601.394 614.359 598.737 612.678C598.676 610.865 598.867 605.045 601.917 590.442C602.457 587.148 601.96 584.151 601.481 581.258C600.462 575.115 599.503 569.312 607.458 559.405C607.824 558.891 609.131 556.46 607.249 550.431C610.831 552.051 614.403 552.896 617.644 552.896C619.657 552.896 621.539 552.574 623.229 551.921C628.03 550.065 632.108 545.246 634.574 538.737C635.768 541.639 636.656 546.745 636.343 558.377C636.378 563.57 639.192 572.693 642.181 582.347C644.594 590.172 647.095 598.257 647.6 603.015C647.583 607.694 646.006 613.845 644.481 619.796L644.49 619.814Z"
                              fill="currentColor"
                            />
                            <path
                              d="M294.14 26.6885C294.21 26.6885 294.28 26.6885 294.35 26.6798C295.203 26.5753 295.831 25.8782 295.874 25.0417C296.371 23.4821 302.418 13.9063 318.651 9.75878C319.583 9.52352 320.141 8.57379 319.905 7.64147C319.67 6.70916 318.712 6.15152 317.788 6.38677C299.29 11.118 292.119 22.7153 292.415 25.155C292.52 26.035 293.269 26.6885 294.14 26.6885Z"
                              fill="currentColor"
                            />
                            <path
                              d="M294.393 43.6531C294.689 43.8623 295.038 43.9581 295.378 43.9581C295.927 43.9581 296.476 43.6967 296.807 43.2088C296.92 43.0519 308.021 27.3769 327.808 28.9627C328.802 29.0498 329.603 28.3266 329.682 27.3682C329.76 26.4097 329.045 25.5732 328.087 25.4948C323.53 25.1289 319.417 25.582 315.74 26.5143C315.845 26.4707 315.941 26.4359 316.037 26.3662C316.211 26.2442 334.125 14.1589 360.256 24.7629C361.136 25.1202 362.156 24.6932 362.522 23.8045C362.888 22.9157 362.452 21.905 361.563 21.539C333.611 10.1944 314.834 22.968 314.05 23.5082C313.266 24.0572 313.074 25.1376 313.623 25.9218C313.963 26.4097 314.503 26.6624 315.052 26.6624C315.087 26.6624 315.113 26.6537 315.139 26.645C301.616 30.3307 294.332 40.6471 293.949 41.2047C293.4 41.9976 293.6 43.0781 294.393 43.627V43.6531Z"
                              fill="currentColor"
                            />
                            <path
                              d="M317.666 34.2168C316.76 34.5217 316.263 35.5063 316.568 36.4125C316.873 37.3187 317.858 37.8066 318.773 37.5103C319.043 37.4145 345.975 28.6229 364.979 41.6665C365.275 41.8757 365.624 41.9715 365.963 41.9715C366.521 41.9715 367.061 41.7101 367.401 41.2135C367.941 40.4206 367.741 39.3401 366.948 38.7999C346.498 24.7716 318.842 33.8247 317.675 34.2168H317.666Z"
                              fill="currentColor"
                            />
                            <path
                              d="M311.593 44.0714C311.41 43.1304 310.504 42.5204 309.554 42.6947C302.061 44.1498 296.51 48.6197 296.275 48.8114C295.534 49.4213 295.421 50.5104 296.022 51.2511C296.362 51.678 296.868 51.8958 297.373 51.8958C297.756 51.8958 298.148 51.7651 298.471 51.5037C298.523 51.4602 303.603 47.3911 310.216 46.1016C311.157 45.9186 311.776 45.0037 311.593 44.0627V44.0714Z"
                              fill="currentColor"
                            />
                            <path
                              d="M359.707 47.1471C343.213 40.9259 321.578 42.5989 320.663 42.6773C319.705 42.7557 318.999 43.5922 319.069 44.5506C319.147 45.5091 319.992 46.2323 320.942 46.1451C321.16 46.1277 342.725 44.4635 358.479 50.4059C358.679 50.4843 358.888 50.5192 359.089 50.5192C359.794 50.5192 360.448 50.0922 360.718 49.3952C361.058 48.4977 360.605 47.4957 359.707 47.1559V47.1471Z"
                              fill="currentColor"
                            />
                            <path
                              d="M314.416 51.5822C306.827 52.2269 306.382 57.0802 306.365 57.2893C306.295 58.2216 306.984 58.9971 307.907 59.1017C307.968 59.1017 308.038 59.1104 308.099 59.1104C308.953 59.1104 309.693 58.4569 309.824 57.603C309.842 57.5159 310.208 55.4247 314.704 55.0413C315.662 54.9629 316.368 54.1177 316.289 53.1593C316.211 52.2008 315.366 51.495 314.416 51.5735V51.5822Z"
                              fill="currentColor"
                            />
                          </g>
                        </svg>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            )
            :
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center font-light text-xl">
                Aún no tiene rutinas.
              </p>
              <button 
              onClick={() => {router.push('/rutinas')}}
              className="my-2 cursor-pointer font-medium text-white rounded-md bg-blue-500 hover:bg-blue-600 duration-100 active:scale-95 btn-md shadow"
              >
                {'IR A RUTINAS'}
              </button>
            </div>
            }
          </div>

          <div className="bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
            <div className="w-11/12">
              <h2 className="text-xl text-blue-500 xl:text-2xl font-semibold">
                Tu ritmo cardíaco -{" "}
                <span className="text-green-600">Próximamente</span>
              </h2>
              <div className="divider my-0"></div>
            </div>
            <div className="border-2 border-gray-500 rounded-md mt-7 h-80 flex p-2 gap-2">
              <div className="w-4/12 flex flex-col gap-2">
                <div className="border-2 border-gray-500 h-1/2 flex justify-center items-center rounded-md">
                  <h2 className="text-3xl font-semibold text-blue-600">72</h2>
                </div>
                <div className="border-2 border-gray-500 h-1/2 flex flex-col justify-center items-center rounded-md">
                  <p className="text-base font-semibold">Usuario</p>
                  <p className="text-base font-semibold">Edad</p>
                  <p className="text-base font-semibold">Peso</p>
                </div>
              </div>
              <div className="w-8/12 border-gray-500 rounded-md flex gap-2 p-2">
                <div className="flex justify-center items-center w-1/2">
                  <div className="flex items-center justify-center h-20 w-20 fill-blue-600">
                    <svg
                      id="Capa_2"
                      data-name="Capa 2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 53.28 85"
                    >
                      <g id="Layer_1" data-name="Layer 1">
                        <path
                          className="cls-1"
                          d="m41.05,41.44h-4.23c-.7,0-1.29-.52-1.38-1.21l-1.06-8.01-.7,2.32c-.18.59-.72.99-1.34.99h-5.56l-4.72,11.05c-.22.52-.73.85-1.28.85-.08,0-.16,0-.25-.02-.64-.11-1.12-.66-1.15-1.31l-.97-19.61-2.62,7.02c-.2.55-.73.91-1.31.91h-7.6c-.77,0-1.4-.63-1.4-1.4s.63-1.4,1.4-1.4h6.64l4.65-12.44c.23-.62.87-.99,1.52-.89.65.1,1.15.65,1.18,1.31l1.01,20.31,2.7-6.33c.22-.51.72-.85,1.28-.85h5.44l2.28-7.5c.19-.63.8-1.04,1.45-.99.65.05,1.18.56,1.27,1.21l1.74,13.2h3.01c.77,0,1.4.63,1.4,1.4s-.63,1.4-1.4,1.4h0Zm-20.37,18.94l-7.74,7.74c-.27.27-.63.41-.99.41s-.71-.14-.99-.41l-7.74-7.74c-2.59-2.59-2.59-6.81,0-9.4l.32-.32c2.28-2.28,5.83-2.55,8.41-.81,2.58-1.74,6.13-1.47,8.41.81l.32.32c2.59,2.59,2.59,6.81,0,9.4h0ZM44.13,14.07H3.46c-1.91,0-3.46,1.55-3.46,3.46v51.06c0,1.91,1.55,3.46,3.46,3.46h40.67c1.91,0,3.46-1.55,3.46-3.46v-8.47c-.07-.31-.11-.64-.11-.97v-6.14c0-.33.04-.66.11-.97v-18.28c-.07-.31-.11-.64-.11-.97v-6.14c0-.33.04-.66.11-.97v-8.14c0-1.91-1.55-3.46-3.46-3.46h0Z"
                        />
                        <path
                          className="cls-1"
                          d="m18.39,52.64c-1.5-1.5-3.95-1.5-5.45,0-.55.55-1.43.55-1.97,0-.75-.75-1.74-1.13-2.72-1.13s-1.97.38-2.72,1.13l-.32.32c-1.5,1.5-1.5,3.95,0,5.45l6.75,6.75,6.75-6.75c1.5-1.5,1.5-3.95,0-5.45l-.32-.32h0Z"
                        />
                        <path
                          className="cls-1"
                          d="m51.77,51.49c-.63,0-1.17.39-1.4.94v7.28c.22.55.77.94,1.4.94.83,0,1.51-.68,1.51-1.51v-6.14c0-.83-.68-1.51-1.51-1.51h0Z"
                        />
                        <path
                          className="cls-1"
                          d="m12.63,83.65c.33.82,1.11,1.35,2,1.35h18.72c.89,0,1.7-.56,2.01-1.39l3.31-8.77H9.1l3.53,8.81h0Z"
                        />
                        <path
                          className="cls-1"
                          d="m51.77,25.13c-.63,0-1.17.39-1.4.94v7.28c.22.55.77.94,1.4.94.83,0,1.51-.68,1.51-1.51v-6.14c0-.83-.68-1.51-1.51-1.51h0Z"
                        />
                        <path
                          className="cls-1"
                          d="m31.66,0h-15.81c-1.77,0-3.38,1.11-4,2.77l-3.21,8.52h30.44l-3.44-8.6c-.65-1.63-2.21-2.69-3.97-2.69h0Z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="flex justify-center items-center w-1/2">
                  <div className="flex items-center justify-center h-24 w-24 fill-blue-600">
                    <svg
                      id="Capa_2"
                      data-name="Capa 2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 84.99 66.88"
                    >
                      <g id="Layer_1" data-name="Layer 1">
                        <g className="cls-1">
                          <path
                            className="cls-3"
                            d="m37.85,66.48c.26.26.61.4.95.4s.69-.13.95-.4l9.51-9.51c.53-.53.53-1.38,0-1.91-.53-.53-1.38-.53-1.91,0l-8.56,8.56L7.81,32.63c-3.31-3.31-5.14-7.72-5.14-12.4s1.82-9.09,5.14-12.4c3.31-3.31,7.72-5.14,12.4-5.14s9.09,1.82,12.4,5.14l5.23,5.23c.25.25.6.4.95.4s.7-.14.95-.4l5.23-5.23c6.84-6.84,17.97-6.84,24.8,0,2.72,2.72,4.44,6.16,4.97,9.96.1.74.79,1.25,1.52,1.15.74-.1,1.25-.79,1.15-1.52-.61-4.38-2.6-8.36-5.73-11.49-7.89-7.89-20.73-7.89-28.62,0l-4.27,4.27-4.27-4.27C26.64-1.97,13.8-1.97,5.91,5.92c-7.89,7.89-7.89,20.73,0,28.62l31.94,31.94h0Z"
                          />
                        </g>
                        <path
                          className="cls-3"
                          d="m83.64,33.27h-19.14c-.55,0-1.04.33-1.25.84l-3.17,7.77-1.04-20.95c-.03-.62-.48-1.14-1.08-1.26-.61-.12-1.22.18-1.48.74l-5.87,12.3-6.06.81c-.59.08-1.05.53-1.15,1.11l-.57,3.33-3.27-15.46c-.12-.54-.55-.96-1.1-1.05-.55-.09-1.1.17-1.38.64l-4.78,8.08h-7.43c-.75,0-1.35.6-1.35,1.35s.6,1.35,1.35,1.35h8.2c.48,0,.92-.25,1.16-.66l3.41-5.76,4.02,18.97c.13.63.68,1.07,1.32,1.07,0,0,.02,0,.03,0,.65-.01,1.2-.48,1.3-1.12l1.59-9.3,5.8-.77c.45-.06.84-.35,1.04-.76l3.88-8.13,1.07,21.68c.03.63.5,1.16,1.12,1.26.08.01.15.02.23.02.54,0,1.04-.33,1.25-.84l5.12-12.56h18.23c.75,0,1.35-.6,1.35-1.35s-.6-1.35-1.35-1.35h0Z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
            <div className="flex flex-col w-full h-full">
              <h2 className="text-xl text-blue-500 xl:text-2xl font-semibold">
                Volumen por Ejercicio
              </h2>
              <div className="divider my-0"></div>

              {volumenEjercicio ? (
                volumenEjercicio.length !== 0 ? (
                  <div className="flex flex-col h-[92%] w-full ">
                    <div className="py-2 flex flex-row border-b-2 shadow-sm">
                      <div className="w-8/12 px-2">
                        <p className="text-secondary font-medium text-xl truncate">
                          Volumen Total
                        </p>
                      </div>
                      <div className="w-4/12 flex items-center justify-center px-2">
                        <p className="font-medium text-xl">
                          {volumenTotal + " lbs"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-full overflow-auto">
                      {volumenEjercicio.map((ejercicio) => (
                        <div
                          key={ejercicio.ejercicio.id}
                          className="py-2 flex flex-row border-b shadow-sm"
                        >
                          <div className="w-8/12 px-2">
                            <p className="text-secondary font-medium text-lg truncate">
                              {ejercicio.ejercicio.nombre}
                            </p>
                            <p className="truncate">
                              {ejercicio.ejercicio.musculo_primario}
                            </p>
                          </div>
                          <div className="w-4/12 flex items-center justify-center px-2">
                            <p className="font-medium text-lg elipsis">
                              { ejercicio.ejercicio.musculo_primario == 'Cardio' ?
                              ejercicio.volumen + " min."
                              :
                              ejercicio.volumen + " lbs"
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="my-6">
                      <div className="loader"></div>
                    </div>
                    <p>Cargando...</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-center font-light text-xl">
                    No se ha registrado ningún entrenamiento en los últimos 7
                    dias.
                  </p>
                  <button 
                  onClick={() => {router.push('/rutinas')}}
                  className="my-2 cursor-pointer font-medium text-white rounded-md bg-blue-500 hover:bg-blue-600 duration-100 active:scale-95 btn-md shadow"
                  >
                    {'IR A RUTINAS'}
                  </button>
                </div>
              )}
            </div>
            <div className="grid place-items-center p-10"></div>
          </div>

          {perfil ? (
            <div className="bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
              <div className="w-full border-b-2 pb-2">
                <h2 className="text-xl text-blue-500 xl:text-2xl font-semibold">
                  Meta de calorías {perfil.nombre} - <span className="text-green-600">EvoltFit Plus</span>
                </h2>
              </div>

              <div className="flex gap-2 mt-5">
                <div className="w-9/12 h-celdaCalorias flex flex-col">
                  <div className="border-gray-500 border-2 rounded-md">
                    <div className="h-80">
                      {opCal == "op1" ? (
                        <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          paddingBottom: "250px",
                        }}
                        className="-translate-x-6"
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                          }}
                        >
                          <ResponsiveContainer>
                            <BarChart data={graphicData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="fecha" />
                              <YAxis />
                              <Tooltip />
                              <Bar
                                dataKey="TotalCaloríasAlDía"
                                stackId="a"
                                fill="#2563eb"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      ) : opCal == "op2" ? (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            paddingBottom: "250px",
                          }}
                          className="-translate-x-6"
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              top: 0,
                            }}
                          >
                            <ResponsiveContainer>
                              <BarChart data={graphicData2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="fecha" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                  dataKey="TotalProteinasAlDía"
                                  stackId="a"
                                  fill="#2563eb"
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ) : opCal == "op3" ? (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            paddingBottom: "250px",
                          }}
                          className="-translate-x-6"
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              top: 0,
                            }}
                          >
                            <ResponsiveContainer>
                              <BarChart data={graphicData3}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="fecha" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                  dataKey="TotalGrasasAlDía"
                                  stackId="a"
                                  fill="#2563eb"
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ) : (
                        <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          paddingBottom: "250px",
                        }}
                        className="-translate-x-6"
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                          }}
                        >
                          <ResponsiveContainer>
                            <BarChart data={graphicData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="fecha" />
                              <YAxis />
                              <Tooltip />
                              <Bar
                                dataKey="TotalCaloríasAlDía"
                                stackId="a"
                                fill="#2563eb"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                  {metaCalorias != 0 ? (
                    <div>
                      <div>
                        <h2 className="font-heebo font-semibold">
                          Tu meta actual es (cals):{" "}
                          <span className="text-blue-600">{metaCalorias}</span>
                        </h2>
                      </div>
                      <ProgressBar
                        bgColor={` ${
                          sumatoriaCalorias > metaCalorias
                            ? "#dc2626"
                            : "#2563eb"
                        }`}
                        width="100%"
                        completed={sumatoriaCalorias}
                        maxCompleted={metaCalorias}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-heebo font-semibold text-sm lg:text-base">
                        Aún no defines una meta. Pulsa{" "}
                        <Link
                          href={{
                            pathname: "../biblioteca",
                          }}
                          className="text-blue-600 underline"
                        >
                          aquí
                        </Link>{" "}
                        para definirla
                      </h2>
                    </div>
                  )}
                </div>
                <div className="w-3/12 h-celdaCalorias flex flex-col gap-32 sm:gap-48">
                  <div className="">
                    <select
                      id="opciones"
                      className="select select-secondary w-full text-base font-normal rounded-xl shadow border border-gray-100 bg-slate-50 hover:bg-slate-100 shadow-gray-200"
                      onChange={handleSelectChange}
                    >
                      <option value="op1">Calorías</option>
                      <option value="op2">Proteínas</option>
                      <option value="op3">Grasas</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    {perfil.edad ? (
                      <h2 className="font-heebo font-semibold text-sm lg:text-base">
                        Edad:{" "}
                        <span className="text-blue-600">
                          {perfil.edad} años
                        </span>
                      </h2>
                    ) : (
                      <h2 className="font-heebo font-semibold text-sm lg:text-base">
                        Edad: <span className="text-blue-600">N/A</span>
                      </h2>
                    )}
                    {perfil.estatura ? (
                      <h2 className="font-hebbo font-semibold text-sm lg:text-base">
                        Estatura:{" "}
                        <span className="text-blue-600">
                          {perfil.estatura} mts.
                        </span>
                      </h2>
                    ) : (
                      <h2 className="font-hebbo font-semibold text-sm lg:text-base">
                        Estatura: <span className="text-blue-600">N/A</span>
                      </h2>
                    )}
                    {perfil.peso ? (
                      <h2 className="font-hebbo font-semibold text-sm lg:text-base">
                        Peso:{" "}
                        <span className="text-blue-600">{perfil.peso} kg</span>
                      </h2>
                    ) : (
                      <h2 className="font-hebbo font-semibold text-sm lg:text-base">
                        Peso: <span className="text-blue-600">N/A</span>
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-12">
              <div className="loader mt-6"></div>
            </div>
          )}

          <div className="bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
            <div className="flex flex-col w-full h-full">
              <h2 className="text-xl text-blue-500 xl:text-2xl font-semibold">
                Volumen por Día - <span className="text-green-600">EvoltFit Plus</span>
              </h2>
              <div className="divider my-0"></div>
              {volumenDiario ? (
                volumenDiario.length !== 0 ? (
                  <div className="flex flex-col h-[92%] w-full ">
                    <div className="py-2 flex flex-row border-b-2 shadow-sm">
                      <div className="w-8/12 px-2">
                        <p className="text-secondary font-medium text-xl truncate">
                          Volumen Total
                        </p>
                      </div>
                      <div className="w-4/12 flex items-center justify-center px-2">
                        <p className="font-medium text-xl">
                          {volumenTotal + " lbs"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-full overflow-auto">
                      {volumenDiario.map((dia) => (
                        <div
                          key={dia.dia}
                          className="py-2 flex flex-row border-b shadow-sm"
                        >
                          <div className="w-8/12 px-2">
                            <p className="text-secondary font-medium text-lg truncate">
                              {dia.dia}
                            </p>
                            <p className="truncate">{/*"lunes"*/}</p>
                          </div>
                          <div className="w-4/12 flex items-center justify-center px-2">
                            <p className="font-medium text-lg elipsis">
                              {dia.volumen + " lbs"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="my-6">
                      <div className="loader"></div>
                    </div>
                    <p>Cargando...</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-center font-light text-xl">
                    No se ha registrado ningún entrenamiento en los últimos 7
                    dias.
                  </p>
                  <button 
                  onClick={() => {router.push('/rutinas')}}
                  className="my-2 cursor-pointer font-medium text-white rounded-md bg-blue-500 hover:bg-blue-600 duration-100 active:scale-95 btn-md shadow"
                  >
                    {'IR A RUTINAS'}
                  </button>
                </div>
              )}
            </div>
            <div className="grid place-items-center p-10"></div>
          </div>

          <div className="bg-white border w-11/12 h-celdasVP rounded-md shadow-xl p-5">
            <div className="">
              <h2 className="text-xl  text-blue-500 xl:text-2xl font-semibold">
                Ejercicios donde se recomienda subir peso -{" "}
                <span className="text-green-600">Próximamente</span>
              </h2>
              <div className="divider my-0"></div>
            </div>

            <div className="p-5 h-96 mt-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="border-gray-500 border-2 rounded-md h-32 w-auto sm:h-40 sm:w-full">
                  <div className="grid place-items-center mt-2">
                    <img
                      className="rounded-full h-16 w-16 sm:h-24 sm:w-24"
                      src="exVP1.gif"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <h2 className="font-semibold text-sm sm:text-lg">
                      Aumenta 5 lbs
                    </h2>
                  </div>
                </div>
                <div className="border-gray-500 border-2 rounded-md h-32 w-auto sm:h-40 sm:w-full">
                  <div className="grid place-items-center mt-2">
                    <img
                      className="rounded-full h-16 w-16 sm:h-24 sm:w-24"
                      src="exVP2.gif"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <h2 className="font-semibold text-sm sm:text-lg">
                      Aumenta 15 lbs
                    </h2>
                  </div>
                </div>
                <div className="border-gray-500 border-2 rounded-md h-32 w-auto sm:h-40 sm:w-full">
                  <div className="grid place-items-center mt-2">
                    <img
                      className="rounded-full h-16 w-16 sm:h-24 sm:w-24"
                      src="exVP3.gif"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <h2 className="font-semibold text-sm sm:text-lg">
                      Aumenta 5 lbs
                    </h2>
                  </div>
                </div>
                <div className="border-gray-500 border-2 rounded-md h-32 w-auto sm:h-40 sm:w-full">
                  <div className="grid place-items-center mt-2">
                    <img
                      className="rounded-full h-16 w-16 sm:h-24 sm:w-24"
                      src="exVP4.gif"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <h2 className="font-semibold text-sm sm:text-lg">
                      Aumenta 20 lbs
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
      </main>

      <Footer />
    </div>
  );
}
