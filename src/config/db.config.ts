import { Sequelize } from "sequelize";

const dbUrl = process.env.POSTGRES_DB_URL || "postgres://postgres:profico@localhost:5432/postgres";

export const sequelize: Sequelize = new Sequelize(dbUrl, {
	pool: {
		max: 10,
		min: 0,
		acquire: 5000,
		idle: 0
	}
});
