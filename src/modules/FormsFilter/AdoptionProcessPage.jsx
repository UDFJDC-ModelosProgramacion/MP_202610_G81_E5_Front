import { useEffect,useState,useCallback } from "react";

import { useNavigate } from "react-router-dom";

import {

getAdoptionProcesses,
filterAdoptionProcesses

}

from "../../services/adoptionProcessService";

import "./AdoptionProcessPage.css";

const STATUS_OPTIONS=[

{
value:"ALL",
label:"Todos los estados"
},

{
value:"PENDING",
label:"Pendiente"
},

{
value:"IN_REVIEW",
label:"En revisión"
},

{
value:"APPROVED",
label:"Aprobado"
},

{
value:"REJECTED",
label:"Rechazado"
}

];

const STATUS_LABELS={

PENDING:"Pendiente",

IN_REVIEW:"En revisión",

APPROVED:"Aprobado",

REJECTED:"Rechazado"

};

const EMPTY_FILTERS={

search:"",
petName:"",
status:"ALL",
dateFrom:"",
dateTo:""

};

function StatusBadge({status}){

return(

<span className={`ap-badge ap-badge--${status}`}>

{

STATUS_LABELS[status]
||
status
||
"—"

}

</span>

)

}

function ProcessCard({

process:p,
index

}){

const adopterName=

[
p.adopter?.name,
p.adopter?.lastName
]

.filter(Boolean)

.join(" ")

||

"—";

const petName=
p.pet?.name||"—";

const petSpecies=

p.pet?.species

?

` · ${p.pet.species}`

:

"";

const vetName=

[
p.veterinarian?.name,
p.veterinarian?.lastName
]

.filter(Boolean)

.join(" ")

||

"—";

const reqId=
p.request?.id||"—";

const formattedDate=

p.requestDate

?

new Date(

p.requestDate

)

.toLocaleDateString(

"es-CO",

{

day:"2-digit",
month:"short",
year:"numeric"

}

)

:

"—";

return(

<div
className="ap-process-card"
style={{

animationDelay:
`${index*40}ms`

}}
>

<div className="ap-process-card__header">

<div>

<div className="ap-process-card__name">

{adopterName}

</div>

<div className="ap-process-card__id">

Solicitud #

{reqId}

</div>

</div>

<StatusBadge
status={p.status}
/>

</div>

<div className="ap-info-item">

<span className="ap-info-item__label">

Mascota

</span>

<span>

{petName}

{petSpecies}

</span>

</div>

<div className="ap-info-item">

<span className="ap-info-item__label">

Veterinario

</span>

<span>

{vetName}

</span>

</div>

<div className="ap-info-item">

<span className="ap-info-item__label">

Fecha

</span>

<span>

{formattedDate}

</span>

</div>

<div className="ap-info-item">

<span className="ap-info-item__label">

Email

</span>

<span>

{

p.adopter?.email

||

"—"

}

</span>

</div>

</div>

)

}

export default function AdoptionProcessPage(){

const navigate=useNavigate();

const [all,setAll]=useState([]);

const [filtered,setFiltered]=useState([]);

const [filters,setFilters]=useState(

EMPTY_FILTERS

);

const [loading,setLoading]=useState(true);

const [error,setError]=useState(null);

const loadData=

useCallback(

async()=>{

setLoading(true);

setError(null);

try{

const data=

await getAdoptionProcesses();

setAll(data);

}

catch(err){

setError(

err.message

);

}

finally{

setLoading(false);

}

},

[]

);

useEffect(()=>{

loadData();

},

[loadData]);

useEffect(()=>{

setFiltered(

filterAdoptionProcesses(

all,
filters

)

);

},

[all,filters]);

const handleChange=

(field)=>

(e)=>{

setFilters(prev=>({

...prev,

[field]:

e.target.value

}))

};

const applyFilters=()=>{

setFiltered(

filterAdoptionProcesses(

all,
filters

)

)

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

Procesos

</div>

<h1>

Procesos de Adopción 📋

</h1>

<p>

Gestiona y revisa
solicitudes de adopción.

</p>

</div>

<div className="heroIcon">

🐾

</div>

</div>

<div className="formCard">

<div className="cardTop">

<button
className="topButton"
onClick={()=>navigate(-1)}
>

←

</button>

<button
className="topButton"
onClick={loadData}
>

✓

</button>

</div>

<div className="formGrid">

<input
placeholder="Nombre adoptante"
value={filters.search}
onChange={handleChange(
"search"
)}
/>

<input
placeholder="Mascota"
value={filters.petName}
onChange={handleChange(
"petName"
)}
/>

<input
type="date"
value={filters.dateFrom}
onChange={handleChange(
"dateFrom"
)}
/>

<input
type="date"
value={filters.dateTo}
onChange={handleChange(
"dateTo"
)}
/>

<select
value={filters.status}
onChange={handleChange(
"status"
)}
>

{

STATUS_OPTIONS.map(op=>(

<option
key={op.value}
value={op.value}
>

{op.label}

</option>

))

}

</select>

</div>

<button
className="saveButton"
onClick={applyFilters}
>

Filtrar Procesos

</button>

<div className="resultsHeader">

<p>

<strong>

{filtered.length}

</strong>

de

<strong>

{all.length}

</strong>

procesos

</p>

<button
className="clearButton"
onClick={()=>setFilters(
EMPTY_FILTERS
)}
>

Limpiar

</button>

</div>

{

loading

?

<div className="emptyState">

Cargando procesos...

</div>

:

error

?

<div className="emptyState">

⚠️ {error}

</div>

:

filtered.length===0

?

<div className="emptyState">

🔍 Sin resultados

</div>

:

<div className="processList">

{

filtered.map((p,i)=>(

<ProcessCard
key={p.id||i}
process={p}
index={i}
/>

))

}

</div>

}

</div>

</div>

</div>

)

}