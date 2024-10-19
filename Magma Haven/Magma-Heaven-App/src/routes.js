import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";

const router = Router();

router.use(homeController);
router.use('/auth', authController);

router.all('*', (req, res) => {
    res.render('404', {tittle: '404 Page'})
})


export default router;