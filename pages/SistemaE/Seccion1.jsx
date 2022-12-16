import React, { useState } from 'react'


function Seccion1() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='s'>
      <h1>¿Cual de las siguientes opciones te describe mejor?</h1>
      <br /><br /><br />
      <input
        type="radio"
        name="radioGroup"
        value="image1"
        checked={selectedValue === 'image1'}
        onChange={handleChange}
      />
      <img src="/path/to/image1.jpg" alt="Image 1" />
      <input
        type="radio"
        name="radioGroup"
        value="image2"
        checked={selectedValue === 'image2'}
        onChange={handleChange}
      />
      <img src="/path/to/image2.jpg" alt="Image 2" />
      <input
        type="radio"
        name="radioGroup"
        value="image3"
        checked={selectedValue === 'image3'}
        onChange={handleChange}
      />
      <img src="/path/to/image3.jpg" alt="Image 3" />
    </div>
  )
}

export default Seccion1