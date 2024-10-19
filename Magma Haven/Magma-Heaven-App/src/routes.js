import { Router } from "express";
import homeController from "./controllers/homeController.js";

const router = Router();

router.use(homeController);

router.all('*', (req, res) => {
    res.render('home/404', {tittle: '404 Page'})
})


export default router;