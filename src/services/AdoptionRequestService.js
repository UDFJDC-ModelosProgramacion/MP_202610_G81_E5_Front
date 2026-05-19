import axios from 'axios';

const API_URL = '/api/adoption-requests';

export const createAdoptionRequest = async (requestData) => {
    try {
        const response = await axios.post(API_URL, requestData);
        return response.data;
    } catch(error){

console.error(
'Error al crear solicitud:',
error.response?.data || error
);

throw error;

}
};