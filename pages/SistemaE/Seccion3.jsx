import styled from 'daisyui/dist/styled';
import React from 'react'
import styles from "../../styles/Home.module.css";


function Seccion3(props) {

  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui 
    props.onChange(value);
  }

  return (
    <div className="s">
    <div className={styles.texto}>
    <h1>En este momento, ¿Con cuál opción te identificas más?</h1>
    </div>
    <br /><br /><br />


    <div className={styles.inputs2}>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="condicion"
      value="principiante"
      onChange={handleChange}
    /> Principiante: Actualmente no me ejercitó, llevo más de 6 meses sin realizar alguna actividad física constante. Tengo poco conocimiento respecto a ejercicios y entrenamiento.
    </div>

   <div className={styles.radiu2}>
    <input
      type="radio"
      name="condicion"
      value="intermedio"
      onChange={handleChange}
    /> Intermedio: Actualmente realizo alguno que otro ejercicio, pero no de manera constante, tengo pocos o conocimientos medios respecto a rutinas o ejercicio.
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="condicion"
      value="avanzado"
      onChange={handleChange}
    /> Avanzado: Realizo actividad física muy regular y por largos periodos de tiempo, tengo conocimiento básico o medio de mi alimentación y conocimientos necesarios para los ejercicios que hago.
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="condicion"
      value="experimentado"
      onChange={handleChange}
    /> Experimentado: Hago ejercicio de manera constante, conozco varios tipos de ejercicios y rutinas. El ejercicio es algo dentro de mi vida cotidiana o en la mayoría de los días y tengo una buena alimentación de acuerdo con mi actividad.
    </div>

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion3