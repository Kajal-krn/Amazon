const app = require("./app");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/database")

//config
dotenv.config({ path: "backend/config/config.env" });

//database 
ConnectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});