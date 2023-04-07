import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion51(props) {
  const { onCheckboxChange } = props;

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>¿Cuáles dias de la semana tienes disponibles?</h1>
        </div>
      </div>
      <br />
      <br />

      <div className = "grid place-items-center">
      <section className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <article className="feature">
          <input  
              id="ch1"
              type="checkbox"
              name="Lunes"
              onChange={onCheckboxChange}
              className = "inputArticle" />
          <div className = "divArticle">
            <span className = "font-semibold">
              Lunes
            </span>
          </div>
        </article>

        <article className="feature">
          <input  
              id="ch2"
              type="checkbox"
              name="Martes"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
            <span className = "font-semibold">
              Martes
            </span>
          </div>
        </article>

        <article className="feature">
          <input 
              id="ch3"
              type="checkbox"
              name="Miercoles"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
            <span className = "font-semibold">
              Miercoles
            </span>
          </div>
        </article>

        <article className="feature">
          <input 
              id="ch4"
              type="checkbox"
              name="Jueves"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
            <span className = "font-semibold">
              Jueves
            </span>
          </div>
        </article>
      </section>
      </div>

      <div className = "grid place-items-center mt-2">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <article className="feature">
          <input  
              id="ch5"
              type="checkbox"
              name="Viernes"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
            <span className = "font-semibold">
              Viernes
            </span>
          </div>
        </article>

        <article className="feature">
          <input 
              id="ch6"
              type="checkbox"
              name="Sabado"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
            <span className = "font-semibold">
              Sábado
            </span>
          </div>
        </article>

        <article className="feature">
          <input 
              id="ch8"
              type="checkbox"
              name="Domingo"
              onChange={onCheckboxChange} 
              className = "inputArticle"/>
          <div className = "divArticle">
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
