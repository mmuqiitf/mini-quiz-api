const db = require("../models");
const secret = process.env.JWT_SECRET;

exports.index = (req, res) => {
	// get all quizzes data from database
	db.quiz
		.findAll()
		.then((quizzes) => {
			// send all quizzes as response
			res.status(200).send(quizzes);
		})
		.catch((err) => {
			// send error message as response
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving quizzes.",
			});
		});
};

exports.show = (req, res) => {
	const id = req.params.id;
	// get specific quiz data by id from database
	db.quiz
		.findByPk(id, {
			include: [
				{
					model: db.question,
					as: "questions",
					include: [
						{
							model: db.answer,
							as: "answers",
						},
					],
				},
			],
		})
		.then((quiz) => {
			// send quiz as response
			res.status(200).send(quiz);
		})
		.catch((err) => {
			// send error message as response
			res.status(500).send({
				message: "Error retrieving quiz with id=" + id,
			});
		});
};

exports.storeRespondentAnswers = (req, res) => {
	console.log(req.body);
	db.respondent
		.create({
			quizId: req.body.quizId,
			userId: req.body.userId,
			score: req.body.score,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.then((quiz) => {
			res.status(201).send({ message: "Quiz score saved successfully!" });
		})
		.catch((err) => {
			// send error message as response
			res.status(500).send({
				message: "Error retrieving quiz with id=" + id,
			});
		});
};
