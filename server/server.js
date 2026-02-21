const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./src/routes/itemRoutes')
const authRoutes = require('./src/routes/authRoutes')
require('dotenv').config();
const pool = require('./src/config/db');
const app = express();
const PORT = process.env.PORT || 5000; 
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/controllers/ErrorController')

// middleware

app.use(cors())
app.use(express.json());

// Test Routs

app.get('/api/test',(req,res)=>{
  res.json({
    status:'OK',
    timestamp :new Date().toISOString()
  })
})

//Database Test Route
app.get('/api/db-test',async(req,res) =>{
  try{
    const result = await pool.query('select NOW()');
        res.json({
          message:'database connected successfuly',
          time: result.rows[0].now
        })

  }catch(error)
  {
    console.error('database error');
    res.status(500).json({
      error:'database connetion failed'
    });

  }
});

//routes for items
app.use('/api/v1/items',itemsRoutes);
app.use('/api/v1/auth',authRoutes);


app.all('*', (req,res, next)=>{
  next(new AppError('not found this route in server',404));
  
})
//middleware for unfound pages

app.use(globalErrorHandler);
//Start server

app.listen(PORT, ()=>{
  console.log(`server is running on localhost/${PORT}`);
})