import Producto from '../models/Producto.js';

class productosController {

    async create(req, res) {
        try {
            const data = await Producto.create(req.body);
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async createMany(req, res) {
        try {
            const data = await Producto.insertMany(req.body);
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await Producto.findById(id);

            if (!data) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const data = await Producto.find();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            // { new: true } devuelve el objeto actualizado, runValidators aplica las reglas del schema
            const data = await Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

            if (!data) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await Producto.findByIdAndDelete(id);

            if (!data) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.status(200).json({ mensaje: 'Producto eliminado correctamente', data });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

export default new productosController();