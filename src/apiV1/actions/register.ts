// import * as bcrypt from 'bcrypt';
// import config from '../../config/config';



// export const registerValid = (user) =>{
//     const errorObj = {
//         errorFirstname: '',
//         errorSecondname: '',
//         errorEmail: '',
//         errorPassword: ''
//     }
//     let stateValid = 0;

//     const inpRegExpr = new RegExp(/^[a-zA-Z]{3,}$/);
//     const passWordExpr = new RegExp(/^[0-9]{3,}$/);
//     const emailRegExpr = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

//     if(!inpRegExpr.test(user.firstName)){
//         errorObj.errorFirstname = 'Error: допустимы буквы латинского алфавита менее 3-х';
//     }else{++stateValid}
//     if(!inpRegExpr.test(user.secondName)){
//         errorObj.errorSecondname = 'Error: допустимы буквы латинского алфавита менее 3-х';
//     }else{++stateValid}
//     if(!emailRegExpr.test(user.email)){
//         errorObj.errorEmail = 'Error: uncorrectEmail value!';
//     }else{++stateValid}
//     if(!passWordExpr.test(user.password)){
//         errorObj.errorPassword = 'Error: допустимы цифры не менее 3-х';
//     }else{
//         user.password = await bcrypt.hash(user.password, config.SALT_ROUNDS)
//         ++stateValid
//     }
// }
