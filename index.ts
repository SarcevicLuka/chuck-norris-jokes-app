import { sequelize } from "./src/config/db.config";
import { app } from "./web";

const PORT = 8080;

sequelize.sync();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})