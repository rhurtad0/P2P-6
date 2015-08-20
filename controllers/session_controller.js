//login required

exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};

//get /login

exports.new = function(req, res){
	var errors = req.session.errors|| {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

//post login

exports.create = function(req, res){

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(errors, user){

		if(errors){
			//si hay error retornamos mensajes
			req.session.errors = [{"message": " Se ha producido un error \n"+errors}];
			res.redirect('/login');
			return;
		}

		// crea la session y guarda campos id y username
		// la session se define por la existencia de: req.session.user
		req.session.user = {id:user.id, username:user.username};

		res.redirect(req.session.redir.toString());
	});
};


exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}