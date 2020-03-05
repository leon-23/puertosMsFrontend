import axios from './axiosInstance';

class PuertoService {

	static getPuertos(){
		return axios.get('/puertos');
	}

	static findById(id){
		return axios.get(`/puertos/${id}`);	
	}

	static save(data){
		return axios.post(`/puertos`, data);	
	}

	static update(data){
		return axios.put(`/puertos`, data);	
	}

	static deletePuerto(id){
		return axios.delete(`/puertos/${id}`);	
	}

	static findByPort(puerto){
		return axios.get(`/puertos/find/${puerto}`)
	}
} 

export default PuertoService;