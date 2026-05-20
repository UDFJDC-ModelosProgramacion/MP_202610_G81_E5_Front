import React,{useState,useEffect} from 'react';

import {
MdArrowBack,
MdCheck,
MdPets
}
from 'react-icons/md';

import {useNavigate} from 'react-router-dom';

import {createAdoptionRequest}
from '../../services/AdoptionRequestService';
import { getPets } from '../../services/LifeEventService';
import './SolicitarAdopcion.css';

const SolicitarAdopcionPage=()=>{
const authUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
  
const navigate=useNavigate();

const [mascotaId,setMascotaId]=useState('1');

const [tipoVivienda,setTipoVivienda]=useState('Casa');

const [tieneMascotas,setTieneMascotas]=useState('false');

const [loading,setLoading]=useState(false);

const [opcionesMascota,setOpcionesMascota]=useState([]);

useEffect(()=>{

const cargarMascotas=async()=>{

try{

const pets=await getPets();

const mascotas=pets.map(p=>({

value:String(p.id),

label:`${p.name} (ID:${p.id})`

}));

setOpcionesMascota(mascotas);

if(mascotas.length>0){

setMascotaId(
mascotas[0].value
);

}

}

catch(error){

console.log(
'Error cargando mascotas:',
error
);

}

};

cargarMascotas();

},[]);

const opcionesVivienda=[

{
value:'Casa',
label:'Casa'
},

{
value:'Apartamento',
label:'Apartamento'
},

{
value:'Finca',
label:'Finca'
}

];

const opcionesMascotas=[

{
value:'true',
label:'Sí'
},

{
value:'false',
label:'No'
}

];

const handleGuardar=async()=>{

const payload = {
  pet: { id: parseInt(mascotaId) },
  adopter: { id: authUser.id },
  housingType: tipoVivienda,
  hasOtherPets: tieneMascotas === 'true',
  purpose: 'Adopción familiar',
  papers: 'Pendiente',
};

console.log('Payload enviado:', JSON.stringify(payload, null, 2));
try{

setLoading(true);

await createAdoptionRequest(
payload
);

alert(
'¡Solicitud enviada!'
);

navigate('/home');

}

catch(error){

console.log(
'Error completo:',
error.response?.data
);

alert(

JSON.stringify(
error.response?.data
)

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

Adopciones

</div>

<h1>

Solicitar Adopción 🏠

</h1>

<p>

Completa la información para iniciar
el proceso de adopción.

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

<select
value={tipoVivienda}
onChange={(e)=>
setTipoVivienda(
e.target.value
)
}
>

{

opcionesVivienda.map(op=>(

<option
key={op.value}
value={op.value}
>

{op.label}

</option>

))

}

</select>

<div>
  <label style={{display:'block', marginBottom:'4px', fontWeight:'500'}}>
    ¿Tiene mascotas?
  </label>
  <select
    value={tieneMascotas}
    onChange={(e)=>
      setTieneMascotas(
        e.target.value
      )
    }
  >
    {opcionesMascotas.map(op=>(
      <option
        key={op.value}
        value={op.value}
      >
        {op.label}
      </option>
    ))}
  </select>
</div>

</div>

<button
className="saveButton"
onClick={handleGuardar}
disabled={loading}
>

{

loading
?
'Enviando...'
:
'Enviar Solicitud'

}

</button>

</div>

</div>

</div>

)

}

export default SolicitarAdopcionPage;
