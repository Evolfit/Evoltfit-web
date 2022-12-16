import styled from 'daisyui/dist/styled';
import styles from "../../styles/Home.module.css";
import React, { useState } from 'react'


function Seccion1() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
        name="radioGroup"
        value="hombre"
        checked={selectedValue === 'hombre'}
        onChange={handleChange}
      />
      <img className={styles.imagenes} src="img/male.png" alt="Image 1" />
      <p>Hombre</p>
      </div>
      <div className={styles.radiu}>
      <input
        type="radio"
        name="radioGroup"
        value="mujer"
        checked={selectedValue === 'mujer'}
        onChange={handleChange}
      />
      <img className={styles.imagenes} src="img/female.png" alt="mujer" />
      <p>Mujer</p>
      </div>
      <div className={styles.radiu}>
      <input
        type="radio"
        name="radioGroup"
        value="otro"
        checked={selectedValue === 'otro'}
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