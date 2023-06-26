import "dotenv/config";
import { sequelize } from "./src/config/db.config";
import app from "./app";

const PORT = process.env.PORT || 8080;

sequelize.sync();

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
