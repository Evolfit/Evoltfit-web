//VALIDACIÓN INPUT NOMBRE
if (name == "nombre"){
    var error = ['control'];
    var regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

    if (!regex.test(value)){
      error.push("error");
    }

    setErrorDatosInput({
      ...errorDatosInput,
      [name]: error,
    });
  }

//INPUT CON MUCHOS LABELS Y DETECCIÓN DE ERRORES
  <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">{"Nombre"}</span>
            <span className="label-text-alt">{incluye(errorDatosInput.correo, "error") ? "Use una dirección de correo válida." : ""}</span>
          </label>

          <input name="correo" value={correoInput.correo || ""} onChange={handleOnInputChange} type="text" placeholder="Nombre" className={"input input-bordered w-full max-w-xs " + (incluye(errorDatosInput.correo, "error")  ? "input-error" : " ")}/>

          <label className="label">
            <span className="label-text-alt">
              {
                //(incluye(errorDatosInput.correo, "error")  ? "Use una dirección de correo válida." : "")
              }</span>
            <span className="label-text-alt">{incluye(errorDatosInput.correo, "error")  ? "Que feo nombre" : ""}</span>
          </label>

        </div>