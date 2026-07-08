/* import 'dotenv/config'
import { MongoClient } from "mongodb";

class dbClient {
    constructor() {
        const queryString = process.env.MONGODB_URI||
            `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?appName=AhorroSurtidoBD`;
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }

    async conectarBD() {
        try {
            await this.client.connect();
            this.db = this.client.db('ahorro_surtido');
            console.log("Conectado al servidor de la base de datos!");

        } catch (e) {
            console.log(e);
        }
    }
}

export default new dbClient; */

import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBD();
    }

    async conectarBD() {
        try {
            const queryString = process.env.MONGODB_URI ||
                `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/ahorro_surtido?appName=AhorroSurtidoBD`;//indico bd especifica por nombre
            //`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?appName=AhorroSurtidoBD`
            // Conectamos usando Mongoose en lugar de MongoClient
            await mongoose.connect(queryString);
            
            console.log("¡Conectado al servidor de la base de datos con Mongoose!");
        } catch (e) {
            console.error("Error al conectar a la base de datos:", e);
        }
    }
}

export default new dbClient();