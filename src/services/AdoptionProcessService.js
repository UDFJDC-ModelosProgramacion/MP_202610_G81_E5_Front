const BASE_URL="http://localhost:8080/api/adoption-processes";

export async function getAdoptionProcesses(){

    const response=await fetch(BASE_URL);

    if(!response.ok){
        throw new Error("Error obteniendo procesos");
    }

    return response.json();
}

export async function updateProcessStatus(id,process,newStatus){

    const updatedProcess={
        ...process,
        status:newStatus
    };

    const response=await fetch(`${BASE_URL}/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updatedProcess)
    });

    if(!response.ok){
        throw new Error("No se pudo actualizar el proceso");
    }

    return response.json();
}

export function filterAdoptionProcesses(processes,filters={}){

    return processes.filter((p)=>{

        if(filters.status!=="ALL" &&
            filters.status &&
            p.status!==filters.status){
            return false;
        }

        if(filters.search){

            const adopter=
            `${p.adopter?.name || ""} ${p.adopter?.lastName || ""}`
            .toLowerCase();

            if(!adopter.includes(
                filters.search.toLowerCase()
            )){
                return false;
            }
        }

        if(filters.petName){

            const pet=
            (p.pet?.name || "")
            .toLowerCase();

            if(!pet.includes(
                filters.petName.toLowerCase()
            )){
                return false;
            }
        }

        return true;

    });

}