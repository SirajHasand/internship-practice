const { createUser, getUserByEmail, getUserById, changedPasswordAfter } = require('../../models/UserModel');
const catchAsync = require('../../utils/catchAsync')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const { promisify } = require('util');



const registerUser = catchAsync( async (req, res, next) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Request body is empty'
            });
        }
        const { username, email, password, confirmPassword,role } = req.body;
        const user =  await createUser({username, email, password, confirmPassword,role});
   
        res.status(201).json({
            message: "User registered successfully",
            data:{user}
        });

    });


    const loginUser = catchAsync(async(req,res,next)=>{
        const {email,password} = req.body;

        //if not email, or password
            if(!email || !password){
                return next(new AppError('Email and password are required', 400)) 
            }
            const user = await getUserByEmail(email);
            if (!user) {
                return next(new AppError('User not found', 404))
            }   
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return next(new AppError('Invalid credentials', 401))
            }
            
    
        res.status(200).json({
            status:"success",
            data:{
                username: user.username,
                email: user.email,
                id: user.id,
                role:user.role
            }       
        });
    });


    const restrectTo = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(
                    new AppError('You do not have permission to perform this action', 403)
                );
            }
            next();
        }
    };
    
module.exports = {
  registerUser,
  loginUser,
  restrectTo
};

