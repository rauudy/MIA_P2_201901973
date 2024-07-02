const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://3.93.0.237:${PORT}`)
    // console.log(`Servidor corriendo en http://3.93.0.237:${PORT}`)
})