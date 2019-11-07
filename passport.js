const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Admin = mongoose.model('admins');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(user => {
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err => console.error(err));
		Admin.findById(jwt_payload.id)
			.then(admin => {
				if (admin) {
					return done(null, admin);
				}
				return done(null, false);
			})
			.catch(err => console.error(err));

	}));
}