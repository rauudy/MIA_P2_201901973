const { Router } = require('express');
const { check } = require('express-validator');

const validate = require('../middlewares/validateAtributes');
const adminController = require('../controllers/admin.controller');
const { authenticateUser } = require('../config/db.mongo');

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

router.post('/registro_auto',
    adminController.registrar_auto
);

router.post('/registro_viaje',
    adminController.registrar_viaje
);

// Consultas

router.get('/admin/getUsuarios',
    adminController.getUsuarios
);

router.post('/admin/deleteUsuarios',
    adminController.deleteUsuarios
);

router.get('/admin/getAuto',
    adminController.getAutos
);

router.post('/admin/deleteAuto',
    adminController.deleteAutos
);

router.get('/admin/getViajes',
    adminController.getViajes
);

router.post('/admin/deleteViajes',
    adminController.deleteViajes
);

module.exports = router;