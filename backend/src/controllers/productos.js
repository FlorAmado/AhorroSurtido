class productosController {

    constructor(){

    }

    //metodos asincrónicos

    async create(req,rest){
        try{
            rest.status(201).json({status: 'create-ok'});
        }catch(e){
            rest.status(500).send(e)
        }

    }
    async update(req,rest){
         try{
            rest.status(201).json({status: 'update-ok'});
        }catch(e){
            rest.status(500).send(e)
        }

    }
    async delete(req,rest){
         try{
            rest.status(201).json({status: 'delete-ok'});
        }catch(e){
            rest.status(500).send(e)
        }
    }
    async getAll(req,rest){
         try{
            rest.status(201).json({status: 'getall-ok'});
        }catch(e){
            rest.status(500).send(e)
        }
    }
    async getOne(req,rest){
        try{
            rest.status(201).json({status: 'getone-ok'});
        }catch(e){
            rest.status(500).send(e)
        }
    }

}

export default new productosController();