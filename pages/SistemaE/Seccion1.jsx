
function Seccion1(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui
    props.onChange(value);
  };

  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="font-catamaran text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent font-semibold mt-7 text-center">
          ¿Cuál de las siguientes opciones te describe mejor?
        </h1>
      </div>
      <br />
      <br />
      <br />

      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-2 md:w-full md:max-w-screen-sm">
          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_1"
              type="radio"
              name="gender"
              value="hombre"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded "
              htmlFor="radio_1"
            >
              <div className="grid place-items-center">
                <div className="h-8 w-8 sm:h-16 sm:w-16">
                  <img src="img/male.png"></img>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Hombre
              </span>
            </label>
          </div>

          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_2"
              type="radio"
              name="gender"
              value="mujer"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_2"
            >
              <div className="grid place-items-center">
                <div className="h-8 w-8 sm:h-16 sm:w-16">
                  <img src="img/female.png"></img>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Mujer
              </span>
            </label>
          </div>

          <div className = "divInputBoxSE">
            <input
              className="hidden"
              id="radio_3"
              type="radio"
              name="gender"
              value="otro"
              onChange={handleChange}
            />
            <label
              className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded"
              htmlFor="radio_3"
            >
              <div className="grid place-items-center">
                <div className="h-8 w-8 sm:h-16 sm:w-16">
                  <img src="img/other.png"></img>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase text-center mt-6">
                Otro
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

export default Seccion1;
