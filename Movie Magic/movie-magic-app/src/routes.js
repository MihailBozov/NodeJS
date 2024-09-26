import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js'

const router = Router();


router.use(homeController);

// here our movieController will be used only if the route starts with 'movies' 
router.use('/movies', movieController);

export default router;