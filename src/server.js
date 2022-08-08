import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
       secret: process.env.COOKIE_SECRET,
       resave: false,
       saveUninitialized: false,
       store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use("/", rootRouter);

app.use("/static", express.static("assets"));

export default app;