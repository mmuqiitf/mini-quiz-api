const db = require("../models");
const User = db.user;
const secret = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	// Save User to Database
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	})
		.then((user) => {
			res
				.status(200)
				.send({ message: "User was registered successfully!", user });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!",
				});
			}

			const token = jwt.sign({ id: user.id }, secret, {
				algorithm: "HS256",
				allowInsecureKeySizes: true,
				expiresIn: 86400, // 24 hours
			});

			res.status(200).send({
				id: user.id,
				username: user.username,
				email: user.email,
				accessToken: token,
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
