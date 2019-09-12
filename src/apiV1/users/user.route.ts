import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './user.controller';

const user: Router = Router();
const controller = new Controller();

// Find all Users
user.get('/', controller.findAll);//

// Find one User
user.get('/getAdminUser/:id', controller.findOneAdminUser);

// Edit user
user.put('/editUser', controller.editUser);

// Change photo of User with Id
user.put('/changeProfile/:id', controller.updatePhotoProfile);

// Delete a User with Id
user.delete('/deleteUser/:id', controller.deleteUser);


export default user;
