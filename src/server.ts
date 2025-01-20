import express from "express";
import "reflect-metadata";
import { router } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Configurando o CORS para permitir qualquer origem
app.use(cors({
    origin: '*',  // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite os métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite cabeçalhos específicos
}));

app.use(bodyParser.json());

app.use(router);

app.listen(3333, () => console.log(`Server is running on port 3333`));
