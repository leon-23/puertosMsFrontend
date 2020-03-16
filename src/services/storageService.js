class StorageService {

	static setUser(user){
		localStorage.setItem("user", JSON.stringify(user));
	}

	static setToken(token){
		localStorage.setItem("token", token);
	}

	static getUser(){
		return JSON.parse(localStorage.getItem("user"));
	}

	static getToken(){
		return localStorage.getItem("token");
	}

	static removeUser(){
		localStorage.removeItem("user")
	}

	static removeToken(){
		localStorage.removeItem("token")
	}
	
	static setAll(user, token){
		StorageService.setUser(user);
		StorageService.setToken(token);
	}
	
	static clear(){
		localStorage.clear()
	}
}

export default StorageService;