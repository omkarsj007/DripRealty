var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const bcrypt = require('bcrypt');

var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/driprealty');
var collection = db.get('users');

async function dbCount(){
	return await collection.count()
}

router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {
	res.json({ message: "Welcome!!" } );

});


// Method used to retrieve users
router.get("/userLoggedIn", auth, function(req, res) {
  try {
    collection.findOne({ email: req.email }, function(err, user){
		res.json(user);
	})
	
  } catch (error) {
    console.log(error);
  }
});


router.post('/register', function(req, res) {
	
	const {id, first_name, last_name, email, pwd,
   			phone_num, Age, join_date,favorites, host } = req.body;

	if(!(email && pwd)){

		res.json( { error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({ error : "User already exists. Please login!"} );

			}
			else{
				bcrypt.hash(pwd, 10, function(err, hash) {
					// Store hash in your password DB.
				
					collection.count({}, function (error, count) {
							let id = "U" + (count+1)
							let pwd = hash
							let newUser = {
									id, first_name, last_name, email, pwd,
							phone_num, Age, join_date,favorites, host

								}
							collection.insert(newUser, function(err, user){
								
								if (err) throw err;
								var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

								if (token){
									user.token = token;

								}
								res.json(user);

							})
					});

				});
				


			}


		});	

	}



});

router.post('/login', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ error: "User doesn't exist" } );

			}
			else{
				bcrypt.compare(password, user.pwd).then(function(result) {
					if (result){
						var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
						user.token = token;
						res.json(user);
	
					}
					else{
						res.json( {error: "User email or password is incorrect!" } );
	
					}
				});
				

			}

		});

	}

});




module.exports = router;