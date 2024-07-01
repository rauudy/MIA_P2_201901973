require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION
});

const BUCKET_NAME = 'ht2miavacas'; // Nombre de tu bucket S3

const uploadFile = async (req, res) => {
    const { path, imagen } = req.body;
    const buffer = Buffer.from(path, 'base64');

    const s3 = new AWS.S3({
        accessKeyId: process.env.BUCKET_USER_ID,
        secretAccessKey: process.env.BUCKET_USER_SECRET
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: imagen,
        Body: buffer,
        ACL: 'public-read'
    };

    s3.putObject(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al subir la imagen');
        }
        console.log(data);
        return res.status(200).send('Imagen subida correctamente');
    });
};

const uploadFile2 = async (path, imagen) => {
    const buffer = Buffer.from(imagen, 'base64');

    const s3 = new AWS.S3({
        accessKeyId: process.env.BUCKET_USER_ID,
        secretAccessKey: process.env.BUCKET_USER_SECRET
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: 'image/jpeg/png',
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('Ubicacion de la imagen:', data.Location);
        return data.Location;
    } catch (err) {
        console.error('Error al subir la imagen:', err);
        throw err;
    }
};

module.exports = {
    uploadFile,
    uploadFile2
};
