import 'dotenv/config'
import express from 'express';
import routesProductos from './src/routes/productos.js';
import bodyParser from 'body-parser';
import dbClient from './src/config/dbClient.js'; // Importamos la conexión a la base de datos

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/productos', routesProductos)

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> console.log('Servidor activo en puerto ' + PORT))

} catch(e){
    console.log(e);
}
