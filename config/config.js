require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
	development: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		dialect: "postgres",
	},
	test: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: `${DB_NAME}-test`,
		host: DB_HOST,
		dialect: "mysql",
	},
	production: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: `${DB_NAME}-production`,
		host: DB_HOST,
		dialect: "mysql",
	},
};
