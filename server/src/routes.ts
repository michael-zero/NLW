import express from 'express';
import {celebrate, Joi} from 'celebrate';

import multer from 'multer'
import multerConfig from './config/multer'


import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router(); //desacoplar as rotas do arquivo principal

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController()

//index (listar), show (único), crud
//rotas ========================================
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


//envio de imagens
routes.post(
            '/points', 
            upload.single('image'),
            celebrate({
                body: Joi.object().keys({
                    name: Joi.string().required(),
                    email: Joi.string().required().email(),
                    whatsapp: Joi.string().required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    city: Joi.string().required(),
                    uf: Joi.string().required().max(2),
                    items: Joi.string().required(),
                })
            }, {
                abortEarly: false
            }), 
            pointsController.create);





export default routes;
