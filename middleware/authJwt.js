const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const secret = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
	// authorization header with format 'Bearer <token>'
	let bearerHeader = req.headers.Authorization || req.headers.authorization;

	if (!bearerHeader) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	let bearer = bearerHeader.split(" ");
	let token = bearer[1];

	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		req.userId = decoded.id;
		next();
	});
};
module.exports = {
	verifyToken,
};
