import axios from './axiosInstance';

class PuertoService {
	//listado de puertos
	static getPuertos(){
		return axios.get('/puertos');
	}
	//busca puerto por id
	static findById(id){
		return axios.get(`/puertos/${id}`);	
	}
	//crea un puerto
	static save(data){
		return axios.post(`/puertos`, data);	
	}
	//actualiza un puerto
	static update(data){
		return axios.put(`/puertos`, data);	
	}
	//elimina (fisicamente) un puerto
	static deletePuerto(id){
		return axios.delete(`/puertos/${id}`);	
	}
	//busca un puerto por su numero
	static findByPort(puerto){
		return axios.get(`/puertos/find/${puerto}`)
	}
} 

export default PuertoService;