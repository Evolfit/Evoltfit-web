import styled from 'daisyui/dist/styled';
import React from 'react'
import styles from "../../styles/Home.module.css";

function Seccion2(props) {

  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui 
    props.onChange(value);
  }
  
  return (
    <div className="s">
    <div className={styles.texto}>
    <h1>¿Cual es tu objetivo principal?</h1>
    </div>
    <br /><br /><br />


    <div className={styles.inputs2}>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="objetivo"
      value="masamuscular"
      onChange={handleChange}
    /> Ganar Masa Muscular
    </div>

   <div className={styles.radiu2}>
    <input
      type="radio"
      name="objetivo"
      value="resistencia"
      onChange={handleChange}
    /> Ganar Resistencia
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="objetivo"
      value="fuerza"
      onChange={handleChange}
    /> Ganar Fuerza
    </div>

    <br/><br/><br/><br/>
    <div className={styles.radiuD}>
    <input type="radio" name="read" value="none" disabled /> Yoga
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="objetivo"
      value="deporte"
      onChange={handleChange}
    /> Deporte
    </div>

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion2