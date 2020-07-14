import { Router } from 'express';
import multer from 'multer'
import MulterConfig from './config/multer'

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliveryController';
import PackageController from './app/controllers/PackageController'
import FileController from './app/controllers/FileController'
import DeliveryProblems from './app/controllers/DeliveryProblemsController';

import authMiddleware from './middlewares/auth';

const routes = new Router();
const upload = multer(MulterConfig)

routes.post('/sessions', SessionController.store);
routes.post('/files', upload.single('file'), FileController.store);


routes.post('/delivery/:id/problems', DeliveryProblems.store)
routes.get('/delivery/problems', DeliveryProblems.index)
// routes.get('/delivery/:id/problems', DeliveryProblems.packageProblem)
routes.post('/problem/:id/cancel-delivery', DeliveryProblems.cancelDelivery)
routes.get('/delivery/checkExist/:id', DeliveryController.checkExist);

//rotas livres pro mobile
routes.get('/delivery/:id', DeliveryController.index);
routes.get('/package/:id', PackageController.indexById);
routes.get('/problems/:id', DeliveryProblems.packageProblem);
routes.put('/package/:id', PackageController.update);

//rotas livres pro mobile



routes.use(authMiddleware);


routes.post('/delivery', DeliveryController.store);
routes.delete('/delivery/delete/:id', DeliveryController.delete);
routes.get('/delivery', DeliveryController.deliveries);
routes.get('/deliveryById/:id', DeliveryController.deliveryById);
routes.get('/delivery/:id/deliveries', DeliveryController.indexAll);
routes.get('/deliveryForm', DeliveryController.deliveryForm);
routes.put('/deliveryForm/update/:id', DeliveryController.update);



routes.post('/package', PackageController.store);
routes.get('/package', PackageController.index);
//update deliveryman, product ou recipient_id
routes.put('/package/update/:id', PackageController.updatePackage);
//update deliveryman, product ou recipient_id

//deletar do banco
routes.delete('/package/delete/:id', PackageController.deletePackage);
//deletar do banco

routes.put('/package/delivered/:id', PackageController.delivered);
routes.put('/package/cancel/:id', PackageController.cancel);


routes.post('/recipient', RecipientController.store);
routes.delete('/recipient/delete/:id', RecipientController.delete);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', RecipientController.update);
routes.get('/recipient/:id', RecipientController.recipientById);
routes.get('/recipientForm', RecipientController.recipientForm);


export default routes;
