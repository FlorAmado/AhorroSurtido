/*import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import dbClient from './src/config/dbClient.js'; // Importamos la conexión a la base de datos

import routesProductos from './src/routes/productoRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import nodoRoutes from './src/routes/nodoRoutes.js';
import apiRoutes from './src/routes/api.js'; // <-- 1. Importamos las nuevas rutas de la Épica 3

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas originales
app.use('/productos', routesProductos);
app.use('/auth', authRoutes);
app.use('/api/nodes', nodoRoutes);
app.use('/nodos', nodoRoutes); // ruta nodos
//app.use('/api/nodos', nodoRoutes); //! correccion valida que deberiamos aplicar, primero testear nodos

// 2. Inyectamos el prefijo /api para las nuevas rutas
app.use('/api', apiRoutes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en puerto ' + PORT));
} catch (e) {
    console.log(e);
}*/

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // <-- 1. Importamos CORS
import dbClient from './src/config/dbClient.js'; 

import routesProductos from './src/routes/productoRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import nodoRoutes from './src/routes/nodoRoutes.js';
import apiRoutes from './src/routes/api.js';

const app = express();

//  Configuración de CORS permitiendo solo a tu frontend
app.use(cors({
    origin: 'https://ahorro-surtido.vercel.app', 
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Alineamos las rutas bajo el prefijo /api que espera tu authService.js
app.use('/api/auth', authRoutes); 
app.use('/api/productos', routesProductos);
app.use('/api/nodos', nodoRoutes);

app.use('/api', apiRoutes);

try {
    // 4. Usamos el puerto 5000 por defecto para que coincida con tu .env del front
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT, () => console.log('Servidor activo en puerto ' + PORT));
} catch (e) {
    console.log(e);
}