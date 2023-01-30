import React, { useEffect, useState } from 'react';

import { useRouter } from "next/router";
import Navbar from '/components/Navbar';
import Footer from "/components/Footer";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import shortid from 'shortid';

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


  //contenidos de puede llegar a contener cada dia
  const contenido1 = [];//lUNES
  const contenido2 = [];//MARTES
  const contenido3 = [];//MIERCOLES
  const contenido4 = [];//JUEVES
  const contenido5 = [];//VIERNES
  const contenido6 = [];//SABADO
  const contenido7 = [];//DOMINGO

  //INICIO DEL SE
  const objetivo = opciones[1]
  const tiempo = opciones[3]

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  const opcionesEjercicio = {
    masamuscular: {
      '30min': { seriesG: 4, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 4, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    perdergrasa: {
      '30min': { seriesG: 4, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 4, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    salud: {
      '30min': { seriesG: 4, repeticionesG: 8, descanso: "1min" },
      '1hr': { seriesG: 4, repeticionesG: 8, descanso: "1min 30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      '2hr': { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    resistencia: {
      '30min': { seriesG: 2, repeticionesG: 12, descanso: "30sec" },
      '1hr': { seriesG: 2, repeticionesG: 16, descanso: "30sec" },
      '1hr 30': { seriesG: 3, repeticionesG: 16, descanso: "75sec" },
      '2hr': { seriesG: 3, repeticionesG: 20, descanso: "75sec" },
    },
    fuerza: {
      '30min': { seriesG: 3, repeticionesG: 5, descanso: "2 min" },
      '1hr': { seriesG: 3, repeticionesG: 5, descanso: "3 min" },
      '1hr 30': { seriesG: 4, repeticionesG: 5, descanso: "3 min" },
      '2hr': { seriesG: 5, repeticionesG: 5, descanso: "Mas de 3 min" },
    },
  };

  if (!opcionesEjercicio[objetivo] || !opcionesEjercicio[objetivo][tiempo]) {
    console.log("Error en el objetivo o tiempo seleccionado.");
    //return;
  }
  //Aqui se asignan los valores de repeticion, series y descanso.
  const { seriesG, repeticionesG, descanso } = opcionesEjercicio[objetivo][tiempo];

  /*llenar temporal
  for (let i = 0; i < 5; i++) {
    contenido1.push({ valor: 1, series: seriesG, repeticiones: repeticionesG });
    contenido2.push({ valor: 2, series: seriesG, repeticiones: repeticionesG });
    contenido3.push({ valor: 3, series: seriesG, repeticiones: repeticionesG });
    contenido4.push({ valor: 4, series: seriesG, repeticiones: repeticionesG });
    contenido5.push({ valor: 5, series: seriesG, repeticiones: repeticionesG });
    contenido6.push({ valor: 6, series: seriesG, repeticiones: repeticionesG });
    contenido7.push({ valor: 7, series: seriesG, repeticiones: repeticionesG });
  }
  */


  let serie = 0, temp = 0;
  //____________________________________________pregunta de tiempo
  if (opciones[3] === '30min' || opciones[3] === '1hr') {
    temp = 2;
  } else if (opciones[3] === '1hr 30' || opciones[3] === '2hr') {
    temp = 3;
  } else {
    console.log("Error en el SE P:TIEMPO");
  }

  //Cambios de la nueva pregunta del SE DIAS 
  //
  //
  //
  //
  //
  //








  //let pecho,espalda,hombro,bicep,tricep,dorsales,abs,antebrazo,cuadricep,gluteo,isquos,pantorrilla;
  const diasActivos = Object.values(dias).filter(dia => dia).length;
  let variables1 = { push: 4, pecho:2 }, variables2 = { pull: 4 ,espalda:2 }, variables3 = { leg: 4, pierna:2 };
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
  if (opciones[4] === 'superior') {
    //Plantilla 1
    //Dia1
    variables1 = { pecho: 3, hombro: 2, tricep: 3 };
    variables2 = { espalda: 3, biceps: 3, };
    variables3 = { cuadriceps: 3, isquos: 3, gluteos: 3};
    llenarArreglo();
   



  } else if (opciones[4] === 'brazos') {
    //pecho espalda brazo pierna

  } else if (opciones[4] === 'pierna') {
    //pierna push pull intensidad
    console.log("3");
  } else if (opciones[4] === 'completo') {


  } else {
    console.log("Error en el SE P:ENFOQUE");
  }


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





  //
  //
  //
  //
  //
  //
  //Cambios de la nueva pregunta del SE DIAS 

  //Funcion
  function llenarArreglo() {
    let count = 1;
    for (const {dia, array} of diasArray) {
      if (dias[dia] === true && count <= 3) {
        array.length = 0;
        Object.entries(eval(`variables${count}`)).forEach(([name, cantidad]) => {
          for (let i = 0; i < cantidad; i++) {
            if (name === "hombro" || name === "antebrazo" || name === "pantorrilla") {
              array.push({ valor: name, series: 5, repeticiones: repeticionesG });
            } else {
              array.push({ valor: name, series: seriesG, repeticiones: repeticionesG });
            }
          }
        });
          count++;
      }
  }
  }








  //una vez lleno el contenido se une todo para mostrarlo en la tabla
  const arrays = [contenido1, contenido2, contenido3, contenido4, contenido5, contenido6, contenido7];
  const longestArray = arrays.reduce((a, b) => (a.length > b.length ? a : b));

  const handleClick = () => {
    console.log(formulario);
    console.log(dias);
    console.log(herramientas);
    console.log(opciones);
    console.log(diasActivos);
    console.log(contenido5);
  };

  return (
    <div className="bg-blue-100 w-full h-screen">
      <Head>
        <title>EvoltFit - Sistema Experto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <br /><br />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <tr key={`${arrays[index]}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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


        <button onClick={handleClick} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ver Datos</button>
        <br /><br /> <br /> <br /> <br /> <br /> <br />
      </main>
      <Footer></Footer>
    </div>
  );
}