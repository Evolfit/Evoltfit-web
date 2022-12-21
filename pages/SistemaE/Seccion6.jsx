import React, { useState, useEffect } from 'react'
import styles from "../../styles/Home.module.css";

function Seccion6(props) {

  const { onCheckboxChange } = props;

  return (
    <div className="s">
    <div className={styles.texto}>
    <h1>¿Que herramientas tienes disponibles?</h1>
    </div>
    <br /><br /><br />


    <div className={styles.inputs2}>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="checkbox1"
      onChange={onCheckboxChange}
    /> Barra con pesas
    </div>

   <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="checkbox2"
      onChange={onCheckboxChange}
    /> Mancuernas
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="checkbox3"
      onChange={onCheckboxChange}
    /> Ligas de Resistencia Cerrada
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="checkbox4"
      onChange={onCheckboxChange}
    /> Banco Plano
    </div>

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion6