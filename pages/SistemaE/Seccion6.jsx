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
      name="Ninguno"
      onChange={onCheckboxChange}
    /> Ninguno
    </div>

   <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Bandaresistencia"
      onChange={onCheckboxChange}
    /> Banda de Resistencia
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Bandasuspension"
      onChange={onCheckboxChange}
    /> Banda de suspensión.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Barra"
      onChange={onCheckboxChange}
    /> Barra.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="BarraZ"
      onChange={onCheckboxChange}
    /> Barra Z.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Barras"
      onChange={onCheckboxChange}
    /> Barras &lpar;dominadas, paralelas&lpar;
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Mancuerna"
      onChange={onCheckboxChange}
    /> Mancuerna.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Mancuernas"
      onChange={onCheckboxChange}
    /> Mancuernas.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="PesaRusa"
      onChange={onCheckboxChange}
    /> Pesa Rusa.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="PlacaPeso"
      onChange={onCheckboxChange}
    /> Placa de Peso.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="MaquinasGYM"
      onChange={onCheckboxChange}
    /> Máquinas en GYM.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="BancoPlano"
      onChange={onCheckboxChange}
    /> Banco Plano.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="BancoDeclinado"
      onChange={onCheckboxChange}
    /> Banco Declinado.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="BancoInclinado"
      onChange={onCheckboxChange}
    /> Banco Inclinado.
    </div>

    <div className={styles.radiu2}>
    <input
      type="checkbox"
      name="Cuerda"
      onChange={onCheckboxChange}
    /> Cuerda.
    </div>

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion6