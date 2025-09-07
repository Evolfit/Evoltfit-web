import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

export default function Home() {
  const router = useRouter();

  ////console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);


  useEffect(() => {
    const fetchDatos = async () => {
      const { data, error } = await supabase
        .from('prueba')
        .select()

        if(error){
          setFetchError('Error al conseguir datos');
          setDatos(null);
          //console.log(error);
        }
        if(data){
          setDatos(data);
          setFetchError(null);
        }
    }

    fetchDatos();
  }, [])

  ////console.log(datos);
  ////console.log(fetchError);

  return (
    <div className={styles.container}>
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className="font-thin text-2xl">
          {"Tabla Prueba"}
          <br />
          {fetchError && (<p>{fetchError}</p>)}
          {datos && (
            <div className="datos">
              {datos.map(dato => (
                <p key={dato.id} className="animate-pulse text-2xl text-blue-600 font-normal">
                  {"Id " + dato.id+ ": " + dato.texto}
                </p>
              ))}
            </div>
          )}
          
        </h2>

        <button
          onClick={() => router.push('/')}
          className="btn btn-info btn-outline btn-wide btn-md rounded-full my-10"
        >
          {'Inicio'}
        </button>
      </main>

      <footer className={styles.footer}>
        <p className="font-light">
          {'Powered by '}
          <span className="animate-pulse font-bold text-fuchsia-500">
            {'Evoltfit'}
          </span>
        </p>
      </footer>
    </div>
  );
}
