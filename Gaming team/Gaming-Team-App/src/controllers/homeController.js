import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', { tittle: 'Home Page - Gaming Team'});
});




export default homeController;