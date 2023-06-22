import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize("postgres://postgres:profico@localhost:5432/postgres", {
	pool: {
		max: 10,
		min: 0,
		acquire: 5000,
		idle: 1000
	}
});
