import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js" 

class productosModel{

    async create(producto){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.insertOne(producto)

    }
    async createMany(producto){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.insertMany(producto)

    }

    async getOne(id){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.findOne({_id: new ObjectId(id)})
    }

    async getAll(){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.find({}).toArray()
    }

    async update(id, producto){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.updateOne({_id: new ObjectId(id)}, {$set: producto})
    }

    async delete(id){
        const colProductos = dbClient.db.collection('productos');
        return await colProductos.deleteOne({_id: new ObjectId(id)})
    }

}

export default new productosModel;