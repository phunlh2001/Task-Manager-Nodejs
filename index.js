import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import tasks from "./routes/tasks.route.js";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () =>
      console.log(`App started on port http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("err", err));
