import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import rootRouter from "./routers/rootRouter";
import datesRouter from "./routers/datesRouter";
import updateRouter from "./routers/updateRouter"
import goalsRouter from "./routers/goalsRouter";
import apiRouter from "./routers/apiRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
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
app.use("/goals", goalsRouter);
app.use("/dates", datesRouter);
app.use("/update", updateRouter);
app.use("/api", apiRouter);

app.use("/static", express.static("assets"));
app.use("/uploads", express.static("uploads"));

export default app;