var users = { admin: {id:1, username:"admin", password:"12345"},
			pepe: {id:2, username:"pepe", password:"5678"}
	};

exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}else{
			callback(new Error('password erroneo.'));
		}
	}else{
		callback(new Error('No existe usuario.'));
	}
};