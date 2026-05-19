import React, { useState, useEffect } from 'react';

import {
MdArrowBack,
MdCheck,
MdEvent,
MdAttachFile
}
from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import {
createLifeEvent,
getPets,
getTypeLifeEvents
}
from '../../services/LifeEventService';

import './RegistrarEvento.css';

const RegistrarEventoPage=()=>{

const navigate=useNavigate();

const [tipoEventoId,setTipoEventoId]=useState('');
const [mascotaId,setMascotaId]=useState('');

const [fecha,setFecha]=useState(
new Date().toISOString().split('T')[0]
);

const [descripcion,setDescripcion]=useState('');

const [opcionesEvento,setOpcionesEvento]=useState([]);
const [opcionesMascota,setOpcionesMascota]=useState([]);

const [loading,setLoading]=useState(false);

useEffect(()=>{

const cargarDatos=async()=>{

try{

const pets=await getPets();
const types=await getTypeLifeEvents();

setOpcionesMascota(

pets.map(p=>({

value:p.id,
label:p.name

}))

);

setOpcionesEvento(

types.map(t=>({

value:t.id,
label:t.name

}))

);

if(pets.length){

setMascotaId(
String(pets[0].id)
)

}

if(types.length){

setTipoEventoId(
String(types[0].id)
)

}

}

catch(error){

console.log(error);

}

}

cargarDatos();

},[]);

const handleGuardar=async()=>{

if(
!descripcion||
!tipoEventoId||
!mascotaId
){

alert(
'Completa todos los campos'
);

return;

}

const payload={

description:descripcion,

date:fecha,

pet:{
id:parseInt(mascotaId)
},

type:{
id:parseInt(tipoEventoId)
},

veterinarian:{
id:1
}

};

try{

setLoading(true);

await createLifeEvent(
payload
);

alert(
'Evento creado correctamente'
);

navigate('/home');

}

catch(error){

alert(
'Error al guardar'
);

console.log(error);

}

finally{

setLoading(false);

}

}

return(

<div className="layout">

<div className="sidebar">

<button className="menuButton">

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

Eventos

</div>

<h1>

Registrar Evento 📅

</h1>

<p>

Añade eventos médicos o actividades
relacionadas con mascotas.

</p>

</div>



</div>

<div className="formCard">

<div className="cardTop">

<MdArrowBack
className="topIcon"
onClick={()=>navigate('/home')}
/>

<MdCheck
className="topIcon"
onClick={handleGuardar}
/>

</div>

<div className="formGrid">

<select
value={tipoEventoId}
onChange={(e)=>
setTipoEventoId(
e.target.value
)
}
>

{

opcionesEvento.map(op=>(

<option
key={op.value}
value={op.value}
>

{op.label}

</option>

))

}

</select>

<input
type="date"
value={fecha}
onChange={(e)=>
setFecha(
e.target.value
)
}
/>

<select
value={mascotaId}
onChange={(e)=>
setMascotaId(
e.target.value
)
}
>

{

opcionesMascota.map(op=>(

<option
key={op.value}
value={op.value}
>

{op.label}

</option>

))

}

</select>

<input
placeholder="Descripción"
value={descripcion}
onChange={(e)=>
setDescripcion(
e.target.value
)
}
/>

</div>

<div className="uploadBox">

<MdAttachFile/>

Subir soporte (PDF / Imagen)

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
'Guardar Evento'

}

</button>

</div>

</div>

</div>

)

}

export default RegistrarEventoPage;