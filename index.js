import express from "express";

import productsRouter from "./src/routes/products.router.js";
import categoriesRouter from "./src/routes/categories.router.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();

app.use(express.json()); // se puede utilizar el bodyParser middleware instead

app.use("/api/productos", productsRouter);
app.use(categoriesRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API de productos funcionando"); //envío al directorio raíz un texto
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`); // Aquí indico que al terminar de ejecutarse el código indique por donde estoy escuchando
});
