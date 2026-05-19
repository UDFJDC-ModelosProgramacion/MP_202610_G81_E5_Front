import React,{useState} from 'react';

import {
MdArrowBack,
MdCheck,
MdHealthAndSafety
}
from 'react-icons/md';

import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

import {
createTrialCohabitation
}
from '../../services/TrialCohabitationService';

import {useNavigate} from 'react-router-dom';

import './RegistrarConvivencia.css';

const RegistrarConvivenciaPage=()=>{

const navigate=useNavigate();

const [procesoId,setProcesoId]=useState('1');

const [veterinarioId,setVeterinarioId]=useState('1');

const [fechaInicio,setFechaInicio]=useState('');

const [fechaFin,setFechaFin]=useState('');

const [estado,setEstado]=useState('En curso');

const opcionesEstado=[

{
value:'En curso',
label:'En curso'
},

{
value:'Aprobado',
label:'Aprobado'
},

{
value:'Rechazado',
label:'Rechazado'
}

];

const handleGuardar=async()=>{

if(
new Date(fechaFin)
<
new Date(fechaInicio)
){

alert(
'La fecha final no puede ser menor'
);

return;

}

const payload={

startDate:fechaInicio,

endDate:fechaFin,

status:estado,

adoptionProcess:{
id:parseInt(
procesoId
)
},

veterinarian:{
id:parseInt(
veterinarioId
)
}

};

try{

await createTrialCohabitation(
payload
);

alert(
'¡Convivencia registrada!'
);

navigate('/');

}

catch{

alert(
'Error al registrar convivencia'
);

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

Seguimiento

</div>

<h1>

Prueba de Convivencia 🏠

</h1>

<p>

Registra y controla
el periodo de convivencia.

</p>

</div>

<MdHealthAndSafety
className="heroIcon"
/>

</div>

<div className="formCard">

<div className="cardTop">

<MdArrowBack
className="topIcon"
onClick={()=>navigate(-1)}
/>

<MdCheck
className="topIcon"
onClick={handleGuardar}
/>

</div>

<div className="formGrid">

<Input
label="Proceso ID"
type="number"
value={procesoId}
onChange={(e)=>
setProcesoId(
e.target.value
)}
/>

<Input
label="Veterinario ID"
type="number"
value={veterinarioId}
onChange={(e)=>
setVeterinarioId(
e.target.value
)}
/>

<Input
label="Fecha Inicio"
type="date"
value={fechaInicio}
onChange={(e)=>
setFechaInicio(
e.target.value
)}
/>

<Input
label="Fecha Final"
type="date"
value={fechaFin}
onChange={(e)=>
setFechaFin(
e.target.value
)}
/>

<Select
label="Estado"
options={opcionesEstado}
value={estado}
onChange={(e)=>
setEstado(
e.target.value
)}
/>

</div>

<button
className="saveButton"
onClick={handleGuardar}
>

Registrar Convivencia

</button>

</div>

</div>

</div>

)

}

export default RegistrarConvivenciaPage;