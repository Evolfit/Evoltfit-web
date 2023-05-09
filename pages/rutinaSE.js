import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import shortid from "shortid";
import supabase from "../config/supabaseClient";

export default function Home() {
  // <-------- Usuario Logueado --------->
  const [loading, setLoading] = useState(true);
  const [loadlogin, setLoadlogin] = useState(true);
  const [loadfinal, setLoadfinal] = useState(true);
  const [sesion, setSesion] = useState(null);
  useEffect(() => {
    handleSesion();
    if (localStorage.getItem("bandera3") !== "true") {
      router.push("/");
    }
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, []);

  useEffect(() => {
    if (loading === false && loadlogin === false) {
      setLoadfinal(false);
    } else {
      setLoadfinal(true);
    }
  }, [loading, loadlogin]);

  async function handleSesion() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      let { data: pagos, err } = await supabase
        .from("sus_pagos")
        .select("activo")
        .eq("id_usuario", data.session.user.id);
      if (pagos.length == 0) {
        //console.log("Este usuario no tiene plan");
        //SI no tiene un plan entonces
        const data8 = await supabase
          .from("perfiles")
          .select("se")
          .eq("id", data.session.user.id);

        if (data8.data[0].se === 1) {
          //console.log("Tiene un uso.");
          setLoadlogin(false);
          localStorage.setItem("bandera2", "false");
          const { error } = await supabase
            .from("perfiles")
            .update({
              se: 0,
            })
            .eq("id", data.session.user.id);

          if (error) {
            ////console.log('ERROR: No se pudo actualizar el perfil.')
            //console.log(error);
          } else {
            ////console.log('Perfil actualizado.')
          }
        } else {
          if (localStorage.getItem("bandera2") !== "false") {
            router.push("/");
          } else {
            setLoadlogin(false);
            ////console.log("Todavia sigues dentro")
          }
        }
      } else {
        ////console.log("Tiene un Plan")
        setLoadlogin(false);
      }
      ////console.log(data);
    } else {
      setSesion(null);
      router.push("/login");
    }
  }

  // <-------- Recuperar valores --------->
  const router = useRouter();
  const { formData2, checkboxes, checkboxes2, arreglo, perfil } = router.query;

  let formulario = {};
  if (formData2) {
    formulario = JSON.parse(formData2);
  }

  let usuario = {};
  if (perfil) {
    usuario = JSON.parse(perfil);
  }
  let herramientas = {};
  if (checkboxes) {
    herramientas = JSON.parse(checkboxes);
  }

  let dias = {};
  if (checkboxes2) {
    dias = JSON.parse(checkboxes2);
  }

  let opciones = [
    "hombre",
    "masamuscular",
    "principiante",
    "30min",
    "superior",
  ];
  if (arreglo) {
    opciones = JSON.parse(arreglo);
  }

  // <--------------------- >
  // <--------------------- >
  // <----- Variables ----- >
  // <--------------------- >
  // <--------------------- >
  const imgSrc = "img/completo2.png";
  const diasActivos = Object.values(dias).filter((dia) => dia).length;
  let variables1 = { push: 4, Pecho: 2 },
    variables2 = { pull: 4, espalda: 2 },
    variables3 = { leg: 4, pierna: 2 };
  let variables4 = { prueba1: 6 },
    variables5 = { prueba2: 6 },
    variables6 = { prueba3: 6 };
  let variables7 = {};

  const [loadingtexto, setLoadingtexto] = useState(
    "Cargando tu Rutina de Entrenamiento..."
  );
  const [data, setData] = useState([]);
  const [infousuario, setinfousuario] = useState(null);
  const [objetivoUsuario, setObjetivoUsuario] = useState("");
  const [textoDeObjetivo, setTextoDeObjetivo] = useState("");
  const [nivelusuario, setnivelusuario] = useState("");
  const [textoNivel, settextoNivel] = useState("");
  const [nivelvolumen, setnivelmolumen] = useState("");
  const [mv, setmv] = useState("");
  const [nivelfrecuencia, setnivelfrecuencia] = useState("");
  const [enfoquetexti, setenfoquetexto] = useState("");
  const [enfoquetitulo, setenfoquetitulo] = useState("");
  const [sexo, setsexo] = useState("");
  // <--------------------- >
  // <--------------------- >
  // <----- Variables ----- >
  // <--------------------- >
  // <--------------------- >
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- Texto para complementar el sistema ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->

  //datos de peso estatura y edad.
  //Objetivo
  const equivalencias = {
    masamuscular: {
      objetivo: "Ganar Masa Muscular",
      texto:
        "si tu objetivo es aumentar tu masa muscular, deberás centrarte en el entrenamiento de fuerza y el consumo adecuado de proteínas. El entrenamiento de fuerza es clave para estimular el crecimiento muscular, y deberás enfocarte en levantar pesos progresivamente más pesados ​​con el tiempo. Junto con el entrenamiento de fuerza, una dieta adecuada que incluya suficientes proteínas es esencial para ayudar a reparar y reconstruir los músculos después del ejercicio.",
    },
    resistencia: {
      objetivo: "Ganar Resistencia",
      texto:
        "es importante incorporar ejercicios de fuerza con repeticiones más amplias, lo que implica realizar un mayor número de repeticiones por serie en lugar de levantar pesos más pesados. La calistenia es una excelente forma de mejorar la resistencia muscular y cardiovascular a través de ejercicios que involucran el propio peso corporal, como flexiones, sentadillas y dominadas. Es importante ir aumentando gradualmente el número de repeticiones en cada serie para desafiar y mejorar la resistencia.",
    },
    fuerza: {
      objetivo: "Ganar Fuerza",
      texto:
        "si deseas mejorar tu fuerza, debes enfocarte en el entrenamiento de fuerza y ​​en aumentar gradualmente la resistencia en tus ejercicios. A medida que aumentes la resistencia, tu cuerpo se adaptará y se volverá más fuerte. También es importante asegurarse de obtener suficientes nutrientes y descanso adecuado para permitir que tus músculos se recuperen y se fortalezcan.",
    },
    perdergrasa: {
      objetivo: "Perder Grasa",
      texto:
        "si tu objetivo es mejorar tu salud en general, deberás centrarte en una combinación de entrenamiento de fuerza y cardiovascular, además de adoptar un estilo de vida saludable en términos de nutrición y sueño. El ejercicio regular puede ayudar a reducir el riesgo de enfermedades crónicas como la diabetes y las enfermedades cardíacas, mientras que la nutrición adecuada y el sueño suficiente son esenciales para mantener el cuerpo en buen estado.",
    },
    salud: {
      objetivo: "Mejorar la Salud en General",
      texto:
        "además de los ejercicios cardiovasculares, los ejercicios de fuerza son cruciales para la pérdida de grasa. El entrenamiento de fuerza ayuda a mantener y aumentar la masa muscular, lo que aumenta el metabolismo y quema más calorías incluso en reposo. Además, el entrenamiento de fuerza puede mejorar la composición corporal, reduciendo la grasa corporal y aumentando la masa muscular. Para perder grasa de manera efectiva, se deben incorporar tanto ejercicios de fuerza como cardiovasculares en una rutina de entrenamiento equilibrada.",
    },
  };
  //Nivel de estado fisico.
  const nivelfisico = {
    principiante: {
      titulo: "Principiante",
      texto:
        "es fundamental que revises bien tu técnica al realizar los ejercicios. Ten en cuenta que al principio puede ser normal sentirte un poco incómodo o inseguro al ejecutar ciertos movimientos, por lo que es importante que te tomes el tiempo para aprender correctamente cómo hacerlos. Además, en este nivel se recomienda no modificar demasiado la rutina para centrarse en hacer los ejercicios de manera correcta y obtener los mejores resultados.",
    },
    intermedio: {
      titulo: "Intermedio",
      texto:
        "es probable que ya tengas cierta experiencia en el entrenamiento físico. En este nivel, es importante que continúes trabajando en tu técnica para evitar lesiones y mejorar tu rendimiento. Además, puedes comenzar a experimentar con la rutina y hacer pequeñas modificaciones para adaptarla a tus necesidades y objetivos específicos.",
    },
    avanzado: {
      titulo: "Avanzado",
      texto:
        "significa que tienes un alto nivel de experiencia en el entrenamiento físico. En este nivel, es importante que continúes trabajando en tu técnica y en la prevención de lesiones, pero también tienes la posibilidad de modificar la rutina para adaptarla mejor a tus objetivos específicos y a tu nivel de habilidad. Puedes agregar ejercicios más avanzados o cambiar la frecuencia o intensidad de los ejercicios para lograr los resultados que deseas.",
    },
    experimentado: {
      titulo: "Experimentado",
      texto:
        "significa que tienes una amplia experiencia en el entrenamiento físico. En este nivel, es importante que sigas trabajando en tu técnica y en la prevención de lesiones, pero también tienes la posibilidad de modificar la rutina para adaptarla mejor a tus objetivos específicos y a tu nivel de habilidad. Puedes agregar ejercicios más avanzados o cambiar la frecuencia o intensidad de los ejercicios para lograr los resultados que deseas.",
    },
  };
  //Enfoque
  const enfoqueT = {
    superior: {
      titulo: "Tronco Superior",
      texto:
        "Nuestra rutina se centrará en mejorar la fuerza y tono muscular en los músculos de la parte superior del cuerpo. Los ejercicios que se incluirán en la rutina se enfocarán en los músculos del pecho y de la espalda, y te ayudarán a mejorar tu postura y a tener una apariencia más atlética. ¡Prepárate para ver un cambio significativo en tus músculos de la parte superior del cuerpo",
    },
    brazos: {
      titulo: "Brazos",
      texto:
        "Nuestro sistema ha diseñado una rutina que se centrará en fortalecer y tonificar tus bíceps, tríceps y antebrazos. Los ejercicios incluirán movimientos de flexión y extensión de los brazos con pesas, bandas de resistencia y tu propio peso corporal. Con esta rutina, verás resultados notables en poco tiempo.",
    },
    pierna: {
      titulo: "Tronco Inferior",
      texto:
        "Nuestra rutina se centrará en fortalecer y tonificar tus piernas, glúteos y abdominales. Los ejercicios incluirán sentadillas, estocadas, elevaciones de pantorrillas y ejercicios de abdomen. Con esta rutina, mejorarás tu equilibrio, resistencia y fuerza en la parte inferior del cuerpo.",
    },
    completo: {
      titulo: "Cuerpo Completo",
      texto:
        "Nuestra rutina se centrará en trabajar todos los músculos de tu cuerpo para mejorar tu fuerza y resistencia en general. Los ejercicios que se incluirán en la rutina serán compuestos, lo que significa que involucrarán varios grupos musculares al mismo tiempo. Con esta rutina, verás una mejora en tu tono muscular en general y una mayor resistencia física para realizar actividades diarias. ¡Prepárate para sentirte más fuerte y saludable en poco tiempo!",
    },
  };

  useEffect(() => {
    //Para datos del usuario
    if (
      formulario.edad === 0 ||
      formulario.altura === 0 ||
      formulario.peso === 0 ||
      formulario === null
    ) {
      setsexo("No proporcionado");
      setinfousuario("No se proporcionó toda la información del usuario");
    } else {
      setsexo("Sexo:" + opciones[0]);
      setinfousuario(
        " Edad: " +
          formulario.edad +
          " años " +
          " Altura: " +
          formulario.altura +
          " cm" +
          " Peso: " +
          formulario.peso +
          " Kg"
      );
    }
    //Su objetivo
    const equivalencia = equivalencias[opciones[1]];
    setObjetivoUsuario(equivalencia.objetivo);
    setTextoDeObjetivo(equivalencia.texto);
    //Nivel Fisico
    const equivalencia2 = nivelfisico[opciones[2]];
    setnivelusuario(equivalencia2.titulo);
    settextoNivel(equivalencia2.texto);
    //Volumen de Rutina
    if (diasActivos > 4) {
      setnivelmolumen(
        "Tu rutina cumple con las condiciones de ser MAV (Volumen Máximo Adaptativo), significa que estás entrenando con una cantidad suficiente de trabajo para estimular el crecimiento muscular y mejorar tu fuerza, y además estás permitiendo a tu cuerpo suficiente tiempo de recuperación para adaptarse. Esto puede ser beneficioso si eres un atleta avanzado o si estás buscando aumentar tu tamaño y fuerza muscular. Al seguir una rutina MAV, estás permitiendo a tu cuerpo adaptarse al trabajo y al estrés del entrenamiento, lo que puede resultar en un mayor crecimiento muscular y fuerza. Recuerda que siempre debes trabajar dentro de tus límites y asegurarte de permitir suficiente tiempo de recuperación para evitar lesiones."
      );
      setmv("MAV");
    } else if (diasActivos <= 2) {
      setnivelmolumen(
        "Tu rutina cumple con las condiciones de ser MV (Volumen de Mantenimiento), significa que estás entrenando con la cantidad mínima de trabajo necesario para mantener tu nivel actual de fuerza y músculo. Incluso si eres principiante o no has hecho ejercicio por mucho tiempo, seguir una rutina de MV puede ser beneficioso para estimular el crecimiento de tus músculos y mejorar tu fuerza. Al entrenar con un volumen adecuado, estás proporcionando suficiente estímulo para que tus músculos se adapten y crezcan, pero también estás permitiendo suficiente tiempo de recuperación para evitar el sobreentrenamiento y lesiones. Recuerda que aunque estés en una rutina de MV, es importante seguir prestando atención a la calidad de tus entrenamientos y asegurarte de seguir progresando en tus objetivos personales."
      );
      setmv("MV");
    } else {
      setnivelmolumen(
        "Tu rutina cumple con las condiciones de ser MEV (Volumen Mínimo Efectivo), significa que estás entrenando con la cantidad mínima de trabajo necesario para estimular el crecimiento muscular y mejorar tu fuerza. Esto puede ser beneficioso si eres principiante o si estás buscando mantener tu nivel actual de fuerza y músculo. Al seguir una rutina MEV, puedes evitar el sobreentrenamiento y asegurarte de que estás permitiendo suficiente tiempo de recuperación para tu cuerpo."
      );
      setmv("MEV");
    }

    //Calcular Frecuencia
    const frecuencia = (diasActivos * 2) / 6;
    if (frecuencia > 2) setnivelfrecuencia(2);
    else setnivelfrecuencia(frecuencia.toFixed(2));

    //Enfoque
    const enfoc = enfoqueT[opciones[4]];
    setenfoquetitulo(enfoc.titulo);
    setenfoquetexto(enfoc.texto);
  }, [formulario]);

  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- Texto para complementar el sistema ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- Carga de Ejercicios ---------------->

  const nombreMap = {
    Ninguno: "Ninguno",
    Bandaresistencia: "Banda de resistencia",
    Bandasuspension: "Banda de suspension",
    Barra: "Barra",
    BarraZ: "Barra Z",
    Barras: "Barras (dominadas, paralelas)",
    Mancuernas: "Mancuernas",
    PesaRusa: "Pesa rusa",
    PlacaPeso: "Placa de peso",
    MaquinasGYM: "Maquinas en GYM",
    BancoPlano: "Banco plano",
    BancoDeclinado: "Banco declinado",
    BancoInclinado: "Banco inclinado",
    Cuerda: "Cuerda",
    " BancoInclinado": "Banco inclinado",
  };
  //Asignar las que estan disponibles
  const herramientasActivas = [];
  for (const herramienta in herramientas) {
    if (herramientas[herramienta]) {
      herramientasActivas.push(nombreMap[herramienta]);
    }
  }

  //
  //
  //Funcion para cargar los ejercicios....
  //
  //
  async function cargar_ejercicios() {
    let query = supabase
      .from("ejercicios")
      .select("id,similar, nombre, musculo_primario,equipo, img");

    query = query.containedBy("equipo", herramientasActivas);
    query = query.order("puntuacion", { ascending: false });

    const data = await query;

    ////console.log(data.data)
    setData(data.data);
  }

  //contenidos de puede llegar a contener cada dia
  let contenido1 = []; //lUNES
  let contenido2 = []; //MARTES
  let contenido3 = []; //MIERCOLES
  let contenido4 = []; //JUEVES
  let contenido5 = []; //VIERNES
  let contenido6 = []; //SABADO
  let contenido7 = []; //DOMINGO

  //INICIO DEL SE
  const objetivo = opciones[1];
  const tiempo = opciones[3];
  //Definir Rutina
  const opcionesEjercicio = {
    masamuscular: {
      "30min": { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      "1hr": { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      "1hr 30": { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      "2hr": { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    perdergrasa: {
      "30min": { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      "1hr": { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      "1hr 30": { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      "2hr": { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    salud: {
      "30min": { seriesG: 3, repeticionesG: 8, descanso: "1min" },
      "1hr": { seriesG: 3, repeticionesG: 8, descanso: "1min 30sec" },
      "1hr 30": { seriesG: 3, repeticionesG: 10, descanso: "2min" },
      "2hr": { seriesG: 3, repeticionesG: 12, descanso: "2min" },
    },
    resistencia: {
      "30min": { seriesG: 3, repeticionesG: 12, descanso: "30sec" },
      "1hr": { seriesG: 3, repeticionesG: 16, descanso: "30sec" },
      "1hr 30": { seriesG: 3, repeticionesG: 16, descanso: "75sec" },
      "2hr": { seriesG: 3, repeticionesG: 20, descanso: "75sec" },
    },
    fuerza: {
      "30min": { seriesG: 3, repeticionesG: 5, descanso: "2 min" },
      "1hr": { seriesG: 3, repeticionesG: 5, descanso: "3 min" },
      "1hr 30": { seriesG: 3, repeticionesG: 5, descanso: "3 min" },
      "2hr": { seriesG: 5, repeticionesG: 5, descanso: "Mas de 3 min" },
    },
  };

  if (!opcionesEjercicio[objetivo] || !opcionesEjercicio[objetivo][tiempo]) {
    //console.log("Error en el objetivo o tiempo seleccionado.");
    //return;
  }
  //Aqui se asignan los valores de repeticion, series y descanso.
  const { seriesG, repeticionesG, descanso } =
    opcionesEjercicio[objetivo][tiempo];

  let serie = 0,
    temp = 0;

  //
  //
  //
  //Cambios de la nueva pregunta del SE DIAS
  //
  //
  //

  var dosdecuatro = 0;
  //____________________________________________pregunta de tiempo
  if (opciones[3] === "30min" || opciones[3] === "1hr") {
    temp = 2;
    dosdecuatro = 0;
  } else if (opciones[3] === "1hr 30") {
    temp = 2;
    dosdecuatro = 1;
  } else if (opciones[3] === "2hr") {
    temp = 3;
    dosdecuatro = 0;
  } else {
    ////console.log("Error en el SE P:TIEMPO");
  }
  var card = 0;
  if (opciones[1] === "perdergrasa" || opciones[1] === "salud") {
    card = 1;
  } else {
    card = 0;
  }
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- -- Plantillas del Sistema Experto  ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  function casoSuperiorYC(diasActivos) {
    if (diasActivos === 3) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 4) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp - 1,
          Dorsales: temp - 1,
          Biceps: temp - 1,
          Triceps: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp - 1,
          Dorsales: temp - 1,
          Biceps: temp - 1,
          Triceps: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 5) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp - 1,
          Dorsales: temp - 1,
          Biceps: temp - 1,
          Triceps: temp - 1,
          Cardio: card,
        };
        variables5 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp - 1,
          Dorsales: temp - 1,
          Biceps: temp - 1,
          Triceps: temp - 1,
          Cardio: card,
        };
        variables5 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 6 || diasActivos === 7) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables5 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Cardio: card,
        };
        variables6 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        variables1 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables2 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables5 = {
          Dorsales: temp,
          Trapecio: temp - 2,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables6 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      }
    }
  }

  function casoBrazos(diasActivos) {
    if (diasActivos === 3) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables1 = { Pecho: temp, Dorsales: temp, Cardio: card };
        else variables1 = { Pecho: temp, Dorsales: temp, Cardio: card };

        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables1 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
        else
          variables1 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };

        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 4) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables2 = { Pecho: temp, Dorsales: temp, Cardio: card };
        else variables2 = { Pecho: temp, Dorsales: temp, Cardio: card };

        variables1 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables2 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
        else
          variables2 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };

        variables1 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Triceps: temp,
          Hombros: temp - 1,
          Biceps: temp,
          Cardio: card,
        };
      }
    } else if (diasActivos === 5) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables3 = { Pecho: temp, Dorsales: temp, Cardio: card };
        else variables3 = { Pecho: temp, Dorsales: temp, Cardio: card };

        variables1 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables2 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Triceps: temp,
          Hombros: temp - 1,
          Biceps: temp,
          Cardio: card,
        };
        variables5 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        if (opciones[3] === "30min" || opciones[3] === "1hr")
          variables3 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
        else
          variables3 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };

        variables1 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables2 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Triceps: temp,
          Hombros: temp - 1,
          Biceps: temp,
          Cardio: card,
        };
        variables5 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 6 || diasActivos === 7) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        if (opciones[3] === "30min" || opciones[3] === "1hr") {
          variables1 = { Pecho: temp, Dorsales: temp, Cardio: card };
          variables4 = { Pecho: temp, Dorsales: temp, Cardio: card };
        } else {
          variables1 = { Pecho: temp, Dorsales: temp, Cardio: card };
          variables4 = { Pecho: temp, Dorsales: temp, Cardio: card };
        }
        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Cardio: card,
        };
        variables5 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables6 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        if (opciones[3] === "30min" || opciones[3] === "1hr") {
          variables1 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
          variables4 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
        } else {
          variables1 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
          variables4 = {
            Pecho: temp,
            Dorsales: temp,
            Antebrazos: temp - 1,
            Cardio: card,
          };
        }
        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Biceps: temp,
          Cardio: card,
        };
        variables3 = {
          Cuadriceps: temp,
          Isquiotibiales: temp - 1,
          Gluteos: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables5 = {
          Triceps: temp,
          Hombros: temp - 1,
          Biceps: temp,
          Cardio: card,
        };
        variables6 = {
          Isquiotibiales: temp,
          Cuadriceps: temp - 1,
          Gluteos: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      }
    }
  }

  function casoPierna(diasActivos) {
    if (diasActivos === 3) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Cardio: card,
        };
        variables2 = { Hombros: temp - 1, Triceps: temp, Cardio: card };
        variables3 = { Dorsales: temp, Biceps: temp - 1, Cardio: card };
      } else {
        //Plantilla 2
        variables1 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Pecho: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Dorsales: temp,
          Biceps: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 4) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = { Cuadriceps: temp, Gluteos: temp, Cardio: card };
        variables2 = { Hombros: temp - 1, Triceps: temp, Cardio: card };
        variables3 = { Isquiotibiales: temp, Gluteos: temp, Cardio: card };
        variables4 = { Dorsales: temp, Biceps: temp - 1, Cardio: card };
      } else {
        //Plantilla 2
        variables1 = {
          Cuadriceps: temp,
          Gluteos: temp,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Pecho: temp - 1,
          Cardio: card,
        };
        variables3 = {
          Isquiotibiales: temp,
          Gluteos: temp,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Dorsales: temp,
          Biceps: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
      }
    } else if (diasActivos === 5) {
      //Plantilla 1
      variables1 = {
        Cuadriceps: temp,
        Gluteos: temp,
        Pantorrillas: temp - 1,
        Cardio: card,
      };
      variables2 = {
        Hombros: temp - 1,
        Triceps: temp,
        Pecho: temp - 1,
        Cardio: card,
      };
      variables3 = {
        Isquiotibiales: temp,
        Gluteos: temp,
        Pantorrillas: temp - 1,
        Cardio: card,
      };
      variables4 = {
        Dorsales: temp,
        Biceps: temp - 1,
        Abdomen: temp - 1,
        Cardio: card,
      };
      variables5 = {
        Cuadriceps: temp,
        Isquiotibiales: temp,
        Pantorrillas: temp - 1,
        Cardio: card,
      };
    } else if (diasActivos === 6 || diasActivos === 7) {
      if (opciones[2] === "principiante" || opciones[2] === "intermedio") {
        //Plantilla 1
        variables1 = { Cuadriceps: temp, Gluteos: temp, Cardio: card };
        variables2 = {
          Hombros: temp - 1,
          Triceps: temp,
          Pecho: temp - 1,
          Cardio: card,
        };
        variables3 = { Isquiotibiales: temp, Gluteos: temp, Cardio: card };
        variables4 = { Dorsales: temp, Biceps: temp - 1, Cardio: card };
        variables5 = { Cuadriceps: temp, Isquiotibiales: temp, Cardio: card };
        variables6 = {
          Abdomen: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      } else {
        //Plantilla 2
        variables2 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables3 = {
          Dorsales: temp,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables1 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Abdomen: temp - 1,
          Cardio: card,
        };
        variables5 = {
          Pecho: temp,
          Hombros: temp - 1,
          Triceps: temp,
          Cardio: card,
        };
        variables6 = {
          Dorsales: temp - 1,
          Biceps: temp,
          Antebrazos: temp - 1,
          Cardio: card,
        };
        variables4 = {
          Cuadriceps: temp,
          Gluteos: temp - 1,
          Isquiotibiales: temp - 1,
          Pantorrillas: temp - 1,
          Cardio: card,
        };
      }
    }
  }
  function dosdias(diasActivos) {
    variables2 = {
      Cuadriceps: temp,
      Gluteos: temp - 1,
      Isquiotibiales: temp - 1,
      Cardio: card,
    };
    variables1 = {
      Pecho: temp - 1,
      Dorsales: temp - 1,
      Biceps: temp - 1,
      Triceps: temp - 1,
      Cardio: card,
    };
  }

  function undia(diasActivos) {
    variables1 = {
      Pecho: temp - 1,
      Dorsales: temp - 1,
      Biceps: temp - 1,
      Triceps: temp - 1,
      Cuadriceps: temp - 1,
      Isquiotibiales: temp - 1,
      Cardio: card,
    };
  }
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- -- Plantillas del Sistema Experto  ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->

  //let Pecho,espalda,Hombros,bicep,tricep,dorsales,Abdomen,Antebrazos,cuadricep,gluteo,Isquiotibiales,Pantorrillas;

  //Asignacion de los dias de la semana
  const diasArray = [
    { dia: "Lunes", array: contenido1 },
    { dia: "Martes", array: contenido2 },
    { dia: "Miercoles", array: contenido3 },
    { dia: "Jueves", array: contenido4 },
    { dia: "Viernes", array: contenido5 },
    { dia: "Sabado", array: contenido6 },
    { dia: "Domingo", array: contenido7 },
  ];

  //pregunta de enfoque.
  if (opciones[4] === "superior" && diasActivos > 2) {
    casoSuperiorYC(diasActivos);
  } else if (opciones[4] === "brazos" && diasActivos > 2) {
    casoBrazos(diasActivos);
  } else if (opciones[4] === "pierna" && diasActivos > 2) {
    casoPierna(diasActivos);
  } else if (opciones[4] === "completo" && diasActivos > 2) {
    casoSuperiorYC(diasActivos);
  } else if (diasActivos === 2) {
    dosdias(diasActivos);
  } else if (diasActivos === 1) {
    undia(diasActivos);
  } else {
    ////console.log("Error en el SE P:ENFOQUE");
  }

  // <-------------- ---------------------------------- ---------------->
  // <-------------- -- Llenado del Sistema Experto  ------------------->
  // <-------------- ---------------------------------- ---------------->

  llenarArreglo(diasActivos);

  //Funcion
  function llenarArreglo(diasSemana) {
    let count = 1;
    for (const { dia, array } of diasArray) {
      if (dias[dia] === true && count <= diasSemana) {
        array.length = 0;
        Object.entries(eval(`variables${count}`)).forEach(
          ([name, cantidad]) => {
            for (let i = 0; i < cantidad; i++) {
              if (
                name === "Hombros" ||
                name === "Antebrazos" ||
                name === "Pantorrillas"
              ) {
                array.push({
                  nombreE: name,
                  etiqueta: name,
                  series: 4 + dosdecuatro,
                  repeticiones: repeticionesG,
                  imgR: imgSrc,
                  id: null,
                });
              } else if (name === "Cardio") {
                array.push({
                  nombreE: name,
                  etiqueta: name,
                  series: 1,
                  repeticiones: 1,
                  imgR: imgSrc,
                  id: null,
                });
              } else {
                array.push({
                  nombreE: name,
                  etiqueta: name,
                  series: seriesG + dosdecuatro,
                  repeticiones: repeticionesG,
                  imgR: imgSrc,
                  id: null,
                });
              }
            }
          }
        );
        count++;
      }
    }
  }
  // <-------------- ---------------------------------- ---------------->
  // <-------------- -- Llenado del Sistema Experto  ------------------->
  // <-------------- ---------------------------------- ---------------->
  /*////////////////////////////////////////////////
  /
  Cambiar por ejercicios
  /
  //////////////////////////////////////////////////*/

  function cambiar_ejercicios() {
    // Variable para almacenar los ejercicios ya asignados
    let asignados = [];
    let similares = [];
    // Recorrer el arreglo "arrays"
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
        let obj = arrays[i][j];
        if (obj.etiqueta) {
          let ejercicio = data.find(
            (ej) =>
              ej.musculo_primario === obj.etiqueta &&
              !asignados.includes(ej.id) &&
              !similares.includes(ej.similar)
          );
          if (ejercicio && ejercicio.nombre !== obj.nombreE) {
            obj.nombreE = ejercicio.nombre;
            obj.imgR = ejercicio.img;
            obj.id = ejercicio.id;
            asignados.push(ejercicio.id);
            if (ejercicio.similar !== null) similares.push(ejercicio.similar);
          }
        }
      }
      if (diasActivos === 5 || diasActivos === 4) {
        similares = [];
      }
    }
    if (
      diasActivos >= 6 &&
      (opciones[4] === "superior" || opciones[4] === "brazos")
    ) {
      //Que arreglos son iguales
      const resultados = [];

      for (let i = 0; i < arrays.length - 1; i++) {
        for (let j = i + 1; j < arrays.length; j++) {
          if (
            arrays[i].length === arrays[j].length &&
            arrays[i][0].etiqueta === arrays[j][0].etiqueta
          ) {
            resultados.push([i, j]);
          }
        }
      }

      for (let i = 0; i < resultados.length; i++) {
        // Obtenemos los índices de los arreglos que se parecen
        const idx1 = resultados[i][0];
        const idx2 = resultados[i][1];

        // Copiamos el contenido del primer arreglo en el segundo arreglo
        arrays[idx2] = JSON.parse(JSON.stringify(arrays[idx1]));
      }
      //console.log(arrays);
      setArrays([...arrays]);
    } else {
      //console.log(arrays);
      setArrays([...arrays]);
    }
    setLoading(false);
  }

  //
  //Cuando se preciona un boton
  //

  function mostrarPosicion(arrayIndex, index) {
    let obj2 = arrays[arrayIndex][index];
    ////console.log(obj2.nombreE)
    if (
      ![
        "Abdomen",
        "Oblicuos",
        "Antebrazos",
        "Biceps",
        "Triceps",
        "Hombros",
        "Trapecio",
        "Trapecio Medio",
        "Pecho",
        "Cuadriceps",
        "Pantorrillas",
        "Isquiotibiales",
        "Dorsales",
        "Gluteos",
        "Espalda Baja",
        "Cardio",
      ].includes(obj2.nombreE)
    ) {
      // Hacer x cosa

      let ubicacion = data.findIndex((ejercicio) => {
        return ejercicio.nombre === obj2.nombreE;
      });

      const ejerciciosFiltrados = data.filter((ejercicio, i) => {
        return ejercicio.musculo_primario === data[ubicacion].musculo_primario;
      });

      let y = ejerciciosFiltrados.length;
      let x = ejerciciosFiltrados.findIndex((ejercicio2) => {
        return ejercicio2.nombre === obj2.nombreE;
      });

      if (x < y) {
        let siguienteEjercicio = 0;
        if (x + 1 < y) {
          siguienteEjercicio = ejerciciosFiltrados[x + 1];
        } else {
          siguienteEjercicio = ejerciciosFiltrados[0];
        }

        obj2.nombreE = siguienteEjercicio.nombre;
        obj2.imgR = siguienteEjercicio.img;
        obj2.id = siguienteEjercicio.id;
        setArrays([...arrays]);
      } else {
        //console.log("No hace Nada");
      }
    } else {
      alert("No hay Ejercicios Para Asignar");
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
    if (typeof localStorage !== "undefined") {
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("rutina", JSON.stringify(arrays));
        localStorage.setItem("bandera", "true");
      });
    }
  }, [arrays]);

  //UseEffect para obtener la rutina si el usuario recarga la página
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (arrays.every((posicion) => posicion.length === 0)) {
        const storedCount = localStorage.getItem("rutina");
        if (storedCount) {
          setArrays(JSON.parse(storedCount));
        }
      }
    }
  }, []);

  const longestArray = arrays.reduce((a, b) => (a.length > b.length ? a : b));
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ----- Agregar los Ejercicios  ---- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  async function datos_usuario() {
    const { error } = await supabase
      .from("perfiles")
      .update({
        edad: formulario.edad,
        estatura: formulario.altura,
        peso: formulario.peso,
        sexo: opciones[0],
      })
      .eq("id", sesion.user.id);

    if (error) {
      //console.log("ERROR: No se pudo actualizar el perfil.");
      //console.log(error);
    } else {
      //console.log("Perfil actualizado.");
    }
  }
  async function handleClick() {
    //cambiar sexo estatura y peso
    datos_usuario();
    setLoading(true);
    setLoadingtexto("Guardando tu rutina...");
    window.scrollTo(0, 0);
    const dias = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i].length !== 0) {
        const dia = dias[i];
        const nombreRutina = `RUTINA SE: ${dia}`;
        const { data, error } = await supabase
          .from("rutinas")
          .insert({
            usuario: sesion.user.id,
            nombre: nombreRutina,
            esSE: true,
            nombre: nombreRutina,
          })
          .select("id");

        if (error) {
          //console.log(error);
          //console.log(`ERROR: Hubo un error al crear ${nombreRutina}.`);
        } else {
          const idNumero = data[0].id;

          //Se agregan los ejercicios
          for (let j = 0; j < arrays[i].length; j++) {
            if (
              ![
                "Abdomen",
                "Oblicuos",
                "Antebrazos",
                "Biceps",
                "Triceps",
                "Hombros",
                "Trapecio",
                "Trapecio Medio",
                "Pecho",
                "Cuadriceps",
                "Pantorrillas",
                "Isquiotibiales",
                "Dorsales",
                "Gluteos",
                "Espalda Baja",
                "Cardio",
              ].includes(arrays[i][j].nombreE)
            ) {
              rutinaEjercicios(idNumero, i, j);
            } else {
              ////console.log("Encontró un Ejercicio que no tiene asignado nada")
            }
            //----------------------------------------------------------------------------------------
          }
        }
      }
    }
    localStorage.setItem("bandera3", "false");
    localStorage.setItem("bandera2", "true");
    router.push("/rutinas");
  }

  const rutinaEjercicios = async (idNumero, i, j) => {
    //----------------------------------------------------------------------------------------
    ////console.log("Ejercicios")
    ////console.log(arrays[i][j].nombreE)
    ////console.log(arrays[i][j].id)
    const tiempoMap = {
      "1min": 60,
      "1min 30sec": 90,
      "2min": 120,
      "30sec": 30,
      "75sec": 75,
      "2 min": 120,
      "3 min": 180,
      "Mas de 3 min": 240,
    };
    const tiempoEnSegundos = tiempoMap[descanso];

    const { data, error } = await supabase
      .from("rutinas_ejercicio")
      .insert({
        rutina: idNumero,
        ejercicio: arrays[i][j].id,
        orden: j,
        descanso: tiempoEnSegundos,
      })
      .select();

    if (error) {
      //console.log(error);
      //console.log("ERROR: Hubo un error al agregar un nuevo ejercicio.");
    } else {
      ////console.log("Se agregó un nuevo ejercicio.")
      ////console.log(data[0])
      const iddelEjercicio = data[0].id;

      for (let k = 0; k < arrays[i][j].series; k++) {
        const { error } = await supabase.from("rutinas_ejercicio_sets").insert({
          ejercicio_rutina: iddelEjercicio,
          reps: arrays[i][j].repeticiones,
        });

        if (error) {
          //console.log(error);
          //console.log("ERROR: Hubo un error al agregar un nuevo set.");
        } else {
          ////console.log("Se agregó un nuevo set.")
        }
      }
    }
  };
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ----- Agregar los Ejercicios  ---- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->
  // <-------------- ---------------------------------- ---------------->

  //Use effect para detectar si el usuario sale de rutinaSE
  useEffect(() => {
    const handlePopstate = () => {
      localStorage.setItem("bandera", "false");
      window.removeEventListener("popstate", handlePopstate);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  //Use Effect para cargar y asignar los ejercicios
  useEffect(() => {
    if (data.every((posicion) => posicion.length === 0)) {
      cargar_ejercicios();
    } else {
      if (localStorage.getItem("bandera") !== "true") {
        cambiar_ejercicios();
      } else {
        ////console.log("Si llega")
        setLoading(false);
      }
    }
    ////console.log(localStorage.getItem('bandera'));
  }, [data]);

  ////console.log(infousuario)
  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Sistema Experto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {loadfinal ? (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            className="loader"
            style={{ marginTop: "10%", marginBottom: "50px" }}
          ></div>
          <p
            style={{
              marginTop: "50px",
              marginBottom: "40%",
              textAlign: "center",
            }}
          >
            {loadingtexto}
          </p>
        </div>
      ) : (
        <main className="mx-auto max-w-screen-2xl">
          <br />
          <br />
          <br />
          <br />
          <br />
          <div style={{ float: "left", marginLeft: "40px" }}>
            <p className="resp-text-se text-lg sm:text-xl font-light text-black">
              Rutina personalizada para{" "}
              <span className="resp-text-se2 text-xl sm:text-2xl font-medium text-blue-600">
                {usuario.nombre}
              </span>
            </p>
            <p className="resp-text-se text-lg sm:text-xl font-light text-black">
              Con estos datos: {infousuario}.
            </p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="flex justify-center p-8 table-container">
            <table className="text-sm text-left rounded-md shadow-md border-blue-600 text-gray-500 chorizo">
              <thead className="text-xs text-gray-700 ">
                <tr className="bg-blue-300">
                  <th className="px-6 py-3 text-center font-heebo">Lunes</th>
                  <th className="px-6 py-3 text-center font-heebo">Martes</th>
                  <th className="px-6 py-3 text-center font-heebo">
                    Miércoles
                  </th>
                  <th className="px-6 py-3 text-center font-heebo">Jueves</th>
                  <th className="px-6 py-3 text-center font-heebo">Viernes</th>
                  <th className="px-6 py-3 text-center font-heebo">Sábado</th>
                  <th className="px-6 py-3 text-center font-heebo">Domingo</th>
                </tr>
              </thead>

              <tbody>
                {longestArray.map((_, index) => (
                  <tr key={`${arrays[index]}-${index}`} className="bg-white">
                    {arrays.map((array, arrayIndex) => (
                      <td
                        key={shortid.generate()}
                        className="p-4 border-r border-b"
                      >
                        {index < array.length ? (
                          <div className="flex w-32 flex-col">
                            <p className="text-zinc-800 font-medium font-heebo sizeNombreE">
                              {array[index].nombreE}
                            </p>

                            <p className="text-blue-600 font-medium font-heebo">
                              {array[index].etiqueta}
                            </p>
                            <div className="flex w-full gap-4 my-4">
                              <img
                                src={array[index].imgR}
                                key={array[index]}
                                className="rounded-full border-2 border-blue-600"
                                style={{ width: "60px", height: "60px" }}
                              />
                              <div className="w-fit flex justify-center items-center">
                                <button
                                  type="button"
                                  className="text-white p-1 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-0.3 text-center inline-flex items-center"
                                  onClick={() =>
                                    mostrarPosicion(arrayIndex, index)
                                  }
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="w-7 h-7"
                                    fill="currentColor"
                                    viewBox="0 0 58 50"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="Layer_1" data-name="Layer 1">
                                      <g>
                                        <g>
                                          <rect
                                            className="cls-1"
                                            x="35.08"
                                            y="25.22"
                                            width="6.92"
                                            height="10.89"
                                            rx="1.85"
                                            ry="1.85"
                                            transform="translate(54.07 77.4) rotate(-146.89)"
                                          />
                                          <rect
                                            className="cls-1"
                                            x="16.96"
                                            y="13.4"
                                            width="6.92"
                                            height="10.89"
                                            rx="1.85"
                                            ry="1.85"
                                            transform="translate(27.23 45.79) rotate(-146.89)"
                                          />
                                          <path
                                            className="cls-1"
                                            d="m39.72,35.68c.46.02,1.5.17,1.77-.24l2.62-4.01c.27-.42-.29-1.3-.49-1.72l-3.89,5.97Z"
                                          />
                                          <polyline
                                            className="cls-1"
                                            points="24.51 19.78 22.36 18.38 20.78 20.81 23.35 22.48 33.68 29.21"
                                          />
                                          <polyline
                                            className="cls-1"
                                            points="33.68 29.21 33.67 29.22 36.48 31.04 38.06 28.62 24.51 19.78"
                                          />
                                          <path
                                            className="cls-1"
                                            d="m19.29,13.76c-.52-.09-1.63-.24-1.93.23l-2.62,4.01c-.3.47.28,1.42.57,1.86l3.98-6.1Z"
                                          />
                                        </g>
                                        <path
                                          className="cls-1"
                                          d="m27.55,0C15.51.51,5.7,9.59,4.09,21.32l-3.24-1.4c-.53-.23-1.05.35-.76.85l4.91,8.51c.23.4.81.4,1.04,0l4.91-8.51c.29-.5-.23-1.08-.76-.85l-3.14,1.36c.27-1.74.73-3.44,1.42-5.07,1.1-2.6,2.68-4.94,4.69-6.95,2.01-2.01,4.35-3.59,6.95-4.69,2.37-1,4.87-1.54,7.45-1.66V0Z"
                                        />
                                        <path
                                          className="cls-1"
                                          d="m58.72,29.17l-4.91-8.51c-.23-.4-.81-.4-1.04,0l-4.91,8.51c-.29.5.23,1.08.76.85l3.14-1.36c-.27,1.74-.73,3.44-1.42,5.07-1.1,2.6-2.68,4.94-4.69,6.95-2.01,2.01-4.35,3.59-6.95,4.69-2.69,1.14-5.56,1.72-8.51,1.72-.29,0-.56-.03-.85-.04v2.92c.28,0,.56.02.85.02,12.52,0,22.87-9.3,24.53-21.36l3.24,1.4c.53.23,1.05-.35.76-.85Z"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="7.5"
                                          cy="34.64"
                                          r="2"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="13.77"
                                          cy="42.84"
                                          r="2"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="22.38"
                                          cy="47.61"
                                          r="2"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="51.62"
                                          cy="15.03"
                                          r="2"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="45.34"
                                          cy="6.83"
                                          r="2"
                                        />
                                        <circle
                                          className="cls-1"
                                          cx="36.74"
                                          cy="2.07"
                                          r="2"
                                        />
                                      </g>
                                    </g>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-zinc-800 font-medium font-heebo">
                              {array[index].series}x{array[index].repeticiones}{" "}
                            </p>
                            <div>
                              <p className="text-zinc-800 font-medium font-heebo">
                                Descanso:{" "}
                                <span className="text-blue-600">
                                  {" "}
                                  {descanso}
                                </span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}{" "}
                        <br />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
            <br></br>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
              <div className="border hover:scale-105 mb-6 duration-100 w-12/12 rounded-md shadow-md bg-white p-5 md:p-3">
                <h1 className="font-heebo font-semibold text-blue-600 text-sm md:text-base">
                  Tu objetivo es: {objetivoUsuario}
                </h1>
                <h1 className="font-heebo text-black text-justify text-sm md:text-base">
                  Entonces {textoDeObjetivo}
                </h1>
              </div>
              <div className="border hover:scale-105 mb-6 duration-100 w-12/12 rounded-md shadow-md bg-white p-5 md:p-3">
                <h1 className="font-heebo font-semibold text-blue-600 text-sm md:text-base">
                  Eres {nivelusuario}:
                </h1>
                <h1 className="font-heebo text-black text-justify text-sm md:text-base">
                  Primero {textoNivel}
                </h1>
              </div>
              <div className="border hover:scale-105 mb-6 duration-100 w-12/12 rounded-md shadow-md bg-white p-5 md:p-3">
                <h1 className="font-heebo text-black text-justify text-sm md:text-base">
                  {nivelvolumen}{" "}
                </h1>
                <h1 className="font-heebo font-semibold text-blue-600 text-sm md:text-base">
                  Frecuencia: {nivelfrecuencia} por semana
                </h1>
              </div>
              <div className="border hover:scale-105 mb-6 duration-100 w-12/12 rounded-md shadow-md bg-white p-5 md:p-3">
                <h1 className="font-heebo font-semibold text-blue-600 text-sm md:text-base">
                  Seleccionaste un enfoque en {enfoquetitulo}:
                </h1>
                <h1 className="font-heebo text-black text-justify text-sm md:text-base">
                  {enfoquetexti}
                </h1>
              </div>
            </div>
          </div>

          <br />
          <div className="flex justify-center">
            <button onClick={handleClick} className="bottonSig-2 ">
              Guardar Rutina
            </button>
          </div>
          <br />
          <br />
          <br />
        </main>
      )}

      <Footer></Footer>
    </div>
  );
}
