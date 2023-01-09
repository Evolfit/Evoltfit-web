import React, { useEffect } from "react";

export default function nosotros() {

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, [])

  return (
    <div>
      
    </div>
  );
}
