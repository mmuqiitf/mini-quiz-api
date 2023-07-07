"use strict";

import bycrypt from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.bulkInsert("Users", [
			{
				firstName: "John",
				lastName: "Doe",
				email: "johndoe@mail.com",
				password: bycrypt.hashSync("12345678"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Jane",
				lastName: "Doe",
				email: "janedoe@mail.com",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Foo",
				lastName: "Bar",
				email: "foobar@mail.com",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("Users", null, {});
	},
};
