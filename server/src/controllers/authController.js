const { createUser, getUserByEmail, getUserById, changedPasswordAfter } = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
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
         const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
            data:{user}
        });
        console.log(user);

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
            
           
            

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
                            
        );

        res.status(200).json({
            status:"success",
            token,
            data:{
                username: user.username,
                email: user.email,
                id: user.id,
                role:user.role
            }       
        });
    });

const  protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists (Optional but recommended)
    const currentUser = await getUserById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token no longer exists.',
                401
            )
        );
    }
    // 4) check if user changed password after the token was issued
    if (changedPasswordAfter(decoded.iat, currentUser.password_changed_at)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
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
  protect,
  restrectTo
};

