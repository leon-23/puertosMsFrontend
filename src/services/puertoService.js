import axios from './axiosInstance';

class PuertoService {

	static getPuertos(){
		return axios.get('/puertos');
	}

	static getPuerto(id){
		return axios.get(`/puertos/${id}`);	
	}

	static savePuerto(data){
		return axios.post(`/puertos`, data);	
	}

	static updatePuerto(data){
		return axios.put(`/puertos`, data);	
	}

	static deletePuerto(id){
		return axios.delete(`/puertos/${id}`);	
	}
} 

export default PuertoService;