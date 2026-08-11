import 'dotenv/config'
import express from 'express';
import routesProductos from './src/routes/productoRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbClient from './src/config/dbClient.js'; // Importamos la conexión a la base de datos
import authRoutes from './src/routes/authRoutes.js';

//RUTA DE NODOS
import nodoRoutes from './src/routes/nodoRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/productos', routesProductos)
app.use('/auth', authRoutes);

app.use('/nodos', nodoRoutes); // ruta nodos

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> console.log('Servidor activo en puerto ' + PORT))

} catch(e){
    console.log(e);
}
