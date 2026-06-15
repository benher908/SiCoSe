<<<<<<< HEAD
import { createApp } from './app.js'
import { env } from './config/env.js'

const app = createApp()

app.listen(env.PORT, () => {
  console.log(`SiCoSe backend running on http://localhost:${env.PORT}`)
})
=======
import express from "express";
const app = express();
app.listen(3000, () =>
  console.log("Backend de SiCoSe corriendo en el puerto 3000"),
);
>>>>>>> origin/develop
