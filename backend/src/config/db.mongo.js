const { MongoClient} = require('mongodb');
require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_PORT,
} = process.env;


const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
// const uri = `mongodb://root:M1A2024.@3.93.0.237:27017`;

const insertData = async(collec, data) => {
    console.log('URI: ', uri)
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect().then(() => console.log('Conectado a la base de datos'));
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos')
    }
};

const authenticateUser = async (username, password) => {
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection('Usuarios');
        user = await coleccion.findOne({ usuario: username });
        // const user_correo = await coleccion.findOne({ correo: username });
        // si el usuario no existe se usara el correo electronico
        if (!user) {
            const user_correo = await coleccion.findOne({ correo: username });
            user = user_correo;
        }        

        console.log(user);
        if (user && password == user.password) {
            // alert("Usuario tipo: " + user.tipoUsuario);
            return { success: true, user: user };
        } else {
            console.log("Usuario no encontrado");
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Error authenticateUser: ', error);
        return { success: false, message: 'Error during authentication' };
    } finally {
        await mongoClient.close();
    }
};

const getData = async (collec) => {
    console.log('URI: ', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        console.log('Conectado a la base de datos');
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        const result = await coleccion.find({}).toArray();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error getData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos');
    }
};

const deleteData = async (collec, id) => {
    console.log('URI: ', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        console.log('Conectado a la base de datos');
        const dbmongo = mongoClient.db(MONGO_DATABASE);
        const coleccion = dbmongo.collection(collec);
        
        // Convertir el id de cadena a ObjectId
        console.log("id mongo:"+id);
        const objectId = new ObjectId(id);
        
        // Eliminar el documento por _id
        const result = await coleccion.deleteOne({ _id: objectId });
        return result;
    } catch (error) {
        console.error('Error deleteData: ', error);
        return error;
    } finally {
        await mongoClient.close();
        console.log('Desconectado de la base de datos');
    }
};



module.exports = {
    insertData,
    authenticateUser,
    getData,
    deleteData
};