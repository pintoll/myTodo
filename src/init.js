import "dotenv/config"
import "./db";
import "./models/Recap";
import "./models/Goal";
import "./models/Today";
import app from "./server";

const PORT = 4000;

const handalListening = () => 
    console.log(`\n※ Server listesning on port http://localhost:${PORT} ... ※`);

app.listen(PORT, handalListening);
