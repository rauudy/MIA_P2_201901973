const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            msg: 'Hola mundo de usuario'
        });
});

module.exports = router;