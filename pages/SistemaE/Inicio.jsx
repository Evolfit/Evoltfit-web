import styled from "daisyui/dist/styled";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";

function Inicio() {
  
  return (
    <div className = "flex">
      <div className="w-1/2 contenedorSeccionInicial rounded-tl-lg rounded-bl-lg bg-white">
        <div className = "grid place-items-center">
        <br/>
        <h1 className="font-catamaran text-center text-blue-600 text-2xl xl:text-3xl font-semibold">
         Comenzando...
        </h1>
        <br/>
        <div className = "w-9/12">
        <p className = "text-justify text-base text-black font-heebo">
        Hola, me alegra que estés interesado en mejorar tu salud y tu forma física. Estás a punto de usar una herramienta que te ayudará a crear un plan de entrenamiento personalizado según tus objetivos, preferencias y disponibilidad.<span className="text-blue-600 font-semibold"> Para que el plan sea efectivo y seguro, es importante que seas sincero al momento de responder las preguntas que te haré a continuación</span>. Es importante tener en cuenta que este sistema no es un entrenador personal humano, pero puede brindarte una rutina de ejercicios personalizada de manera fácil y rápida.
        </p>
        </div>
        </div>
      </div>
      
      <div className = "w-1/2 bg-cover bg-internal-img7 contenedorSeccionInicial rounded-tr-lg rounded-br-lg">
        <div className = "bg-black/70 contenedorSeccionInicial rounded-tr-lg rounded-br-lg">
        <div className="grid justify-items-end p-6">
        <img className = "h-20 w-20" src = "/evologo.png"></img>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Inicio;
