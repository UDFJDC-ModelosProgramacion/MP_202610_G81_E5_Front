import React, { useState, useEffect } from 'react';
import {
MdArrowBack,
MdCheck,
MdPets
} from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { createPet } from '../../services/PetService';

import './RegistrarMascota.css';

const RegistrarMascotaPage=()=>{

const navigate=useNavigate();

const [loading,setLoading]=useState(false);

const [formData,setFormData]=useState({

name:'',
species:'1',
breed:'',
birthDate:'',
weight:'',
gender:'1',
color:'',
notes:'',
shelterId:''

});

const [shelters,setShelters]=useState([]);

useEffect(()=>{

fetch('/api/shelters')

.then(r=>r.json())

.then(data=>{

setShelters(

data.map(s=>({

value:String(s.id),
label:s.name

}))

);

if(data.length>0){

setFormData(prev=>({
...prev,
shelterId:String(data[0].id)
}));

}

})

.catch(()=>setShelters([]));

},[]);

const especiesOptions=[

{value:'1',label:'Perro'},
{value:'2',label:'Gato'},
{value:'3',label:'Ave'},
{value:'4',label:'Conejo'},
{value:'5',label:'Otro'}

];

const generoOptions=[

{value:'1',label:'Macho'},
{value:'2',label:'Hembra'}

];

const handleChange=(e)=>{

const {name,value}=e.target;

setFormData({

...formData,
[name]:value

})

}

const handleGuardar=async()=>{

if(!formData.shelterId){

alert(
'Primero debes crear un refugio'
);

return;

}

const payload={

name:formData.name,
breed:formData.breed,
birthDate:formData.birthDate,
weight:parseFloat(formData.weight)||null,
color:formData.color,
notes:formData.notes,

shelter:{
id:parseInt(formData.shelterId)
},

species:{
id:parseInt(formData.species)
},

gender:{
id:parseInt(formData.gender)
}

};

try{

setLoading(true);

const response=await createPet(
payload
);

alert(
'¡Mascota creada! ID: '+response.id
);

navigate('/home');

}

catch(error){

alert(
'Error: '+error.message
);

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

Mascotas

</div>

<h1>

Registrar Mascota 🐶

</h1>

<p>

Añade una nueva mascota al sistema.

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
name="name"
placeholder="Nombre"
value={formData.name}
onChange={handleChange}
/>

<select
name="species"
value={formData.species}
onChange={handleChange}
>

{

especiesOptions.map(option=>(

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

))

}

</select>

<input
name="breed"
placeholder="Raza"
value={formData.breed}
onChange={handleChange}
/>

<input
type="date"
name="birthDate"
value={formData.birthDate}
onChange={handleChange}
/>

<input
name="weight"
placeholder="Peso"
value={formData.weight}
onChange={handleChange}
/>

<select
name="gender"
value={formData.gender}
onChange={handleChange}
>

{

generoOptions.map(option=>(

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

))

}

</select>

<input
name="color"
placeholder="Color"
value={formData.color}
onChange={handleChange}
/>

<input
name="notes"
placeholder="Notas"
value={formData.notes}
onChange={handleChange}
/>

<select
name="shelterId"
value={formData.shelterId}
onChange={handleChange}
>

{

shelters.map(s=>(

<option
key={s.value}
value={s.value}
>

{s.label}

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
'Registrar Mascota'

}

</button>

</div>

</div>

</div>

)

}

export default RegistrarMascotaPage;