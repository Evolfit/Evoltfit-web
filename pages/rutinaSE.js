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
  //IMAGEN
  const imgSrc = "img/completo2.png";
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


  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  // <-------------- Carga de Ejercicios ---------------->
  /*




  */
  const nombreMap = {
    "Ninguno": "Ninguno",
    "Bandaresistencia": "Banda de resistencia",
    "Bandasuspension": "Banda de suspension",
    "Barra": "Barra",
    "BarraZ": "Barra Z",
    "Barras": "Barras (dominadas, paralelas)",
    "Mancuernas": "Mancuernas",
    "PesaRusa": "Pesa rusa",
    "PlacaPeso": "Placa de peso",
    "MaquinasGYM": "Maquinas en GYM",
    "BancoPlano": "Banco plano",
    "BancoDeclinado": "Banco declinado",
    "BancoInclinado": "Banco inclinado",
    "Cuerda": "Cuerda",
    " BancoInclinado": "Banco inclinado"
  };
  //Asignar las que estan disponibles
  const herramientasActivas = [];
  for (const herramienta in herramientas) {
    if (herramientas[herramienta]) {
      herramientasActivas.push(nombreMap[herramienta]);
    }
  }
  //console.log(herramientasActivas)

  //
  //
  //Funcion para cargar los ejercicios....
  //
  //

  const cargar_ejercicios = async () => {
    let query = supabase
      .from('ejercicios')
      .select('id,similar, nombre, musculo_primario,equipo, img')

    query = query.containedBy('equipo', herramientasActivas)
    query = query.order('puntuacion', { ascending: false })

    const { data, error } = await query;
    if (error) {
      console.log(error);
    } else {
      setData(data);
      console.log("Funcion Cargar")
      console.log(data)
    }
  };


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










  var dosdecuatro = 0;
  //____________________________________________pregunta de tiempo
  if (opciones[3] === '30min' || opciones[3] === '1hr') {
    temp = 2;
    dosdecuatro = 0;
  } else if (opciones[3] === '1hr 30') {
    temp = 2;
    dosdecuatro = 1;
  }
  else if (opciones[3] === '2hr') {
    temp = 3;
    dosdecuatro = 0;
  } else {
    //console.log("Error en el SE P:TIEMPO");
  }


  function casoSuperiorYC(diasActivos) {
    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp, Antebrazos: temp - 1 };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
      }


    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1 };
        variables4 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp, Antebrazos: temp - 1 };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
        variables4 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1 };
      }


    } else if (diasActivos === 5) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1 };
        variables4 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1 };
        variables5 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp, Antebrazos: temp - 1 };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
        variables4 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1 };
        variables5 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1, Pantorrillas: temp - 1 };
      }


    } else if (diasActivos === 6 || diasActivos === 7) {
      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1 };
        variables4 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables5 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp };
        variables6 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables2 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp, Antebrazos: temp - 1 };
        variables3 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1, Abdomen: temp - 1 };
        variables4 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables5 = { Dorsales: temp, Trapecio: temp - 2, Biceps: temp, Antebrazos: temp - 1 };
        variables6 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1, Pantorrillas: temp - 1 };
      }
    }
  }

  function casoBrazos(diasActivos) {

    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables1 = { Pecho: temp, Dorsales: temp };
        else
          variables1 = { Pecho: temp, Dorsales: temp };

        variables2 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables1 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
        else
          variables1 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };

        variables2 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
      }

    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables2 = { Pecho: temp, Dorsales: temp };
        else
          variables2 = { Pecho: temp, Dorsales: temp };

        variables1 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
        variables4 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables2 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
        else
          variables2 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };

        variables1 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
        variables4 = { Triceps: temp, Hombros: temp - 1, Biceps: temp };
      }

    } else if (diasActivos === 5) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables3 = { Pecho: temp, Dorsales: temp };
        else
          variables3 = { Pecho: temp, Dorsales: temp };

        variables1 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables2 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
        variables4 = { Triceps: temp, Hombros: temp - 1, Biceps: temp };
        variables5 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr')
          variables3 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
        else
          variables3 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };

        variables1 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables2 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
        variables4 = { Triceps: temp, Hombros: temp - 1, Biceps: temp };
        variables5 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1, Pantorrillas: temp - 1 };
      }

    } else if (diasActivos === 6 || diasActivos === 7) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        if (opciones[3] === '30min' || opciones[3] === '1hr') {
          variables1 = { Pecho: temp, Dorsales: temp };
          variables4 = { Pecho: temp, Dorsales: temp };
        }
        else {
          variables1 = { Pecho: temp, Dorsales: temp };
          variables4 = { Pecho: temp, Dorsales: temp };
        }
        variables2 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
        variables5 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables6 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1 };
      }
      else {
        //Plantilla 2
        if (opciones[3] === '30min' || opciones[3] === '1hr') {
          variables1 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
          variables4 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
        }
        else {
          variables1 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
          variables4 = { Pecho: temp, Dorsales: temp, Antebrazos: temp - 1 };
        }
        variables2 = { Hombros: temp - 1, Triceps: temp, Biceps: temp };
        variables3 = { Cuadriceps: temp, Isquiotibiales: temp - 1, Gluteos: temp - 1, Abdomen: temp - 1 };
        variables5 = { Triceps: temp, Hombros: temp - 1, Biceps: temp };
        variables6 = { Isquiotibiales: temp, Cuadriceps: temp - 1, Gluteos: temp - 1, Pantorrillas: temp - 1 };
      }

    }
  }

  function casoPierna(diasActivos) {
    if (diasActivos === 3) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
        variables2 = { Hombros: temp - 1, Triceps: temp };
        variables3 = { Dorsales: temp, Biceps: temp - 1 };

      }
      else {
        //Plantilla 2
        variables1 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1, Pantorrillas: temp - 1 };
        variables2 = { Hombros: temp - 1, Triceps: temp, Pecho: temp - 1 };
        variables3 = { Dorsales: temp, Biceps: temp - 1, Abdomen: temp - 1 };

      }

    } else if (diasActivos === 4) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Cuadriceps: temp, Gluteos: temp };
        variables2 = { Hombros: temp - 1, Triceps: temp };
        variables3 = { Isquiotibiales: temp, Gluteos: temp };
        variables4 = { Dorsales: temp, Biceps: temp - 1 };
      }
      else {
        //Plantilla 2
        variables1 = { Cuadriceps: temp, Gluteos: temp, Pantorrillas: temp - 1 };
        variables2 = { Hombros: temp - 1, Triceps: temp, Pecho: temp - 1 };
        variables3 = { Isquiotibiales: temp, Gluteos: temp, Abdomen: temp - 1 };
        variables4 = { Dorsales: temp, Biceps: temp - 1, Abdomen: temp - 1 };
      }

    } else if (diasActivos === 5) {

      //Plantilla 1
      variables1 = { Cuadriceps: temp, Gluteos: temp, Pantorrillas: temp - 1 };
      variables2 = { Hombros: temp - 1, Triceps: temp, Pecho: temp - 1 };
      variables3 = { Isquiotibiales: temp, Gluteos: temp, Pantorrillas: temp - 1 };
      variables4 = { Dorsales: temp, Biceps: temp - 1, Abdomen: temp - 1 };
      variables5 = { Cuadriceps: temp, Isquiotibiales: temp, Pantorrillas: temp - 1 };

    } else if (diasActivos === 6 || diasActivos === 7) {

      if (opciones[2] === 'principiante' || opciones[2] === 'intermedio') {
        //Plantilla 1
        variables1 = { Cuadriceps: temp, Gluteos: temp };
        variables2 = { Hombros: temp - 1, Triceps: temp, Pecho: temp - 1 };
        variables3 = { Isquiotibiales: temp, Gluteos: temp };
        variables4 = { Dorsales: temp, Biceps: temp - 1 };
        variables5 = { Cuadriceps: temp, Isquiotibiales: temp };
        variables6 = { Abdomen: temp - 1, Pantorrillas: temp - 1 };
      }
      else {
        //Plantilla 2
        variables2 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables3 = { Dorsales: temp, Biceps: temp, Antebrazos: temp - 1 };
        variables1 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1, Abdomen: temp - 1 };
        variables5 = { Pecho: temp, Hombros: temp - 1, Triceps: temp };
        variables6 = { Dorsales: temp - 1, Biceps: temp, Antebrazos: temp - 1 };
        variables4 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1, Pantorrillas: temp - 1 };
      }

    }
  }
  function dosdias(diasActivos) {
    variables2 = { Cuadriceps: temp, Gluteos: temp - 1, Isquiotibiales: temp - 1 };
    variables1 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1 };
  }

  function undia(diasActivos) {
    variables1 = { Pecho: temp - 1, Dorsales: temp - 1, Biceps: temp - 1, Triceps: temp - 1, Cuadriceps: temp - 1, Isquiotibiales: temp - 1 };
  }









































  //let Pecho,espalda,Hombros,bicep,tricep,dorsales,Abdomen,Antebrazos,cuadricep,gluteo,Isquiotibiales,Pantorrillas;
  const diasActivos = Object.values(dias).filter(dia => dia).length;
  let variables1 = { push: 4, Pecho: 2 }, variables2 = { pull: 4, espalda: 2 }, variables3 = { leg: 4, pierna: 2 };
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
            if (name === "Hombros" || name === "Antebrazos" || name === "Pantorrillas") {
              array.push({ nombreE: name, etiqueta: name, series: 4 + dosdecuatro, repeticiones: repeticionesG, imgR: imgSrc });
            } else {
              array.push({ nombreE: name, etiqueta: name, series: seriesG + dosdecuatro, repeticiones: repeticionesG, imgR: imgSrc });
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
    // Variable para almacenar los ejercicios ya asignados
    let asignados = [];
    let similares = [];
    // Recorrer el arreglo "arrays"
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
        let obj = arrays[i][j];
        if (obj.etiqueta) {
          let ejercicio = data.find(ej => ej.musculo_primario === obj.etiqueta && !asignados.includes(ej.id) && !similares.includes(ej.similar));
          if (ejercicio && ejercicio.nombre !== obj.nombreE) {
            obj.nombreE = ejercicio.nombre;
            obj.imgR = ejercicio.img;
            asignados.push(ejercicio.id);
            if (ejercicio.similar !== null)
              similares.push(ejercicio.similar);
          }
        }
      }
    }
    console.log(arrays)
    console.log(similares)
    setArrays([...arrays]);
  }
  //
  //Cuando se preciona un boton
  //

  function mostrarPosicion(arrayIndex, index) {
    let obj2 = arrays[arrayIndex][index];
    let ubicacion = data.findIndex((ejercicio) => {
      return ejercicio.nombre === obj2.nombreE;
    });
    console.log("______________________________________")
    console.log("Ejercicio Actual")
    console.log(obj2)
    // Obtener los ejercicios que coinciden con la etiqueta y no están en arrays
    const ejerciciosFiltrados = data.filter((ejercicio, i) => {
      return (
        ejercicio.musculo_primario === data[ubicacion].musculo_primario
      );
    });

    console.log("Ejercicios filtrados")
    console.log(ejerciciosFiltrados)
    //ponerle que recoga todos los ejercicios y utilizar la ubicacion

    let y = ejerciciosFiltrados.length;
    let x = ejerciciosFiltrados.findIndex((ejercicio2) => {
      return ejercicio2.nombre === obj2.nombreE;
    });

    if (x < y) {
      console.log("Contador")
      console.log(x)
      let siguienteEjercicio=0;
      if(x+1<y){
      siguienteEjercicio = ejerciciosFiltrados[x+1];
      }else{
      siguienteEjercicio = ejerciciosFiltrados[0];
      }

      //Cambio de datos
      console.log("Nuevo Ejercicio")
      console.log(siguienteEjercicio)
      obj2.nombreE = siguienteEjercicio.nombre;
      obj2.imgR = siguienteEjercicio.img;
      setArrays([...arrays]);

    } else {
      console.log("No hace Nada")
    }
  }

  const [arrays, setArrays] = useState([
    contenido1,
    contenido2,
    contenido3,
    contenido4,
    contenido5,
    contenido6,
    contenido7,
  ]);

  /*/////////////////////////////
  UseEffect que activa evento para cuando se recargue
  la página guardar la rutina.
  /////////////////////////////*/

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('rutina', JSON.stringify(arrays));
        localStorage.setItem('bandera', 'true');
      });
    }
  }, [arrays]);

  //UseEffect para obtener la rutina si el usuario recarga la página
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

  const longestArray = arrays.reduce((a, b) => (a.length > b.length ? a : b));


  const handleClick = () => {
    //cargar_ejercicios();
    //llenarOtraVez();
    //cambiar_ejercicios_Click();
    //llenarArreglo(diasActivos);
    //console.log(formulario);
    //console.log(dias);
    //console.log(herramientas);
    //console.log(opciones);
    //console.log(diasActivos);
    //console.log(contenido1);
    //console.log(arrays);
  };
  //Use effect para detectar si el usuario sale de rutinaSE
  useEffect(() => {
    const handlePopstate = () => {
      localStorage.setItem('bandera', 'false');
      window.removeEventListener('popstate', handlePopstate);
    };
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  //Use Effect para cargar y asignar los ejercicios
  useEffect(() => {
    if (data.every(posicion => posicion.length === 0)) {
      cargar_ejercicios();
    } else {
      if (localStorage.getItem('bandera') !== 'true') {
        cambiar_ejercicios();
      }
    }
    //console.log(localStorage.getItem('bandera'));
  }, [data]);


  return (
    <div className="bg-blue-100 w-full">
      <Head>
        <title>EvoltFit - Sistema Experto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />


      {loading ? (
        <div>
          <div className="loader"></div>
          <p>{'CARGANDO'}</p>
        </div>
      ) : (
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
                    {arrays.map((array, arrayIndex) => (
                      <td key={shortid.generate()} className="px-6 py-4">
                        {index < array.length ? (
                          <p>
                            {array[index].nombreE} <br />
                            <img src={array[index].imgR} alt='hola' key={array[index]} style={{ width: '50px', height: '50px' }}></img>
                            <br />{array[index].series}x{array[index].repeticiones} <br />
                            Descanso: {descanso}
                            <button
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-0.3 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => mostrarPosicion(arrayIndex, index)}
                            >
                              <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                              </svg>
                              <span class="sr-only">Icon description</span>
                            </button>
                          </p>
                        ) : (
                          ''
                        )} <br />
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
      )}

      <Footer></Footer>
    </div>
  );
}