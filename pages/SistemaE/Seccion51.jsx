import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion51(props) {
  const { onCheckboxChange } = props;

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-3xl bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>¿Cuáles dias de la semana tienes disponibles?</h1>
        </div>
      </div>
      <br />
      <br />

      <div className = "grid place-items-center">
      <section className="app ">
        <article className="feature1">
          <input  
              id="ch1"
              type="checkbox"
              name="Lunes"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Lunes
            </span>
          </div>
        </article>

        <article className="feature2">
          <input  
              id="ch2"
              type="checkbox"
              name="Martes"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Martes
            </span>
          </div>
        </article>

        <article className="feature3">
          <input 
              id="ch3"
              type="checkbox"
              name="Miercoles"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Miercoles
            </span>
          </div>
        </article>

        <article className="feature4">
          <input 
              id="ch4"
              type="checkbox"
              name="Jueves"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Jueves
            </span>
          </div>
        </article>
      </section>
      </div>

      <div className = "grid place-items-center mt-2">
      <section className="app ">
        <article className="feature1">
          <input  
              id="ch5"
              type="checkbox"
              name="Viernes"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Viernes
            </span>
          </div>
        </article>

        <article className="feature2">
          <input 
              id="ch6"
              type="checkbox"
              name="Sabado"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Sábado
            </span>
          </div>
        </article>

        <article className="feature3">
          <input 
              id="ch8"
              type="checkbox"
              name="Domingo"
              onChange={onCheckboxChange} />
          <div>
            <span className = "font-semibold">
              Domingo
            </span>
          </div>
        </article>

      </section>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Seccion51;
