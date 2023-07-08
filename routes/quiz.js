const { authJwt } = require("../middleware");
const controller = require("../controllers/quizController");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/quiz", [authJwt.verifyToken], controller.index);
	// app.post("/api/quiz", [authJwt.verifyToken], controller.store);
	// store respondents answers
	app.post(
		"/api/quiz/scores",
		[authJwt.verifyToken],
		controller.storeRespondentAnswers
	);
	app.get("/api/quiz/:id", [authJwt.verifyToken], controller.show);
	// app.put("/api/quiz/:id", [authJwt.verifyToken], controller.update);
	// app.delete("/api/quiz/:id", [authJwt.verifyToken], controller.destroy);
};
