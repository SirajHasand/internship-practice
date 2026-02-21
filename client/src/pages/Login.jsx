    import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api';

function Login() {
    const [form,setForm] = useState({
        email : '',
        password:''
    }
    
    )
    const[error , setError]= useState('');
    const navigate = useNavigate();
 const handleSubmit =async(e)=>{
    e.preventDefault();

    try {
        const respons = await getUser(form);
        
        if(respons.status === 200 ){
            alert('login succussfuly')
            navigate('/home');
        }
        else{
            throw new Error(respons.data?.message || 'Login failed')

        }
        
    } catch (error) {
        setError("Email or password is invalid...")
        console.log('error:', error)
    }
        
    }
    
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setForm(pre=>({
            ...pre,
            [name]:value}
        ))
        
    }
const handleChengeForm =()=>{
    navigate('/register')
}
  return (
    <div className='bg-blue-100  w-[100vw] h-[89vh] flex flex-col justify-center items-center'>
        {error &&<div>
            <h1 className='bg-red-400 text-center p-2'>{error}</h1>
        </div>}
        { <div className=' bg-gradient-to-b from-blue-300 to to-blue-200 max-w-[350px] xl:min-w-[300px] rounded-md shadow-md p-6 '>
        <h2 className='flex justify-center font-mono text-gray-600 font-semibold mb-5'>Welcome Back </h2>
        <form onSubmit={handleSubmit} className='grid font-sans font-semibold mx-2 gap-3'>
            
            <div className='flex-col flex '>
                <label className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]" htmlFor="username">
                Email:</label>
                <input type="text"
                onChange={handleChange}
                 name="email"
                  id=""
                  className={` w-full rounded-lg border border-[#bdc3ff]'
                 bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none`}
              
                   />
            </div>
            <div className='flex-col flex '>
                <label className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]" htmlFor="username">
                    Password:</label>
                <input type="password"
                 name="password"
                 onChange={handleChange}
                  id=""
                  className={` w-full rounded-lg border border-[#bdc3ff]'
                 bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none`}
              
                   />
            </div>
           
            <button 
            type="submit"
                   className={` w-full rounded-lg border border-[#bdc3ff]'
                 bg-blue-500 mt-1 px-2.5 py-1.5 text-md text-gray-700 hover:bg-blue-400 hover:text-gray-800 shadow-inner focus:border-[#5d6bff] focus:outline-none`}
              >Log in</button>
            
        </form>
        <p className=' mt-3 text-xs flex justify-center'>Not have account  <button  onClick={handleChengeForm} className=' ms-1 text-gray-600 hover:text-gray-900 hover:underline'>Register</button></p>
    </div>}
    </div>
  )
}

export default Login