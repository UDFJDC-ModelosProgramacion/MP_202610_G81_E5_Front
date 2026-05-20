import React,{useState,useEffect} from 'react';

import{
MdArrowBack,
MdAdd,
MdEventNote,
MdHistory
}
from 'react-icons/md';

import{
useNavigate,
useParams
}
from 'react-router-dom';

import{
getPetLifeEvents
}
from '../../services/LifeEventService';

import './ConsultarEventos.css';

const ConsultarEventosPage=()=>{

const {id}=useParams();

const navigate=useNavigate();

const [eventos,setEventos]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

const fetchEventos=async()=>{

try{

const data=
await getPetLifeEvents(id);

setEventos(data);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};

fetchEventos();

},[id]);

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

Historial

</div>

<h1>

Eventos de Vida 📋

</h1>

<p>

Consulta el historial completo
de actividades y eventos.

</p>

</div>

<MdHistory className="heroIcon"/>

</div>

<div className="formCard">

<div className="cardTop">

<MdArrowBack
className="topIcon"
onClick={()=>navigate(-1)}
/>

<MdAdd
className="topIcon"
onClick={()=>
navigate(
'/registrar-evento-vida'
)
}
/>

</div>

{

loading?

<div className="emptyState">

<p>

Cargando historial...

</p>

</div>

:

eventos.length===0?

<div className="emptyState">

<MdEventNote
size={60}
/>

<p>

No existen eventos registrados

</p>

</div>

:

<div className="timeline">

{

eventos.map(evento=>(

<div
key={evento.id}
className="timelineItem"
>

<div className="timelineDot"/>

<div className="timelineContent">

<span>

{evento.date}

</span>

<h3>

{

evento.type?.name||

'Evento'

}

</h3>

<p>

{

evento.description

}

</p>

</div>

</div>

))

}

</div>

}

</div>

</div>

</div>

)

}

export default ConsultarEventosPage;