import { sequelize } from "./config/db.config";
import app from "./app";

const PORT = process.env.PORT || 8080;

sequelize.sync();

const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default server;
