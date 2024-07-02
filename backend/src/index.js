const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://18.214.99.177:${PORT}`)
})

app.use(express.json());
app.use('/admin', adminRouter);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error conectando a la base de datos', error);
    });