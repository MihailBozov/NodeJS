import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtil.js';
import volcanoService from "../services/volcanoService.js";
import { isAuthenticated, isVolcanoOwner, isNotVolcanoOwner } from "../middlewares/authMiddleware.js";

const volcanoController = Router();

volcanoController.get('/create', isAuthenticated, (req, res) => {
    res.render('volcano/create', { tittle: 'Create a volcano' });
});

volcanoController.post('/create', isAuthenticated, async (req, res) => {
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
    const volcanoId = req.params.id;
    const userId = req.user?._id;
    const volcano = await volcanoService.findVolcanoById(volcanoId);
    const isOwner = volcano?.owner.toString() === userId;
    const hasVoted = await volcanoService.hasVoted(volcanoId, userId)

    res.render('volcano/details', { tittle: 'Details', volcano, isOwner, hasVoted })
})

volcanoController.get('/:id/edit', isAuthenticated, isVolcanoOwner, async (req, res) => {
    const id = req.params.id;
    const volcano = await volcanoService.findVolcanoById(id);
    res.render('volcano/edit', { tittle: 'Edit Page', volcano })
})

volcanoController.post('/:id/edit', isAuthenticated, isVolcanoOwner, async (req, res) => {
    const id = req.params.id;
    const volcano = Object.assign({}, req.body);
    try {
        await volcanoService.editVolcano(id, volcano);
        res.redirect(`/volcanoes/${id}/details`)

    } catch (err) {
        const error = getErrorMessage(err);
        res.render(`volcano/edit`, { tittle: 'Edit Page', volcano, error });
    }
})

volcanoController.get('/:id/delete', isAuthenticated, isVolcanoOwner, async (req, res) => {
    const id = req.params.id;
    await volcanoService.deleteVolcano(id);
    res.redirect('/volcanoes/all')
})

volcanoController.get('/:id/vote', isAuthenticated, isNotVolcanoOwner, async (req, res) => {
    const volcanoId = req.params.id;
    const userId = req.user._id;

    const result = await volcanoService.vote(volcanoId, userId);
    res.redirect(`/volcanoes/${volcanoId}/details`);

})

volcanoController.get('/search', async (req, res) => {
    const filter = Object.assign({}, req.query);
    const volcanoes = await volcanoService.findAllVolcanoesFiltered(filter);
    res.render('volcano/search', {tittle: 'Search', volcanoes});
})


export default volcanoController