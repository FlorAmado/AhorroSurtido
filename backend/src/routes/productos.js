import express from 'express';
const route = express.Router();
import productosController from '../controllers/productos.js'


route.post('/',productosController.create);
route.get('/:id',productosController.getOne);
route.get('/',productosController.getAll);
route.put('/:id',productosController.update);
route.delete('/:id',productosController.delete);

export default route;