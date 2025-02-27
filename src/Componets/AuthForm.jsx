import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    password: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    fname: '',
    lname: '',
    password: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {
      username: '',
      fname: '',
      lname: '',
      password: '',
      phone: ''
    };

    if (isLogin) {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.password.trim()) newErrors.password = 'Password is required';
    } else {
      if (!formData.fname.trim()) newErrors.fname = 'First name is required';
      if (!formData.lname.trim()) newErrors.lname = 'Last name is required';
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (/\s/.test(formData.username)) {
        newErrors.username = 'Username cannot contain spaces';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number (10 digits required)';
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add your submission logic here
    }
  };

  const backgroundImage = `https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80`;

  const clearErrors = () => {
    setErrors({
      username: '',
      fname: '',
      lname: '',
      password: '',
      phone: ''
    });
  };

  return (
    <header className="min-h-screen relative overflow-hidden font-lora">
      <div className="fixed inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="relative h-[520px]">
            {/* Login Form */}
            <div className={`absolute top-0 left-0 right-0 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all 
              duration-500 ease-in-out ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
              <div className='flex flex-row justify-between items-center mb-8'>
                <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
                <NavLink to='/' className='text-white/80 hover:text-white/70'>
                  <ArrowRight className='h-10 w-10 text-white cursor-pointer' />
                </NavLink>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative mt-4">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none focus:outline-none focus:ring-0 focus:border-blue-500
                      text-white transition-colors peer"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-3 -top-3.5 text-gray-300 text-sm transition-all
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
                      peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500
                      peer-focus:text-sm"
                  >
                    Username
                  </label>
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                <div className="relative mt-10">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-3 py-2 bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none focus:outline-none focus:ring-0 focus:border-blue-500
                      text-white transition-colors peer"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 -top-3.5 text-gray-300 text-sm transition-all
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
                      peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500
                      peer-focus:text-sm"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type='submit'
                  className="w-full py-3 px-6 mt-8 text-[22px] text-white font-lora font-bold rounded-lg
                    border-t-1 border-r-2 border-t-zinc-700 hover:bg-sky-400 hover:rounded-4xl
                    transform transition-all duration-200 hover:scale-105
                    active:scale-95 shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Submit
                </button>
              </form>
              <p className="mt-6 text-center text-white/80">
                New here?{' '}
                <button
                  onClick={() => { setIsLogin(false); clearErrors(); }}
                  className="text-sky-400 hover:text-green-400 font-semibold underline underline-offset-2 
                    transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            </div>

            {/* Signup Form */}
            <div className={`absolute top-0 left-0 right-0 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all 
              duration-500 ease-in-out ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
              <div className='flex flex-row justify-between items-center mb-8'>
                <h2 className="text-3xl font-bold text-white text-center">Join Us</h2>
                <NavLink to='/' className='text-white/80 hover:text-white/70'>
                  <ArrowRight className='h-10 w-10 text-white cursor-pointer' />
                </NavLink>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-white bg-white/20 rounded-xl border border-white/30 focus:ring-2 
                        focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder:text-white/70"
                    />
                    {errors.fname && <p className="text-red-400 text-sm mt-1">{errors.fname}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-white bg-white/20 rounded-xl border border-white/30 focus:ring-2 
                        focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder:text-white/70"
                    />
                    {errors.lname && <p className="text-red-400 text-sm mt-1">{errors.lname}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="088 123 4567"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-xl border border-white/30 focus:ring-2 
                      focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder:text-white/70"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-xl border border-white/30 focus:ring-2 
                      focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder:text-white/70"
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-xl border border-white/30 focus:ring-2 
                      focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder:text-white/70"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 mt-8 bg-sky-500 hover:bg-green-400 rounded-4xl text-white font-semibold 
                    transition-colors shadow-lg cursor-pointer hover:border-2 border-t-1 border-r-1 border-t-zinc-700"
                >
                  Get Started
                </button>
              </form>
              <p className="mt-6 text-center text-white/80">
                Already a member?{' '}
                <button
                  onClick={() => { setIsLogin(true); clearErrors(); }}
                  className="text-cyan-300 hover:text-cyan-400 font-semibold underline underline-offset-2 transition-colors
                    cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};