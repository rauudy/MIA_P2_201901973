const { insertData } = require('../config/db.mongo');
const { uploadFile2 } = require('../config/bucket');
const { getData, deleteData } = require('../config/db.mongo');
// const { bcrypt } = require('bcryptjs');

const ciclo_for = async (req, res) =>  {
    
    // Recibir el parametro numero desde la URL
    const { numero } = req.params; // Obtenemos el valor desde la ruta URL
    
    // Manipulacion de datos
    let respuesta = '';
    for (let i = 0; i < numero; i++) {
        respuesta += `Iteracion ${i + 1} `;
    };

    //console.log('Respuesta a enviar', respuesta);

    // Respuesta
    res.status(200).json(
        {
            msg: respuesta
        });
};


const registro = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { path, imagen, nombre, apellido, usuario, correo, password, tipoUsuario } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, apellido, usuario, correo, password, tipoUsuario);

    // const p_2 = await bcrypt.hash(password, 10);
    await uploadFile2(path, imagen);

    const ruta_aws = `https://ht2miavacas.s3.amazonaws.com/${path}`;

    console.log('Ruta AWS', ruta_aws);
    const result = await insertData('Usuarios', {
        imagen: ruta_aws,
        nombre,
        apellido,
        usuario,
        correo,
        password,
        tipoUsuario
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar usuario',
                data: result,
                image: ruta_aws
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result,
        image: ruta_aws
    });
};

const registrar_auto = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombreA, marca, placa, modelo, precioA, ciudad } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombreA, marca, placa, modelo, precioA, ciudad);

    // const p_2 = await bcrypt.hash(password, 10);
    // await uploadFile2(path, imagen);

    // const ruta_aws = `https://ht2miavacas.s3.amazonaws.com/${path}`;

    // console.log('Ruta AWS', ruta_aws);
    const result = await insertData('Autos', {
        nombreA, 
        marca, 
        placa, 
        modelo, 
        precioA, 
        ciudad
    });

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar auto',
                data: result,
                image: ruta_aws
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};

const registrar_viaje = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombreV, ciudadO, ciudadD, dias, precioV  } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombreV, ciudadO, ciudadD, dias, precioV);

    // const p_2 = await bcrypt.hash(password, 10);
    // await uploadFile2(path, imagen);

    // const ruta_aws = `https://ht2miavacas.s3.amazonaws.com/${path}`;

    // console.log('Ruta AWS', ruta_aws);
    const result = await insertData('Viajes', {
        nombreV, 
        ciudadO, 
        ciudadD, 
        dias, 
        precioV
    });

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar auto',
                data: result,
                image: ruta_aws
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};

// Tablas de usuarios

const getUsuarios = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    console.log("Obteniendo usuario....")
    const result = await getData('Usuarios');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos usuarios',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de usuarios obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Usuarios obtenidos',
        data: result
    });
};


const deleteUsuarios = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Usuarios', id);

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar usuario',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

// Tablas de autos

const getAutos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const result = await getData('Autos');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos autos',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de autos obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Autos obtenidos',
        data: result
    });
};


const deleteAutos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Autos', id);

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar autos',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

// Tablas de viajes

const getViajes = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const result = await getData('Viajes');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos viajes',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de viajes obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Viajes obtenidos',
        data: result
    });
};


const deleteViajes = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Viajes', id);

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar viajes',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};


module.exports = {
    ciclo_for,
    registro,
    registrar_auto,
    registrar_viaje,
    getUsuarios,
    deleteUsuarios,
    getAutos,
    deleteAutos,
    getViajes,
    deleteViajes
};