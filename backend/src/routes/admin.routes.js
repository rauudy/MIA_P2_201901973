const { Router } = require('express');
const { check } = require('express-validator');

const validate = require('../middlewares/validateAtributes');
const adminController = require('../controllers/admin.controller');
const controlauthenticateUser = require('../config/db.mongo');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            msg: 'Hola mundo de administrador'
        });
});

router.get('/ciclo_for/:numero', adminController.ciclo_for);

router.post('/registro',
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('usuario', 'El usuario es obligatorio').notEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        validate
    ], 
    adminController.registro
);

router.post('/api/login', async (req, res) => {
    const { usuario, password } = req.body;
    const result = await controlauthenticateUser.authenticateUser(usuario, password);
    
    if (result.success) {
        res.status(200).json(result.user);
    } else {
        res.status(401).json({ message: result.message });
    }
});


module.exports = router;