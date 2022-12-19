import styled from 'daisyui/dist/styled';
import styles from "../../styles/Home.module.css";
import React, { useState } from 'react'


function Seccion1(props) {
  
  
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui 
    props.onChange(value);
  }

  return (
    <div className={styles.s}>
      <div className={styles.texto}>
      <h1>¿Cual de las siguientes opciones te describe mejor?</h1>
      </div>
      <br /><br /><br />


      <div className={styles.inputs}>
      <div className={styles.radiu}>
      <input
        type="radio"
        name="gender"
        value="hombre"
        onChange={handleChange}
      />
      <img className={styles.imagenes} src="img/male.png" alt="Image 1" />
      <p>Hombre</p>
      </div>
      <div className={styles.radiu}>
      <input
        type="radio"
        name="gender"
        value="mujer"
        onChange={handleChange}
      />
      <img className={styles.imagenes} src="img/female.png" alt="mujer" />
      <p>Mujer</p>
      </div>
      <div className={styles.radiu}>
      <input
        type="radio"
        name="gender"
        value="otro"
        onChange={handleChange}
      />
      <img className={styles.imagenes} src="img/other.png" alt="other" />
      <p>Otro</p>
      </div>
      </div>


      <br/><br/><br/><br/>
    </div>
  )
}

export default Seccion1