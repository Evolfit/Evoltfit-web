import React, { useState } from "react";

function Seccion41(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui
    props.onChange(value);
  };
  const { valor } = props;
  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          ¿Qué enfoque te gustaría darle a tu rutina?
        </h1>
      </div>
      <br />
      <br />
      <br />

      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:gap-2 xl:w-full xl:max-w-screen-sm">
          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_1"
              type="radio"
              name="focus"
              value="superior"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_1"
            >
              <div className="xl:grid xl:place-items-center">
                <div className="h-36 w-36">
                  {valor === "hombre" ? (
                    <img src="img/torsoS.png"></img>
                  ) : (
                    <img src="img/torsoSM.png"></img>
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Tronco superior
              </span>
            </label>
          </div>

          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_2"
              type="radio"
              name="focus"
              value="brazos"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_2"
            >
              <div className="xl:grid xl:place-items-center">
                <div className="h-36 w-36">
                  {valor === "hombre" ? (
                    <img src="img/brazo.png"></img>
                  ) : (
                    <img src="img/brazoM.png"></img>
                  )}

                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Brazos
              </span>
            </label>
          </div>

          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_3"
              type="radio"
              name="focus"
              value="pierna"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_3"
            >
              <div className="xl:grid xl:place-items-center">
                <div className="h-36 w-36">
                {valor === "hombre" ? (
                    <img src="img/pierna.png"></img>
                  ) : (
                    <img src="img/piernaM.png"></img>
                  )}
                  
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Tronco inferior
              </span>
            </label>
          </div>
          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_4"
              type="radio"
              name="focus"
              value="completo"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_4"
            >
              <div className="xl:grid xl:place-items-center">
                <div className="h-36 w-36">
                {valor === "hombre" ? (
                    <img src="img/completo2.png"></img>
                  ) : (
                    <img src="img/completo2M.png"></img>
                  )}
                  
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Completo
              </span>
            </label>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Seccion41;
