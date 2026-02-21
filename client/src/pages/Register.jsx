import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ FIX: prevent page reload
        setError('');
    // ✅ FIX: confirm password validation
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userData = {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword
      };
       if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

      const response = await createUser(userData);
      console.log('User registered:', response.data);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChengeForm = () => {
    navigate('/login');
  };

  return (
    <div className="bg-blue-100 w-[100vw] h-[89vh] flex justify-center items-center">
      <div className="bg-gradient-to-b from-blue-300 to-blue-200 max-w-[350px] xl:min-w-[300px] rounded-md shadow-md p-6">
    { error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      ) }
        {/* ❌ FIX: spelling */}
        <h2 className="flex justify-center font-mono text-gray-600 font-semibold mb-5">
          Register page
        </h2>

        <form onSubmit={handleSubmit} className="grid font-sans font-semibold mx-2 gap-3">
          
          {/* USERNAME */}
          <div className="flex-col flex">
            <label
              className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username} // ✅ FIX: controlled input
              onChange={handleChange}
              className="w-full rounded-lg border border-[#bdc3ff] bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="flex-col flex">
            <label
              className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="text"
              name="email" // ✅ FIX: lowercase email
              value={form.email} // ✅ FIX: controlled input
              onChange={handleChange}
              className="w-full rounded-lg border border-[#bdc3ff] bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex-col flex">
            <label
              className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password} // ✅ FIX
              onChange={handleChange}
              className="w-full rounded-lg border border-[#bdc3ff] bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex-col flex">
            <label
              className="text-[12px] font-medium uppercase tracking-[0.02em] text-[#404077]"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password" // ✅ FIX: hide input
              name="confirmPassword" // ✅ FIX: correct field
              value={form.confirmPassword} // ✅ FIX
              onChange={handleChange}
              className="w-full rounded-lg border border-[#bdc3ff] bg-blue-300 px-2.5 py-1.5 text-xs text-[#404077] shadow-inner focus:border-[#5d6bff] focus:outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit" // ✅ FIX: no onClick, form handles submit
            className="w-full rounded-lg border border-[#bdc3ff] bg-blue-500 mt-1 px-2.5 py-1.5 text-md text-gray-700 hover:bg-blue-400 hover:text-gray-800 shadow-inner focus:border-[#5d6bff] focus:outline-none"
          >
            Register Now
          </button>
        </form>

        <p className="mt-3 text-xs flex justify-center">
          Already have account
          <button
            onClick={handleChengeForm}
            className="ms-1 text-gray-600 hover:text-gray-900 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
