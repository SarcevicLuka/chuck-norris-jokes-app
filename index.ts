import "dotenv/config";
import { sequelize } from "./src/config/db.config";
import { app } from "./web";

const PORT = process.env.PORT;

sequelize.sync();

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
