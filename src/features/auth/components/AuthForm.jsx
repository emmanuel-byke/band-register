import { ArrowRight } from 'lucide-react';
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../state/hooks/ContextUser";
import { loginBackgroundImage1 } from "../../../utilities/constants";
import { cleanAuthForm, validateAuthForm } from "../../../utilities/validators";
import { SpinnerBtn } from "../../reusable/Buttons";
import { BackgroundImage } from "../../reusable/Graphics";
import { LineInput } from "../../reusable/Inputs";
import { HighlightedText } from "../../reusable/Text";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(useLocation()?.state?.isLogin ?? true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login, signup } = useAuth();
  
  const [formData, setFormData] = useState(cleanAuthForm());
  const [errors, setErrors] = useState(cleanAuthForm());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchForm = (loginMode) => {
    setIsLogin(loginMode);
    setFormData(cleanAuthForm());
    setErrors(cleanAuthForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try{
      const newErrors = validateAuthForm(isLogin, formData);
      setErrors(newErrors);
      
      if (!Object.values(newErrors).every(error => error === '')) {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }

    if(!isLogin && formData.newUsername) {
      formData.username = formData.newUsername;
    }
    if(!isLogin && formData.newPassword) {
      formData.password = formData.newPassword;
    }
    console.log(formData);

    try {
      isLogin ? await login(formData) : await signup(formData);
      navigate('/');
      setFormData(cleanAuthForm());
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Signup'} failed:`, error);
      // Handle specific error messages here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="min-h-screen relative overflow-hidden font-lora">
      <BackgroundImage src={loginBackgroundImage1} />
      
      {/* Enhanced overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="relative min-h-[600px]">

            {/* Login Form */}
            <div className={`absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-xl rounded-3xl 
              shadow-2xl border border-white/20 p-8 transition-all duration-700 ease-out
              ${isLogin ? 'opacity-100 translate-x-0 pointer-events-auto z-20' : 'opacity-0 -translate-x-full pointer-events-none z-10'}`}>
              
              <div className='flex flex-row justify-between items-center mb-10'>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    <HighlightedText>Welcome</HighlightedText> Back
                  </h2>
                  <p className="text-white/70 text-sm">Sign in to continue your journey</p>
                </div>
                <NavLink to='/' className='text-white/60 hover:text-white/90 transition-colors duration-200'>
                  <ArrowRight className='h-6 w-6' />
                </NavLink>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <LineInput 
                      label='Username' 
                      name='username' 
                      value={formData.username} 
                      onChange={handleInputChange}
                      autoComplete="username"
                    />
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <LineInput 
                      type="password" 
                      label='Password' 
                      name='password' 
                      value={formData.password} 
                      onChange={handleInputChange}
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-2 ml-1">{errors.password}</p>
                    )}
                  </div>
                </div>

                <SpinnerBtn loading={loading} label='Sign In' />
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm">
                  New to our community?{' '}
                  <button
                    onClick={() => switchForm(false)}
                    className="font-semibold text-emerald-300 hover:text-emerald-200 underline-offset-4 
                      hover:underline transition-all duration-200"
                  >
                    Join Now
                  </button>
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <div className={`absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-xl rounded-3xl 
              shadow-2xl border border-white/20 p-8 transition-all duration-700 ease-out
              ${!isLogin ? 'opacity-100 translate-x-0 pointer-events-auto z-20' : 'opacity-0 translate-x-full pointer-events-none z-10'}`}>
              
              <div className='flex flex-row justify-between items-center mb-10'>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    <HighlightedText>Join</HighlightedText> Us
                  </h2>
                  <p className="text-white/70 text-sm">Create your account to get started</p>
                </div>
                <NavLink to='/' className='text-white/60 hover:text-white/90 transition-colors duration-200'>
                  <ArrowRight className='h-6 w-6' />
                </NavLink>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <LineInput name='fname' value={formData.fname} onChange={handleInputChange} label='First Name' autoComplete="given-name"/> 
                    {errors.fname && <p className="text-red-400 text-sm mt-2">{errors.fname}</p>}
                  </div>
                  <div>
                  <LineInput name='lname' value={formData.lname} onChange={handleInputChange} label='Last Name' autoComplete="family-name"/> 
                    {errors.lname && <p className="text-red-400 text-sm mt-2">{errors.lname}</p>}
                  </div>
                </div>
                
                <div>
                  <LineInput type="tel" name='phone_number' value={formData.phone_number} onChange={handleInputChange} label='Phone Number'
                    autoComplete="tel" /> 
                  {errors.phone_number && <p className="text-red-400 text-sm mt-2 ml-1">{errors.phone_number}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <LineInput name='newUsername' value={formData.newUsername} onChange={handleInputChange} label='Username' 
                      autoComplete="new-username"/>
                    {errors.newUsername && <p className="text-red-400 text-sm mt-2">{errors.newUsername}</p>}
                  </div>
                  <div>
                    <LineInput type="password" name='newPassword' value={formData.newPassword} onChange={handleInputChange} label='Password'
                      autoComplete="new-password" />
                    {errors.newPassword && <p className="text-red-400 text-sm mt-2">{errors.newPassword}</p>}
                  </div>
                </div>
                <SpinnerBtn loading={loading} label='Get Started' />
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm">
                  Already a member?{' '}
                  <button
                    onClick={() => switchForm(true)}
                    className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2 
                      transition-colors duration-200"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}