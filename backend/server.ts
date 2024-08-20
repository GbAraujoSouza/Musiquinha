import express from "express";
import configDotenv from "./src/config/dotenv";
import cors from "cors";
import { router } from "./src/routes/routes";
import configAuth from "./src/middlewares/user-credential.middleware";
import passport from "passport";

configDotenv();
configAuth();

const app = express();
const port = process.env.PORT;

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} app listening at http://localhost:${port}`,
  );
});
