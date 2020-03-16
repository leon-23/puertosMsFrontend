import axios from './axiosInstance';

class UserService {

	static login(user){
		return axios.post('/login', user);
	}

	static register(user){
		return axios.post('/register', user)
	}

	static findByEmail(email){
		return axios.get(`find/${email}`);
	}
}

export default UserService;