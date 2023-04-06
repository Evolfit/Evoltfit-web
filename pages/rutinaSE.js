import React, { useEffect, useState } from 'react';

import { useRouter } from "next/router";
import Navbar from '/components/Navbar';
import Footer from "/components/Footer";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import shortid from 'shortid';
import supabase from "../config/supabaseClient";

export default function Home() {
  /*Variables generales
  let seriesG=5
  let repeticionesG= 13;
  let descanso= "3min";
  */
  //Recuperar valores
  const router = useRouter();
  const { formData2, checkboxes, checkboxes2, arreglo } = router.query;
  //JSON

  let formulario = {};
  if (formData2) {
    formulario = JSON.parse(formData2);
  }

  let herramientas = {};
  if (checkboxes) {
    herramientas = JSON.parse(checkboxes);
  }

  let dias = {};
  if (checkboxes2) {
    dias = JSON.parse(checkboxes2);
  }

  let opciones = ['hombre', 'masamuscular', 'principiante', '30min', 'superior']
  if (arreglo) {
    opciones = JSON.parse(arreglo);
  }



  cargar_ejercicios();

  async function cargar_ejercicios() {
    const { data, error } = await supabase
      .from("ejercicios")
      .select("nombre", "musculo_otros")
      .eq("musculo_primario", "Pecho");


    if (error) {
      console.log("ERROR: No se encontró el ejercicio.");
      console.log(error);
    } else {
      console.log(data);

    }
  }
  /*
  //////////////////////////////////////////////////////////
  Cambios a variables para no regresarme a las preguntas (borras despues)

  
  dias.Lunes = true;
  dias.Martes = false;
  dias.Miercoles = false;
  dias.Jueves = false;
  dias.Viernes = false;
  dias.Sabado = false;
  dias.Domingo = false;

  opciones[4] = 'superior';
  //opciones[4] = 'brazos';
  //opciones[4] = 'pierna';
  //opciones[4] = 'completo';


  opciones[3] = '30min';
  opciones[3] = '1hr 30';
  opciones[2] = 'principiante';
  opciones[2] = 'experimentado';
  opciones[1] = 'masamuscular';


  /*/////////////////////////////////////////////////////////*/

  //contenidos de puede llegar a contener cada dia
  let contenido1 = [];//lUNES
  let contenido2 = [];//MARTES
  let contenido3 = [];//MIERCOLES
  let contenido4 = [];//JUEVES
  let contenido5 = [];//VIERNES
  let contenido6 = [];//SABADO
  let contenido7 = [];//DOMINGO


  //INICIO DEL SE
  const objetivo = opciones[1]
  const tiempo = opciones[3]

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  const opcionesEjercicio = {
    masamuscular: {
      '30min': { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    perdergrasa: {
      '30min': { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    salud: {
      '30min': { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    resistencia: {
      '30min': { seriesG: 3, repeticionesG: 12, descanso: "30sec" },
      '1hr': { seriesG: 3, repeticionesG: 16, descanso: "30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 16, descanso: "75sec" },
      '2hr': { seriesG: 3, repeticionesG: 20, descanso: "75sec" },
    },
    fuerza: {
      '30min': { seriesG: 3, repeticionesG: 5, descanso: "2 min" },
      '1hr': { seriesG: 3, repeticionesG: 5, descanso: "3 min" },
      '1hr 30': { seriesG: 3, repeticionesG: 5, descanso: "3 min" },
      '2hr': { seriesG: 5, repeticionesG: 5, descanso: "Mas de 3 min" },
    },
  };

  if (!opcionesEjercicio[objetivo] || !opcionesEjercicio[objetivo][tiempo]) {
    console.log("Error en el objetivo o tiempo seleccionado.");
    //return;
  }
  //Aqui se asignan los valores de repeticion, series y descanso.
  const { seriesG, repeticionesG, descanso } = opcionesEjercicio[objetivo][tiempo];


  let serie = 0, temp = 0;
  

  //Cambios de la nueva pregunta del SE DIAS 
  //
  //
  //
  //
  //
  //









  
var dosdecuatro=0;
//____________________________________________pregunta de tiempo
  if (opciones[3] === '30min' || opciones[3] === '1hr') {
    temp = 2;
    dosdecuatro=0;
  } else if (opciones[3] === '1hr 30') {
    temp = 2;
    dosdecuatro=1;
  } 
  else if (opciones[3] === '2hr') {
    temp = 3;
    dosdecuatro=0;
  }else {
    //console.log("Error en el SE P:TIEMPO");
  }


  function casoSuperiorYC(diasActivos) {
    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp, trapecio: temp-2, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2,biceps: temp, antebrazo: temp - 1 };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
      }


    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1 };
        variables4 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2, biceps: temp, antebrazo: temp - 1 };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
        variables4 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1 };
      }


    } else if (diasActivos === 5) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1 };
        variables4 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1 };
        variables5 = { isquos: temp , cuadriceps: temp - 1, gluteos: temp - 1  };
      }
      else {
        //Plantilla 2
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2, biceps: temp, antebrazo: temp - 1 };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
        variables4 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1 };
        variables5 = { isquos: temp, cuadriceps: temp -1 , gluteos: temp - 1,  pantorilla: temp - 1 };
      }


    } else if (diasActivos === 6 || diasActivos === 7) {
      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp,  trapecio: temp-2, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1 };
        variables4 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables5 = { dorsal: temp, trapecio: temp-2, biceps: temp };
        variables6 = { isquos: temp, cuadriceps: temp - 1, gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables2 = { dorsal: temp, trapecio: temp-2, biceps: temp, antebrazo: temp - 1 };
        variables3 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1, abs: temp - 1 };
        variables4 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables5 = { dorsal: temp,  trapecio: temp-2, biceps: temp, antebrazo: temp - 1 };
        variables6 = { isquos: temp, cuadriceps: temp - 1, gluteos: temp - 1,  pantorilla: temp - 1 };
      }
    }
  }

  function casoBrazos(diasActivos) {

    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables1 = { pecho: temp, dorsal: temp };
        else
          variables1 = { pecho: temp, dorsal: temp};

        variables2 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables1 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
        else
          variables1 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };

        variables2 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
      }

    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables2 = { pecho: temp, dorsal: temp };
        else
          variables2 = { pecho: temp, dorsal: temp };

        variables1 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
        variables4 = { hombro: temp - 1, triceps: temp, biceps: temp };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables2 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
        else
          variables2 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };

        variables1 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
        variables4 = { triceps: temp, hombro: temp - 1,  biceps: temp };
      }

    } else if (diasActivos === 5) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables3 = { pecho: temp, dorsal: temp };
        else
          variables3 = { pecho: temp, dorsal: temp };

        variables1 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables2 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
        variables4 = { triceps: temp, hombro: temp - 1,  biceps: temp };
        variables5 = { isquos: temp, cuadriceps: temp-1, gluteos: temp - 1  };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables3 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
        else
          variables3 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };

        variables1 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables2 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
        variables4 = { triceps: temp, hombro: temp - 1,  biceps: temp };
        variables5 = { isquos: temp, cuadriceps: temp -1,  gluteos: temp - 1, pantorilla: temp - 1 };
      }

    } else if (diasActivos === 6 || diasActivos === 7) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr') {
          variables1 = { pecho: temp, dorsal: temp };
          variables4 = { pecho: temp, dorsal: temp };
        }
        else {
          variables1 = { pecho: temp, dorsal: temp};
          variables4 = { pecho: temp, dorsal: temp};
        }
        variables2 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
        variables5 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables6 = { isquos: temp, cuadriceps: temp-1, gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr') {
          variables1 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
          variables4 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
        }
        else {
          variables1 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
          variables4 = { pecho: temp, dorsal: temp, antebrazo: temp - 1 };
        }
        variables2 = { hombro: temp - 1, triceps: temp, biceps: temp };
        variables3 = { cuadriceps: temp, isquos: temp - 1, gluteos: temp - 1, abs: temp - 1 };
        variables5 = { triceps: temp, hombro: temp - 1,  biceps: temp };
        variables6 = { isquos: temp,cuadriceps: temp - 1, gluteos: temp - 1, pantorilla: temp - 1 };
      }

    }
  }

  function casoPierna(diasActivos) {
    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
        variables2 = { hombro: temp - 1, triceps: temp };
        variables3 = { dorsal: temp , biceps: temp - 1 };

      }
      else {
        //Plantilla 2
        variables1 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1, pantorilla: temp - 1 };
        variables2 = { hombro: temp - 1, triceps: temp, pecho: temp - 1 };
        variables3 = { dorsal: temp , biceps: temp - 1, abs: temp - 1 };

      }

    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { cuadriceps: temp, gluteos: temp };
        variables2 = { hombro: temp - 1, triceps: temp };
        variables3 = { isquos: temp, gluteos: temp };
        variables4 = { dorsal: temp, biceps: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { cuadriceps: temp, gluteos: temp, pantorilla: temp - 1 };
        variables2 = { hombro: temp - 1, triceps: temp, pecho: temp - 1 };
        variables3 = { isquos: temp, gluteos: temp, abs: temp - 1 };
        variables4 = { dorsal: temp, biceps: temp - 1, abs: temp - 1 };
      }

    } else if (diasActivos === 5) {

      //Plantilla 1
      variables1 = { cuadriceps: temp, gluteos: temp, pantorilla: temp - 1 };
      variables2 = { hombro: temp - 1, triceps: temp, pecho: temp - 1 };
      variables3 = { isquos: temp, gluteos: temp, pantorilla: temp - 1 };
      variables4 = { dorsal: temp, biceps: temp - 1, abs: temp - 1 };
      variables5 = { cuadriceps: temp, isquos: temp, pantorilla: temp - 1 };

    } else if (diasActivos === 6 || diasActivos === 7) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { cuadriceps: temp, gluteos: temp };
        variables2 = { hombro: temp - 1, triceps: temp, pecho: temp - 1 };
        variables3 = { isquos: temp, gluteos: temp };
        variables4 = { dorsal: temp, biceps: temp - 1 };
        variables5 = { cuadriceps: temp, isquos: temp };
        variables6 = { abs: temp - 1, pantorilla: temp - 1 };
      }
      else {
        //Plantilla 2
        variables2 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables3 = { dorsal: temp, biceps: temp, antebrazo: temp - 1 };
        variables1 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1, abs: temp - 1 };
        variables5 = { pecho: temp, hombro: temp - 1, triceps: temp };
        variables6 = { dorsal: temp - 1, biceps: temp, antebrazo: temp - 1 };
        variables4 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1, pantorilla: temp - 1 };
      }

    }
  }
  function dosdias(diasActivos) {
    variables2 = { cuadriceps: temp, gluteos: temp - 1, isquos: temp - 1 };
    variables1 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1 };
  }

  function undia(diasActivos) {
    variables1 = { pecho: temp - 1, dorsal: temp - 1, biceps: temp - 1, triceps: temp - 1, cuadriceps: temp - 1, isquos: temp - 1 };
  }









































  //let pecho,espalda,hombro,bicep,tricep,dorsales,abs,antebrazo,cuadricep,gluteo,isquos,pantorrilla;
  const diasActivos = Object.values(dias).filter(dia => dia).length;
  let variables1 = { push: 4, pecho: 2 }, variables2 = { pull: 4, espalda: 2 }, variables3 = { leg: 4, pierna: 2 };
  let variables4 = { prueba1: 6 }, variables5 = { prueba2: 6 }, variables6 = { prueba3: 6 };
  let variables7 = {};

  const diasArray = [
    { dia: "Lunes", array: contenido1 },
    { dia: "Martes", array: contenido2 },
    { dia: "Miercoles", array: contenido3 },
    { dia: "Jueves", array: contenido4 },
    { dia: "Viernes", array: contenido5 },
    { dia: "Sabado", array: contenido6 },
    { dia: "Domingo", array: contenido7 }
  ];


  //____________________________________________pregunta de enfoque.
  if (opciones[4] === 'superior' && diasActivos > 2) {
    casoSuperiorYC(diasActivos);
  } else if (opciones[4] === 'brazos' && diasActivos > 2) {
    casoBrazos(diasActivos);
  } else if (opciones[4] === 'pierna' && diasActivos > 2) {
    casoPierna(diasActivos);
  } else if (opciones[4] === 'completo' && diasActivos > 2) {
    casoSuperiorYC(diasActivos);
  } else if (diasActivos === 2) {
    dosdias(diasActivos);
  } else if (diasActivos === 1) {
    undia(diasActivos);
  } else {
    //console.log("Error en el SE P:ENFOQUE");
  }
  //llenamos

  llenarArreglo(diasActivos);
  /*
    //____________________________________________pregunta de experiencia
    if (opciones[2] === 'principiante') {
      console.log("principiante");
    } else if (opciones[2] === 'intermedio') {
      console.log("intermedio");
    } else if (opciones[2] === 'avanzado') {
      console.log("avanzado");
    } else if (opciones[2] === 'experimentado') {
      console.log("experimentado");
    } else {
      console.log("Error en el SE P:OBJETIVO");
    }
  */




  //
  //
  //
  //
  //
  //
  //Cambios de la nueva pregunta del SE DIAS 

  //Funcion
  function llenarArreglo(diasSemana) {
    let count = 1;
    for (const { dia, array } of diasArray) {
      if (dias[dia] === true && count <= diasSemana) {
        array.length = 0;
        Object.entries(eval(`variables${count}`)).forEach(([name, cantidad]) => {
          for (let i = 0; i < cantidad; i++) {
            if (name === "hombro" || name === "antebrazo" || name === "pantorrilla") {
              array.push({ valor: name, series: 4 + dosdecuatro, repeticiones: repeticionesG });
            } else {
              array.push({ valor: name, series: seriesG + dosdecuatro, repeticiones: repeticionesG });
            }
          }
        });
        count++;
      }
    }
  }





  /*
  /
  ////////////////////////////////////////////////
  /
  /
  Cambiar por ejercicios
  /
  /
  //////////////////////////////////////////////////
  /
  */


  


  function cambiar_ejercicios() {
    console.log("llego a la funcion");
    console.log(contenido1);
    if (contenido1 && contenido1[0]) {
      contenido1[0].valor = "nuevo valor";
    }
  }

  function cambiar_ejercicios_Click() {
    const newArrays = [...arrays];
    newArrays[0][0].valor = "Hola";
    setArrays(newArrays);
  }







  //una vez lleno el contenido se une todo para mostrarlo en la tabla
  
  //cambiar_ejercicios();
  //D
  /*
  const [arrays, setArrays] = useState([
    contenido1,
    contenido2,
    contenido3,
    contenido4,
    contenido5,
    contenido6,
    contenido7,
  ]);
  */
  const arrays = [
    contenido1,
    contenido2,
    contenido3,
    contenido4,
    contenido5,
    contenido6,
    contenido7
  ];

  /*/////////////////////////////
  UseEffect que activa evento para cuando se recargue
  la página guardar la rutina.
  /////////////////////////////*/
  /*
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('rutina', JSON.stringify(arrays));
      });
    }
  }, [arrays]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {

      if (arrays.every(posicion => posicion.length === 0)) {

        const storedCount = localStorage.getItem('rutina');
        if (storedCount) {

          setArrays(JSON.parse(storedCount));

        }

      }
    }
  }, []);

*/

  const longestArray = arrays.reduce((a, b) => (a.length > b.length ? a : b));




  const handleClick = () => {

    //cargar_ejercicios();
    //llenarOtraVez();
    //indispensable llenar arreglo

    //cambiar_ejercicios_Click();
    //llenarArreglo(diasActivos);
    console.log(formulario);
    console.log(dias);
    console.log(herramientas);
    console.log(opciones);
    console.log(diasActivos);
    console.log(contenido1);
    console.log(arrays);



  };

  return (
    <div className="bg-blue-100 w-full">
      <Head>
        <title>EvoltFit - Sistema Experto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <br /><br />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Lunes</th>
                <th className="px-6 py-3">Martes</th>
                <th className="px-6 py-3">Miércoles</th>
                <th className="px-6 py-3">Jueves</th>
                <th className="px-6 py-3">Viernes</th>
                <th className="px-6 py-3">Sábado</th>
                <th className="px-6 py-3">Domingo</th>
              </tr>
            </thead>
            <tbody>
              {longestArray.map((_, index) => (
                <tr key={`${arrays[index]}-${index}`} className="bg-white border-b">
                  {arrays.map((array) => (

                    <td key={shortid.generate()} className="px-6 py-4">
                      {index < array.length ?
                        <p>
                          {array[index].valor} <br />
                          <img src="img/completo2.png" alt='hola' key={array[index]} style={{ width: '50px', height: '50px' }}></img>
                          <br />{array[index].series}x{array[index].repeticiones} <br />
                          Descanso: {descanso}
                        </p>
                        : ''} <br />
                    </td>

                  ))}

                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <button onClick={handleClick} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ver Datos</button>
        <br /><br /> <br /> <br /> <br /> <br /> <br />
      </main>
      <Footer></Footer>
    </div>
  );
}