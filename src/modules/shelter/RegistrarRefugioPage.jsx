import React, { useState } from 'react';
import {
MdArrowBack,
MdCheck,
MdHome
} from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import './RegistrarRefugio.css';

const RegistrarRefugioPage=()=>{

const navigate=useNavigate();

const [loading,setLoading]=useState(false);

const [formData,setFormData]=useState({

name:'',
city:'',
location:''

});

const handleChange=(e)=>{

const {name,value}=e.target;

setFormData({

...formData,
[name]:value

})

}

const handleGuardar=async()=>{

if(!formData.name || !formData.location){

alert(
'Nombre y ubicación son obligatorios'
);

return;

}

try{

setLoading(true);

const response=await fetch(
'/api/shelters',
{

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify(formData)

}

);

if(!response.ok){

throw new Error(
'Error creando refugio'
)

}

const data=await response.json();

alert(
`Refugio creado ID:${data.id}`
);

navigate('/home');

}

catch(error){

alert(error.message);

}

finally{

setLoading(false);

}

}

return(

<div className="layout">

<div className="sidebar">

<button
className="menuButton"
>

☰

</button>

</div>

<div className="content">

<nav className="navbar">

<div className="logo">

🐾 PawHub

</div>

<div className="profile">

DM

</div>

</nav>

<div className="heroMini">

<div>

<div className="tag">

Refugios

</div>

<h1>

Registrar Refugio 🏠 

</h1>

<p>

Añade un nuevo refugio al sistema.

</p>

</div>



</div>

<div className="formCard">

<div className="cardTop">

<MdArrowBack
className="topIcon"
onClick={()=>navigate('/home')}
/>


</div>

<div className="inputGroup">

<label>

Nombre del refugio

</label>

<input
name="name"
value={formData.name}
placeholder="Ej: Patitas Felices"
onChange={handleChange}
/>

</div>

<div className="inputGroup">

<label>

Ciudad

</label>

<input
name="city"
value={formData.city}
placeholder="Ej: Bogotá"
onChange={handleChange}
/>

</div>

<div className="inputGroup">

<label>

Dirección

</label>

<input
name="location"
value={formData.location}
placeholder="Ej: Calle 10 #20-30"
onChange={handleChange}
/>

</div>

<button
className="saveButton"
onClick={handleGuardar}
disabled={loading}
>

{
loading
?
'Guardando...'
:
'Crear Refugio'
}

</button>

</div>

</div>

</div>

)

}

export default RegistrarRefugioPage