import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

export default function Home() {
  const router = useRouter();

  useEffect(() =>{
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className="font-thin text-2xl">
          {"Sesion iniciada (Falta fetch de datos)"}
          <br />
          
        </h2>

        <button
          onClick={() => router.push('/login')}
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
