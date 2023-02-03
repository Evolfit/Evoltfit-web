import React, { useState, useEffect } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Seccion1 from "./SistemaE/Seccion1";
import Seccion2 from "./SistemaE/Seccion2";
import Seccion3 from "./SistemaE/Seccion3";
import Seccion4 from "./SistemaE/Seccion4";
import Seccion5 from "./SistemaE/Seccion5";
import Seccion6 from "./SistemaE/Seccion6";
import Seccion41 from "./SistemaE/Seccion41";
import Seccion51 from "./SistemaE/Seccion51";
import Inicio from "./SistemaE/Inicio";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState(-1);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({ edad: 0, altura: 0, peso: 0 });
  const [checkboxes, setCheckboxes] = useState({
    Ninguno: false,
    Bandaresistencia: false,
    Bandasuspension: false,
    Barra: false,
    BarraZ: false,
    Barras: false,
    Mancuernas: false,
    PesaRusa: false,
    PlacaPeso: false,
    MaquinasGYM: false,
    BancoPlano: false,
    BancoDeclinado: false,
    BancoInclinado: false,
    Cuerda: false,
  });
  const [checkboxes2, setCheckboxes2] = useState({
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false,
    Sabado: false,
    Domingo: false,
  });
  const [arreglo, setArreglo] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showFinalizar, setFinalizar] = useState(false);
  const [showFinalizar2, setFinalizar2] = useState(false);
  const [inicioB, setinicioB] = useState(false);
  let algunoEsVerdadero = false;
  let element;
  let element2;

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  //Funcion para cambiar entre componentes a su vez agrega el contenido del objeto a un arreglo
  //y pone el boton sin funcion para que el usuario tenga que ingresar los datos
  function handleNext() {
    if(value===-1){
      setinicioB(true);
    }
    if (value < 5 && value >= 0) {
      const { value: valor } = formData;
      setArreglo([...arreglo, valor]);
    }
    if (value === 6) {
      setFinalizar(true);
    }
    setValue(value + 1);
    setShowButton(false);
  }
  //Funcion para retroceder entre componentes 
  function handlePrevious() {
    if (value === 6) {
      setCheckboxes2({
        Lunes: false,
        Martes: false,
        Miercoles: false,
        Jueves: false,
        Viernes: false,
        Sabado: false,
        Domingo: false,
      });

    }
    if (value > 0 && value <= 5) {

      setValue(value - 1);
      arreglo.pop();
      setArreglo(arreglo);

      if (arreglo[2] === "principiante") {
        setValue(3);
        arreglo.pop();
        setArreglo(arreglo);
      }
      setCheckboxes2({
        Lunes: false,
        Martes: false,
        Miercoles: false,
        Jueves: false,
        Viernes: false,
        Sabado: false,
        Domingo: false,
      });


    } else {
      if (value > 0) {
        setValue(value - 1);
        setFinalizar(false);
        setFinalizar2(false);
        setShowButton(false);
        setCheckboxes({
          Ninguno: false,
          Bandaresistencia: false,
          Bandasuspension: false,
          Barra: false,
          BarraZ: false,
          Barras: false,
          Mancuernas: false,
          PesaRusa: false,
          PlacaPeso: false,
          MaquinasGYM: false,
          BancoPlano: false,
          BancoDeclinado: false,
          BancoInclinado: false,
          Cuerda: false,
        });

      }

    }
  }
  //funcion que recibe solo un valor por componente
  const handleChange = (value) => {
    setFormData({ ...formData, value });
    setShowButton(true);
  };
  //funcion para enficar y recibir datos del formulario
  function handleFormSubmit(formValues) {
    if (
      formValues.edad === 0 &&
      formValues.altura === 0 &&
      formValues.peso === 0
    ) {
      setValue(value + 1);
      //console.log(formValues);
      setFinalizar(true);
      setFormData2(formValues);
    } else {
      //console.log(formValues);
      setFormData2(formValues);
      setShowButton(true);
    }
  }
  //Funcion para los dias
  const handleCheckboxChange2 = (event) => {
    const { name, checked } = event.target;

    setCheckboxes2({
      ...checkboxes2,
      [name]: checked,
    });

  };
  //Funcion para las herramientas
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "Ninguno") {
      setCheckboxes({
        Ninguno: checked,
        Bandaresistencia: false,
        Bandasuspension: false,
        Barra: false,
        BarraZ: false,
        Barras: false,
        Mancuernas: false,
        PesaRusa: false,
        PlacaPeso: false,
        MaquinasGYM: false,
        BancoPlano: false,
        BancoDeclinado: false,
        BancoInclinado: false,
        Cuerda: false,
      });
    } else if (name === "Todos") {
      setCheckboxes({
        Ninguno: false,
        Bandaresistencia: true,
        Bandasuspension: true,
        Barra: true,
        BarraZ: true,
        Barras: true,
        Mancuernas: true,
        PesaRusa: true,
        PlacaPeso: true,
        MaquinasGYM: true,
        BancoPlano: true,
        BancoDeclinado: true,
        BancoInclinado: true,
        Cuerda: true,
      });
    } else {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        Ninguno: false,
      });
    }
  };
  //cambiar de componentes
  if (value === -1) {
    element = <Inicio />;
  } else if (value === 0) {
    element = <Seccion1 onChange={handleChange} />;
  }else if (value === 1) {
    element = <Seccion2 onChange={handleChange} />;
  } else if (value === 2) {
    element = <Seccion3 onChange={handleChange} />;
  } else if (value === 3) {
    element = <Seccion4 onChange={handleChange} />;
  } else if (value === 4 && arreglo[2] != "principiante") {
    element = <Seccion41 onChange={handleChange} valor={arreglo[0]} />;
  } else if (value === 5) {
    element = <Seccion51 onCheckboxChange={handleCheckboxChange2} />;
  } else if (value === 6) {
    element = <Seccion5 onSubmit={handleFormSubmit} formData2={formData2} />;
  } else if (value === 7) {
    element = <Seccion6 onCheckboxChange={handleCheckboxChange} />;
  } else {
    setValue(value + 1);
    setArreglo([...arreglo, "completo"]);
  }
  //actualizador para visualizar el funcionamiento de datos
  useEffect(() => {
    console.log("------------------");
    console.log(formData);
    console.log(arreglo);
    console.log("Herramientas: ");
    console.log(checkboxes);
    console.log("Semana: ");
    console.log(checkboxes2);
    console.log("Imputs: ");
    console.log(formData2);
    //console.log(arreglo[2]);
    //console.log(formHerra);
    console.log(value);
    //para el botonfinal
    if (Object.entries(checkboxes).find((entry) => entry[1] === true)) {
      setFinalizar2(true);
    } else {
      setFinalizar2(false);
    }
    //para los dias
    if (Object.entries(checkboxes2).find((entry) => entry[1] === true)) {
      setShowButton(true);
    }
    if (Object.values(checkboxes2).every(value => value === false) && value === 5) {
      setShowButton(false);
    }
  }, [formData, formData2, arreglo, checkboxes, checkboxes2]);


  return (
    <div className="bg-blue-50 w-full">
      <Head>
        <title>EvoltFit - Sistema Experto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <div className="grid place-items-center">

          {value == 2 ? (
            <div className="bg-gray-100 w-5/6 p-3 shadow-lg shadow-zinc-300 seccion2">
              <h1>{element}</h1>
            </div>
          ) : value === 4 && arreglo[2] != "principiante" ? (
            <div className="bg-gray-100 w-5/6 p-3 shadow-lg shadow-zinc-300 seccion3 ">
              <h1>{element}</h1>
            </div>
          ) : (
            <div className="bg-gray-100 w-5/6 p-3 shadow-lg shadow-zinc-300 seccion ">
              <h1>{element}</h1>
            </div>
          )}

          <br />
          {/*Boton retroceder*/}
          <div className="grid grid-cols-2 gap-10">


          {inicioB ? (
  <>
    <button className="bottonAnt" onClick={handlePrevious}>Anterior</button>
    {showFinalizar ? (
      showFinalizar2 ? (
        <Link
          href={{
            pathname: "../rutinaSE",
            query: {
              formData2: JSON.stringify(formData2),
              checkboxes: JSON.stringify(checkboxes),
              checkboxes2: JSON.stringify(checkboxes2),
              arreglo: JSON.stringify(arreglo),
            },
          }}
        >
          <button className="bottonSig-2">Finalizar</button>
        </Link>
      ) : (
        <button className="bottonSig-1">Finalizar</button>
      )
    ) : showButton ? (
      <button onClick={handleNext} className="bottonSig-2">
        Siguiente
      </button>
    ) : (
      <button className="bottonSig-1">Siguiente</button>
    )}
  </>
) : (
  <button className="bottonSig-1" onClick={handleNext} >Comenzar</button>
)}


          </div>
        </div>
        <br />
        <br />
        <br />
      </main>
      <Footer></Footer>
    </div>
  );
}
