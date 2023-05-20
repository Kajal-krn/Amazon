const app = require("./app");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting dow the server due to the Uncaught Exception`);
    process.exit(1);
})


//config
dotenv.config({ path: "backend/config/config.env" });

//database 
ConnectDatabase()  

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server dur to unhandled Promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})