import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', {layout: false});
    
});




export default homeController;