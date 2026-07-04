import productosModel from '../models/productos.js'


class productosController {
    
    constructor(){
    }

    //metodos asincrónicos
    async create(req,rest){
        try{
            const data = await productosModel.create(req.body);
            rest.status(201).json(data);
        }catch(e){
            rest.status(500).send(e)
        }
    }
    
    async createMany(req,res){
        try{
            const data = await productosModel.createMany(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne(req,rest){
        try{
            const {id} = req.params;
            const data = await productosModel.getOne(id);
            rest.status(201).json(data);
        }catch(e){
            rest.status(500).send(e)
        }
    }

    async getAll(req,rest){
         try{
            const data = await productosModel.getAll();
            rest.status(201).json(data);
        }catch(e){
            rest.status(500).send(e)
        }
    }

    async update(req,rest){
         try{
            const {id} = req.params;
            const data = await productosModel.update(id, req.body);
            rest.status(200).json(data);
        }catch(e){
            rest.status(500).send(e)
        }
    }

    async delete(req,rest){
         try{
            const {id} = req.params;
            const data = await productosModel.delete(id);
            rest.status(206).json(data);
        }catch(e){
            rest.status(500).send(e)
        }
    }

}

export default new productosController();