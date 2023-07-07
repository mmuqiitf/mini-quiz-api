"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Respondent extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Respondent.belongsTo(models.Quiz, {
				foreignKey: "quizId",
				as: "quizzes",
			});

			Respondent.belongsTo(models.User, {
				foreignKey: "userId",
				as: "users",
			});
		}
	}
	Respondent.init(
		{
			quizId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			score: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "respondents",
		}
	);
	return Respondent;
};
