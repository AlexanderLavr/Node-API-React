import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import User from '../users/user.model';
import { AuthService } from '../../service/authServce';
import RoleAndUsers from '../../apiV1/users/user.roles';

export default class UserController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    let { email, password } = req.body;
    try {
      const errorObj = {
        logErrorEmail: '',
        logErrorPassword: ''
      }
      let stateValid = 0;
      const passWordExpr = new RegExp(/^[0-9]{3,}$/);
      const emailRegExpr = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

      if(!emailRegExpr.test(email)){
          errorObj.logErrorEmail = 'Error: uncorrectEmail value!';
      }else{++stateValid}
      if(!passWordExpr.test(password)){
          errorObj.logErrorPassword = 'Error: допустимы буквы латинского алфавита и цифры не менее 3-х';
      }else{++stateValid}
      if(stateValid === 2){

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
   
        const matchPasswords = await bcrypt.compare(password, user.password);
        if (!matchPasswords) {
          return res.status(401).send({
            success: false,
            message: 'Not authorized'
          });
        }
        let isAdmin:Boolean = false;
        let usersArray = await RoleAndUsers.findById({ _id: '5d765d401c9d4400003ae337'})//match roles
        await usersArray.admins.forEach((id):void=>{
          if(JSON.stringify(user._id) === JSON.stringify(id)){
            isAdmin = true;
            return
          }
        })
       let {email, imageProfile, _id} = user;

        const token = await jwt.sign({
          id: _id,
          email: email,
          imageProfile: imageProfile,
          isAdmin: isAdmin
        }, config.JWT_ENCRYPTION, {
          expiresIn: config.JWT_EXPIRATION
        });
        res.status(200).send({
          success: true,
          data: token
        });
      }else{
        res.status(401).send({
          success: false,
          errorValid: true,
          data: errorObj,
        })
      } 
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };



  public register = async (req: Request, res: Response): Promise<any> => {
    
    const user = new User ({
      _id: null,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstname,
      imageProfile: req.body.imageProfile,
      secondName: req.body.secondname
    });

    try{
      const matchUser:any = await new AuthService().register(user);
      if (!matchUser) {
         res.status(200).send({
          success: true,
          message: "User Successfully created",
          data: user
        });
      }else if(matchUser.status === 401){
        res.status(401).send({
          success: false,
          errorValid: true,
          data: matchUser.obj
        });
      }else if(matchUser.status === 403){
        res.status(401).send({
          success: false,
          errorValid: false,
          message: `User with E-mail:${matchUser.obj.email} alredy exist!`
        });  
      }
    }catch(err){
      res.status(500).send({
        success: false,
        message: req.body.toString()
      });
    }
  };
}
