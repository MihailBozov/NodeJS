import { Router } from "express";
import homeController from "./controllers/homeController.js";
import gameController from "./controllers/gameController.js";
import authController from "./controllers/authController.js";

const router = Router();


router.use(authController);
router.use(homeController);
router.use(gameController);

router.all('*', (req, res) => {
    res.render('404', {tittle: '404 Page - Gaming Team'});
});


export default router;