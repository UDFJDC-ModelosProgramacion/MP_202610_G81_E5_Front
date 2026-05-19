import React,{useState,useEffect} from 'react';

import {
MdArrowBack,
MdCheck,
MdStore
}
from 'react-icons/md';

import {useNavigate} from 'react-router-dom';

import {createShelterEvent}
from '../../services/ShelterEventService';

import './CrearEventoRefugio.css';

const CrearEventoRefugioPage=()=>{

const navigate=useNavigate();

const [nombre,setNombre]=useState('');
const [fecha,setFecha]=useState('');
const [tipo,setTipo]=useState('');
const [loading,setLoading]=useState(false);

const [refugioId,setRefugioId]=useState('');

const [refugios,setRefugios]=useState([]);

useEffect(()=>{

fetch('/api/shelters')

.then(r=>r.json())

.then(data=>{

const opciones=data.map(s=>({

value:String(s.id),
label:s.name

}));

setRefugios(opciones);

if(opciones.length){

setRefugioId(
opciones[0].value
);

}

})

.catch(()=>{

setRefugios([]);

});

},[]);

const handleGuardar=async()=>{

const selectedDate=
new Date(fecha);

const today=
new Date();

today.setHours(
0,0,0,0
);

if(selectedDate<today){

alert(
'La fecha no puede estar en el pasado'
);

return;

}

const payload={

name:nombre,

date:fecha,

type:tipo,

shelter:{
id:Number(refugioId)
}

};

try{

setLoading(true);

await createShelterEvent(
payload
);

alert(
'Evento creado'
);

navigate('/home');

}

catch(error){

alert(
'Error al crear evento'
);

}

finally{

setLoading(false);

}

};

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

Eventos Refugio

</div>

<h1>

Crear Evento 🏪

</h1>

<p>

Programa jornadas y actividades
del refugio.

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

<div className="formGrid">

<input
placeholder="Nombre del evento"
value={nombre}
onChange={(e)=>
setNombre(
e.target.value
)
}
/>

<input
type="date"
value={fecha}
onChange={(e)=>
setFecha(
e.target.value
)
}
/>

<input
placeholder="Tipo de evento"
value={tipo}
onChange={(e)=>
setTipo(
e.target.value
)
}
/>

<select
value={refugioId}
onChange={(e)=>
setRefugioId(
e.target.value
)
}
>

{

refugios.map(r=>(

<option
key={r.value}
value={r.value}
>

{r.label}

</option>

))

}

</select>

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
'Crear Evento'

}

</button>

</div>

</div>

</div>

)

}

export default CrearEventoRefugioPage;