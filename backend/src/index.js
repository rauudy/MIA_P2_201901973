const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://18.214.99.177:${PORT}`)
    // console.log(`Servidor corriendo en http://localhost:${PORT}`)
})