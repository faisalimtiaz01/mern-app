import app from "./app"
import mongoose from "mongoose";

import env from './util/validateEnv'

const port = env.PORT;

mongoose.connect(env.MONGOO_CONNECTION_STRING)
.then(() => {
  console.log("mongoose connected");
  app.listen(port, () => {
    console.log(`server running in port: ${port}`);
  });
})
.catch(console.error);
