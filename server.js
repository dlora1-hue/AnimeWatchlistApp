const express = require("express");
const path = require("path");
const readline = require("readline");
const mongoose = require("mongoose");
require("dotenv").config({
   path: path.resolve(__dirname, "credentialsDontPost/.env"),
});
const animeRoutes = require("./routes/routes");
const app = express();

if (process.argv.length !== 3) {
    console.log("Usage node server.js PORT_NUMBER");
    process.exit(1);
}

const portNumber = process.argv[2];
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => console.log("Connected to MongoDB.")).catch(error => console.error("MongoDB connection error:", error));

app.use("/", animeRoutes);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question("Stop to shutdown the server: ", command => {
        if (command === "stop") {
            console.log("Shutting down the server");
            rl.close();
            process.exit(0);
        } else {
            console.log(`Invalid command: ${command}`);
            promptUser();
        }
    });
}

app.listen(portNumber, () => {
    console.log(`Web server started and running at http://localhost:${portNumber}`);
    promptUser();
});
