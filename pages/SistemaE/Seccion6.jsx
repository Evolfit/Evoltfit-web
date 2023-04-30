import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion6(props) {
  const { onCheckboxChange } = props;
  const [ch1, setCh1] = useState(false);
  const [ch2, setCh2] = useState(false);
  const [ch3, setCh3] = useState(false);
  const [ch4, setCh4] = useState(false);
  const [ch5, setCh5] = useState(false);
  const [ch6, setCh6] = useState(false);
  const [ch7, setCh7] = useState(false);
  const [ch8, setCh8] = useState(false);
  const [ch9, setCh9] = useState(false);
  const [ch10, setCh10] = useState(false);
  const [ch11, setCh11] = useState(false);
  const [ch12, setCh12] = useState(false);
  const [ch13, setCh13] = useState(false);
  const [Ninguno, setNinguno] = useState(false);
  const [Todos, setTodos] = useState(false);

  function handleNoneClick() {
    setNinguno(!Ninguno);
    if (!Ninguno) {
      setCh1(false);
      setCh2(false);
      setCh3(false);
      setCh4(false);
      setCh5(false);
      setCh6(false);
      setCh7(false);
      setCh8(false);
      setCh9(false);
      setCh10(false);
      setCh11(false);
      setCh12(false);
      setCh13(false);
      setTodos(false);
    }
  }
  function handleAllClick() {
    setTodos(!Todos);
    if (!Todos) {
      setNinguno(false);
      setCh1(true);
      setCh2(true);
      setCh3(true);
      setCh4(true);
      setCh5(true);
      setCh6(true);
      setCh7(true);
      setCh8(true);
      setCh9(true);
      setCh10(true);
      setCh11(true);
      setCh12(true);
      setCh13(true);
      setTodos(true);
    }
  }
  function handleChClick(name) {
    setNinguno(false);
    setTodos(false);
    if (name === "Bandaresistencia") setCh1(!ch1);
    if (name === "Bandasuspension") setCh2(!ch2);
    if (name === "Barra") setCh3(!ch3);
    if (name === "BarraZ") setCh4(!ch4);
    if (name === "Barras") setCh5(!ch5);
    if (name === "Mancuernas") setCh6(!ch6);
    if (name === "PesaRusa") setCh7(!ch7);
    if (name === "PlacaPeso") setCh8(!ch8);
    if (name === "MaquinasGYM") setCh9(!ch9);
    if (name === "BancoPlano") setCh10(!ch10);
    if (name === "BancoDeclinado") setCh11(!ch11);
    if (name === "BancoInclinado") setCh12(!ch12);
    if (name === "Cuerda") setCh13(!ch13);
  }
  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>¿Qué herramientas tienes disponibles?</h1>
        </div>
      </div>
      <br />
      <br />

      <div className="grid place-items-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <article className="feature-2">
            <input
              id="ch1"
              type="checkbox"
              name="Ninguno"
              onChange={onCheckboxChange}
              onClick={handleNoneClick}
              checked={Ninguno} 
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-10 w-10 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_2"
                  data-name="Capa 2"
                  viewBox="0 0 39.96 51.85"
                  {...props}
                >
                  <g id="Layer_1" data-name="Layer 1">
                    <path
                      d="M39.83 21.92A2.897 2.897 0 0 0 36.21 20l-8.46 2.61-5.59-7.51c0-.01-.02-.02-.02-.03-.02-.03-.04-.05-.06-.08 0-.01-.02-.02-.03-.03-.02-.02-.04-.05-.06-.07l-.03-.03-.06-.06-.03-.03-.06-.06a.138.138 0 0 0-.04-.03c-.02-.02-.04-.04-.06-.05-.01-.01-.03-.02-.04-.03-.02-.02-.04-.03-.06-.05-.02-.01-.03-.02-.05-.04-.02-.01-.03-.02-.05-.04-.12-.08-.24-.16-.37-.22h-.01c-.03-.02-.07-.03-.1-.05h-.01c-.03-.01-.07-.03-.1-.04h-.01c-.13-.05-.27-.1-.42-.13-.02 0-.03 0-.05-.01-.02 0-.05 0-.07-.01-.02 0-.05 0-.07-.01h-.06c-.03 0-.06 0-.09-.01h-.03c-.09 0-.18-.01-.27-.01h-.51c-.1.02-.2.04-.29.07h-.03c-.03 0-.06.02-.09.03-.01 0-.02 0-.04.01-.03 0-.06.02-.08.03-.01 0-.03.01-.04.02-.03.01-.05.02-.08.03h-.02l-11 4.96a2.892 2.892 0 0 0-1.69 2.93l.88 8.76c.15 1.5 1.41 2.61 2.88 2.61.1 0 .19 0 .29-.01a2.903 2.903 0 0 0 2.6-3.17l-.67-6.69 4.55-2.05-1.11 11.57-3.59 7.34-9.27 1.25c-1.59.21-2.7 1.67-2.48 3.26s1.67 2.7 3.26 2.48l10.8-1.46c.96-.13 1.79-.73 2.22-1.6l3.42-6.99 5.5 2.49-.4 8.94a2.911 2.911 0 0 0 2.77 3.03h.13c1.54 0 2.82-1.21 2.89-2.77l.49-10.9c.05-1.18-.62-2.28-1.7-2.77l-8.08-3.66.68-7.15 2.32 3.11c.73.98 2.01 1.4 3.18 1.04l10.41-3.21a2.897 2.897 0 0 0 1.92-3.62Z"
                    />
                    <circle cx={22.11} cy={6.1} r={6.1} className="cls-1" />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Ninguno</span>
            </div>
          </article>

          <article className="feature-2">
            <input
               id="ch2"
               type="checkbox"
               name="Bandaresistencia"
               checked={ch1} onClick={() => handleChClick("Bandaresistencia")}
               onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center h-10 w-10 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 20.05 21.5"
                  {...props}
                >
                  <path
                    d="M19.94 14.88c-.45-2.08-1.74-2.56-3.87-3.36-1.03-.39-2.3-.86-3.83-1.65-.78-.4-1.27-.8-1.57-1.22a.99.99 0 0 1-.11-.17c-.01-.02-.02-.03-.03-.05-.03-.05-.05-.1-.08-.15-.3-.62-.28-1.28-.25-2.03.05-1.41.11-3.17-2.22-4.97C6.57.18 5.25-.21 4.05.11 3.17.34 2.52.92 2.06 1.5c-.11.13-.2.27-.29.41 0 0 0 .01-.01.02-.03.04-.05.08-.08.13-.23.37-.37.69-.45.87-.01.03-.02.05-.02.05v.04c-.07.17-.12.33-.16.5-.24.79-.41 1.6-.7 2.4 0 .02-.02.05-.02.05v.04c-.96 2.83.3 5.41 3.35 6.89 2.69 1.31 5.72 3.06 7.77 6.09 1.01 1.5 3.01 2.5 4.76 2.5.37 0 .74-.05 1.08-.14 1.13-.32 1.81-1.16 1.88-2.32.2-.65.41-1.3.61-1.96.16-.32.25-.69.27-1.1.01-.34-.02-.71-.1-1.1ZM4.93 3.98c1.46.48 2.95 1.75 3.41 3.23.32 1.03.07 2.11.17 3.16.03.36.11.69.24.99-1.27-.87-2.59-1.57-3.84-2.18-.25-.12-.49-.25-.72-.39-1.46-.89-2.31-2.07-2.47-3.44 0-.06-.01-.13-.02-.19.75-1 1.89-1.6 3.23-1.17Zm13.41 15c-.05.83-.48 1.36-1.29 1.59-1.42.4-3.79-.33-4.94-2.03-2.16-3.2-5.3-5.01-8.09-6.37C1.33 10.86.26 8.71 1.07 6.28v-.02c.03.06.05.12.07.18 0 .02.02.05.03.07.04.11.08.21.13.31.01.02.02.05.04.07.04.08.08.16.12.23.02.03.04.07.06.1l.12.21c.02.03.04.06.06.1.05.08.11.16.16.23.01.02.02.04.04.05l.22.28c.02.02.04.05.07.07.06.07.12.13.18.2l.09.09c.06.06.12.12.19.18.03.03.06.05.09.08.08.07.17.15.26.22.01 0 .02.02.03.03.1.08.21.16.32.23.03.02.07.04.1.07.08.05.16.11.24.16.04.02.08.05.12.07.08.05.17.1.25.15.04.02.08.04.11.06.12.07.25.13.38.2 2.69 1.31 5.72 3.06 7.77 6.09.07.11.15.22.24.32.03.03.05.06.08.1.06.07.12.14.19.21.03.03.06.07.1.1.07.07.14.13.21.2.03.03.06.06.09.08.1.09.21.17.31.25 0 0 .01 0 .02.01.1.08.21.15.32.22.04.02.08.05.11.07.08.05.16.1.24.14.04.02.09.05.13.07.08.04.16.08.25.12l.12.06c.12.05.24.11.37.15.02 0 .03.01.05.02.11.04.22.08.33.11.04.01.09.03.13.04.08.02.17.05.25.07l.15.03c.09.02.17.03.25.05.04 0 .09.02.13.02.12.02.25.03.37.04h.46c.12 0 .23-.01.34-.02h.04c.11-.01.21-.03.32-.05.02 0 .04 0 .06-.01.11-.02.21-.05.31-.09h.02c.03.19.05.39.05.61v.05Zm-6.53-4.95c.59.27 1.2.51 1.76.73 1.76.71 3.77 1.13 4.49 2.76-1.42.48-3.9-.25-5.07-1.98-.37-.55-.77-1.05-1.19-1.52Zm7.23 2.64v.03l-.03.09c-.06.11-.14.22-.23.31-.42-.9-1.17-1.57-2.24-2.04-1-.44-2.04-.77-3.04-1.19-1.31-.54-3.17-1.16-3.89-2.49-.46-.85-.28-1.86-.29-2.79 0-1-.22-1.96-.78-2.8-1.09-1.62-3.4-3.26-5.45-2.66-.49.14-.92.39-1.29.71.04-.18.09-.36.15-.55l.02-.06c.06-.16.27-.62.63-1.1a.55.55 0 0 1 .07-.09C3.73.77 5.27.56 6.83 1.54 8.09 2.33 9.16 3.48 9.32 5c.1.9-.08 1.81.06 2.71.38 2.44 3.18 3.35 5.17 4.15 1.56.62 3.79 1.24 4.47 2.75.05.14.09.28.12.44.05.21.07.41.08.6 0 .31-.06.64-.18 1.01Z"
                    data-name="icon 3-4"
                  />
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Banda de Resistencia</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch3"
              type="checkbox"
              name="Bandasuspension"
              onChange={onCheckboxChange}
              checked={ch2} onClick={() => handleChClick("Bandasuspension")}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center h-10 w-16 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 85 45.79"
                  {...props}
                >
                  <g
                    data-name="Layer 1"
                    style={{
                      clipPath: "url(#a)",
                    }}
                  >
                    <path
                      d="M81.08 30.43c-.34.05-.66.16-.97.33-.67.37-1.15.97-1.36 1.71l-1.18 4.08c-.32 1.11.07 2.26.89 2.96l-.71 2.45-8.11-8 1-3.52 11.15-2.46-.71 2.45ZM14.83 15.25 3.21 17.81l.71-2.45c.34-.05.66-.16.97-.33.67-.37 1.15-.97 1.36-1.71l1.18-4.08c.32-1.11-.07-2.26-.89-2.96l.71-2.45 8.45 8.34-.87 3.08Zm68.57 9.66-12.74 2.81a2.98 2.98 0 0 0-1.92-1.64l-3.16-.89c-.78-.22-1.59-.12-2.29.27-.1.06-.2.12-.29.18-1.76-2.39-3.83-3.97-6.18-4.72-4.65-1.48-9.17.65-12.81 2.37-2.26 1.07-4.6 2.17-5.46 1.49-.92-.73-.4-3.36.06-5.67.66-3.31 1.34-6.74-.79-8.78-1.41-1.35-3.7-1.65-6.8-.89-1.78.43-3.91 1.22-6.33 2.36a3.018 3.018 0 0 0-1.89-1.59l-3.16-.89c-.78-.22-1.59-.12-2.29.27-.11.06-.21.13-.31.2L7.52.38C7.19.05 6.71-.08 6.26.04c-.45.12-.81.47-.94.91L3.95 5.69c-.94.25-1.72.97-2.01 1.97L.76 11.74c-.21.73-.12 1.5.24 2.17.11.2.25.39.41.56L.05 19.22c-.13.45-.01.93.31 1.27a1.31 1.31 0 0 0 1.25.39l13.35-2.95a3.02 3.02 0 0 0 1.83 1.46l3.16.89a2.968 2.968 0 0 0 2.3-.27c.7-.39 1.21-1.04 1.43-1.81l.98-3.46c8.3-4.1 10.69-3.13 11.34-2.51 1.08 1.04.52 3.86.03 6.35-.64 3.21-1.3 6.53.89 8.27 1.03.82 2.36.99 4.06.54 1.28-.34 2.68-1.01 4.18-1.71 3.38-1.6 7.21-3.41 10.87-2.24 2.11.68 3.98 2.3 5.56 4.82l-.93 3.29c-.45 1.6.48 3.27 2.08 3.72l3.16.89c.27.08.54.11.81.11.43 0 .86-.09 1.25-.27l9.53 9.4c.25.25.59.38.93.38.11 0 .22-.01.33-.04.45-.12.81-.47.94-.91l1.37-4.74a2.85 2.85 0 0 0 2.01-1.97l1.18-4.08c.21-.73.12-1.5-.24-2.17-.11-.2-.25-.39-.41-.56l1.37-4.74c.13-.45.01-.93-.31-1.27-.32-.34-.79-.49-1.25-.39Z"
                    />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Banda de Suspensión</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch4"
              type="checkbox"
              name="Barra"
              checked={ch3} onClick={() => handleChClick("Barra")}
              onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-16 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_2"
                  data-name="Capa 2"
                  viewBox="0 0 56.18 19.06"
                  {...props}
                >
                  <g id="Layer_1" data-name="Layer 1">
                    <rect
                      width={4.44}
                      height={19.06}
                      x={46.6}
                      rx={1.09}
                      ry={1.09}
                    />
                    <rect
                      width={4.44}
                      height={14.37}
                      x={51.74}
                      y={2.35}
                      rx={0.95}
                      ry={0.95}
                    />
                    <rect
                      width={4.44}
                      height={19.06}
                      x={5.14}
                      rx={1.09}
                      ry={1.09}
                      transform="rotate(180 7.36 9.53)"
                    />
                    <rect
                      width={4.44}
                      height={14.37}
                      y={2.35}
                      rx={0.95}
                      ry={0.95}
                      transform="rotate(-180 2.22 9.53)"
                    />
                    <rect
                      width={35.58}
                      height={2.99}
                      x={10.3}
                      y={8.09}
                      rx={0.59}
                      ry={0.59}
                    />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Barra</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch5"
              type="checkbox"
              name="BarraZ"
              checked={ch4} onClick={() => handleChClick("BarraZ")}
              onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-10 w-12 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_2"
                  data-name="Capa 2"
                  viewBox="0 0 49.1 49.1"
                  {...props}
                >
                  <g id="Layer_1" data-name="Layer 1">
                    <rect
                      width={4.44}
                      height={19.06}
                      x={36.99}
                      y={0.36}
                      rx={1.09}
                      ry={1.09}
                      transform="rotate(-45 39.207 9.89)"
                    />
                    <rect
                      width={4.44}
                      height={14.37}
                      x={40.62}
                      y={-0.93}
                      rx={0.95}
                      ry={0.95}
                      transform="rotate(-45 42.844 6.263)"
                    />
                    <rect
                      width={4.44}
                      height={19.06}
                      x={7.67}
                      y={29.68}
                      rx={1.09}
                      ry={1.09}
                      transform="rotate(135 9.891 39.209)"
                    />
                    <rect
                      width={4.44}
                      height={14.37}
                      x={4.04}
                      y={35.66}
                      rx={0.95}
                      ry={0.95}
                      transform="rotate(135 6.255 42.84)"
                    />
                    <path
                      d="M22.14 33.37c-.48.48-1.13.8-1.85.84l-3.62.25-3.36 3.36c-.18.18-.46.18-.64 0l-1.4-1.4a.447.447 0 0 1 0-.64l3.36-3.36c.49-.49 1.15-.79 1.85-.84l3.62-.25.01-.01.25-3.62c.05-.7.35-1.36.84-1.85l4.67-4.67c.5-.5 1.15-.79 1.85-.84l3.62-.25.01-.01.25-3.62c.05-.7.35-1.36.84-1.85l3.36-3.36c.18-.18.47-.18.64 0l1.4 1.4c.18.18.18.46 0 .64l-3.36 3.36-.25 3.62a2.91 2.91 0 0 1-2.69 2.69l-3.62.25-2.34 2.34-2.33 2.33L23 31.5c-.05.72-.36 1.37-.84 1.85Z"
                    />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Barra Z</span>
            </div>
          </article>

          <article className="feature-2">
            <input
             id="ch6"
             type="checkbox"
             name="Barras"
             checked={ch5} onClick={() => handleChClick("Barras")}
             onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-10 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_2"
                  data-name="Capa 2"
                  viewBox="0 0 56.21 68.92"
                  {...props}
                >
                  <g id="Layer_1" data-name="Layer 1">
                    <path
                      d="M28.1 19.88c3.37 0 6.1-2.73 6.1-6.1s-2.73-6.1-6.1-6.1-6.1 2.73-6.1 6.1 2.73 6.1 6.1 6.1Z"
                    />
                    <path
                      d="M54.44 2.54h-3.33v-.89c0-.91-.74-1.66-1.66-1.66s-1.66.74-1.66 1.66v.89H44.8c-.41-.54-1.01-.93-1.72-1.08-1.12-.23-2.22.23-2.88 1.08H15.99a2.92 2.92 0 0 0-2.88-1.08c-.71.14-1.31.54-1.72 1.08H8.4v-.89c0-.91-.74-1.66-1.66-1.66S5.08.73 5.08 1.65v.89H1.76C.79 2.54 0 3.33 0 4.3s.79 1.76 1.76 1.76h3.33v61.19c0 .91.74 1.66 1.66 1.66s1.66-.74 1.66-1.66V6.07h2.69l2.83 13.94c.17.83.69 1.55 1.44 1.96l8.6 4.77v13.97L13.49 57.26a2.9 2.9 0 0 0 4.9 3.1L28.12 45l9.73 15.36a2.897 2.897 0 0 0 4 .9c1.35-.86 1.75-2.65.9-4L32.27 40.71V26.74l8.6-4.77c.74-.41 1.27-1.13 1.44-1.96l2.83-13.94h2.69v61.19c0 .91.74 1.66 1.66 1.66s1.66-.74 1.66-1.66V6.07h3.33c.97 0 1.76-.79 1.76-1.76s-.79-1.76-1.76-1.76Zm-17.57 15-6.41 3.55H25.77l-6.41-3.55-2.33-11.47h22.19l-2.33 11.47Z"
                    />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Barra Dominadas/Paralelas</span>
            </div>
          </article>

          <article className="feature-2">
            <input
               id="ch8"
               type="checkbox"
               name="Mancuernas"
               checked={ch6} onClick={() => handleChClick("Mancuernas")}
               onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-14 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 62.21 48.88"
                >
                  <g id="Layer_1" data-name="Layer 1">
                    <rect
                      width={19.83}
                      height={6.62}
                      x={-0.49}
                      y={15.29}
                      rx={2.02}
                      ry={2.02}
                      transform="rotate(-45 9.423 18.597)"
                    />
                    <path
                      d="M9.28 10.11 9 9.83c-.8-.8-2.01-.88-2.71-.18L.48 15.46c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71Z"
                    />
                    <rect
                      width={19.83}
                      height={6.62}
                      x={20.37}
                      y={36.15}
                      rx={2.02}
                      ry={2.02}
                      transform="rotate(-45 30.283 39.456)"
                    />
                    <path
                      d="m39.06 39.89-.28-.28c-.8-.8-2.01-.88-2.71-.18l-5.81 5.81c-.7.7-.62 1.91.18 2.71l.28.28c.8.8 2.01.88 2.71.18l5.81-5.81c.7-.7.62-1.91-.18-2.71ZM22.89 28.31l-4.33-4.33-4.33-4.33-3.75 3.76 4.33 4.33 4.33 4.33 2.01 2.01 4.33 4.33 3.75-3.76-4.33-4.33-2.01-2.01z"
                    />
                    <rect
                      width={19.83}
                      height={6.62}
                      x={18.38}
                      y={5.94}
                      rx={2.02}
                      ry={2.02}
                      transform="rotate(-55.34 28.294 9.244)"
                    />
                    <path
                      d="M26.63.92 26.3.69c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63Z"
                    />
                    <rect
                      width={19.83}
                      height={6.62}
                      x={42.65}
                      y={22.72}
                      rx={2.02}
                      ry={2.02}
                      transform="rotate(-55.34 52.562 26.028)"
                    />
                    <path
                      d="m61.27 24.87-.33-.23c-.93-.64-2.13-.5-2.7.31l-4.67 6.76c-.56.81-.27 1.99.66 2.63l.33.23c.93.64 2.13.5 2.7-.31l4.67-6.76c.56-.81.27-1.99-.66-2.63ZM43.29 16.38l-5.04-3.48-5.03-3.48-3.03 4.37 5.04 3.48 5.04 3.48 2.33 1.62 5.04 3.48 3.02-4.37L45.63 18l-2.34-1.62z"
                    />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Mancuernas</span>
            </div>
          </article>

          <article className="feature-2">
            <input
             id="ch9"
             type="checkbox"
             name="PesaRusa"
             checked={ch7} onClick={() => handleChClick("PesaRusa")}
             onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 40.49 55.34"
                  {...props}
                >
                  <path
                    d="M2.72 27.81A19.063 19.063 0 0 0 0 37.94c.1 5.59 2.6 10.57 6.55 14.07 3.69 3.26 3.79 3.47 14.01 3.28 10.22-.17 10.29-.37 13.86-3.76 3.83-3.63 6.17-8.71 6.07-14.3a18.94 18.94 0 0 0-3.19-10.21c-.79-1.18-.96-2.66-.42-3.97 1.95-4.65 3.63-11.07 1.07-15.91-2.53-4.8-9.09-7.3-18.22-7.14-9.18.16-15.7 2.92-18.15 7.84-2.48 5.01-.62 11.5 1.41 16.08.57 1.26.44 2.71-.27 3.89Zm4.82-16.22c1.41-2.84 5.51-4.41 12.31-4.52 6.73-.12 10.81 1.25 12.25 3.97 1.2 2.27.26 5.34-1.05 8.16a1.55 1.55 0 0 1-2.05.75 20.877 20.877 0 0 0-9.09-1.91c-3.33.06-6.45.89-9.2 2.31-.77.4-1.72.06-2.09-.72-1.32-2.72-2.22-5.72-1.08-8.03Z"
                    data-name="Layer 1"
                  />
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Pesa Rusa</span>
            </div>
          </article>

          <article className="feature-2">
            <input
             id="ch10"
             type="checkbox"
             name="PlacaPeso"
             checked={ch8} onClick={() => handleChClick("PlacaPeso")}
             onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-12 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 225.96 225.96"
                  {...props}
                >
                  <path
                    d="M112.98 0C50.62 0 0 50.62 0 112.98s50.62 112.98 112.98 112.98 112.98-50.62 112.98-112.98S175.33 0 112.98 0Zm0 7.79c58.05 0 105.19 47.13 105.19 105.19s-47.13 105.19-105.19 105.19S7.79 171.03 7.79 112.98 54.92 7.79 112.98 7.79Zm0 14.96c-49.8 0-90.23 40.43-90.23 90.22s40.43 90.22 90.23 90.22 90.22-40.43 90.22-90.22-40.43-90.22-90.22-90.22Zm27.26 122.75c-7.38 6.19-16.89 9.92-27.26 9.92s-19.77-3.69-27.13-9.81l-28.33 28.33c14.65 13.33 34.11 21.47 55.46 21.47s40.92-8.18 55.59-21.58l-28.32-28.32ZM52.13 57.39c-13.4 14.66-21.58 34.18-21.58 55.59s8.13 40.81 21.47 55.46l28.33-28.33c-6.12-7.36-9.81-16.82-9.81-27.13s3.73-19.89 9.92-27.26L52.14 57.4Zm121.82.13-28.33 28.33c6.12 7.36 9.81 16.82 9.81 27.13s-3.64 19.66-9.7 27l28.33 28.33c13.26-14.64 21.35-34.05 21.35-55.33s-8.13-40.81-21.46-55.46Zm-60.97 20.8c19.13 0 34.66 15.53 34.66 34.66s-15.53 34.66-34.66 34.66-34.66-15.53-34.66-34.66 15.53-34.66 34.66-34.66Zm0 14.39c-11.19 0-20.27 9.08-20.27 20.26s9.08 20.26 20.27 20.26 20.26-9.08 20.26-20.26-9.08-20.26-20.26-20.26Zm0 7.79c6.88 0 12.47 5.59 12.47 12.47s-5.59 12.47-12.47 12.47-12.47-5.59-12.47-12.47 5.59-12.47 12.47-12.47Zm55.46-48.49c-14.65-13.33-34.11-21.47-55.46-21.47s-40.69 8.08-55.33 21.35l28.33 28.33c7.34-6.06 16.74-9.7 27-9.7s19.77 3.69 27.13 9.81L168.44 52Z"
                    data-name="Capa 1"
                    style={{
                      fillRule: "evenodd",
                    }}
                  />
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Placa de Peso</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch11"
              type="checkbox"
              name="MaquinasGYM"
              checked={ch9} onClick={() => handleChClick("MaquinasGYM")}
              onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center h-10 w-14 fill-black">
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_2"
                    data-name="Capa 2"
                    viewBox="0 0 68.58 49.64"
                    {...props}
                  >
                    <g id="Layer_1" data-name="Layer 1">
                      <rect
                        width={5.34}
                        height={20.99}
                        x={6.74}
                        rx={1.26}
                        ry={1.26}
                      />
                      <rect width={5.34} height={20.99} className="cls-1" rx={1.26} ry={1.26} />
                      <rect
                        width={5.34}
                        height={20.99}
                        x={63.24}
                        rx={1.26}
                        ry={1.26}
                      />
                      <rect
                        width={5.34}
                        height={20.99}
                        x={56.49}
                        rx={1.26}
                        ry={1.26}
                      />
                      <path
                        d="M45.12 34.69H23.46c-1.03 0-1.86.83-1.86 1.86v1.48a3.91 3.91 0 0 0 3.91 3.91h2.39v4.45c0 .25-.2.45-.45.45h-1.27c-.25 0-.45.2-.45.45v1.91c0 .25.2.45.45.45H42.4c.25 0 .45-.2.45-.45v-1.91c0-.25-.2-.45-.45-.45h-1.27c-.25 0-.45-.2-.45-.45v-4.45h2.39a3.91 3.91 0 0 0 3.91-3.91v-1.48c0-1.03-.83-1.86-1.86-1.86ZM38.39 46.4c0 .25-.2.45-.45.45h-7.32c-.25 0-.45-.2-.45-.45v-4.45h8.21v4.45ZM50.04 9.26v1.12a.68.68 0 0 1-.68-.68v-.45H13.39v2.48h5.14v-1.12c.37 0 .68.3.68.68v.45h35.98V9.26h-5.15Z"
                      />
                      <path
                        d="M30.66 42.91h7.25v3.28h-7.25zM54.12 42.91h-.85c-.59 0-1.07-.48-1.07-1.07V8.89a1.071 1.071 0 0 0-2.14 0v13.86h-1.87c0 .82.67 1.49 1.49 1.49h.38v17.6c0 .59-.48 1.07-1.07 1.07h-7.81v3.28h12.95c.59 0 1.07-.48 1.07-1.07v-1.13c0-.59-.48-1.07-1.07-1.07ZM18.54 41.84v-17.6h.38c.82 0 1.49-.67 1.49-1.49h-1.87V8.89a1.071 1.071 0 0 0-2.14 0v32.95c0 .59-.48 1.07-1.07 1.07h-.85c-.59 0-1.07.48-1.07 1.07v1.13c0 .59.48 1.07 1.07 1.07h12.95V42.9h-7.81c-.59 0-1.07-.48-1.07-1.07Z"
                      />
                    </g>
                  </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Máquinas en Gym</span>
            </div>
          </article>

          <article className="feature-2">
            <input
               id="ch12"
               type="checkbox"
               name="BancoPlano"
               checked={ch10} onClick={() => handleChClick("BancoPlano")}
               onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center h-8 w-16 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 168.87 60.27"
                  {...props}
                >
                  <path
                    d="m148.61 19.84 6.03 30.43h-4.8v10h19.02v-10h-4.03l-6.56-33.13-.59-3h3.51c3.89 0 7.07-3.18 7.07-7.07S165.08 0 161.19 0H7.68C3.79 0 .61 3.18.61 7.07s3.18 7.07 7.07 7.07h3.51l-.59 3-6.56 33.13H0v10h19.02v-10h-4.8l6.03-30.43h128.36Z"
                    data-name="Layer 1"
                  />
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Banco Plano</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch13"
              type="checkbox"
              name="BancoDeclinado"
              checked={ch11} onClick={() => handleChClick("BancoDeclinado")}
              onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center h-8 w-16 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 204.82 103.62"
                  {...props}
                >
                  <g data-name="Layer 1">
                    <path d="m5.18 80.79.34 12.83H0v10h21.03v-10h-5.52v-4.44l162.64-35.82c2.78.23 4.96 2.57 4.96 5.4v34.85h-5.52v10h21.03v-10h-5.52V58.76c0-8.5-6.92-15.42-15.42-15.42h-.54L15.52 78.95M181.5 22.95c-.32.03-.63.07-.95.14l-53.97 12.18c-3.8.86-.68 14.66 3.12 13.8l53.97-12.18c3.8-.86 6.2-4.66 5.34-8.46-.1-.46-.26-.91-.44-1.33-2.73-.73-5.16-2.18-7.07-4.15ZM117.78 37.26 38.8 55.09c-3.8.86-6.2 4.66-5.34 8.46.86 3.8 4.66 6.2 8.46 5.34l78.98-17.83c3.79-.86.68-14.66-3.12-13.8ZM192.51 0c-6.8 0-12.32 5.51-12.32 12.32s5.51 12.32 12.32 12.32 12.32-5.51 12.32-12.32S199.32 0 192.51 0Zm0 17.75c-3 0-5.43-2.43-5.43-5.43s2.43-5.43 5.43-5.43 5.43 2.43 5.43 5.43-2.43 5.43-5.43 5.43Z" />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Banco Declinado</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch14"
              type="checkbox"
              name=" BancoInclinado"
              checked={ch12} onClick={() => handleChClick("BancoInclinado")}
              onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-16 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 196.87 117.71"
                  {...props}
                >
                  <g data-name="Layer 1">
                    <path d="M176.33 56.58H121c-3.89 0-3.89 14.15 0 14.15h55.33c3.89 0 7.07-3.18 7.07-7.07s-3.18-7.07-7.07-7.07Z" />
                    <path d="M107.1 68.11c3.29 2.08 10.86-9.87 7.57-11.95L27.3 1.09C24.01-.99 19.62 0 17.54 3.28s-1.1 7.68 2.19 9.76l41.13 25.92-1.4 2.67-17.27 32.99H20.93c-8.5 0-15.42 6.92-15.42 15.42v17.66H0v10h21.03v-10h-5.52V90.04c0-2.99 2.43-5.42 5.42-5.42h155c2.99 0 5.42 2.43 5.42 5.42v17.66h-5.52v10h21.03v-10h-5.52V90.04c0-8.5-6.92-15.42-15.42-15.42H53.48l14.47-27.64 1.4-2.67 37.76 23.8Z" />
                  </g>
                </svg>
              </div>
              <span className="font-semibold text-center  w-full px-2 overflow-hidden">Banco Inclinado</span>
            </div>
          </article>

          <article className="feature-2">
            <input
               id="ch15"
               type="checkbox"
               name="Cuerda"
               checked={ch13} onClick={() => handleChClick("Cuerda")}
               onChange={onCheckboxChange}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-14 fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 21 21"
                  className=""
                >
                  <path
                    d="M19.06 17.45c-.12.05-.25.11-.37.16l-1.87-4.24c.15-.07.31-.13.46-.2.48-.21.06-.92-.41-.7-.12.06-.25.11-.37.17s-.74.33-.74.33c-.29-.77-1.12-2.38-3.26-3.14.22-3.5.01-7.76-2.07-9.2C9.27-.17 7.25-.2 5.16.55 3.15 1.25.8 2.81.14 5.08c-.29 1-.12 1.89.49 2.67 1.66 2.08 6.08 2.63 8.65 2.48.91-.05 1.68.02 2.34.18-.12 1.51-.31 2.91-.49 3.91l-1.03-.17c-.1-.01-.2-.03-.3-.05-.51-.08-.74.7-.22.79.13.02.26.04.38.06l-.73 4.58c-.1-.02-.2-.03-.3-.05-.51-.08-.74.7-.22.79a3558.088 3558.088 0 0 0 3.12.5l.41.06c.51.08.74-.7.22-.79-.16-.03-.33-.05-.49-.08l.73-4.58.41.06c.51.08.74-.7.22-.79-.16-.03-.33-.05-.49-.08s-.91-.15-.91-.15c.12-.68.34-2.1.48-3.79 1.77.7 2.39 2.06 2.58 2.63l-1.05.47c-.12.05-.24.11-.36.16-.48.21-.06.92.41.7l.27-.12 1.87 4.24c-.12.05-.24.1-.36.16-.48.21-.06.92.41.7l.27-.12 2.54-1.12c.15-.07.31-.14.46-.2.48-.21.06-.92-.41-.7ZM9.84 9.4c-.2 0-.4 0-.6.02-2.48.14-6.59-.45-7.97-2.18-.45-.56-.56-1.2-.35-1.93.58-1.98 2.7-3.36 4.49-4 1.82-.65 3.6-.66 4.53-.02 1.67 1.15 1.92 4.89 1.73 8.3-.54-.12-1.15-.19-1.83-.19Zm1.33 10.44-1.13-.18.73-4.57 1.13.18-.73 4.57Zm5.72-1.43-1.87-4.24 1.05-.46 1.87 4.24-1.05.46Z"
                    data-name="icon 3-4"
                  />
                </svg>
              </div>
              <span className="font-semibold text-center ">Cuerda</span>
            </div>
          </article>

          <article className="feature-2">
            <input
              id="ch16"
              type="checkbox"
              name="Todos"
              onChange={onCheckboxChange}
              checked={Todos} onClick={handleAllClick}
              className="inputArticle-2"
            />
            <div className="divArticle-2 flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center h-8 w-16  fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Capa 2"
                  viewBox="0 0 225.96 146.77"
                  {...props}
                >
                  <path
                    d="M25.48 13.55H3.9c-2.15 0-3.9 1.74-3.9 3.9v65.32a3.89 3.89 0 0 0 3.9 3.89h21.59v9.65c0 2.15 1.74 3.9 3.9 3.9h25.48c2.15 0 3.9-1.74 3.9-3.9v-29.5h20.16l.06.33c.77 4.53 3.48 8.5 7.42 10.87l15.73 9.46c-1.55 19.98-6.29 37.67-13.1 53.88a3.9 3.9 0 0 0 2.08 5.1 3.9 3.9 0 0 0 5.1-2.08c7.4-17.6 12.46-36.87 13.86-58.75.09-1.45-.63-2.84-1.88-3.59l-17.77-10.7a7.993 7.993 0 0 1-3.75-5.5l-4.15-24.46c-.43-2.55.4-5.15 2.22-6.97l7.16-7.16c1.5-1.5 3.52-2.34 5.64-2.34h38.06c4.41 0 7.98 3.57 7.98 7.97v109.98c0 2.15 1.75 3.9 3.9 3.9s3.89-1.75 3.89-3.9V66.79h15.84v29.5c0 2.15 1.74 3.9 3.9 3.9h25.48c2.15 0 3.9-1.74 3.9-3.9v-9.65h21.59c2.15 0 3.9-1.74 3.9-3.89V17.44c0-2.15-1.75-3.9-3.9-3.9H200.5V3.9c0-2.15-1.74-3.9-3.9-3.9h-25.48c-2.15 0-3.9 1.74-3.9 3.9v29.5h-15.84v-.51c0-8.71-7.06-15.77-15.77-15.77H97.55c-4.18 0-8.19 1.66-11.15 4.62l-7.16 7.16a15.839 15.839 0 0 0-3.15 4.5H58.78V3.9c0-2.15-1.75-3.9-3.9-3.9H29.4c-2.15 0-3.9 1.74-3.9 3.9v9.65Zm167.2-5.76v84.63h-17.69V7.79h17.69Zm-159.41 0h17.69v84.63H33.27V7.79Zm167.2 13.55v57.53h17.69V21.34h-17.69Zm-174.99 0H7.79v57.53h17.69V21.34Zm49.16 19.85H58.76v17.83H77.6l-2.77-16.34c-.09-.5-.15-1-.18-1.49Zm76.71 0v17.83h15.84V41.19h-15.84Z"
                    data-name="Capa 1"
                    style={{
                      fillRule: "evenodd",
                    }}
                  />
                </svg>
              </div>
              <span className="font-semibold text-center ">Todos</span>
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

export default Seccion6;
