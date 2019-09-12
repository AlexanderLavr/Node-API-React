import { Request, Response } from 'express';
import User from './user.model';
import RoleAndUsers from '../../apiV1/users/user.roles';


export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
    const users = await User.find();
       if (!users) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }
    let usersArray = await RoleAndUsers.findById({ _id: '5d765d401c9d4400003ae337'})
    let newUsersArray = [];

     await users.forEach(element => {
      let isAdmin:Boolean = false;
        usersArray.admins.forEach((id):void=>{
          if(JSON.stringify(element._id) === JSON.stringify(id)){
            isAdmin = true;
          }else{
            isAdmin = false;
          }
        })
        let { _id, email, firstName, secondName } = element;
        let newUser = {
          id: _id,
          email: email,
          firstname: firstName,
          secondname: secondName,
          isAdmin: isAdmin
        }
        newUsersArray.push(newUser)
      });

      res.status(200).send({
        success: true,
        data: newUsersArray
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    console.log(1)
    try {
      const user = await User.findById(req.params.id, { password: 0 });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };


  public findOneAdminUser = async (req: Request, res: Response): Promise<any> => {
   
    try {
      const user = await User.findById(req.params.id);
      let { _id, email, firstName, secondName } = user;
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      let newUser = {
        id: _id,
        firstname: firstName,
        secondname: secondName,
        email: email
      }
      res.status(200).send({
        success: true,
        data: newUser
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
  

  public editUser = async (req: Request, res: Response): Promise<any> => {
    const { firstname, secondname, email, id} = req.body;
    try {
    const userUpdated = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              email: email,
              firstName: firstname,
              secondName: secondname
            }
          },
          { new: true }
        );

        let newUser = {
          id: userUpdated._id,
          firstname: userUpdated.firstName,
          secondname: userUpdated.secondName,
          email: email
        }
        res.status(200).send({
          success: true,
          data: newUser
        });
    }catch(err) {
        res.status(500).send({
          success: false,
          message: err.toString(),
          data: null
        });
      }
  }

  public updatePhotoProfile = async (req: Request, res: Response): Promise<any> => {
    const { img } = req.body;
    try {
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            imageProfile: img
          }
        },
        { new: true }
      );
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    }catch(err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };


  public deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      let deleteUserId = req.params.id;
      const user = await User.findByIdAndRemove(req.params.id);//delete user
      let roleArray =  await RoleAndUsers.find()//all roles
      let indexDeleteRole;//find index delete role
      let arrUsersRoles =  roleArray[0].users;
      arrUsersRoles.forEach((element, i) => {
        if(element === deleteUserId){
          indexDeleteRole = i;
        }
      });
      arrUsersRoles.splice(indexDeleteRole, 1)//delete check role
      let users = {
        users: arrUsersRoles
      }
      await RoleAndUsers.updateOne({ _id: '5d765d401c9d4400003ae337' }, users)// update array roles
      res.status(200).send({
        success: true,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
