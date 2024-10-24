import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtil.js';
import volcanoService from "../services/volcanoService.js";

const volcanoController = Router();

volcanoController.get('/create', (req, res) => {
    res.render('volcano/create', { tittle: 'Create a volcano' });
});

volcanoController.post('/create', async (req, res) => {
    const volcano = Object.assign({}, req.body);
    const userId = req.user._id;
    try {
        const newVolcano = await volcanoService.createVolcano(volcano, userId);
        res.redirect('/');

    } catch (err) {
        const error = getErrorMessage(err);
        res.render('volcano/create', { tittle: 'Create a volcano', volcano, error })
    }
});


volcanoController.get('/all', async (req, res) => {
    const volcanoes = await volcanoService.findAllVolcanoes();
    res.render('volcano/catalog', { volcanoes })
})

volcanoController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const volcano = await volcanoService.findVolcanoById(id);
    res.render('volcano/details', {tittle: 'Details', volcano })
})

export default volcanoController