import { Sequelize } from "sequelize";

const dbUrl = process.env.POSTGRES_DB_URL as string;

// Create new Sequelize instance with database url and pool setup
export const sequelize: Sequelize = new Sequelize(dbUrl, {
	pool: {
		max: 10,
		min: 0,
		acquire: 5000,
		idle: 0
	}
});
