const AWS = require('aws-sdk');
require('dotenv').config();

const {
    BUCKET_USER_ID,
    BUCKET_USER_SECRET,
    BUCKET_NAME,
    BUCKET_REGION
} = process.env;

// Función para verificar la configuración de AWS
const checkAWSConfig = () => {
    console.log('Verificando configuración de AWS:');
    console.log('BUCKET_USER_ID:', BUCKET_USER_ID ? 'Configurado' : 'No configurado');
    console.log('BUCKET_USER_SECRET:', BUCKET_USER_SECRET ? 'Configurado' : 'No configurado');
    console.log('BUCKET_NAME:', BUCKET_NAME);
    console.log('BUCKET_REGION:', BUCKET_REGION);
};

// Ejecuta la verificación al cargar el módulo
checkAWSConfig();

// Configuración de AWS
AWS.config.update({
    accessKeyId: BUCKET_USER_ID,
    secretAccessKey: BUCKET_USER_SECRET,
    region: BUCKET_REGION
});

const s3 = new AWS.S3();

const uploadFile = async (req, res) => {
    try {
        const { path, imagen } = req.body;
        const buffer = Buffer.from(path, 'base64');

        console.log('Intentando subir archivo...');
        console.log('Bucket:', BUCKET_NAME);
        console.log('Key:', imagen);

        const params = {
            Bucket: BUCKET_NAME,
            Key: imagen,
            Body: buffer,
            ACL: 'public-read',
            ContentType: 'image/jpeg'
        };

        const data = await s3.upload(params).promise();
        console.log('Imagen subida exitosamente:', data.Location);
        return res.status(200).json({ message: 'Imagen subida correctamente', url: data.Location });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        return res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
    }
};

const uploadFile2 = async (path, imagen) => {
    try {
        const buffer = Buffer.from(imagen, 'base64');
        console.log('Bucket:', BUCKET_NAME);

        const params = {
            Bucket: BUCKET_NAME,
            Key: path,
            Body: buffer,
            ACL: 'public-read',
            ContentType: 'image/jpeg/png'
        };

        const data = await s3.upload(params).promise();
        console.log('Ubicación de la imagen:', data.Location);
        return data.Location;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
};

module.exports = {
    uploadFile,
    uploadFile2
};