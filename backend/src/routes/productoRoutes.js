import express from 'express';
import productosController from '../controllers/productoController.js';

const route = express.Router();

route.post('/', productosController.create);
route.post('/bulk', productosController.createMany); // Ruta agregada para carga masiva
route.get('/:id', productosController.getOne);
route.get('/', productosController.getAll);
route.put('/:id', productosController.update);
route.delete('/:id', productosController.delete);

export default route;