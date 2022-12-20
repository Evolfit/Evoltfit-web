import React from 'react'
import styles from "../../styles/Home.module.css";

function Seccion4(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui 
    props.onChange(value);
  }

  return (
    <div className="s">
    <div className={styles.texto}>
    <h1>¿Cual es disponibilidad de tiempo?</h1>
    </div>
    <br /><br /><br />


    <div className={styles.inputs2}>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="tiempo"
      value="30min"
      onChange={handleChange}
    /> Menos de 30 Minutos
    </div>

   <div className={styles.radiu2}>
    <input
      type="radio"
      name="tiempo"
      value="1hr"
      onChange={handleChange}
    /> Aproximadamente una hora
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="tiempo"
      value="1hr 30"
      onChange={handleChange}
    /> Aproximadamente una hora y media
    </div>

    <div className={styles.radiu2}>
    <input
      type="radio"
      name="tiempo"
      value="2hr"
      onChange={handleChange}
    /> Alrededor de 2 horas o más
    </div>

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion4