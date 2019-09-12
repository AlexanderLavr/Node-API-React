import User from '../apiV1/users/user.model';
import RoleAndUsers from '../apiV1/users/user.roles';
import * as bcrypt from 'bcrypt';
import config from '../config/config';

export class AuthService {
    public async register(user: any) {

        const errorObj = {
            errorFirstname: '',
            errorSecondname: '',
            errorEmail: '',
            errorPassword: ''
        }
        let stateValid = 0;

        const inpRegExpr = new RegExp(/^[a-zA-Z]{3,}$/);
        const passWordExpr = new RegExp(/^[0-9]{3,}$/);
        const emailRegExpr = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

        if (!inpRegExpr.test(user.firstName)) {
            errorObj.errorFirstname = 'Error: допустимы буквы латинского алфавита менее 3-х';
        } else { ++stateValid }
        if (!inpRegExpr.test(user.secondName)) {
            errorObj.errorSecondname = 'Error: допустимы буквы латинского алфавита менее 3-х';
        } else { ++stateValid }
        if (!emailRegExpr.test(user.email)) {
            errorObj.errorEmail = 'Error: uncorrectEmail value!';
        } else { ++stateValid }
        if (!passWordExpr.test(user.password)) {
            errorObj.errorPassword = 'Error: допустимы цифры не менее 3-х';
        } else {
            user.password = await bcrypt.hash(user.password, config.SALT_ROUNDS)
            ++stateValid
        }

        if (stateValid === 4) {
            let regUser = await User.findOne({ email: user.email });
            if (!regUser) {
                await User.create(user);
                let currentUser = await User.findOne({ email: user.email })
                let usersArray = await RoleAndUsers.findById({ _id: '5d765d401c9d4400003ae337'})
                let currentUsers = usersArray.users;
                currentUsers.push(currentUser._id)
                let users = {
                    users: currentUsers
                }
                await RoleAndUsers.updateOne({ _id: '5d765d401c9d4400003ae337' }, users)
            } else return { status: 403, obj: regUser }
        } else return { status: 401, obj: errorObj }
    }
}