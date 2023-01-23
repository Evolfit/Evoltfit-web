import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "/config/supabaseClient";

export default function AddCalorias() {

  const router = useRouter();

  const [sesion, setSesion] = useState(null);
  const [flag, setFlag] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      //console.log(data);
    } else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
    }
  };

  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, []);

  return (
    <div className="bg-blue-50 w-full">
      <Head>
        <title>EvoltFit - Calculadora de Calorías</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
       
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <Footer></Footer>
      </main>
    </div>
  );
}
